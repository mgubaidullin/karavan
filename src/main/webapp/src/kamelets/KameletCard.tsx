import React from 'react';
import {
    CardHeader, Card, CardTitle, CardBody, Button, CardActions, CardFooter,Badge
} from '@patternfly/react-core';
import '../karavan.css';
import {RouteStepApi} from "../api/RouteStepApi";
import {Kamelet} from "../model/KameletModels";

interface Props {
    kamelet: Kamelet,
    onClick: any
}

interface State {
    kamelet: Kamelet,
}

export class KameletCard extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    public state: State = {
        kamelet: this.props.kamelet
    };

    componentDidMount() {

    }



    render() {
        return (
            <Card isHoverable isCompact key={this.state.kamelet.metadata.name} className="kamelet-card"
                onClick={event => this.props.onClick.call(this, this.state.kamelet)}
            >
                <CardHeader>
                    <img draggable="false" src={this.state.kamelet.icon()} className="kamelet-icon" alt=""></img>
                    <CardActions>
                        <Badge className="badge" isRead> {this.state.kamelet.metadata.labels["camel.apache.org/kamelet.type"].toLowerCase()}</Badge>
                    </CardActions>
                </CardHeader>
                <CardTitle>{RouteStepApi.titleFromName(this.state.kamelet.metadata.name)}</CardTitle>
                <CardBody>{this.state.kamelet.spec.definition.description}</CardBody>
                <CardFooter>

                </CardFooter>
            </Card>
        );
    }
};