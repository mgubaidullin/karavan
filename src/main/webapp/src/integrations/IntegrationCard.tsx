import React from 'react';
import {
    CardHeader, Card, CardTitle, CardBody, Button, CardActions, CardFooter,
} from '@patternfly/react-core';
import DeleteIcon from "@patternfly/react-icons/dist/js/icons/times-icon";
import '../karavan.css';
import {RouteStepApi} from "../api/RouteStepApi";
import {RouteStep} from "../model/RouteModels";

interface Props {
    name: string,
    onClick: any
    onDelete: any
}

interface State {
    name: string,
}

export class IntegrationCard extends React.Component<Props, State> {

    public state: State = {
        name: this.props.name
    };

    private delete(evt: React.MouseEvent) {
        evt.stopPropagation();
        this.props.onDelete.call(this, this.state.name);
    }

    render() {
        return (
            <Card isHoverable isCompact key={this.state.name} className="integration-card" onClick={event => this.props.onClick.call(this, this.state.name)}>
                <CardHeader>
                    <img src={new RouteStep().icon} alt='icon' className="icon"/>
                    <CardActions>
                        <Button variant="link" className="delete-button" onClick={e => this.delete(e)}><DeleteIcon/></Button>
                    </CardActions>
                </CardHeader>
                <CardTitle>{RouteStepApi.titleFromName(this.state.name)}</CardTitle>
                <CardBody>{this.state.name}</CardBody>
            </Card>
        );
    }
};