import React, {Component} from 'react';
import {
    Button,
    Modal,
    ActionGroup, AlertGroup, Alert, getUniqueId, AlertActionCloseButton
} from '@patternfly/react-core';
import {ConfigOpenshiftPanel} from '../designer/ConfigOpenshiftPanel';
import {Subscription} from 'rxjs';
import '../karavan.css';
import {ConfigOpenshift} from "../model/ConfigModels";
import {OpenshiftApi} from "../api/OpenshiftApi";
import {Integration} from "../model/IntegrationModels";
import {ResourceGenerator} from "../api/ResourceGenerator";

interface Props {
    integration: Integration,
    isOpen: boolean;
}

interface State {
    isOpen: boolean;
    integration: Integration,
    configOpenshift: ConfigOpenshift;
    alertVariant: 'success' | 'danger' | 'warning' | 'info' | 'default';
    alert?: string;
}

export class SaveFileModal extends Component<Props, State> {

    subscription: Subscription | undefined;

    public state: State = {
        isOpen: this.props.isOpen,
        integration: this.props.integration,
        configOpenshift: new ConfigOpenshift(),
        alertVariant: 'success'
    };

    setModalOpen = (open: boolean) => {
        this.setState({isOpen: false});
    }

    componentDidUpdate = (prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) => {
        if (prevState.isOpen !== this.props.isOpen) {
            this.setState({isOpen: this.props.isOpen});
        }
        if (prevState.integration.spec.flows[0].uid !== this.props.integration.spec.flows[0].uid) {
            this.setState({integration: this.props.integration});
        }
    }

    onChangeOpenshiftConfig = (config: ConfigOpenshift) => {
        this.setState({...this.state, configOpenshift: config})
    };

    after = (ok: boolean, text: string) => {
        this.setState({...this.state, alert: text, alertVariant: ok ? 'success' : 'danger'});
    }

    apply = (event: any) => {
        const obj = ResourceGenerator.integrationToObj(this.state.integration);
        OpenshiftApi.applyObj(this.state.configOpenshift, this.state.integration.metadata.name, obj, this.after);
    }

    render() {
        return (
            <Modal
                width={'75%'}
                title="Save Integration"
                isOpen={this.state.isOpen}
                onClose={() => this.setModalOpen(false)}
                actions={[
                    <div className="modal-footer">
                        <ConfigOpenshiftPanel config={this.state.configOpenshift}
                                              onChange={this.onChangeOpenshiftConfig}/>
                        <ActionGroup className="deploy-buttons">
                            <Button key="apply" variant="primary"
                                    onClick={this.apply}>Apply</Button>
                            <Button key="cancel" variant="secondary"
                                    onClick={e => this.setModalOpen(false)}>Close</Button>
                        </ActionGroup>
                    </div>
                ]}
            >
                {this.state.alert &&
                <AlertGroup isLiveRegion aria-live="polite" aria-relevant="additions text" aria-atomic="false">
                    <Alert isInline variant={this.state.alertVariant} title={this.state.alert} key={getUniqueId()}
                           actionClose={<AlertActionCloseButton
                               onClose={() => this.setState({...this.state, alert: undefined})}/>}
                    />
                </AlertGroup>
                }
            </Modal>
        );
    }
}
