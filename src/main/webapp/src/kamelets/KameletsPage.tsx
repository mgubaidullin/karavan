import React from 'react';
import {
    Toolbar,
    ToolbarContent,
    Gallery,
    ToolbarItem,
    TextInput,
    PageSection, TextContent, Text
} from '@patternfly/react-core';
import '../karavan.css';
import {KameletCard} from "./KameletCard";
import {MainToolbar} from "../MainToolbar";
import {Kamelet} from "../model/KameletModels";
import {KameletApi} from "../api/KameletApi";
import {KameletModal} from "./KameletModal";

interface Props {
}

interface State {
    kamelet?: Kamelet;
    isModalOpen: boolean;
    repository: string,
    path: string,
    kamelets: Kamelet[]
}

export class KameletsPage extends React.Component<Props, State> {

    public state: State = {
        isModalOpen: false,
        repository: '',
        path: '',
        kamelets: [],
    };

    componentDidMount() {
        this.setState({kamelets: KameletApi.getKamelets()})
    }

    select = (k: Kamelet)=> {
        this.setState({kamelet: k, isModalOpen: true})
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
                    <Text component="h1">Kamelets</Text>
                </TextContent>);

    render() {
        return (
            <PageSection  padding={{ default: 'noPadding' }}>
                <KameletModal key={this.state.kamelet?.metadata.name + ""} isOpen={this.state.isModalOpen} kamelet={this.state.kamelet}/>
                <MainToolbar title={this.title()} tools={this.tools()}/>
                <PageSection isFilled className="kamelets-page">
                    <Gallery hasGutter>
                        {this.state.kamelets.map(k => (
                            <KameletCard key={k.metadata.name} kamelet={k} onClick={this.select}/>
                        ))}
                    </Gallery>
                </PageSection>
            </PageSection>
        );
    }
};