import React from 'react';
import {
    Button,
    CodeBlock,
    CodeBlockCode, PageSection, Text, TextContent, ToggleGroup, ToggleGroupItem, Toolbar, ToolbarContent, ToolbarItem,
} from '@patternfly/react-core';
import {RouteBuilder} from "./RouteBuilder";
import {EmptyStep, RouteStep} from "../model/RouteModels";
import RouteComponentPanel from "./RouteComponentPanel";
import {RouteStepApi} from "../api/RouteStepApi";
import {v4 as uuidv4} from "uuid";
import '../karavan.css';
import {RouteStepProperties} from "./RouteStepProperties";
import {Integration} from "../model/IntegrationModels";
import {ResourceGenerator} from "../api/ResourceGenerator";
import {MainToolbar} from "../MainToolbar";
import {KaravanApi} from "../api/KaravanApi";

interface Props {
    integration: Integration
}

interface State {
    integration: Integration,
    currentStep?: RouteStep,
    key: string,
    view: "design" | "code",
}

export class RouteDesignerPage extends React.Component<Props, State> {

    public state: State = {
        integration: this.props.integration,
        key: uuidv4(),
        view: "design",
    };

    updateState = (steps: RouteStep[], current?: RouteStep) => {
        const i = Object.assign({}, this.state.integration);
        i.spec.flows = steps.length > 0 ? steps : [new EmptyStep()];
        this.setState({integration: i, key: uuidv4(), currentStep: current});
    }

    deleteStep = (step: RouteStep) => {
        const r = RouteStepApi.deleteStepById(this.state.integration.spec.flows, step.uid);
        this.updateState(r);
    };

    selectStep = (step: RouteStep) => {
        const r = RouteStepApi.selectStep(this.state.integration.spec.flows, step);
        this.updateState(r, step);
    };

    unselectSteps = () => {
        const r = RouteStepApi.selectStep(this.state.integration.spec.flows, new EmptyStep());
        this.updateState(r, undefined);
    };

    addChild = (step: RouteStep) => {
        const r = RouteStepApi.addChild(this.state.integration.spec.flows, step);
        this.updateState(r);
    };

    addStep = (step: RouteStep, position: number, move: boolean, stepParent?: RouteStep) => {
        const r = RouteStepApi.addStep(this.state.integration.spec.flows, step, position, move, stepParent);
        this.updateState(r, step);
    };

    updateIntegration = (i: Integration) => {
        this.setState({integration: i});
    };

    updateStep = (step: RouteStep) => {
        const r = RouteStepApi.updateStep(this.state.integration.spec.flows, step);
        this.updateState(r, step);
    };

    changeView = (view: "design" | "code") => {
        this.setState({view: view});
    };

    getCode = (): string => {
        return ResourceGenerator.integrationToYaml(this.state.integration);
    }

    setView = (view: "design" | "code") => {
        this.setState({view: view});
    }

    save = () => {
        KaravanApi.postIntegrations(this.state.integration.metadata.name + ".yaml", this.getCode(), res => {
            if (res.status === 200){
                console.log(res)
            } else {
                console.log(res)
            }
        })
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

    render() {
        return (
            <PageSection className="route-designer-section" isFilled padding={{default: 'noPadding'}}>
                <MainToolbar key={this.state.view} title={this.title(this.state.view)}
                             tools={this.tools(this.state.view)}/>
                <div className="route-designer">
                    <RouteComponentPanel/>
                    {this.state.view === 'design' &&
                    <div className="route-root" onClick={event => this.unselectSteps()}>
                        <RouteBuilder key={this.state.key}
                                      parentAddFunction={this.addStep}
                                      parentDeleteFunction={this.deleteStep}
                                      parentAddChildFunction={this.addChild}
                                      parentSelectFunction={this.selectStep}
                                      isRoot
                                      steps={this.state.integration.spec.flows}
                                      display={"block"}/>
                    </div>
                    }
                    {this.state.view === 'code' && <CodeBlock className="route-code">
                        <CodeBlockCode id="code-content">{this.getCode()}</CodeBlockCode>
                    </CodeBlock>
                    }
                    <RouteStepProperties
                        integration={this.state.integration}
                        step={this.state.currentStep}
                        onIntegrationUpdate={this.updateIntegration}
                        onStepUpdate={this.updateStep}
                        onChangeView={this.changeView}
                    />
                </div>
            </PageSection>
        );
    }
};