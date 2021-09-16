import React from 'react';
import {
    Button, CodeBlock, CodeBlockCode,
    PageSection, Text, TextContent, ToggleGroup, ToggleGroupItem, Toolbar, ToolbarContent, ToolbarItem
} from '@patternfly/react-core';
import SaveIcon from '@patternfly/react-icons/dist/esm/icons/upload-icon';
import PlusIcon from '@patternfly/react-icons/dist/esm/icons/plus-icon';
import '../karavan.css';
import {StepElement} from "./StepElement";
import {MainToolbar} from "../MainToolbar";
import {DslSelector} from "./DslSelector";
import {DslMetaModel} from "../model/DslMetaModel";
import {DslProperties} from "./DslProperties";
import {CamelElement, Integration} from "../model/CamelModel";
import {KaravanApi} from "../api/KaravanApi";
import {CamelYaml} from "../api/CamelYaml";
import {v4 as uuidv4} from 'uuid'
import {CamelUi} from "../api/CamelUi";

interface Props {
    integration: Integration,
}

interface State {
    integration: Integration,
    selectedStep?: CamelElement,
    view: "design" | "code",
    showSelector: boolean
    selectedUuid: string
    key: string
}

export class DesignerPage extends React.Component<Props, State> {

    public state: State = {
        integration: CamelYaml.demo(), //this.props.integration,
        view: "design",
        showSelector: false,
        selectedUuid: '',
        key: ""
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
        this.setState({selectedStep: undefined, selectedUuid: ''})
    };

    getCode = (): string => {
        const clone = CamelYaml.cloneIntegration(this.state.integration);
        return CamelYaml.integrationToYaml(clone);
    }

    changeView = (view: "design" | "code") => {
        this.setState({view: view});
    }

    updateElement = (updatedElement: any, newElement: any) => {
        // this.setState({flows: []})
        // const updatedUid = DslApi.getUid(updatedElement);
        // const flows = DslApi.updateFlows([...this.state.flows], updatedUid, updatedElement);
        // this.setState({flows: flows})
        // this.selectElement(newElement)
    }

    onPropertyUpdate = (element: CamelElement, updatedUuid: string) => {
        console.log("onPropertyUpdate 1-------")
        console.log(element)
        console.log(updatedUuid)
        console.log("onPropertyUpdate 2-------")
        // this.setState({flows: []})
        // const updatedUid = DslApi.getUid(element);
        const clone = CamelYaml.cloneIntegration(this.state.integration);
        const i = CamelUi.updateIntegration(clone, element, updatedUuid);
        console.log(i)
        this.setState({integration: i, key: Math.random().toString()})
    }

    deleteElement = (id: string) => {
        // this.setState({flows: []})
        // const flows = DslApi.deleteElement(this.state.flows, id);
        // this.setState({flows: flows})
    }

    selectElement = (element: CamelElement) => {
        this.setState({selectedStep: element, selectedUuid: element.uuid})
    }

    showDslSelector = () => {
        this.setState({showSelector: true})
    }

    closeDslSelector = () => {
        this.setState({showSelector: false})
    }

    onDslSelect = (dsl: DslMetaModel) => {
        // const flow = DslApi.createFlowElement(dsl);
        // const flows: any[] = [...this.state.flows]
        // flows.push(flow)
        // this.setState({flows: flows, showSelector: false, selectedElement: flow, selectedUid: DslApi.getUid(flow)})
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
                                 onChange={e => this.changeView('design')}/>
                <ToggleGroupItem text="YAML" buttonId="yaml" isSelected={view === 'code'}
                                 onChange={e => this.changeView('code')}/>
            </ToggleGroup>
        </div>
    );

    test = ():boolean =>{
        // console.log(this.state.integration)
        return true;
    }

    render() {
        return (
            <PageSection className="dsl-page" isFilled padding={{default: 'noPadding'}}>
                <MainToolbar title={this.title(this.state.view)}
                             tools={this.tools(this.state.view)}/>
                <div className="dsl-page-columns">
                    {this.state.view === 'design' && this.test() &&
                    <div className="flows" onClick={event => this.unselectElement(event)}>
                        {this.state.integration.spec.flows.map((flow, index) => (
                            <StepElement key={flow.uuid + this.state.key}
                                         deleteElement={this.deleteElement}
                                         updateElement={this.updateElement}
                                         selectElement={this.selectElement}
                                         selectedUuid={this.state.selectedUuid}
                                         step={flow}/>
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
                        step={this.state.selectedStep}
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
