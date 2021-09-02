import React from 'react';
import {
    Toolbar,
    ToolbarContent,
    Gallery,
    ToolbarItem,
    TextInput,
    PageSection,
    TextContent,
    Text,
    Button
} from '@patternfly/react-core';
import '../karavan.css';
import {IntegrationCard} from "./IntegrationCard";
import {KaravanApi} from "../api/KaravanApi";
import {MainToolbar} from "../MainToolbar";

interface Props {
    onSelect:any
    onCreate:any
}

interface State {
    repository: string,
    path: string,
    integrations: []
}

export class IntegrationPage extends React.Component<Props, State> {

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

    tools = () => (<Toolbar id="toolbar-group-types">
        <ToolbarContent>
            <ToolbarItem>
                <TextInput className="text-field" type="search" id="search" name="search"
                           autoComplete="off" placeholder="Search by name"/>
            </ToolbarItem>
            <ToolbarItem>
                <Button onClick={e => this.props.onCreate.call(this)}>Create</Button>
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
                            <IntegrationCard key={value} name={value} onClick={this.props.onSelect}/>
                        ))}
                    </Gallery>
                </PageSection>
            </PageSection>
        );
    }
};