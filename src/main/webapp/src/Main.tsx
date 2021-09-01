import React from 'react';
import {
    Brand,
    Page,
    PageHeader, PageSection,
    PageSectionVariants, TextContent, Text,
    Toolbar, ToolbarContent, Gallery, FlexItem, Flex, ToolbarItem, TextInput, PageSidebar, NavItem, NavList, Nav
} from '@patternfly/react-core';
import {KaravanApi} from "./api/KaravanApi";
import {IntegrationList} from "./list/IntegrationList";
import {RouteDesigner} from "./designer/RouteDesigner";
import {KameletApi} from "./api/KameletApi";
import logo from './logo.svg';
import './karavan.css';

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
                <PageSection className="tools-section" variant={PageSectionVariants.light}>
                    <Flex className="tools" justifyContent={{default: 'justifyContentSpaceBetween'}}>
                        <FlexItem>
                            <TextContent>
                                <Text component="h1">Integrations</Text>
                            </TextContent>
                        </FlexItem>
                        <FlexItem>
                            <Toolbar id="toolbar-group-types">
                                <ToolbarContent>
                                    <ToolbarItem variant="overflow-menu">
                                        <TextInput className="text-field" type="search" id="search" name="search"
                                                   autoComplete="off" placeholder="Search by name"/>
                                    </ToolbarItem>
                                </ToolbarContent>
                            </Toolbar>
                        </FlexItem>
                    </Flex>
                </PageSection>
                {this.state.pageId === 'integrations' && <IntegrationList/>}
                {this.state.pageId === 'designer' && <RouteDesigner/>}
                {this.state.pageId === 'configuration' && <IntegrationList/>}
            </Page>
        );
    }
};