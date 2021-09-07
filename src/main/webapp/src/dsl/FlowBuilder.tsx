import React from 'react';
import {
    Popover,
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

interface Props {
    flow: DslModelObject,
    index: number
    updateStep: any
    deleteStep: any
}

interface State {
    flow: DslModelObject
    id: string
    showStep: boolean
}

export class FlowBuilder extends React.Component<Props, State> {

    public state: State = {
        flow: this.props.flow,
        id: DslApi.genFlowId(this.props.index),
        showStep: false
    };

    componentDidMount() {
    }

    addStep = () => {
        const step: any = {...this.state.flow}.from
        const steps: any[] = [...step.steps]

        const choice: ModelProcessorDefinition = {choice: {when: [], otherwise: {steps: []}}}

        steps.push(choice)
        step.steps = steps;

        const clone: DslModelObject = {...this.state.flow} as DslModelObject;
        clone.from = {...step} as DslYamlDeserializersRouteFromDefinitionDeserializer;
        this.props.updateStep.call(this, clone, this.state.id)
    }

    showStepList = () => {
        this.setState({showStep: true})
    }

    delete = (evt: React.MouseEvent) => {
        if (evt) {
            console.log("click delete " + this.state.id)
            this.props.deleteStep.call(this, this.state.id)
        }
    }

    render() {
        return (
            <div className="flow-builder">
                <div className="header">
                    <img draggable="false"
                         src={DslApi.getIcon("from", this.state.flow.from?.uri)}
                         className="icon" alt="icon"></img>
                    <Text>{"from: " + this.state.flow.from?.uri}</Text>
                    <button type="button" aria-label="Delete" onClick={e => this.delete(e)}
                            className="delete-button">
                        <DeleteIcon noVerticalAlign/>
                    </button>
                </div>
                <div>
                    {this.state.flow.from?.steps.map((processor, index) => (
                        <ProcessorBuilder
                            deleteStep={this.props.deleteStep}
                            updateStep={this.props.updateStep}
                            parentId={this.state.id}
                            index={index}
                            key={this.state.id + index}
                            processor={processor}/>
                    ))}
                    <Popover
                        aria-label="Add step popover"
                        position={"auto"}
                        hideOnOutsideClick={false}
                        isVisible={this.state.showStep}
                        shouldClose={tip => this.setState({showStep:false})}
                        shouldOpen={tip => this.setState({showStep:true})}
                        appendTo={() => document.body}
                        headerContent={<div>Select step</div>}
                        bodyContent={
                            <div>
                                {DslApi.getAvailableSteps().map((step, index) => (
                                    <Text>{step}</Text>
                                ))}
                            </div>
                        }
                        footerContent="Popover footer"
                    >
                        <button type="button" aria-label="Add" onClick={e => this.showStepList()}
                                className="add-button">
                            <AddIcon noVerticalAlign/>
                        </button>
                    </Popover>
                </div>
            </div>
        );
    }
};