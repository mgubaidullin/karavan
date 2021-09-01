import React from 'react';
import {
    Brand,
    Page,
    PageHeader, PageSection,
    PageSectionVariants, TextContent, Text,
    Toolbar, ToolbarContent, Gallery, FlexItem, Flex, ToolbarItem, TextInput, PageSidebar, NavItem, NavList, Nav
} from '@patternfly/react-core';
import {KaravanApi} from "./api/KaravanApi";
import {IntegrationPage} from "./integrations/IntegrationPage";
import {RouteDesignerPage} from "./designer/RouteDesignerPage";
import {KameletApi} from "./api/KameletApi";
import logo from './logo.svg';
import './karavan.css';
import {ConfigurationPage} from "./config/ConfigurationPage";

interface Props {
}

interface State {
    repository: string,
    path: string,
    version: string,
    isNavOpen: boolean,
    pageId: 'integrations' | 'configuration' | 'designer',
    integrations: []
}

export class Main extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    public state: State = {
        repository: '',
        path: '',
        version: '',
        isNavOpen: true,
        pageId: "integrations",
        integrations: []
    };

    componentDidMount() {
        KaravanApi.getConfiguration((config: any) =>
            this.setState({
                version: config?.['karavan.version'],
                path: config?.['karavan.git.path'],
                repository: config?.['karavan.git.uri']
            }));
        KaravanApi.getIntegrations((integrations: []) =>
            this.setState({
                integrations: integrations
            }));

        KameletApi.prepareKamelets();
    }

    onNavToggle = () => {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    };

    onNavSelect = (result: any) => {
        this.setState({
            isNavOpen: result.itemId !== 'designer',
            pageId: result.itemId
        });
    };

    toolBar = (
        <div className="top-toolbar">
            {/*<Button variant="secondary" onClick={event => this.setState({saveWindowOpen: true})} icon={<OpenshiftIcon />}>Deploy</Button>*/}
        </div>
    );

    header = () => (
        <PageHeader className="page-header"
                    onNavToggle={this.onNavToggle}
                    showNavToggle
                    logo={<Brand className="brand" src={logo} alt="Karavan"/>}
                    headerTools={this.toolBar}
        />
    );

    pageNav = () => (<Nav onSelect={this.onNavSelect}>
        <NavList>
            <NavItem id="integrations" to="#integrations" itemId={'integrations'}
                     isActive={this.state.pageId === 'integrations'}>
                Integrations
            </NavItem>
            <NavItem id="configuration" to="#configuration" itemId={"configuration"}
                     isActive={this.state.pageId === 'configuration'}>
                Configuration
            </NavItem>
            <NavItem id="configuration" to="#designer" itemId={"designer"}
                     isActive={this.state.pageId === 'designer'}>
                Designer
            </NavItem>
        </NavList>
    </Nav>);

    sidebar = () => (<PageSidebar nav={this.pageNav()} isNavOpen={this.state.isNavOpen}/>);

    render() {
        return (
            <Page key={this.state.version} className="karavan" header={this.header()} sidebar={this.sidebar()}>
                {this.state.pageId === 'integrations' && <IntegrationPage/>}
                {this.state.pageId === 'designer' && <RouteDesignerPage/>}
                {this.state.pageId === 'configuration' && <ConfigurationPage/>}
            </Page>
        );
    }
};