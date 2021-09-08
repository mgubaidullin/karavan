import React from 'react';
import {
    Brand,
    Page,
    PageHeader, PageSidebar, NavItem, NavList, Nav, ModalVariant, Button, Modal, Alert, AlertActionCloseButton
} from '@patternfly/react-core';
import {KaravanApi} from "./api/KaravanApi";
import {IntegrationPage} from "./integrations/IntegrationPage";
import {KameletApi} from "./api/KameletApi";
import logo from './logo.svg';
import './karavan.css';
import {ConfigurationPage} from "./config/ConfigurationPage";
import {KameletsPage} from "./kamelets/KameletsPage";
import {IntegrationGenerator} from "./api/IntegrationGenerator";
import {Integration} from "./model/IntegrationModels";
import {v4 as uuidv4} from "uuid";
import {DslPage} from "./dsl/DslPage";
import {DslMetaApi} from "./api/DslMetaApi";
import {RouteDesignerPage} from "./designer/RouteDesignerPage";

class ToastMessage {
    id: string = ''
    text: string = ''
    title: string = ''
    variant?: 'success' | 'danger' | 'warning' | 'info' | 'default';

    constructor(title:string, text: string, variant: 'success' | 'danger' | 'warning' | 'info' | 'default') {
        this.id = uuidv4();
        this.title = title;
        this.text = text;
        this.variant = variant;
    }
}

interface Props {
}

interface State {
    version: string,
    isNavOpen: boolean,
    pageId: 'integrations' | 'configuration' | 'designer' | 'kamelets'
    integrations: [],
    integration: Integration,
    isModalOpen: boolean,
    nameToDelete: string,
    alerts: ToastMessage[],
    request: string
}

export class Main extends React.Component<Props, State> {

    public state: State = {
        version: '',
        isNavOpen: true,
        pageId: "designer",
        integrations: [],
        integration: Integration.createNew(),
        isModalOpen: false,
        nameToDelete: '',
        alerts: [],
        request: uuidv4()
    };

    designer = React.createRef();

    componentDidMount() {
        KaravanApi.getConfiguration((config: any) =>
            this.setState({
                version: config?.['karavan.version'],
            }));
        KameletApi.prepareKamelets();
        DslMetaApi.prepareDslMetaModels();
        this.onGetIntegrations();
    }

    onNavToggle = () => {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    };

    onNavSelect = (result: any) => {
        if (result.itemId === 'integrations'){
            this.onGetIntegrations();
        }
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

    onIntegrationDelete = (name: string) => {
        this.setState({isModalOpen: true, nameToDelete: name})
    };

    deleteErrorMessage = (id: string) => {
        this.setState({alerts: this.state.alerts.filter(a => a.id !== id)})
    }
    delete = () => {
        KaravanApi.deleteIntegration(this.state.nameToDelete, res => {
            if (res.status === 204) {
                this.toast("Success", "Integration deleted", "success");
                this.onGetIntegrations();
            } else {
                this.toast("Error", res.statusText, "danger");
            }
        });
        this.setState({isModalOpen: false})
    }

    toast = (title: string, text: string, variant: 'success' | 'danger' | 'warning' | 'info' | 'default') => {
        const mess = [];
        mess.push(...this.state.alerts, new ToastMessage(title, text, variant));
        this.setState({alerts: mess})
    }

    onIntegrationSelect = (name: string) => {
        KaravanApi.getIntegration(name, res => {
            if (res.status === 200) {
                const code: string = res.data;
                const i = IntegrationGenerator.yamlToIntegration(code);
                this.setState({isNavOpen: true, pageId: 'designer', integration: i});
            } else {
                this.toast("Error", res.statusText, "danger");
            }
        });
    };

    onIntegrationCreate = () => {
        this.setState({isNavOpen: false, pageId: 'designer'});
        const i = Integration.createNew();
        this.setState({isNavOpen: true, pageId: 'designer', integration: i});
    };

    onGetIntegrations() {
        KaravanApi.getIntegrations((integrations: []) =>
            this.setState({
                integrations: integrations, request: uuidv4()
            }));
    };

    render() {
        return (
            <Page className="karavan" header={this.header()} sidebar={this.sidebar()}>
                {this.state.pageId === 'integrations' &&
                <IntegrationPage key={this.state.request} integrations={this.state.integrations} onDelete={this.onIntegrationDelete} onSelect={this.onIntegrationSelect}
                                 onCreate={this.onIntegrationCreate}/>}
                {this.state.pageId === 'configuration' && <ConfigurationPage/>}
                {this.state.pageId === 'kamelets' && <KameletsPage/>}
                {this.state.pageId === 'designer' && <RouteDesignerPage integration={this.state.integration}/>}
                {/*{this.state.pageId === 'designer' && <DslPage/>}*/}
                <Modal
                    title="Confirmation"
                    variant={ModalVariant.small}
                    isOpen={this.state.isModalOpen}
                    onClose={() => this.setState({isModalOpen: false})}
                    actions={[
                        <Button key="confirm" variant="primary" onClick={e => this.delete()}>Delete</Button>,
                        <Button key="cancel" variant="link"
                                onClick={e => this.setState({isModalOpen: false})}>Cancel</Button>
                    ]}
                    onEscapePress={e => this.setState({isModalOpen: false})}>
                    <div>
                        Are you sure you want to delete integration?
                    </div>
                </Modal>
                {this.state.alerts.map((e: ToastMessage) => (
                    <Alert key={e.id} className="main-alert" variant={e.variant} title={e.title} timeout={2000}
                           actionClose={<AlertActionCloseButton onClose={() => this.deleteErrorMessage(e.id)}/>}>
                        {e.text}
                    </Alert>
                ))}
            </Page>
        );
    }
};