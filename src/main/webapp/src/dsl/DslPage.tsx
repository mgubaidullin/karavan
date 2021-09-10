import React from 'react';
import {
    Button, CodeBlock, CodeBlockCode,
    PageSection, Text, TextContent, ToggleGroup, ToggleGroupItem, Toolbar, ToolbarContent, ToolbarItem
} from '@patternfly/react-core';
import '../karavan.css';
import {Convert, DslModelObject, ModelProcessorDefinition, typeMap} from "../model/DslModel";
import {FlowBuilder} from "./FlowBuilder";
import {DslApi} from "../api/DslApi";
import {MainToolbar} from "../MainToolbar";
import {v4 as uuidv4} from "uuid";

interface Props {
}

interface State {
    flows: any []
    view: "design" | "code",
}

export class DslPage extends React.Component<Props, State> {

    public state: State = {
        flows: DslApi.create(),
        view: "design",
    };

    componentDidMount() {
    }

    save = () => {
        // KaravanApi.postIntegrations(this.state.integration.metadata.name + ".yaml", this.getCode(), res => {
        //     if (res.status === 200){
        //         console.log(res) //TODO show notification
        //     } else {
        //         console.log(res) //TODO show notification
        //     }
        // })
    }

    unselectSteps = () => {
        // const r = RouteStepApi.selectStep(this.state.integration.spec.flows, new EmptyStep());
        // this.updateState(r, undefined);
    };

    changeView = (view: "design" | "code") => {
        this.setState({view: view});
    };

    getCode = (): string => {
        // return ResourceGenerator.integrationToYaml(this.state.integration);
        return ""
    }

    setView = (view: "design" | "code") => {
        this.setState({view: view});
    }

    tools = (view: "design" | "code") => (<Toolbar id="toolbar-group-types">
        <ToolbarContent>
            <ToolbarItem>
                <Button onClick={e => this.save()}>Save</Button>
            </ToolbarItem>
        </ToolbarContent>
    </Toolbar>);

    title = (view: "design" | "code") => (<Toolbar id="toolbar-group-types">
        <ToolbarContent>
            <ToolbarItem>
                <TextContent>
                    <Text component="h1">Designer</Text>
                </TextContent>
            </ToolbarItem>
            <ToolbarItem>
                <ToggleGroup aria-label="Switch view" className="toggle">
                    <ToggleGroupItem text="Design" buttonId="design" isSelected={view === 'design'}
                                     onChange={e => this.setView('design')}/>
                    <ToggleGroupItem text="YAML" buttonId="yaml" isSelected={view === 'code'}
                                     onChange={e => this.setView('code')}/>
                </ToggleGroup>
            </ToolbarItem>
        </ToolbarContent>
    </Toolbar>);

    updateStep = (p: any, uid: string) => {
        this.setState({flows: []})
        const flows = DslApi.updateFlows(this.state.flows, uid, p);
        console.log(flows)
        this.setState({flows: flows})
    }

    deleteStep = (id: string) => {
        this.setState({flows: []})
        const flows = DslApi.deleteElement(this.state.flows, id);
        console.log(flows)
        this.setState({flows: flows})
    }

    render() {
        return (
            <PageSection className="route-designer-section" isFilled padding={{default: 'noPadding'}}>
                <MainToolbar title={this.title(this.state.view)}
                             tools={this.tools(this.state.view)}/>
                {this.state.view === 'design' &&
                <div className="dsl-page" onClick={event => this.unselectSteps()}>
                    {this.state.flows.map((flow, index) => (
                        <FlowBuilder key={DslApi.getUid(flow)} deleteStep={this.deleteStep} updateStep={this.updateStep}
                                     index={index} flow={flow}/>
                    ))}
                </div>
                }
                {this.state.view === 'code' && <CodeBlock className="route-code">
                    <CodeBlockCode id="code-content">{this.getCode()}</CodeBlockCode>
                </CodeBlock>
                }
                {/*<RouteStepProperties*/}
                {/*    integration={this.state.integration}*/}
                {/*    step={this.state.currentStep}*/}
                {/*    onIntegrationUpdate={this.updateIntegration}*/}
                {/*    onStepUpdate={this.updateStep}*/}
                {/*    onChangeView={this.changeView}*/}
                {/*/>*/}
            </PageSection>
        );
    }
};
