import React from 'react';
import {
    Brand,
    Button,
    CodeBlock,
    CodeBlockCode,
    Page,
    PageHeader, PageSection,
    PageSectionVariants,
    Title,
} from '@patternfly/react-core';
import logo from '../logo.svg';
import {RouteBuilder} from "./RouteBuilder";
import {KameletApi} from '../api/KameletApi';
import {EmptyStep, RouteStep} from "../model/RouteModels";
import RouteComponentPanel from "./RouteComponentPanel";
import {RouteStepApi} from "../api/RouteStepApi";
import {v4 as uuidv4} from "uuid";
import '../karavan.css';
import {RouteStepProperties} from "./RouteStepProperties";
import {Integration, Spec} from "../model/IntegrationModels";
import {ResourceGenerator} from "../api/ResourceGenerator";
import OpenshiftIcon from '@patternfly/react-icons/dist/esm/icons/openshift-icon';
import {SaveFileModal} from "../modal/SaveFileModal";

interface Props {
}

interface State {
    integration: Integration,
    currentStep?: RouteStep,
    key: string,
    view: "design" | "code",
    saveWindowOpen: boolean
}

export class RouteDesigner extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    public state: State = {
        integration: new Integration({spec: new Spec({flows: [new EmptyStep()]})}),
        key: uuidv4(),
        view: "design",
        saveWindowOpen: false
    };

    componentDidMount() {
        KameletApi.prepareKamelets();
    }

    updateState = (steps: RouteStep[], current?: RouteStep) => {
        const i = Object.assign({}, this.state.integration);
        i.spec.flows = steps.length >0 ? steps : [new EmptyStep()];
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

    getCode = ():string => {
        return ResourceGenerator.integrationToYaml(this.state.integration);
    }

    toolBar = (
        <div className="top-toolbar">
            <Button variant="secondary" onClick={event => this.setState({saveWindowOpen: true})} icon={<OpenshiftIcon />}>Deploy</Button>
        </div>
    );

    header = (
        <PageHeader className="page-header"
            logo={
                <div className="logo">
                    <Brand src={logo} alt="Karavan"/>
                    <Title headingLevel="h1" size="3xl">Karavan</Title>
                </div>
            }
            headerTools={this.toolBar}
        />
    );

    render() {
        return (
            <Page className="page" header={this.header}>
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
                        view={this.state.view}
                        onChangeView={this.changeView}
                    />
                </div>
                <SaveFileModal isOpen={this.state.saveWindowOpen} integration={this.state.integration}/>
            </Page>
        );
    }
};