import React from 'react';
import {
    PageSectionVariants, TextContent, Text, Flex, PageSection, FlexItem
} from '@patternfly/react-core';
import './karavan.css';

interface Props {
    title: any
    tools: any
}

interface State {
    title: any
    tools: React.Component
}

export class MainToolbar extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    public state: State = {
        title: this.props.title,
        tools: this.props.tools
    };

    render() {
        return (
            <PageSection className="tools-section" variant={PageSectionVariants.light}>
                <Flex className="tools" justifyContent={{default: 'justifyContentSpaceBetween'}}>
                    <FlexItem>
                        {this.state.title}
                    </FlexItem>
                    <FlexItem>
                        {this.state.tools}
                    </FlexItem>
                </Flex>
            </PageSection>
        );
    }
};