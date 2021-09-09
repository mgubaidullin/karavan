import React from 'react';
import {
    Button, Card, CardBody, CardHeader, Gallery, Modal,
    Popover, Tab, Tabs, TabTitleText,
    Text,
} from '@patternfly/react-core';
import '../karavan.css';
import {
    DslModelObject,
    DslYamlDeserializersRouteFromDefinitionDeserializer,
    ModelProcessorDefinition
} from "../model/DslModel";
import {ProcessorBuilder} from "./ProcessorBuilder";
import AddIcon from "@patternfly/react-icons/dist/js/icons/plus-circle-icon";
import {DslApi} from "../api/DslApi";
import DeleteIcon from "@patternfly/react-icons/dist/js/icons/times-icon";
import {DslMetaApi} from "../api/DslMetaApi";
import {DslSelector} from "./DslSelector";
import {DslMetaModel} from "../model/DslMetaModel";
import {DslElement} from "./DslElement";

interface Props {
    flow: DslModelObject,
    index: number
    updateStep: any
    deleteStep: any
}

interface State {
    flow: DslModelObject
    id: string
    showSelector: boolean
    tabIndex: string | number
}

export class FlowBuilder extends React.Component<Props, State> {

    public state: State = {
        flow: this.props.flow,
        id: DslApi.genFlowId(this.props.index),
        showSelector: false,
        tabIndex: 0
    };

    componentDidMount() {
    }

    addStep = (newStep: ModelProcessorDefinition) => {
        console.log(newStep)
        const step: any = {...this.state.flow}.from
        const steps: any[] = [...step.steps]

        steps.push(newStep)
        step.steps = steps;

        const clone: DslModelObject = {...this.state.flow} as DslModelObject;
        clone.from = {...step} as DslYamlDeserializersRouteFromDefinitionDeserializer;
        this.props.updateStep.call(this, clone, this.state.id)
        this.setState({showSelector: false})
    }

    showSelectorList = () => {
        this.setState({showSelector: true})
    }

    delete = (evt: React.MouseEvent) => {
        if (evt) {
            this.props.deleteStep.call(this, this.state.id)
        }
    }

    onDslSelect = (dsl: DslMetaModel) => {
        this.addStep(DslApi.createChildElement(dsl))
    }

    render() {
            return (
            <div className="flow-builder">
                <div className="header">
                    <img draggable="false"
                         src={DslMetaApi.getIcon("from", this.state.flow.from?.uri)}
                         className="icon" alt="icon"></img>
                    <Text>{"from: " + this.state.flow.from?.uri}</Text>
                    <button type="button" aria-label="Delete" onClick={e => this.delete(e)}
                            className="delete-button">
                        <DeleteIcon noVerticalAlign/>
                    </button>
                </div>
                <div>
                    {this.state.flow.from?.steps.map((processor, index) => (
                        <DslElement
                            deleteStep={this.props.deleteStep}
                            updateStep={this.props.updateStep}
                            parentId={this.state.id}
                            index={index}
                            key={this.state.id + index}
                            element={processor}/>
                    ))}
                        <button type="button" aria-label="Add" onClick={e => this.showSelectorList()}
                                className="add-button">
                            <AddIcon noVerticalAlign/>
                        </button>
                    <DslSelector elementName={"from"} id={this.state.id} show={this.state.showSelector} onDslSelect={this.onDslSelect} />
                </div>
            </div>
        );
    }
};