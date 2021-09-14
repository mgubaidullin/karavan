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
    TextVariants, Select, SelectVariant, SelectDirection, SelectOption, TextArea, SelectOptionObject
} from '@patternfly/react-core';
import '../karavan.css';
import "@patternfly/patternfly/patternfly.css";
import UndoIcon from "@patternfly/react-icons/dist/js/icons/backspace-icon";
import HelpIcon from "@patternfly/react-icons/dist/js/icons/help-icon";
import {Property} from "../model/KameletModels";
import {DslMetaApi} from "../api/DslMetaApi";
import {Integration} from "../model/IntegrationModels";
import {DslApi} from "../api/DslApi";
import {DslLanguage, DslProperty} from "../model/DslMetaModel";
import {DslPropertiesUtil} from "./DslPropertiesUtils";
import {CodeEditor, Language} from "@patternfly/react-code-editor";

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
    selectStatus: Map<string, boolean>
}

export class DslProperties extends React.Component<Props, State> {

    public state: State = {
        element: this.props.element,
        integration: this.props.integration,
        selectStatus: new Map<string, boolean>()
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

    propertyChanged = (fieldId: string, value: string | number | boolean | any, prefix?: string, unique?: boolean) => {
        const name = DslApi.getName(this.state.element)
        const clone = Object.assign({}, this.state.element)
        if (prefix !== undefined) {
            if (!clone[name][prefix] || unique) clone[name][prefix] = {}
            clone[name][prefix][fieldId] = value
        } else {
            clone[name][fieldId] = value
        }
        this.setState({element: clone, selectStatus: new Map<string, boolean>()})
        this.props.onPropertyUpdate?.call(this, clone);
    };

    componentDidUpdate = (prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) => {
        if (prevProps.element !== this.props.element) {
            this.setState({element: this.props.element});
        }
    }

    openSelect = (propertyName: string) => {
        this.setState({selectStatus: new Map<string, boolean>([[propertyName, true]])});
    }

    isSelectOpen = (propertyName: string): boolean => {
        return this.state.selectStatus.has(propertyName) && this.state.selectStatus.get(propertyName) === true;
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

    createKameletProperty = (property: Property): JSX.Element => {
        const prefix = "parameters";
        const id = prefix + "-" + property.id;
        const value = DslApi.getParametersValue(this.state.element, property.id);
        return (
            <FormGroup
                key={id}
                label={property.title}
                fieldId={id}
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
                    id={id} name={id}
                    value={value?.toString()}
                    onChange={e => this.propertyChanged(property.id, e, prefix)}/>
                }
                {property.type === 'boolean' && <Switch
                    id={id} name={id}
                    value={value?.toString()}
                    aria-label={id}
                    isChecked={Boolean(value) === true}
                    onChange={e => this.propertyChanged(property.id, !Boolean(value), prefix)}/>
                }
                {['integer', 'int', 'number'].includes(property.type) && <div className="number">
                    <NumberInput
                        className="number-property"
                        id={id} name={id}
                        value={typeof value === 'number' ? value : undefined}
                        inputName={id}
                        onMinus={() => this.propertyChanged(property.id, typeof value === 'number' ? value - 1 : -1, prefix)}
                        onPlus={() => this.propertyChanged(property.id, typeof value === 'number' ? value + 1 : 1, prefix)}
                        onChange={(e: any) => this.propertyChanged(property.id, Number(e.target.value), prefix)}/>
                    <Button
                        className="clear-button"
                        variant="tertiary"
                        isSmall icon={<UndoIcon/>}
                        onClick={e => this.propertyChanged(property.id, undefined, prefix)}/>
                </div>
                }
            </FormGroup>
        )
    }

    createExpressionProperty = (property: DslProperty): JSX.Element => {
        const prefix = "language";
        const language = DslApi.getExpressionLanguage(this.state.element);
        const dslLanguage = DslPropertiesUtil.getExpressionLanguages().find(l => l.name === language);
        const value = language ? DslApi.getExpressionValue(this.state.element, property.name)[language] : undefined;
        const selectOptions: JSX.Element[] = []
        selectOptions.push(<SelectOption key={'placeholder'} value={"Select language"} isPlaceholder/>);
        DslPropertiesUtil.getExpressionLanguages().forEach((lang: DslLanguage) => {
            const s = <SelectOption key={lang.name} value={lang} description={lang.description} />;
            selectOptions.push(s);
        })

        return (
            <div>
                <FormGroup key={prefix + "-" + property.name} fieldId={property.name}>
                    <Select
                        variant={SelectVariant.typeahead}
                        aria-label={property.name}
                        onToggle={isExpanded => {
                            this.openSelect(property.name)
                        }}
                        onSelect={(e, lang, isPlaceholder) => this.propertyChanged(DslLanguage.getName(lang as DslLanguage), (!isPlaceholder ? value : undefined), property.name, true)}
                        selections={dslLanguage}
                        isOpen={this.isSelectOpen(property.name)}
                        aria-labelledby={property.name}
                        direction={SelectDirection.down}
                    >
                        {selectOptions}
                    </Select>
                </FormGroup>
                <FormGroup
                    key={property.name}
                    fieldId={property.name}
                    labelIcon={property.description ?
                        <Popover
                            headerContent={property.title}
                            bodyContent={property.description}>
                            <button type="button" aria-label="More info" onClick={e => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                                    className="pf-c-form__group-label-help">
                                <HelpIcon noVerticalAlign/>
                            </button>
                        </Popover> : <div></div>
                    }>
                    <TextArea
                        autoResize
                        className="text-field" isRequired
                        type={"text"}
                        id={property.name} name={property.name}
                        height={"100px"}
                        value={value?.toString()}
                        onChange={e => this.propertyChanged(language, e, property.name, true)}/>
                </FormGroup>
            </div>
        )
    }

    createElementProperty = (property: DslProperty): JSX.Element => {
        const value = DslApi.getPropertyValue(this.state.element, property.name);
        const selectOptions: JSX.Element[] = []
        if (property.type === 'enum') {
            selectOptions.push(<SelectOption key={0} value={"Select " + property.name} isPlaceholder/>);
            selectOptions.push(...property.enum.map((value: string) => <SelectOption key={value} value={value}/>));
        }
        return (
            <FormGroup
                key={property.name}
                label={property.title}
                fieldId={property.name}
                labelIcon={property.description ?
                    <Popover
                        headerContent={property.title}
                        bodyContent={property.description}>
                        <button type="button" aria-label="More info" onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                                className="pf-c-form__group-label-help">
                            <HelpIcon noVerticalAlign/>
                        </button>
                    </Popover> : <div></div>
                }>
                {['string', 'duration'].includes(property.type) && <TextInput
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

                {property.type === 'enum' &&
                <Select
                    variant={SelectVariant.single}
                    aria-label={property.name}
                    onToggle={isExpanded => {
                        this.openSelect(property.name)
                    }}
                    onSelect={(e, value, isPlaceholder) => this.propertyChanged(property.name, (!isPlaceholder ? value : undefined))}
                    selections={value}
                    isOpen={this.isSelectOpen(property.name)}
                    aria-labelledby={property.name}
                    direction={SelectDirection.down}
                >
                    {selectOptions}
                </Select>
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
                <div className="expression">
                    {property.name === 'expression' && property.type === 'object'
                    && this.createExpressionProperty(property)}
                </div>
                <div className="parameters">
                    {property.name === 'parameters' && DslPropertiesUtil.isKameletComponent(this.state.element)
                    && DslPropertiesUtil.getKameletProperties(this.state.element).map(kp => this.createKameletProperty(kp))}
                </div>
            </FormGroup>
        )
    }

    render() {
        return (
            <div key={this.state.element ? DslApi.getUid(this.state.element) : 'integration'} className='properties'>
                <Form autoComplete="off">
                    {this.state.element === undefined && this.getIntegrationHeader()}
                    {this.state.element && this.getComponentHeader()}
                    {this.state.element && DslPropertiesUtil.getElementProperties(this.state.element).map((property: DslProperty) => this.createElementProperty(property))}
                </Form>
            </div>
        );
    }
};