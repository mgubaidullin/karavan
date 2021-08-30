import React, {} from 'react';
import {RouteStep} from "../model/RouteModels";
import '../karavan.css';
import {RouteStepNode} from "./RouteStepNode";
import {RouteStepApi} from "../api/RouteStepApi";

interface Props {
    display: "block" | "flex";
    steps: RouteStep[];
    stepParent?: RouteStep;
    isRoot: boolean;
    parentDeleteFunction: any;
    parentAddChildFunction: any;
    parentAddFunction: any;
    parentSelectFunction: any;
}

interface DroppingStep {
    position: number;
    element: Element | null;
    step?: RouteStep;
}

interface State {
    draggedStep?: RouteStep,
    steps: RouteStep[],
}

export class RouteBuilder extends React.Component<Props, State> {

    public state: State = {
        steps: this.props.steps
    };

    onDragStart = (evt: React.DragEvent<HTMLDivElement>) => {
        evt.stopPropagation();
        const draggedItemId: string = evt.currentTarget.id;
        evt.dataTransfer.effectAllowed = 'move';
        evt.dataTransfer.setData('text/plain', draggedItemId);
        evt.currentTarget.classList.add("dragging-route-step");
        evt.currentTarget.setAttribute('aria-pressed', 'true');
        this.setState({
            draggedStep: this.state.steps.find(s => s.uid === draggedItemId),
        });
    };

    deleteStep = (step: RouteStep) => {
        this.props.parentDeleteFunction.call(this, step);
    };

    selectStep = (step: RouteStep) => {
        this.props.parentSelectFunction.call(this, step);
    };

    addChild = (step: RouteStep) => {
        this.props.parentAddChildFunction.call(this, step);
    };

    addStep = (step: RouteStep, position: number, move: boolean, stepParent?: RouteStep) => {
        this.props.parentAddFunction.call(this, step, position, move, stepParent);
        this.setState({draggedStep: undefined});
    };

    getStepToAdd = (evt: React.DragEvent): RouteStep | undefined => {
        if (evt.dataTransfer.getData('route-step')) {
            return RouteStepApi.fromTransferJson(evt.dataTransfer.getData('route-step'));
        } else if (evt.dataTransfer.getData('kamelet')) {
            return RouteStepApi.fromTransferKamelet(evt.dataTransfer.getData('kamelet'));
        } else {
            return this.state.draggedStep;
        }
    }

    getDroppingStep = (evt: React.DragEvent): DroppingStep => {
        const e: Element = evt.target as Element;
        const stepElement = e.closest(".route-step");
        const droppingStep: RouteStep | undefined = this.state.steps.find(s => s.uid === stepElement?.id);
        const idxTarget: number = this.state.steps.findIndex(s => s.uid === stepElement?.id);
        return {position: idxTarget, element: stepElement, step: droppingStep} as DroppingStep;
    }

    onDrop = (evt: React.DragEvent) => {
        evt.stopPropagation();
        const drop = this.getDroppingStep(evt);
        const newStep = this.getStepToAdd(evt);
        if (newStep && RouteStepApi.isValidDrop(this.props.isRoot, this.state.steps, drop.position, drop.step, newStep,)) {
            if (this.isStepInList(newStep.uid)) {
                if (newStep.uid !== drop.step?.uid) {
                    this.addStep(newStep, drop.position, true, this.props.stepParent);
                }
            } else {
                this.addStep(newStep, drop.position, false, this.props.stepParent);
            }
        }

        drop.element?.classList.add("hover");
        evt.currentTarget.classList.remove("dragging-route-step");
        (evt.target as Element).setAttribute('aria-pressed', 'false');
    };


    isStepInList = (uid?: string): boolean => {
        return this.state.steps.findIndex(s => s.uid === uid) !== -1;
    }

    onDragOver = (evt: React.DragEvent) => {
        evt.preventDefault();
        evt.stopPropagation();
        const drop = this.getDroppingStep(evt);
        if (RouteStepApi.isValidDrop(this.props.isRoot, this.state.steps, drop.position, drop.step)) {
            drop.element?.classList.add("hover");
        }
    };

    onDragLeave = (evt: React.DragEvent) => {
        evt.preventDefault();
        evt.stopPropagation();
        const e: Element = evt.target as Element;
        const stepElement = e.closest(".route-step");
        stepElement?.classList.remove("hover")
    };

    onDragEnd = (evt: React.DragEvent) => {
        evt.currentTarget.classList.remove("dragging-route-step");
    };

    showArrow = (step: RouteStep, rowIndex: number): boolean => {
        if (step.type === 'from') {
            return false;
        } else if (step.type === 'when') {
            return false;
        } else {
            return this.state.steps.length - 1 !== rowIndex;
        }
    };

    render() {
        return (
            <div className="route-builder" style={{display: this.props.display}}>
                {this.state.steps.map((step, idx) => (
                    <div key={step.uid}
                         id={step.uid}
                         draggable="false"
                         onDrop={this.onDrop}
                         onDragEnd={this.onDragEnd}
                         onDragStart={this.onDragStart}
                         onDragOver={this.onDragOver}
                         onDragLeave={this.onDragLeave}
                         className={step.type ? "dropper" : "dropper empty"}
                    >
                        <RouteStepNode
                            onAddChild={this.addChild}
                            onAddStep={this.addStep}
                            onDeleteStep={this.deleteStep}
                            onSelectStep={this.selectStep}
                            step={step}
                            stepParent={this.props.stepParent}
                            showArrow={this.showArrow(step, idx)}/>
                    </div>
                ))}
            </div>
        );
    }
}
