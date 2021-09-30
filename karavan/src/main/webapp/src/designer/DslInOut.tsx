import React from 'react';
import '../karavan.css';
import {InOut} from "../model/ConnectionModels";
import {Subscription} from "rxjs";
import {DslPosition, EventBus} from "../api/EventBus";
import ReactDOM from "react-dom";

interface Props {
    inout: InOut,
}

interface State {
    inout: InOut
    top: number
    sub?: Subscription
}

export class DslInOut extends React.Component<Props, State> {

    public state: State = {
        inout: this.props.inout,
        top: this.props.inout.top
    };

    componentDidMount() {
        const sub = EventBus.onPosition()?.subscribe(evt => {
            if (evt.step.uuid === this.state.inout.uuid) {
                this.setPosition(evt);
            }
        });
        this.setState({sub: sub});
    }

    componentWillUnmount() {
        this.state.sub?.unsubscribe();
    }

    setPosition(evt: DslPosition) {
        if (evt.step.dslName === 'fromStep'){
            this.setState({top: evt.rect.top - 140});
        } else {
            this.setState({top: evt.rect.top - 150 + (this.state.inout.index * 17)});
        }
    }

    render() {
        return (
            <div id={this.state.inout.uuid} custom-top={this.state.top} className={this.state.inout.type === 'out' ? 'outgoing' : 'incoming'} style={{top: this.state.top + 'px'}}>
                <img draggable="false"
                     src={this.state.inout.icon}
                     className="icon" alt="icon">
                </img>
            </div>
        );
    }
}