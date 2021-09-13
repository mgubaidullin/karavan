import React from 'react';
import {
    Form,
    FormGroup,
    TextInput,
    Text,
    Title,
    Popover,
    Switch,
    NumberInput,
    Button,
    TextArea, Tooltip, TextVariants
} from '@patternfly/react-core';
import '../karavan.css';
import "@patternfly/patternfly/patternfly.css";
import UndoIcon from "@patternfly/react-icons/dist/js/icons/backspace-icon";
import HelpIcon from "@patternfly/react-icons/dist/js/icons/help-icon";
import {Property} from "../model/KameletModels";
import {DslMetaApi} from "../api/DslMetaApi";
import {ComponentStep, ExpressionStep, OtherwiseStep, WhenStep} from "../model/RouteModels";
import {Integration} from "../model/IntegrationModels";
import {DslApi} from "../api/DslApi";
import {DslProperty} from "../model/DslMetaModel";
import {KameletApi} from "../api/KameletApi";

interface Props {
    integration: Integration,
    element?: any,
    onIntegrationUpdate?: any,
    onPropertyUpdate?: any,
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
        this.props.onPropertyUpdate?.call(this, clone);
    }

    onChangeWhen = (isDefault: boolean) => {
        if (isDefault) {
            const clone = new OtherwiseStep({...this.state.element, steps: this.state.element?.steps});
            clone.uid = this.state.element?.uid || '';
            this.props.onPropertyUpdate?.call(this, clone);
        } else {
            const clone = new WhenStep({...this.state.element, steps: this.state.element?.steps});
            clone.uid = this.state.element?.uid || '';
            this.props.onPropertyUpdate?.call(this, clone);
        }
    }

    getDslModelProperties = (): DslProperty[] => {
        const name = DslApi.getName(this.state.element);
        const model = DslMetaApi.findDslMetaModelByName(name)
        const properties: DslProperty[] = Object.entries(model.properties)
            .map((p: [string, any]) => {
                const props = p[1];
                return new DslProperty({
                    name: p[0],
                    type: props.type,
                    title: props.displayName,
                    description: props.description,
                    secret: props.secret
                });
            }).filter(p => !['object', 'array', "enum"].includes(p.type) && p.name !== 'id');
        return properties
    }

    getKameletProperties = (): Property[] => {
        const uri = DslApi.getUri(this.state.element)
        const kamelet = KameletApi.findKameletByUri(uri)
        return kamelet ? KameletApi.getKameletProperties(kamelet?.metadata.name) : []
    }

    showDslProperties = (): boolean => {
        const uri = DslApi.getUri(this.state.element)
        return !(uri !== undefined && uri.startsWith("kamelet"))
    }

    showKameletProperties = (): boolean => {
        const uri = DslApi.getUri(this.state.element)
        return (uri !== undefined && uri.startsWith("kamelet"))
    }

    propertyChanged = (fieldId: string, value: string | number | boolean | any) => {
        // console.log(fieldId)
        // console.log(value)
        const name = DslApi.getName(this.state.element)
        const clone = Object.assign({}, this.state.element)
        // console.log(this.state.element)
        // console.log(clone)
        clone[name].parameters[fieldId] = value
        this.setState({element: clone})
        this.props.onPropertyUpdate?.call(this, clone);
    };

    componentDidUpdate = (prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) => {
        if (prevProps.element !== this.props.element) {
            this.setState({element: this.props.element});
        }
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
                <FormGroup label="Name" fieldId="name">
                    <TextInput className="text-field" type="text" id="name" name="name" isReadOnly
                               value={this.state.integration.metadata.name}/>
                </FormGroup>
            </div>
        )
    }

    getComponentHeader = (): JSX.Element => {
        const name = DslApi.getName(this.state.element)
        const uri = DslApi.getUri(this.state.element)
        const title = DslMetaApi.getTitle(name, uri)
        return (
            <div className="headers">
                <Title headingLevel="h1" size="md">{title}</Title>
                <Text component={TextVariants.p}>{DslMetaApi.findDslMetaModelByName(name).description}</Text>
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

    createKameletProperty = (property: Property): JSX.Element => {
        const value = DslApi.getParameterValue(this.state.element, property.id);
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
                    value={value?.toString()}
                    onChange={e => this.propertyChanged(property.id, e)}/>
                }
                {property.type === 'boolean' && <Switch
                    id={property.id} name={property.id}
                    value={value?.toString()}
                    aria-label={property.id}
                    isChecked={Boolean(value) === true}
                    onChange={e => this.propertyChanged(property.id, !Boolean(value))}/>
                }
                {property.type === 'integer' && <div className="number">
                    <NumberInput
                        className="number-property"
                        id={property.id} name={property.id}
                        value={typeof value === 'number' ? value : undefined}
                        inputName={property.id}
                        onMinus={() => this.propertyChanged(property.id, typeof value === 'number' ? value - 1 : -1)}
                        onPlus={() => this.propertyChanged(property.id, typeof value === 'number' ? value + 1 : 1)}
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

    createDslProperty = (property: DslProperty): JSX.Element => {
        const value = DslApi.getParameterValue(this.state.element, property.name);
        return (
            <FormGroup
                key={property.name}
                label={property.title}
                fieldId={property.name}
                labelIcon={
                    <Popover
                        headerContent={property.title}
                        bodyContent={property.description}>
                        <button type="button" aria-label="More info" onClick={e => {e.preventDefault(); e.stopPropagation();}}
                                className="pf-c-form__group-label-help">
                            <HelpIcon noVerticalAlign/>
                        </button>
                    </Popover>
                }>
                {property.type === 'string' && <TextInput
                    className="text-field" isRequired
                    type={property.secret ? "password" : "text"}
                    id={property.name} name={property.name}
                    value={value?.toString()}
                    onChange={e => this.propertyChanged(property.name, e)}/>
                }
                {property.type === 'boolean' && <Switch
                    id={property.name} name={property.name}
                    value={this.state.element?.toString()}
                    aria-label={property.name}
                    isChecked={Boolean(value) === true}
                    onChange={e => this.propertyChanged(property.name, !Boolean(value))}/>
                }
                {property.type === 'integer' && <div className="number">
                    <NumberInput
                        className="number-property"
                        id={property.name} name={property.name}
                        value={typeof value === 'number' ? value : undefined}
                        inputName={property.name}
                        onMinus={() => this.propertyChanged(property.name, typeof value === 'number' ? value - 1 : -1)}
                        onPlus={() => this.propertyChanged(property.name, typeof value === 'number' ? value + 1 : 1)}
                        onChange={(e: any) => this.propertyChanged(property.name, Number(e.target.value))}/>
                    <Button
                        className="clear-button"
                        variant="tertiary"
                        isSmall icon={<UndoIcon/>}
                        onClick={e => this.propertyChanged(property.name, undefined)}/>
                </div>
                }
            </FormGroup>
        )
    }

    render() {
        return (
            <div key={this.state.element ? DslApi.getUid(this.state.element): 'integration'} className='properties'>
                <Form autoComplete="off">
                    {this.state.element === undefined && this.getIntegrationHeader()}
                    {this.state.element && this.getComponentHeader()}
                    {/*{this.state.element && ['filter', 'when', 'otherwise'].includes(this.state.element.type) && this.getExpressionHeader()}*/}

                    {/*Properties configurator */}
                    {this.state.element && this.showDslProperties() && this.getDslModelProperties().map((property: DslProperty) => this.createDslProperty(property))}
                    {this.state.element && this.showKameletProperties() && this.getKameletProperties().map((property: Property) => this.createKameletProperty(property))}
                </Form>
            </div>
        );
    }
};