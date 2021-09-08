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
    tabIndex: string | number
}

export class FlowBuilder extends React.Component<Props, State> {

    public state: State = {
        flow: this.props.flow,
        id: DslApi.genFlowId(this.props.index),
        showStep: false,
        tabIndex: 0
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

    selectTab = (evt: React.MouseEvent<HTMLElement, MouseEvent>, eventKey: string | number) => {
    this.setState({tabIndex: eventKey})
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
                        <button type="button" aria-label="Add" onClick={e => this.showStepList()}
                                className="add-button">
                            <AddIcon noVerticalAlign/>
                        </button>
                    <Modal
                        title="Select next step"
                        width={'80%'}
                        className='dsl-modal'
                        isOpen={this.state.showStep}
                        onClose={() =>  this.setState({showStep:false})}
                        actions={{}}>
                        <Tabs style={{overflow:'hidden'}} activeKey={this.state.tabIndex} onSelect={this.selectTab}>
                            { ['routing', 'transformation', 'error', 'configuration'].map((label, index) =>
                                <Tab eventKey={index} title={<TabTitleText>{label}</TabTitleText>}>
                                    <Gallery hasGutter>
                                    {/*<div style={{height:'100%'}}>*/}
                                        {DslMetaApi.getDslMetaModels(label).map((model, index) => (
                                            <Card isHoverable isCompact className="dsl-card">
                                                <CardHeader>
                                                    <Text>{model.title}</Text>
                                                </CardHeader>
                                                <CardBody>
                                                    <Text>{model.description}</Text>
                                                </CardBody>
                                            </Card>

                                        ))}
                                    {/*</div>*/}
                                    </Gallery>
                                </Tab>
                            )}
                        </Tabs>
                    </Modal>



                    {/*<Popover*/}
                    {/*    aria-label="Add step popover"*/}
                    {/*    position={"auto"}*/}
                    {/*    hideOnOutsideClick={true}*/}
                    {/*    isVisible={this.state.showStep}*/}
                    {/*    shouldClose={tip => this.setState({showStep:false})}*/}
                    {/*    shouldOpen={tip => this.setState({showStep:true})}*/}
                    {/*    appendTo={() => document.body}*/}
                    {/*    headerContent={<div>Select step</div>}*/}
                    {/*    maxWidth="600px"*/}
                    {/*    bodyContent={*/}
                    {/*        */}
                    {/*    }*/}
                    {/*    footerContent="Popover footer"*/}
                    {/*>*/}
                    {/*    <button type="button" aria-label="Add" onClick={e => this.showStepList()}*/}
                    {/*            className="add-button">*/}
                    {/*        <AddIcon noVerticalAlign/>*/}
                    {/*    </button>*/}
                    {/*</Popover>*/}
                </div>
            </div>
        );
    }
};