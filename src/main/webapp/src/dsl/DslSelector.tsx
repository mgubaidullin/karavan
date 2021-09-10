import React from 'react';
import {
    Card, CardBody, CardHeader, Gallery, Modal,
    Tab, Tabs, TabTitleText,
    Text,
} from '@patternfly/react-core';
import '../karavan.css';
import {DslMetaApi} from "../api/DslMetaApi";
import {DslMetaModel} from "../model/DslMetaModel";

interface Props {
    show: boolean,
    onDslSelect: any
    id: string
    elementName: string
}

interface State {
    show: boolean
    tabIndex: string | number
}

export class DslSelector extends React.Component<Props, State> {

    public state: State = {
        show: this.props.show,
        tabIndex: 0,
    };

    componentDidMount() {
    }

    selectTab = (evt: React.MouseEvent<HTMLElement, MouseEvent>, eventKey: string | number) => {
        this.setState({tabIndex: eventKey})
    }

    componentDidUpdate = (prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) => {
        if (prevState.show !== this.props.show) {
            this.setState({show: this.props.show});
        }
    }

    selectDsl = (dsl: DslMetaModel) => {
        this.setState({show: false})
        this.props.onDslSelect.call(this, dsl);
    }

    render() {
        return (
            <Modal
                title="Select next step"
                width={'90%'}
                className='dsl-modal'
                isOpen={this.state.show}
                onClose={() => this.setState({show: false})}
                actions={{}}>
                <Tabs style={{overflow: 'hidden'}} activeKey={this.state.tabIndex} onSelect={this.selectTab}>
                    {DslMetaApi.getChildrenLabels(this.props.elementName).map((label, index) =>
                        <Tab eventKey={index} key={"tab"+index} title={<TabTitleText>{DslMetaApi.capitalizeName(label)}</TabTitleText>}>
                            <Gallery key={"gallery"+index} hasGutter className="dsl-gallery">
                                {DslMetaApi.getChildrenList(this.props.elementName, label).map((model, index) => (
                                    <Card key={model.name} isHoverable isCompact className="dsl-card" onClick={event => this.selectDsl(model)}>
                                        <CardHeader>
                                            <img draggable="false"
                                                 src={DslMetaApi.getIcon(model.name)}
                                                 style={model.name === 'choice' ? {height: "18px"} : {}}  // find better icon
                                                 className="icon" alt="icon"></img>
                                            <Text>{model.title}</Text>
                                        </CardHeader>
                                        <CardBody>
                                            <Text>{model.description}</Text>
                                        </CardBody>
                                    </Card>
                                ))}
                            </Gallery>
                        </Tab>
                    )}
                    {DslMetaApi.getKameletLabels(this.props.elementName).map((label, index) =>
                        <Tab eventKey={label} key={"tab-k-" + index}
                             title={<TabTitleText>{DslMetaApi.capitalizeName(label)}</TabTitleText>}>
                            <Gallery key={"gallery" + index} hasGutter className="dsl-gallery">
                                {DslMetaApi.getKameletList(this.props.elementName, label, 'from').map((model, index) => (
                                    <Card key={model.name + model.uri} isHoverable isCompact className="dsl-card"
                                          onClick={event => this.selectDsl(model)}>
                                        <CardHeader>
                                            <img draggable="false"
                                                 src={DslMetaApi.getIcon(model.name, model.uri)}
                                                 style={model.name === 'choice' ? {height: "18px"} : {}}  // find better icon
                                                 className="icon" alt="icon"></img>
                                            <Text>{model.title}</Text>
                                        </CardHeader>
                                        <CardBody>
                                            <Text>{model.description}</Text>
                                        </CardBody>
                                    </Card>
                                ))}
                            </Gallery>
                        </Tab>
                    )}
                </Tabs>
            </Modal>
        );
    }
};