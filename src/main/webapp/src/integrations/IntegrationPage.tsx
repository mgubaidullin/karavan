import React from 'react';
import {
    Toolbar,
    ToolbarContent,
    Gallery,
    ToolbarItem,
    TextInput,
    PageSection, TextContent, Text, ToggleGroup, ToggleGroupItem
} from '@patternfly/react-core';
import '../karavan.css';
import {IntegrationCard} from "./IntegrationCard";
import {KaravanApi} from "../api/KaravanApi";
import {MainToolbar} from "../MainToolbar";
import { Page } from '@patternfly/react-core/dist/esm/components/Page';
import {Kamelet} from "../model/KameletModels";
import {Integration} from "../model/IntegrationModels";

interface Props {
}

interface State {
    repository: string,
    path: string,
    integrations: []
}

export class IntegrationPage extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    public state: State = {
        repository: '',
        path: '',
        integrations: []
    };

    componentDidMount() {
        KaravanApi.getIntegrations((integrations: []) =>
            this.setState({
                integrations: integrations
            }));
    }

    onSelect = (name: string) => {
        console.log(name)
        // this.setState({kamelet: k, isModalOpen: true})
    }

    tools = () => (<Toolbar id="toolbar-group-types">
        <ToolbarContent>
            <ToolbarItem>
                <TextInput className="text-field" type="search" id="search" name="search"
                           autoComplete="off" placeholder="Search by name"/>
            </ToolbarItem>
        </ToolbarContent>
    </Toolbar>);

    title = () => (<TextContent>
                    <Text component="h1">Integrations</Text>
                </TextContent>);

    render() {
        return (
            <PageSection  padding={{ default: 'noPadding' }}>
                <MainToolbar title={this.title()} tools={this.tools()}/>
                <PageSection isFilled className="integration-page">
                    <Gallery hasGutter>
                        {this.state.integrations.map(value => (
                            <IntegrationCard key={value} name={value} onClick={this.onSelect}/>
                        ))}
                    </Gallery>
                </PageSection>
            </PageSection>
        );
    }
};