import React from 'react';
import {
    Form,
    FormGroup,
    TextInput,
    Title,
    Popover,
    Switch,
    NumberInput,
    Button,
    TextArea, Tooltip
} from '@patternfly/react-core';
import '../karavan.css';
import "@patternfly/patternfly/patternfly.css";
import UndoIcon from "@patternfly/react-icons/dist/js/icons/backspace-icon";
import HelpIcon from "@patternfly/react-icons/dist/js/icons/help-icon";
import {Property} from "../model/KameletModels";
import {DslMetaApi} from "../api/DslMetaApi";
import {ComponentStep, ExpressionStep, OtherwiseStep, WhenStep} from "../model/RouteModels";
import {DslApi} from "../api/DslApi";
import {Integration} from "../model/IntegrationModels";
import {RouteStepApi} from "../api/RouteStepApi";

interface Props {
    integration: Integration,
    element?: any,
    onIntegrationUpdate?: any,
    onStepUpdate?: any,
    onChangeView: any
}

interface State {
    integration: Integration,
    element?: any,
}

export class DslProperties extends React.Component<Props, State> {

    public state: State = {
        element: this.props.element,
        integration: this.props.integration
    };

    setView = (view: string) => {
        this.props.onChangeView.call(this, view);
    }

    onIntegrationChange = (field: string, value: string) => {
        let clone = new Integration({...this.state.integration});
        if (field === 'title') {
            clone.metadata.name = DslMetaApi.nameFomTitle(value);
            this.props.onIntegrationUpdate?.call(this, clone);
        }
    };

    onChange = (field: string, value: string) => {
        const clone = this.state.element;
        if (field === 'simple') (clone as ExpressionStep).simple = value;
        this.props.onStepUpdate?.call(this, clone);
    }

    onChangeWhen = (isDefault: boolean) => {
        if (isDefault) {
            const clone = new OtherwiseStep({...this.state.element, steps: this.state.element?.steps});
            clone.uid = this.state.element?.uid || '';
            this.props.onStepUpdate?.call(this, clone);
        } else {
            const clone = new WhenStep({...this.state.element, steps: this.state.element?.steps});
            clone.uid = this.state.element?.uid || '';
            this.props.onStepUpdate?.call(this, clone);
        }
    };

    propertyChanged = (fieldId: string, value: string | number | boolean | any) => {
        if (this.state.element && ['from', 'to'].includes(this.state.element.type)) {
            const c: ComponentStep = (this.state.element as ComponentStep);
            const index: number = c.properties.findIndex((x: Property) => x.id === fieldId);
            const p: Property = c.properties[index];
            p.value = value;
            c.properties[index] = p;
            const clone: ComponentStep = Object.assign({}, c);
            this.props.onStepUpdate?.call(this, clone);
        }
    };

    componentDidUpdate = (prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) => {
        // if (prevProps.element?.uid !== this.props.element?.uid || prevProps.element?.type !== this.props.element?.type) {
        //     this.setState({element: this.props.element});
        // }
        // if (prevState.name !== this.props.name) {
        //     this.setState({name: this.props.name});
        // }
        // console.log("from " + this.state.name + ", to " + this.props.name)
    }

    getIntegrationHeader = (): JSX.Element => {
        return (
            <div className="headers">
                <Title headingLevel="h1" size="md">Integration</Title>
                <FormGroup label="Title" fieldId="title">
                    <TextInput className="text-field" type="text" id="title" name="title"
                               value={
                                   DslMetaApi.titleFromName(this.state.integration.metadata.name)
                               }
                               onChange={e => this.onIntegrationChange('title', e)}/>
                </FormGroup>
                <FormGroup label="Name" fieldId="name" >
                    <TextInput className="text-field" type="text" id="name" name="name" isReadOnly
                               value={this.state.integration.metadata.name}/>
                </FormGroup>
            </div>
        )
    }

    getComponentHeader = (): JSX.Element => {
        return (
            <div className="headers">
                <Title headingLevel="h1"
                       size="md">{this.state.element ? DslMetaApi.getTitle(this.state.element) : ''}</Title>
                <FormGroup label="Component" fieldId="name">
                    <TextInput className="text-field" isReadOnly type="text" id="component" name="component"
                               value={(this.state.element as ComponentStep)?.component}
                               onChange={e => this.onChange('component', e)}/>
                </FormGroup>
                <FormGroup label="Path" fieldId="title">
                    <TextInput className="text-field" isReadOnly type="text" id="path" name="path"
                               value={(this.state.element as ComponentStep)?.path}
                               onChange={e => this.onChange('path', e)}/>
                </FormGroup>
            </div>
        )
    }

