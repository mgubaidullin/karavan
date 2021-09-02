import React from 'react';
import {
    Brand,
    Page,
    PageHeader, PageSidebar, NavItem, NavList, Nav
} from '@patternfly/react-core';
import {KaravanApi} from "./api/KaravanApi";
import {IntegrationPage} from "./integrations/IntegrationPage";
import {RouteDesignerPage} from "./designer/RouteDesignerPage";
import {KameletApi} from "./api/KameletApi";
import logo from './logo.svg';
import './karavan.css';
import {ConfigurationPage} from "./config/ConfigurationPage";
import {KameletsPage} from "./kamelets/KameletsPage";
import {IntegrationGenerator} from "./api/IntegrationGenerator";
import {Integration, Spec} from "./model/IntegrationModels";

interface Props {
}

interface State {
    repository: string,
    path: string,
    version: string,
    isNavOpen: boolean,
    pageId: 'integrations' | 'configuration' | 'designer' | 'kamelets'
    integrations: [],
    integration: Integration
}

export class Main extends React.Component<Props, State> {

    public state: State = {
        repository: '',
        path: '',
        version: '',
        isNavOpen: true,
        pageId: "integrations",
        integrations: [],
        integration: Integration.createNew()
    };

    designer = React.createRef();

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
            pageId: result.itemId,
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
            <NavItem id="integrations" to="#" itemId={'integrations'}
                     isActive={this.state.pageId === 'integrations'}>
                Integrations
            </NavItem>
            <NavItem id="kamelets" to="#" itemId={"kamelets"}
                     isActive={this.state.pageId === 'kamelets'}>
                Kamelets
            </NavItem>
            <NavItem id="configuration" to="#" itemId={"configuration"}
                     isActive={this.state.pageId === 'configuration'}>
                Configuration
            </NavItem>
        </NavList>
    </Nav>);

    sidebar = () => (<PageSidebar nav={this.pageNav()} isNavOpen={this.state.isNavOpen}/>);

    onIntegrationSelect = (name: string) => {
        console.log("select " + name)
        KaravanApi.getIntegration(name, res => {
            if (res.status === 200){
                const code: string = res.data;
                const i = IntegrationGenerator.yamlToIntegration(code);
                this.setState({isNavOpen: false, pageId: 'designer', integration: i});
            } else {
                console.log(res);
            }
        });
    };

    onIntegrationCreate = () => {
        console.log("onIntegrationCreate")
        this.setState({isNavOpen: false, pageId: 'designer'});
        const i = Integration.createNew();
        this.setState({isNavOpen: false, pageId: 'designer', integration: i});
    };

    render() {
        return (
            <Page key={this.state.version} className="karavan" header={this.header()} sidebar={this.sidebar()}>
                {this.state.pageId === 'integrations' && <IntegrationPage onSelect={this.onIntegrationSelect} onCreate={this.onIntegrationCreate}/>}
                {this.state.pageId === 'configuration' && <ConfigurationPage/>}
                {this.state.pageId === 'kamelets' && <KameletsPage/>}
                {this.state.pageId === 'designer' && <RouteDesignerPage integration={this.state.integration}/>}
            </Page>
        );
    }
};