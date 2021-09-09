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
    element: T
    index: number
    parentId:string
    updateStep: any
    deleteStep: any
}

interface State<T> {
    element: T
    name: string
    id: string
    showSelector: boolean
}

export class DslElement extends React.Component<Props<any>, State<any>> {

    public state: State<any> = {
        element: this.props.element,
        name: DslApi.getName(this.props.element),
        id: DslApi.genStepId(this.props.parentId, this.props.index, this.props.element),
        showSelector: false
    };

    componentDidMount() {

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
        // this.addStep(DslApi.createChildElement(dsl))
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
                    {DslMetaApi.isDslModelHasSteps(this.state.name) && DslApi.getSteps(this.state.element).map((element, index) => (
                        <DslElement updateStep={this.props.updateStep}
                                          deleteStep={this.props.deleteStep}
                                          parentId={this.state.id}
                                          index={index}
                                          key={this.state.id + index}
                                          element={element}/>
                    ))}
                    {DslMetaApi.isDslModelHasSteps(this.state.name) &&
                    <button key={this.state.id+"-del"} type="button" aria-label="Add" onClick={this.showSelectorList} className="add-button">
                        <AddIcon noVerticalAlign/>
                    </button>
                    }
                </div>
                <DslSelector elementName={this.state.name} id={this.state.id} show={this.state.showSelector} onDslSelect={this.onDslSelect} />
            </div>
        );
    }
};