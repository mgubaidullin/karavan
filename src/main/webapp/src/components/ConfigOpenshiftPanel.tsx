import React, {Component} from 'react';
import {
    Form,
    FormGroup,
    TextInput, Title, TitleSizes
} from '@patternfly/react-core';
import {Subscription} from 'rxjs';
import '../karavan.css';
import {ConfigOpenshift} from "../model/ConfigModels";
import {StorageApi} from "../api/StorageApi";

interface Props {
    config: ConfigOpenshift;
    onChange?: (config: ConfigOpenshift) => void;
}

interface State {
    config: ConfigOpenshift;
}

export class ConfigOpenshiftPanel extends Component<Props, State> {

    subscription: Subscription | undefined;

    public state: State = {
        config: StorageApi.retrieveOpenshiftConfig(),
    };

    onChange = (field: string, value: string) => {
        const c:ConfigOpenshift = this.state.config;
        if (field === 'server') c.server= value;
        if (field === 'namespace') c.namespace= value;
        if (field === 'token') c.token= value;
        this.setState({config: c});
        this.props.onChange?.call(this, c);
    };

    render() {
        return (
            <Form isHorizontal autoComplete="on">
                <Title headingLevel="h4" size={TitleSizes.lg}>Openshift connection:</Title>
                <FormGroup label="Server" isRequired fieldId="server">
                    <TextInput className="text-field" isRequired type="text" id="server" name="server"
                               value={this.state.config.server} onChange={e => this.onChange('server', e)}/>
                </FormGroup>
                <FormGroup label="Namespace" isRequired fieldId="namespace">
                    <TextInput className="text-field" isRequired type="text" id="namespace"
                               name="namespace" value={this.state.config.namespace}
                               onChange={e => this.onChange('namespace', e)}/>
                </FormGroup>
                <FormGroup label="Token" isRequired fieldId="token">
                    <TextInput autoComplete="off" className="text-field" isRequired type="password"
                               id="token" name="token" value={this.state.config.token}
                               onChange={e => this.onChange('token', e)}/>
                </FormGroup>
            </Form>
        );
    }
}
