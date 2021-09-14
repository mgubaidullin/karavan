import React from 'react';
import {
    Card, CardBody, CardFooter, CardHeader,
    Text, Tooltip,
} from '@patternfly/react-core';
import AddIcon from "@patternfly/react-icons/dist/js/icons/plus-circle-icon";
import DeleteIcon from "@patternfly/react-icons/dist/js/icons/times-icon";
import '../karavan.css';
import {DslApi} from "../api/DslApi";
import {DslMetaApi} from "../api/DslMetaApi";
import {DslSelector} from "./DslSelector";
import {DslMetaModel} from "../model/DslMetaModel";

interface Props<T> {
    element: T
    updateElement: any
    deleteElement: any
    selectElement: any
    name?: string
    selectedUid: string
}

interface State<T> {
    element: T
    name: string
    showSelector: boolean
    selectedUid: string
}

export class DslElement extends React.Component<Props<any>, State<any>> {

    public state: State<any> = {
        element: this.props.element,
        name: this.props.name !== undefined ? this.props.name : DslApi.getName(this.props.element),
        showSelector: false,
        selectedUid: this.props.selectedUid
    };

    componentDidMount() {

    }

    componentWillReceiveProps =() => {

    }

    componentDidUpdate = (prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) => {
        if (prevProps.selectedUid !== this.props.selectedUid) {
            this.setState({selectedUid: this.props.selectedUid});
        }
    }

    delete = (evt: React.MouseEvent) => {
        evt.stopPropagation()
        this.props.deleteElement.call(this, DslApi.getUid(this.state.element))
    }

    showDslSelector = (evt: React.MouseEvent) => {
        evt.stopPropagation()
        this.setState({showSelector: true})
    }

    closeDslSelector = () => {
        this.setState({showSelector: false})
    }

    addStep = (newStep: any) => {
        const step: any = {...this.state.element}[this.state.name];
        step.steps = [...step.steps]
        step.steps.push(newStep);
        const clone: any = Object.assign(this.state.element);

        clone[this.state.name] = step;
        this.props.updateElement.call(this, clone, newStep)
        this.setState({showSelector: false})
    }

    addWhen = (newWhen: any) => {
        const choice: any = {...this.state.element}.choice;
        choice.when = [...choice.when, newWhen];

        const clone: any = Object.assign(this.state.element);
        clone.choice = choice;
        this.props.updateElement.call(this, clone, newWhen)
        this.setState({showSelector: false})
    }

    addOtherwise = (newOtherwise: any) => {
        if (!this.state.element.choice.hasOwnProperty('otherwise') || this.state.element.choice.otherwise === undefined) {
            const choice: any = {...this.state.element}.choice
            choice.otherwise = newOtherwise;
            const clone: any = Object.assign(this.state.element);
            clone.choice = choice;
            this.props.updateElement.call(this, clone, newOtherwise)
        }
        this.setState({showSelector: false})
    }

    addStepToOtherwise = (newStep: any) => {
        const step: any = Object.assign(this.state.element);
        step.otherwise.steps = [...step.otherwise.steps]
        step.otherwise.steps.push(newStep);
        this.props.updateElement.call(this, step, newStep)
        this.setState({showSelector: false})
    }

    onDslSelect = (dsl: DslMetaModel) => {
        if (this.state.name === 'choice') {
            if (dsl.name === 'when') {
                this.addWhen(DslApi.createChildElement(dsl))
            } else if (dsl.name === 'otherwise') {
                this.addOtherwise(DslApi.createChildElement(dsl))
            }
        } else if (this.state.name === 'otherwise') {
            this.addStepToOtherwise(DslApi.createChildElement(dsl));
        } else if (DslMetaApi.isDslModelHasSteps(this.state.name)) {
            this.addStep(DslApi.createChildElement(dsl))
        }
    }

    selectElement = (evt: React.MouseEvent) => {
        evt.stopPropagation();
        this.props.selectElement.call(this, this.state.element);
    }

