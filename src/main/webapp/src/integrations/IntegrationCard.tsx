import React from 'react';
import {
    CardHeader, Card, CardTitle, CardBody, Button, CardActions,
} from '@patternfly/react-core';
import DeleteIcon from "@patternfly/react-icons/dist/js/icons/times-icon";
import '../karavan.css';
import {RouteStepApi} from "../api/RouteStepApi";
import {RouteStep} from "../model/RouteModels";

interface Props {
    name: string,
    onClick: any
}

interface State {
    name: string,
}

export class IntegrationCard extends React.Component<Props, State> {

    public state: State = {
        name: this.props.name
    };

    componentDidMount() {
    }

    render() {
        return (
            <Card isHoverable isCompact key={this.state.name} className="integration-card" onClick={event => this.props.onClick.call(this, this.state.name)}>
                <CardHeader>
                    <img src={new RouteStep().icon} alt='icon' className="icon"/>
                    <CardActions>
                        <Button variant="link" className="delete-button"><DeleteIcon/></Button>
                    </CardActions>
                </CardHeader>
                <CardTitle>{RouteStepApi.titleFromName(this.state.name)}</CardTitle>
                <CardBody>{this.state.name}</CardBody>
            </Card>
        );
    }
};