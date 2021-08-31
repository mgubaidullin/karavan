import React, {useState, useEffect, FC} from 'react';
import {
    Form,
    FormGroup,
    TextInput,
    Title,
    Popover,
    Switch,
    NumberInput,
    Button,
    CodeBlockCode, CodeBlock, TextArea, Tooltip, ToggleGroupItem, ToggleGroup
} from '@patternfly/react-core';
import '../karavan.css';
import "@patternfly/patternfly/patternfly.css";
import {ComponentStep, EmptyStep, ExpressionStep, OtherwiseStep, RouteStep, WhenStep} from "../model/RouteModels";
import {RouteStepApi} from "../api/RouteStepApi";
import {Integration} from "../model/IntegrationModels";
import UndoIcon from "@patternfly/react-icons/dist/js/icons/backspace-icon";
import HelpIcon from "@patternfly/react-icons/dist/js/icons/help-icon";
import {Property} from "../model/KameletModels";

interface Props {
    integration: Integration,
    step?: RouteStep,
    onIntegrationUpdate?: any,
    onStepUpdate?: any,
    view: "design" | "code",
    onChangeView: any
}

interface State {
    integration: Integration,
    step?: RouteStep,
}

export class RouteStepProperties extends React.Component<Props, State> {

    public state: State = {
        step: this.props.step,
        integration: this.props.integration
    };

    setView = (view: string) => {
        this.props.onChangeView.call(this, view);
    }
    onIntegrationChange = (field: string, value: string) => {
        let clone = new Integration({...this.state.integration});
        if (field === 'name') clone.metadata.name = value;
        if (field === 'title') clone.metadata.annotations["camel.apache.org/integration.title"] = value;
        this.props.onIntegrationUpdate?.call(this, clone);
    };

    onChange = (field: string, value: string) => {
        const clone = this.state.step;
        if (field === 'simple') (clone as ExpressionStep).simple = value;
        this.props.onStepUpdate?.call(this, clone);
    }
    onChangeWhen = (isDefault: boolean) => {
        if (isDefault) {
            const clone = new OtherwiseStep({...this.state.step, steps: this.state.step?.steps});
            clone.uid = this.state.step?.uid || '';
            this.props.onStepUpdate?.call(this, clone);
        } else {
            const clone = new WhenStep({...this.state.step, steps: this.state.step?.steps});
            clone.uid = this.state.step?.uid || '';
            this.props.onStepUpdate?.call(this, clone);
        }
    };

    propertyChanged = (fieldId: string, value: string | number | boolean | any) => {
        if (this.state.step && ['from', 'to'].includes(this.state.step.type)) {
            const c: ComponentStep = (this.state.step as ComponentStep);
            const index: number = c.properties.findIndex((x: Property) => x.id === fieldId);
            const p: Property = c.properties[index];
            p.value = value;
            c.properties[index] = p;
            const clone: ComponentStep = Object.assign({}, c);
            this.props.onStepUpdate?.call(this, clone);
        }
    };

    componentDidUpdate = (prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) => {
        if (prevProps.step?.uid !== this.props.step?.uid || prevProps.step?.type !== this.props.step?.type) {
            this.setState({step: this.props.step});
        }
    }

    getIntegrationHeader = (): JSX.Element => {
        return (
            <div className="headers">
                <Title headingLevel="h1" size="md">Integration</Title>
                <FormGroup label="Name" fieldId="name">
                    <TextInput className="text-field" type="text" id="name" name="name"
                               value={this.state.integration.metadata.name}
                               onChange={e => this.onIntegrationChange('name', e)}/>
                </FormGroup>
                <FormGroup label="Title" fieldId="title">
                    <TextInput className="text-field" type="text" id="title" name="title"
                               value={this.state.integration.metadata.annotations["camel.apache.org/integration.title"]}
                               onChange={e => this.onIntegrationChange('title', e)}/>
                </FormGroup>
            </div>
        )
    }

    getIntegrationFooter = (): JSX.Element => {
        return (
            <div className="footer">
                <ToggleGroup isCompact aria-label="Switch view" className="toggle">
                    <ToggleGroupItem text="Design" buttonId="design" isSelected={this.props.view === 'design'}
                                     onChange={e => this.setView('design')}/>
                    <ToggleGroupItem text="YAML" buttonId="yaml" isSelected={this.props.view === 'code'}
                                     onChange={e => this.setView('code')}/>
                </ToggleGroup>
            </div>
        )
    }

    getComponentHeader = (): JSX.Element => {
        return (
            <div className="headers">
                <Title headingLevel="h1"
                       size="md">{this.state.step ? RouteStepApi.getStepCaption(this.state.step) : ''}</Title>
                <FormGroup label="Component" fieldId="name">
                    <TextInput className="text-field" isReadOnly type="text" id="component" name="component"
                               value={(this.state.step as ComponentStep)?.component}
                               onChange={e => this.onChange('component', e)}/>
                </FormGroup>
                <FormGroup label="Path" fieldId="title">
                    <TextInput className="text-field" isReadOnly type="text" id="path" name="path"
                               value={(this.state.step as ComponentStep)?.path}
                               onChange={e => this.onChange('path', e)}/>
                </FormGroup>
            </div>
        )
    }

    getExpressionTooltip = (): string => {
        return this.state.step?.type === 'when' ? "Check to make default" : "Uncheck to make conditional";
    }

    getExpressionHeader = (): JSX.Element => {
        return (
            <div className="headers">
                {this.state.step && !['when', 'otherwise'].includes(this.state.step.type) &&
                <Title headingLevel="h1"
                       size="md">{this.state.step ? RouteStepApi.getStepCaption(this.state.step) : ''}</Title>}

                {this.state.step && ['when', 'otherwise'].includes(this.state.step.type) &&
                <Tooltip position="bottom"
                         content={<div>{this.getExpressionTooltip()}</div>}>
                    <Switch
                        id="type"
                        label="Otherwise"
                        labelOff="When"
                        isReversed
                        className="expression-title"
                        isChecked={this.state.step.type === 'otherwise'}
                        onChange={checked => this.onChangeWhen(checked)}
                    />
                </Tooltip>
                }

                {this.state.step && 'otherwise' !== this.state.step.type &&
                <FormGroup label="Condition" fieldId="name">
                    <TextArea className="text-area" type="text" id="simple" name="simple" autoResize
                              value={(this.state.step as ExpressionStep)?.simple}
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
            <div key={this.state.step?.uid} className='properties'>
                <Form autoComplete="off">
                    {this.state.step === undefined && this.getIntegrationHeader()}
                    {this.state.step && ['from', 'to'].includes(this.state.step.type) && this.getComponentHeader()}
                    {this.state.step && ['filter', 'when', 'otherwise'].includes(this.state.step.type) && this.getExpressionHeader()}

                    {/* Properties configurator */}
                    {this.state.step && (this.state.step as ComponentStep).properties?.map((property: Property) => this.getProperties(property))}
                </Form>
                {this.state.step === undefined && this.getIntegrationFooter()}
            </div>
        );
    }
};