    isSelected = (): boolean => {
        return this.state.selectedUid === DslApi.getUid(this.state.element);
    }

    render() {
        return (
            <div className={this.state.name + " element-builder "}
                 style={{borderWidth: this.isSelected() ? "2px" : "1px"}}
                 onClick={event => this.selectElement(event)}>
                <div className="header">
                    <img draggable="false"
                         src={DslMetaApi.getIcon(this.state.name, this.state.element?.to?.uri)}
                         style={this.state.name === 'choice' ? {height: "18px"} : {}}  // find better icon
                         className="icon" alt="icon"></img>
                    <Text>{DslMetaApi.getTitle(this.state.name, this.state.element?.to?.uri)}</Text>
                    <button type="button" aria-label="Delete" onClick={e => this.delete(e)}
                            className="delete-button">
                        <DeleteIcon noVerticalAlign/>
                    </button>
                </div>
                {DslMetaApi.isDslModelHasSteps(this.state.name) &&
                <div className="steps">
                    {DslApi.getElements(this.state.element).map((element, index) => (
                        <div className="step" key={DslApi.getUid(element)}>
                            <DslElement updateElement={this.props.updateElement}
                                        deleteElement={this.props.deleteElement}
                                        selectElement={this.props.selectElement}
                                        selectedUid={this.state.selectedUid}
                                        element={element}/>
                            {DslMetaApi.showArrowForElement(this.state.name, index, DslApi.getElements(this.state.element).length) &&
                            <img className={"arrow-down"} alt="arrow"
                                 src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' x='0' y='0' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512' xml:space='preserve' class=''%3E%3Cg transform='matrix(1,0,0,1,1.7053025658242404e-13,1.1368683772161603e-13)'%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cpath d='M374.108,373.328c-7.829-7.792-20.492-7.762-28.284,0.067L276,443.557V20c0-11.046-8.954-20-20-20 c-11.046,0-20,8.954-20,20v423.558l-69.824-70.164c-7.792-7.829-20.455-7.859-28.284-0.067c-7.83,7.793-7.859,20.456-0.068,28.285 l104,104.504c0.006,0.007,0.013,0.012,0.019,0.018c7.792,7.809,20.496,7.834,28.314,0.001c0.006-0.007,0.013-0.012,0.019-0.018 l104-104.504C381.966,393.785,381.939,381.121,374.108,373.328z' fill='%23e97826' data-original='%23000000' style='' class=''%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
                            />
                            }
                        </div>
                    ))}
                </div>
                }
                {this.state.name === 'choice' &&
                <div className="whens">
                    {DslApi.getWhens(this.state.element).map((element, index) => (
                        <DslElement updateElement={this.props.updateElement}
                                    deleteElement={this.props.deleteElement}
                                    selectElement={this.props.selectElement}
                                    selectedUid={this.state.selectedUid}
                                    key={DslApi.getUid(element)}
                                    element={element}/>
                    ))}
                    {this.state.name === 'choice' && this.state.element.choice.otherwise !== undefined &&
                    <DslElement updateElement={this.props.updateElement}
                                deleteElement={this.props.deleteElement}
                                selectElement={this.props.selectElement}
                                selectedUid={this.state.selectedUid}
                                name={"otherwise"}
                        // key={DslApi.getUid(this.state.element.choice.otherwise)}
                                element={this.state.element.choice.otherwise}/>
                    }
                </div>
                }
                {DslMetaApi.isDslModelHasSteps(this.state.name) &&
                <Tooltip position={"bottom"}
                         content={<div>{"Add element to " + DslMetaApi.getTitle(this.state.name)}</div>}>
                    <button type="button" aria-label="Add" onClick={event => this.showDslSelector(event)}
                            className="add-button">
                        <AddIcon noVerticalAlign/>
                    </button>
                </Tooltip>

                }
                <DslSelector elementName={this.state.name} id={DslApi.getUid(this.state.element)}
                             show={this.state.showSelector}
                             onDslSelect={this.onDslSelect} onClose={this.closeDslSelector}/>
            </div>
        );
    }
};