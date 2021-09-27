import React from 'react';
import '../karavan.css';
import {EventBus, DslPosition} from "../api/EventBus";
import {Subscription} from "rxjs";
import {CamelUi} from "../api/CamelUi";
import {Incoming, Outgoing, Path} from "../model/ConnectionModels";

interface Props {
}

interface State {
    positions: DslPosition[]
    incomings: Incoming[]
    outgoings: Outgoing[]
    paths: Path[]
    sub?: Subscription
}

export class DslConnections extends React.Component<Props, State> {

    public state: State = {
        positions: [],
        incomings: [],
        outgoings: [],
        paths: []
    };


    componentDidMount() {
        const sub = EventBus.onPosition()?.subscribe(evt => {
            if (evt.step.dslName === 'fromStep' || evt.step.dslName === 'toStep') {
                this.addIncoming(evt);
            }
        });
        this.setState({sub: sub});
    }

    componentWillUnmount() {
        this.state.sub?.unsubscribe();
    }

    addIncoming(evt: DslPosition) {
        const inc: Incoming = new Incoming(evt.step.uuid, CamelUi.getIcon((evt.step as any).from), evt.rect.top - 130, evt.rect.right - (evt.rect.width / 2));
        const incs: Incoming[] = [...this.state.incomings.filter(i => i.uuid !== evt.step.uuid), inc];
        const ps: Path[] = incs.map(i => new Path(i.uuid, 56, i.top + 25 , i.right, i.top ))
        this.setState(state => ({
            incomings: incs,
            paths: ps,
        }), () => {
            console.log(this.state.incomings);
        });
    }

    addOutgoing(evt: DslPosition) {
        const out: Outgoing = new Outgoing(evt.step.uuid, CamelUi.getIcon((evt.step as any).from), evt.rect.top - 130, evt.rect.right + (evt.rect.width / 2));
        const outs: Outgoing[] = [...this.state.outgoings.filter(i => i.uuid !== evt.step.uuid), out];
        const ps: Path[] = outs.map(i => new Path(i.uuid, i.left, i.top + 25 , 600, i.top ));
        this.setState(state => ({
            outgoings: outs,
            paths: ps,
        }), () => {
            console.log(this.state.incomings);
        });
    }

    render() {
        return (
            <div className="connections">
                <svg style={{width: '100%', height: '100%', }} viewBox="0 0 100% 100%">
                    {this.state.paths.map(path => <path key={path.uuid} d={path.getPath()} className="path"/>)}
                </svg>
                {this.state.incomings.map((i: Incoming) =>
                    <div key={i.uuid} className="incoming" style={{top: i.top + 'px'}}>
                        <img draggable="false"
                             src={i.icon}
                             className="icon" alt="icon">
                        </img>
                    </div>
                )}
                <div className="outgoing-stack">
                    {this.state.positions.filter(p => p.step.dslName === 'toStep').map((p: DslPosition) =>
                        <div key={p.step.uuid} className="outgoing">World</div>
                    )}
                </div>
            </div>
        );
    }
}