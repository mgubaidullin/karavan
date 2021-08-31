import React from 'react';
import {
    Title,
    Toolbar,
    ToolbarContent,
    Gallery,
    FlexItem,
    Flex,
    ToolbarItem,
    TextInput,
    PageSidebar,
    NavItem,
    NavList,
    Nav,
    PageSection
} from '@patternfly/react-core';
import '../karavan.css';
import {IntegrationCard} from "./IntegrationCard";
import {KaravanApi} from "../api/KaravanApi";

interface Props {
}

interface State {
    repository: string,
    path: string,
    integrations: []
}

export class IntegrationList extends React.Component<Props, State> {

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

    render() {
        return (
            <PageSection isFilled>
                <Gallery hasGutter>
                    {this.state.integrations.map(value => (
                        <IntegrationCard name={value}/>
                    ))}
                </Gallery>
            </PageSection>
        );
    }
};