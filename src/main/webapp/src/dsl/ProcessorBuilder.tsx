import React from 'react';
import {
    Text,
} from '@patternfly/react-core';
import AddIcon from "@patternfly/react-icons/dist/js/icons/plus-circle-icon";
import DeleteIcon from "@patternfly/react-icons/dist/js/icons/times-icon";
import '../karavan.css';
import { ModelProcessorDefinition} from "../model/DslModel";
import {DslApi} from "../api/DslApi";

interface Props {
    processor: ModelProcessorDefinition
    index: number
    parentId:string
    updateStep: any
    deleteStep: any
}

interface State {
    processor: ModelProcessorDefinition
    name: string
    id: string
}

export class ProcessorBuilder extends React.Component<Props, State> {

    public state: State = {
        processor: this.props.processor,
        name: DslApi.getName(this.props.processor),
        id: DslApi.genStepId(this.props.parentId, this.props.index, this.props.processor)
    };

    componentDidMount() {

    }

    addStep = () => {
        const step:any = {...this.state.processor}[this.state.name];
        const steps:any[] = [...step.steps]

        const choice: ModelProcessorDefinition = {choice:{when:[], otherwise:{steps:[]}}}

        steps.push(choice)
        step.steps = steps;

        const clone:any = Object.assign(this.state.processor);
        clone[this.state.name] = step;
        this.props.updateStep.call(this, clone, this.state.id)
    }

    delete = (evt: React.MouseEvent) => {
        if (evt){
            this.props.deleteStep.call(this, this.state.id)
        }
    }

    render() {
        return (
            <div className="processor-builder">
                <div className="header">
                    <img draggable="false"
                         src={DslApi.getIcon(this.state.name)}
                         style={this.state.name === 'choice' ? {height: "18px"} : {}}  // find better icon
                         className="icon" alt="icon"></img>
                    <Text>{this.state.name}</Text>
                    <button type="button" aria-label="Delete" onClick={e => this.delete(e)}
                            className="delete-button">
                        <DeleteIcon noVerticalAlign/>
                    </button>
                </div>
                <div>
                    {DslApi.getSteps(this.state.processor).map((processor, index) => (
                        <ProcessorBuilder updateStep={this.props.updateStep}
                                          deleteStep={this.props.deleteStep}
                                          parentId={this.state.id}
                                          index={index}
                                          key={this.state.id + index}
                                          processor={processor}/>
                    ))}
                    {DslApi.hasSteps(this.state.processor) &&
                    <button key={this.state.id+"-del"} type="button" aria-label="Add" onClick={e => this.addStep()} className="add-button">
                        <AddIcon noVerticalAlign/>
                    </button>
                    }
                </div>
            </div>
        );
    }
};