import React from 'react';
import {
    Button, CodeBlock, CodeBlockCode,
    PageSection, Text, TextContent, ToggleGroup, ToggleGroupItem, Toolbar, ToolbarContent, ToolbarItem
} from '@patternfly/react-core';
import SaveIcon from '@patternfly/react-icons/dist/esm/icons/upload-icon';
import PlusIcon from '@patternfly/react-icons/dist/esm/icons/plus-icon';
import '../karavan.css';
import {FlowBuilder} from "./FlowBuilder";
import {DslApi} from "../api/DslApi";
import {MainToolbar} from "../MainToolbar";
import {DslSelector} from "./DslSelector";
import {DslMetaModel} from "../model/DslMetaModel";
import {ResourceGenerator} from "../api/ResourceGenerator";
import {DslProperties} from "./DslProperties";
import {Integration} from "../model/IntegrationModels";
import {KaravanApi} from "../api/KaravanApi";

interface Props {
    integration: Integration,
}

interface State {
    integration: Integration,
    selectedElement?: any,
    flows: any []
    view: "design" | "code",
    showSelector: boolean
    selectedUid: string
}

export class DslPage extends React.Component<Props, State> {

    public state: State = {
        integration: this.props.integration,
        flows: DslApi.loadFlows(this.props.integration.spec.flows),
        view: "design",
        showSelector: false,
        selectedUid: ''
    };

    componentDidMount() {
    }

    save = () => {
        KaravanApi.postIntegrations(this.state.integration.metadata.name + ".yaml", this.getCode(), res => {
            if (res.status === 200){
                console.log(res) //TODO show notification
            } else {
                console.log(res) //TODO show notification
            }
        })
    }

    unselectElement = (evt: React.MouseEvent) => {
        evt.stopPropagation();
        this.setState({selectedElement: undefined, selectedUid: ''})
    };

    changeView = (view: "design" | "code") => {
        this.setState({view: view});
    };

    getCode = (): string => {
        return ResourceGenerator.flowsToYaml(this.state.integration.metadata.name, this.state.flows);
    }

    setView = (view: "design" | "code") => {
        this.setState({view: view});
    }

    updateElement = (updatedElement: any, newElement: any) => {
        this.setState({flows: []})
        const updatedUid = DslApi.getUid(updatedElement);
        const flows = DslApi.updateFlows([...this.state.flows], updatedUid, updatedElement);
        this.setState({flows: flows})
        this.selectElement(newElement)
    }

    onPropertyUpdate = (element: any) => {
        // console.log(element)
        this.setState({flows: []})
        const updatedUid = DslApi.getUid(element);
        const flows = DslApi.updateFlows(this.state.flows, updatedUid, element);
        this.setState({flows: flows, selectedElement: element, selectedUid: updatedUid})
    }

    deleteElement = (id: string) => {
        this.setState({flows: []})
        const flows = DslApi.deleteElement(this.state.flows, id);
        this.setState({flows: flows})
    }

    selectElement = (element: any) => {
        this.setState({selectedElement: element, selectedUid: DslApi.getUid(element)})
    }

    showDslSelector = () => {
        this.setState({showSelector: true})
    }

    closeDslSelector = () => {
        this.setState({showSelector: false})
    }

    onDslSelect = (dsl: DslMetaModel) => {
        const flow = DslApi.createFlowElement(dsl);
        const flows: any[] = [...this.state.flows]
        flows.push(flow)
        this.setState({flows: flows, showSelector: false, selectedElement: flow, selectedUid: DslApi.getUid(flow)})
    }

    onIntegrationUpdate = (i: Integration) => {
        this.setState({integration: i});
    };

    tools = (view: "design" | "code") => (
        <Toolbar id="toolbar-group-types">
            <ToolbarContent>
                <ToolbarItem>
                    <Button variant="secondary" icon={<SaveIcon/>} onClick={e => this.save()}>Save</Button>
                </ToolbarItem>
                {view === 'design' &&
                <ToolbarItem>
                    <Button icon={<PlusIcon/>} onClick={e => this.showDslSelector()}>Add flow</Button>
                </ToolbarItem>
                }
            </ToolbarContent>
        </Toolbar>);

    title = (view: "design" | "code") => (
        <div className="dsl-title">
            <TextContent className="title">
                <Text component="h1">Designer</Text>
            </TextContent>
            <ToggleGroup aria-label="Switch view" className="toggle">
                <ToggleGroupItem text="Design" buttonId="design" isSelected={view === 'design'}
                                 onChange={e => this.setView('design')}/>
                <ToggleGroupItem text="YAML" buttonId="yaml" isSelected={view === 'code'}
                                 onChange={e => this.setView('code')}/>
            </ToggleGroup>
        </div>
    );

    render() {
        return (
            <PageSection className="dsl-page" isFilled padding={{default: 'noPadding'}}>
                <MainToolbar title={this.title(this.state.view)}
                             tools={this.tools(this.state.view)}/>
                <div className="dsl-page-columns">
                    {this.state.view === 'design' &&
                    <div className="flows" onClick={event => this.unselectElement(event)}>
                        {this.state.flows.map((flow, index) => (
                            <FlowBuilder key={DslApi.getUid(flow)}
                                         deleteElement={this.deleteElement}
                                         updateElement={this.updateElement}
                                         selectElement={this.selectElement}
                                         selectedUid={this.state.selectedUid}
                                         index={index} flow={flow}/>
                        ))}
                    </div>
                    }
                    {this.state.view === 'code' &&
                    <div className="yaml-code">
                        <CodeBlock className="route-code">
                            <CodeBlockCode id="code-content">{this.getCode()}</CodeBlockCode>
                        </CodeBlock>
                    </div>
                    }
                    <DslProperties
                        integration={this.state.integration}
                        element={this.state.selectedElement}
                        onIntegrationUpdate={this.onIntegrationUpdate}
                        onPropertyUpdate={this.onPropertyUpdate}
                        onChangeView={this.changeView}
                    />
                </div>
                <DslSelector elementName={"flow"} id={""} show={this.state.showSelector}
                             onDslSelect={this.onDslSelect} onClose={this.closeDslSelector}/>
            </PageSection>
        );
    }
};