    getExpressionTooltip = (): string => {
        return this.state.element?.type === 'when' ? "Check to make default" : "Uncheck to make conditional";
    }

    getExpressionHeader = (): JSX.Element => {
        return (
            <div className="headers">
                {this.state.element && !['when', 'otherwise'].includes(this.state.element.type) &&
                <Title headingLevel="h1"
                       size="md">{this.state.element ? DslMetaApi.getTitle(this.state.element) : ''}</Title>}

                {this.state.element && ['when', 'otherwise'].includes(this.state.element.type) &&
                <Tooltip position="bottom"
                         content={<div>{this.getExpressionTooltip()}</div>}>
                    <Switch
                        id="type"
                        label="Otherwise"
                        labelOff="When"
                        isReversed
                        className="expression-title"
                        isChecked={this.state.element.type === 'otherwise'}
                        onChange={checked => this.onChangeWhen(checked)}
                    />
                </Tooltip>
                }

                {this.state.element && 'otherwise' !== this.state.element.type &&
                <FormGroup label="Condition" fieldId="name">
                    <TextArea className="text-area" type="text" id="simple" name="simple" autoResize
                              value={(this.state.element as ExpressionStep)?.simple}
                              onChange={e => this.onChange('simple', e)}/>
                </FormGroup>
                }
            </div>
        )
    }

    getProperties = (property: Property): JSX.Element => {
        return (
            <FormGroup
                key={property.id}
                label={property.title}
                fieldId={property.id}
                labelIcon={
                    <Popover
                        headerContent={property.title}
                        bodyContent={property.description}
                        footerContent={property.example ? "Example: " + property.example : undefined}>
                        <button type="button" aria-label="More info" onClick={e => e.preventDefault()}
                                className="pf-c-form__group-label-help">
                            <HelpIcon noVerticalAlign/>
                        </button>
                    </Popover>
                }>
                {property.type === 'string' && <TextInput
                    className="text-field" isRequired
                    type={property.format === 'password' ? "password" : "text"}
                    id={property.id} name={property.id}
                    value={property.value?.toString()}
                    onChange={e => this.propertyChanged(property.id, e)}/>
                }
                {property.type === 'boolean' && <Switch
                    id={property.id} name={property.id}
                    value={property.value?.toString()}
                    aria-label={property.id}
                    isChecked={Boolean(property.value) === true}
                    onChange={e => this.propertyChanged(property.id, !Boolean(property.value))}/>
                }
                {property.type === 'integer' && <div className="number">
                    <NumberInput
                        className="number-property"
                        id={property.id} name={property.id}
                        value={typeof property.value === 'number' ? property.value : undefined}
                        inputName={property.id}
                        onMinus={() => this.propertyChanged(property.id, typeof property.value === 'number' ? property.value - 1 : -1)}
                        onPlus={() => this.propertyChanged(property.id, typeof property.value === 'number' ? property.value + 1 : 1)}
                        onChange={(e: any) => this.propertyChanged(property.id, Number(e.target.value))}/>
                    <Button
                        className="clear-button"
                        variant="tertiary"
                        isSmall icon={<UndoIcon/>}
                        onClick={e => this.propertyChanged(property.id, undefined)}/>
                </div>
                }
            </FormGroup>
        )
    }

    render() {
        return (
            <div className='properties'>
                <Form autoComplete="off">
                    {this.state.element === undefined && this.getIntegrationHeader()}
                    {/*{this.state.element && ['from', 'to'].includes(this.state.element.type) && this.getComponentHeader()}*/}
                    {/*{this.state.element && ['filter', 'when', 'otherwise'].includes(this.state.element.type) && this.getExpressionHeader()}*/}

                    {/* Properties configurator */}
                    {/*{this.state.element && (this.state.element as ComponentStep).properties?.map((property: Property) => this.getProperties(property))}*/}
                </Form>
            </div>
        );
    }
};