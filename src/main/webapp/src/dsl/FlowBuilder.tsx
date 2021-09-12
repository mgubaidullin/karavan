import React from 'react';
import {
    Text, Tooltip,
} from '@patternfly/react-core';
import '../karavan.css';
import {
    DslModelObject,
    DslYamlDeserializersRouteFromDefinitionDeserializer,
} from "../model/DslModel";
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

    addStep = (newStep: any) => {
        const step: any = {...this.state.flow}.from
        const steps: any[] = [...step.steps]

        steps.push(newStep)
        step.steps = steps;

        const clone: DslModelObject = {...this.state.flow} as DslModelObject;
        clone.from = {...step} as DslYamlDeserializersRouteFromDefinitionDeserializer;
        this.props.updateStep.call(this, clone, this.state.id)
        this.setState({showSelector: false})
    }

    showDslSelector = () => {
        this.setState({showSelector: true})
    }

    closeDslSelector = () => {
        this.setState({showSelector: false})
    }

    delete = (evt: React.MouseEvent) => {
        if (evt) {
            this.props.deleteStep.call(this, this.state.id)
        }
    }

    onDslSelect = (dsl: DslMetaModel) => {
        this.addStep(DslApi.createChildElement(dsl))
    }

    selectElement = (evt: React.MouseEvent) => {
        evt.stopPropagation();
        console.log(this.state.flow)
    }

    render() {
            return (
            <div className="flow-builder" onClick={event => this.selectElement(event)}>
                <div className="header">
                    <img draggable="false"
                         src={DslMetaApi.getIcon("from", this.state.flow.from?.uri)}
                         className="icon" alt="icon"></img>
                    <Text>{DslMetaApi.getTitle('from', this.state.flow.from?.uri)}</Text>
                    <button type="button" aria-label="Delete" onClick={e => this.delete(e)}
                            className="delete-button">
                        <DeleteIcon noVerticalAlign/>
                    </button>
                </div>
                <div className="steps">
                    {DslApi.getFromElements(this.state.flow.from).map((element, index) => (
                        <div>
                            <DslElement
                                deleteStep={this.props.deleteStep}
                                updateStep={this.props.updateStep}
                                key={DslApi.getUid(element)}
                                element={element}/>
                            {index < DslApi.getFromElements(this.state.flow.from).length - 1 &&
                            <img className={"arrow-down"} alt="arrow"
                                 src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' x='0' y='0' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512' xml:space='preserve' class=''%3E%3Cg transform='matrix(1,0,0,1,1.7053025658242404e-13,1.1368683772161603e-13)'%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cpath d='M374.108,373.328c-7.829-7.792-20.492-7.762-28.284,0.067L276,443.557V20c0-11.046-8.954-20-20-20 c-11.046,0-20,8.954-20,20v423.558l-69.824-70.164c-7.792-7.829-20.455-7.859-28.284-0.067c-7.83,7.793-7.859,20.456-0.068,28.285 l104,104.504c0.006,0.007,0.013,0.012,0.019,0.018c7.792,7.809,20.496,7.834,28.314,0.001c0.006-0.007,0.013-0.012,0.019-0.018 l104-104.504C381.966,393.785,381.939,381.121,374.108,373.328z' fill='%23e97826' data-original='%23000000' style='' class=''%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
                            />
                            }
                        </div>
                    ))}

                    <Tooltip position={"bottom"} content={ <div>{"Add element to From"}</div> }>
                        <button type="button" aria-label="Add" onClick={e => this.showDslSelector()}
                                className="add-button">
                            <AddIcon noVerticalAlign/>
                        </button>
                    </Tooltip>
                    <DslSelector elementName={"from"} id={this.state.id} show={this.state.showSelector} onDslSelect={this.onDslSelect} onClose={this.closeDslSelector}/>
                </div>
            </div>
        );
    }
};