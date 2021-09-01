import React from 'react';
import {
    CardHeader, Card, CardTitle, CardBody, Button, CardActions,
} from '@patternfly/react-core';
import DeleteIcon from "@patternfly/react-icons/dist/js/icons/times-icon";
import '../karavan.css';
import {RouteStepApi} from "../api/RouteStepApi";

interface Props {
    name: string,
}

interface State {
    name: string,
}

export class IntegrationCard extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    public state: State = {
        name: this.props.name
    };

    componentDidMount() {
        // KaravanApi.getConfiguration((config: any) =>
        //     this.setState({
        //         version: config?.['karavan.version'],
        //         path: config?.['karavan.git.path'],
        //         repository: config?.['karavan.git.uri']
        //     }));
        //
        // KaravanApi.getIntegrations((integrations: []) =>
        //     this.setState({
        //         integrations: integrations
        //     }));
    }



    render() {
        return (
            <Card isHoverable isCompact key={this.state.name} className="integration-card">
                <CardHeader>
                    {/*<img src={icons[product.icon]} alt={`${product.name} icon`} style={{ maxWidth: '60px' }} />*/}
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