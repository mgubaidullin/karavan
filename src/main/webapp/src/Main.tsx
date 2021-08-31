import React from 'react';
import {
    Brand,
    Page,
    PageHeader, PageSection,
    PageSectionVariants, TextContent, Text,
    Toolbar, ToolbarContent, Gallery, FlexItem, Flex, ToolbarItem, TextInput, PageSidebar, NavItem, NavList, Nav
} from '@patternfly/react-core';
import logo from './logo.svg';
import './karavan.css';
import {KaravanApi} from "./api/KaravanApi";
import {IntegrationList} from "./list/IntegrationList";

interface Props {
}

interface State {
    repository: string,
    path: string,
    version: string,
    isNavOpen: boolean,
    activeItem: 'integrations' | 'configuration',
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
        isNavOpen: false,
        activeItem: 'integrations',
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
    }

    onNavToggle = () => {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    };

    onNavSelect = (result: any) => {
        this.setState({
            activeItem: result.itemId
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
            <NavItem id="integrations" to="#integrations" itemId={'integrations'} isActive={this.state.activeItem === 'integrations'}>
                Integrations
            </NavItem>
            <NavItem id="configuration" to="#configuration" itemId={"configuration"} isActive={this.state.activeItem === 'configuration'}>
                Configuration
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
                <PageSection isFilled>
                    <IntegrationList/>
                </PageSection>
            </Page>
        );
    }
};