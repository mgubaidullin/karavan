import React from 'react';
import {
    Text,
} from '@patternfly/react-core';
import AddIcon from "@patternfly/react-icons/dist/js/icons/plus-circle-icon";
import DeleteIcon from "@patternfly/react-icons/dist/js/icons/times-icon";
import '../karavan.css';
import { ModelProcessorDefinition} from "../model/DslModel";
import {DslApi} from "../api/DslApi";
import {DslMetaApi} from "../api/DslMetaApi";
import {DslSelector} from "./DslSelector";
import {DslMetaModel} from "../model/DslMetaModel";

interface Props<T> {
    processor: T
    index: number
    parentId:string
    updateStep: any
    deleteStep: any
}

interface State<T> {
    processor: T
    name: string
    id: string
    showSelector: boolean
}

export class ProcessorBuilder extends React.Component<Props<any>, State<any>> {

    public state: State<any> = {
        processor: this.props.processor,
        name: DslApi.getName(this.props.processor),
        id: "",
        showSelector: false
    };

    componentDidMount() {

    }

    addStep = (newStep: any) => {
        if (this.state.name === 'choice'){
            const clone:any = Object.assign(this.state.processor);
            console.log(clone)
            if (newStep['when'] !== undefined){
                clone['when'].push(...newStep);
            } else if (newStep['otherwise'] !== undefined){
                clone['otherwise'] = newStep;
            }
            this.props.updateStep.call(this, clone, this.state.id)
            this.setState({showSelector: false})
        } else {
            const step:any = {...this.state.processor}[this.state.name];
            const steps:any[] = [...step.steps]

            steps.push(newStep)
            step.steps = steps;

            const clone:any = Object.assign(this.state.processor);
            clone[this.state.name] = step;
            this.props.updateStep.call(this, clone, this.state.id)
            this.setState({showSelector: false})
        }
    }

    delete = (evt: React.MouseEvent) => {
        if (evt){
            this.props.deleteStep.call(this, this.state.id)
        }
    }

    showSelectorList = () => {
        this.setState({showSelector: true})
    }

    onDslSelect = (dsl: DslMetaModel) => {
        this.addStep(DslApi.createChildElement(dsl))
    }

    render() {
        return (
            <div className="processor-builder">
                <div className="header">
                    <img draggable="false"
                         src={DslMetaApi.getIcon(this.state.name)}
                         style={this.state.name === 'choice' ? {height: "18px"} : {}}  // find better icon
                         className="icon" alt="icon"></img>
                    <Text>{this.state.name}</Text>
                    <button type="button" aria-label="Delete" onClick={e => this.delete(e)}
                            className="delete-button">
                        <DeleteIcon noVerticalAlign/>
                    </button>
                </div>
                <div>
                    {DslApi.getElements(this.state.processor).map((processor, index) => (
                        <ProcessorBuilder updateStep={this.props.updateStep}
                                          deleteStep={this.props.deleteStep}
                                          parentId={this.state.id}
                                          index={index}
                                          key={this.state.id + index}
                                          processor={processor}/>
                    ))}
                    <button key={this.state.id+"-del"} type="button" aria-label="Add" onClick={this.showSelectorList} className="add-button">
                        <AddIcon noVerticalAlign/>
                    </button>
                    {this.state.name === 'choice' && this.state.processor.choice.otherwise &&
                        <ProcessorBuilder updateStep={this.props.updateStep}
                                          deleteStep={this.props.deleteStep}
                                          parentId={this.state.id}
                                          index={0}
                                          key={this.state.id}
                                          processor={this.state.processor.choice.otherwise}/>
                    }
                    {DslApi.getWhens(this.state.processor).map((processor, index) => (
                        <ProcessorBuilder updateStep={this.props.updateStep}
                                          deleteStep={this.props.deleteStep}
                                          parentId={this.state.id}
                                          index={index}
                                          key={this.state.id + index}
                                          processor={processor}/>
                    ))}
                </div>
                <DslSelector elementName={this.state.name} id={this.state.id} show={this.state.showSelector} onDslSelect={this.onDslSelect} />
            </div>
        );
    }
};