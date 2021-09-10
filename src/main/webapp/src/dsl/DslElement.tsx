import React from 'react';
import {
    Text,
} from '@patternfly/react-core';
import AddIcon from "@patternfly/react-icons/dist/js/icons/plus-circle-icon";
import DeleteIcon from "@patternfly/react-icons/dist/js/icons/times-icon";
import '../karavan.css';
import {ModelProcessorDefinition} from "../model/DslModel";
import {DslApi} from "../api/DslApi";
import {DslMetaApi} from "../api/DslMetaApi";
import {DslSelector} from "./DslSelector";
import {DslMetaModel} from "../model/DslMetaModel";
import {v4 as uuidv4} from "uuid";

interface Props<T> {
    element: T
    updateStep: any
    deleteStep: any
    name?: string
}

interface State<T> {
    element: T
    name: string
    showSelector: boolean
}

export class DslElement extends React.Component<Props<any>, State<any>> {

    public state: State<any> = {
        element: this.props.element,
        name: this.props.name !== undefined ? this.props.name : DslApi.getName(this.props.element),
        showSelector: false
    };

    componentDidMount() {

    }

    delete = (evt: React.MouseEvent) => {
        if (evt) {
            this.props.deleteStep.call(this, DslApi.getUid(this.state.element))
        }
    }

    showSelectorList = () => {
        this.setState({showSelector: true})
    }

    addStep = (newStep: any) => {
        const step: any = {...this.state.element}[this.state.name];
        step.steps = [...step.steps]
        step.steps.push(newStep);
        const clone: any = Object.assign(this.state.element);

        clone[this.state.name] = step;
        this.props.updateStep.call(this, clone, DslApi.getUid(this.state.element))
        this.setState({showSelector: false})
    }

    addWhen = (newWhen: any) => {
        const choice: any = {...this.state.element}.choice;
        choice.when = [...choice.when, newWhen];

        const clone: any = Object.assign(this.state.element);
        clone.choice = choice;
        this.props.updateStep.call(this, clone, DslApi.getUid(this.state.element))
        this.setState({showSelector: false})
    }

    addOtherwise = (newOtherwise: any) => {
        if (!this.state.element.choice.hasOwnProperty('otherwise') || this.state.element.choice.otherwise === undefined) {
            const choice: any = {...this.state.element}.choice
            choice.otherwise = newOtherwise;
            const clone: any = Object.assign(this.state.element);
            clone.choice = choice;
            this.props.updateStep.call(this, clone, DslApi.getUid(this.state.element))
        }
        this.setState({showSelector: false})
    }

    addStepToOtherwise = (newStep: any) => {
        const step: any = Object.assign(this.state.element);
        console.log(step)
        step.otherwise.steps = [...step.otherwise.steps]
        step.otherwise.steps.push(newStep);
        this.props.updateStep.call(this, step, DslApi.getUid(this.state.element))
        this.setState({showSelector: false})
    }

    onDslSelect = (dsl: DslMetaModel) => {
        if (this.state.name === 'choice') {
            if (dsl.name === 'when') {
                this.addWhen(DslApi.createChildElement(dsl))
            } else if (dsl.name === 'otherwise') {
                this.addOtherwise(DslApi.createChildElement(dsl))
            }
        } else if (this.state.name === 'otherwise'){
            this.addStepToOtherwise(DslApi.createChildElement(dsl));
        } else if (DslMetaApi.isDslModelHasSteps(this.state.name)) {
            this.addStep(DslApi.createChildElement(dsl))
        }
    }

    render() {
        return (
            <div className={this.state.name + " element-builder"}>
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
                {DslMetaApi.isDslModelHasSteps(this.state.name) &&
                <div className="steps">
                    {DslApi.getElements(this.state.element).map((element, index) => (
                        <DslElement updateStep={this.props.updateStep}
                                    deleteStep={this.props.deleteStep}
                                    key={DslApi.getUid(element)}
                                    element={element}/>
                    ))}
                    {DslMetaApi.isDslModelHasSteps(this.state.name) &&
                    <button type="button" aria-label="Add" onClick={this.showSelectorList}
                            className="add-button">
                        <AddIcon noVerticalAlign/>
                    </button>
                    }
                </div>
                }
                {this.state.name === 'choice' &&
                <div className="whens">
                    {DslApi.getWhens(this.state.element).map((element, index) => (
                        <DslElement updateStep={this.props.updateStep}
                                    deleteStep={this.props.deleteStep}
                                    key={DslApi.getUid(element)}
                                    element={element}/>
                    ))}
                    {this.state.name === 'choice' && this.state.element.choice.otherwise !== undefined &&
                    <DslElement updateStep={this.props.updateStep}
                                deleteStep={this.props.deleteStep}
                                name={"otherwise"}
                                // key={DslApi.getUid(this.state.element.choice.otherwise)}
                                element={this.state.element.choice.otherwise}/>
                    }
                </div>
                }
                <DslSelector elementName={this.state.name} id={DslApi.getUid(this.state.element)} show={this.state.showSelector}
                             onDslSelect={this.onDslSelect}/>
            </div>
        );
    }
};