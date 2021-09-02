import React from 'react';
import {FromStep, RouteStep, ToStep} from "../model/RouteModels";
import '../karavan.css';
import {RouteBuilder} from "./RouteBuilder";
import {KameletApi} from "../api/KameletApi";
import DeleteIcon from "@patternfly/react-icons/dist/js/icons/times-icon";
import AddIcon from "@patternfly/react-icons/dist/js/icons/plus-icon";
import {RouteStepApi} from "../api/RouteStepApi";

interface Props {
    step: RouteStep;
    stepParent?: RouteStep;
    showArrow: boolean;
    onDeleteStep: any
    onAddChild: any
    onAddStep: any
    onSelectStep: any
}

interface State {
    step: RouteStep;
    showArrow: boolean;
}

export class RouteStepNode extends React.Component<Props, State> {

    public state: State = {
        step: this.props.step,
        showArrow: this.props.showArrow
    };

    getIcon = (): string => {
        if (this.state.step.type === 'from' && (this.state.step as FromStep).component === "kamelet") {
            const from = (this.state.step as FromStep);
            const k = KameletApi.findKameletByName(from.path || '');
            return k?.icon() || this.state.step.icon;
        } else if (this.state.step.type === 'to' && (this.state.step as ToStep).component === "kamelet") {
            const to = (this.state.step as ToStep);
            const k = KameletApi.findKameletByName(to.path || '');
            return k?.icon() || this.state.step.icon;
        } else {
            return this.state.step.icon;
        }
    }

    isSizeFixed = (): boolean => {
        return ['to'].includes(this.state.step.type);
    }

    isDraggable = (): boolean => {
        return !['from', 'when', 'empty', 'otherwise'].includes(this.state.step.type);
    }

    componentDidUpdate = (prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) => {
        if (prevProps.showArrow !== this.props.showArrow) {
            this.setState({showArrow: this.props.showArrow});
        }
    }

    delete = () => {
        this.props.onDeleteStep.call(this, this.state.step);
    }

    addChild = () => {
        this.props.onAddChild.call(this, this.state.step);
    }

    selectStep = (evt: React.MouseEvent<HTMLDivElement>) => {
        evt.stopPropagation();
        this.props.onSelectStep.call(this, this.state.step);
    }

    isPlaceholder = (): boolean => {
        if (['empty'].includes(this.state.step.type)) {
            return true;
        } else {
            return false
        }
    };

    getClassNames = (): string => {
        if (this.isPlaceholder()){
            return "rect-placeholder";
        } else if (this.state.step.selected){
            return  "rect selected-rect";
        } else {
            return  "rect unselected-rect";
        }
    }

    render() {
        return (
            <div key={this.state.step.uid}
                 id={this.state.step.uid}
                 className={'route-step'}
                 draggable={this.isDraggable()} >
                <div onClick={e => this.selectStep(e)} className={this.getClassNames()} style={this.isSizeFixed() ? {width: "160px", height: "65px"} : {}}>
                    {!this.isPlaceholder() && <div className={"header"}>
                        <img draggable="false"
                             src={this.getIcon()}
                             style={this.state.step.type === 'choice' ? {height: "23px"} : {}}  // find better icon
                             className="icon" alt="icon"></img>
                        <p className="title" draggable="false">{RouteStepApi.getStepCaption(this.state.step)}</p>
                        <button type="button" aria-label="Delete" onClick={e => this.delete()}
                                className="delete-button">
                            <DeleteIcon noVerticalAlign/>
                        </button>
                    </div>
                    }
                    {this.isPlaceholder() &&
                        <p className="title-placeholder" draggable="false">{RouteStepApi.getStepCaption(this.state.step, this.props.stepParent)}</p>
                    }
                    {this.state.step.type === 'choice'
                    && <button type="button" aria-label="Add" onClick={e => this.addChild()} className="add-button">
                        <AddIcon noVerticalAlign/>
                    </button>}
                    <RouteBuilder isRoot={false}
                                  stepParent={this.state.step}
                                  parentDeleteFunction={this.props.onDeleteStep}
                                  parentAddFunction={this.props.onAddStep}
                                  parentAddChildFunction={this.props.onAddChild}
                                  parentSelectFunction={this.props.onSelectStep}
                                  display={this.state.step.type === 'choice' ? "flex" : "block"}
                                  steps={this.state.step.steps}/>
                </div>
                {this.state.showArrow === true &&
                <img className={"arrow-down"} alt="arrow"
                     src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' x='0' y='0' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512' xml:space='preserve' class=''%3E%3Cg transform='matrix(1,0,0,1,1.7053025658242404e-13,1.1368683772161603e-13)'%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cpath d='M374.108,373.328c-7.829-7.792-20.492-7.762-28.284,0.067L276,443.557V20c0-11.046-8.954-20-20-20 c-11.046,0-20,8.954-20,20v423.558l-69.824-70.164c-7.792-7.829-20.455-7.859-28.284-0.067c-7.83,7.793-7.859,20.456-0.068,28.285 l104,104.504c0.006,0.007,0.013,0.012,0.019,0.018c7.792,7.809,20.496,7.834,28.314,0.001c0.006-0.007,0.013-0.012,0.019-0.018 l104-104.504C381.966,393.785,381.939,381.121,374.108,373.328z' fill='%23e97826' data-original='%23000000' style='' class=''%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
                />}
            </div>
        );
    }

}
