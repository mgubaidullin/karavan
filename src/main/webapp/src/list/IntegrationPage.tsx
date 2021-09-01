import React from 'react';
import {
    Toolbar,
    ToolbarContent,
    Gallery,
    ToolbarItem,
    TextInput,
    PageSection
} from '@patternfly/react-core';
import '../karavan.css';
import {IntegrationCard} from "./IntegrationCard";
import {KaravanApi} from "../api/KaravanApi";
import {MainToolbar} from "../MainToolbar";
import { Page } from '@patternfly/react-core/dist/esm/components/Page';

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

    tools = () => (<Toolbar id="toolbar-group-types">
        <ToolbarContent>
            <ToolbarItem variant="overflow-menu">
                <TextInput className="text-field" type="search" id="search" name="search"
                           autoComplete="off" placeholder="Search by name"/>
            </ToolbarItem>
        </ToolbarContent>
    </Toolbar>);

    render() {
        return (
            <PageSection  padding={{ default: 'noPadding' }}>
                <MainToolbar title="Integrations" tools={this.tools()}/>
                <PageSection isFilled className="integration-list">
                    <Gallery hasGutter>
                        {this.state.integrations.map(value => (
                            <IntegrationCard name={value}/>
                        ))}
                    </Gallery>
                </PageSection>
            </PageSection>
        );
    }
};