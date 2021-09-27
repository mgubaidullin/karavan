import React from 'react';
import '../karavan.css';
import {EventBus, DslPosition, Incoming} from "../api/EventBus";
import {Subscription} from "rxjs";
import {CamelUi} from "../api/CamelUi";
import {CamelElement} from "../model/CamelModel";

class Path {
    uuid: string = ''
    startX: number = 0
    startY: number = 0
    endX: number = 0
    endY: number = 0

    constructor(uuid: string, startX: number, startY: number, endX: number, endY: number) {
        this.uuid = uuid;
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
    }

    getPath(): string {
        const x = (this.endX + this.startX) / 2;
        const y = (this.endY + this.startY) / 2;
        return 'M ' + this.startX + ',' + this.startY
            + ' C ' + x + ','+ this.startY + ' ' + y +', ' + this.endY
            + ' ' + this.endX + ',' + this.endY ;
    }
}

interface Props {
}

interface State {
    positions: DslPosition[]
    incomings: Incoming[]
    pasths: Path[]
    sub?: Subscription
}

export class DslConnections extends React.Component<Props, State> {

    public state: State = {
        positions: [],
        incomings: [],
        pasths: []
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
            pasths: ps,
        }), () => {
            console.log(this.state.incomings);
        });
        //
        // this.setState(state => ({
        //     positions: state.positions.findIndex(p => p.step.uuid === evt.step.uuid) === -1
        //         ? [...state.positions, evt]
        //         : state.positions.map((p: DslPosition) => {
        //             if (p.step.uuid === evt.step.uuid) {
        //                 return evt;
        //             }
        //             return p;
        //         })
        // }), () => {
        //     console.log(this.state.positions);
        // });
    }


    render() {
        return (
            <div className="connections">
                <svg style={{width: '100%', height: '100%', }} viewBox="0 0 100% 100%">
                    {this.state.pasths.map(path => <path key={path.uuid} d={path.getPath()} className="path"/>)}
                </svg>
                {/*<div className="incoming-stack">*/}
                {this.state.incomings.map((i: Incoming) =>
                    <div key={i.uuid} className="incoming" style={{top: i.top + 'px'}}>
                        <img draggable="false"
                             src={i.icon}
                             className="icon" alt="icon">
                        </img>
                    </div>
                )}
                {/*</div>*/}
                <div className="outgoing-stack">
                    {this.state.positions.filter(p => p.step.dslName === 'toStep').map((p: DslPosition) =>
                        <div key={p.step.uuid} className="outgoing">World</div>
                    )}
                </div>
            </div>
        );
    }
}