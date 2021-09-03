import {
    ChoiceStep,
    ComponentStep,
    EmptyStep,
    FilterStep,
    FromStep,
    RouteStep,
    ToStep,
    WhenStep
} from "../model/RouteModels";
import {KameletApi} from "./KameletApi";
import {Kamelet, Property} from "../model/KameletModels";

export class RouteStepApi {

    static addEmptyStepsIfRequired = (steps: RouteStep[], parent?: RouteStep): RouteStep[] => {
        const result: RouteStep[] = [];
        steps.forEach(s => {
            s.steps = RouteStepApi.addEmptyStepsIfRequired(s.steps, s);
            result.push(s);
        })
        if (parent
            && ['from', 'when', 'otherwise', 'filter'].includes(parent.type)
            && result.length > 0
            && result[result.length-1].type !== 'empty'){
            result.push(new EmptyStep())
        }
        return result;
    }

    static selectStep = (steps: RouteStep[], step: RouteStep): RouteStep[] => {
        const result: RouteStep[] = [];
        steps.forEach(s => {
            s.selected = s.uid === step.uid;
            s.steps = RouteStepApi.selectStep(s.steps, step);
            result.push(s);
        })
        return result;
    }

    static updateStep = (steps: RouteStep[], step: RouteStep): RouteStep[] => {
        const result: RouteStep[] = [];
        steps.forEach(s => {
            if (s.uid === step.uid) {
                result.push(step);
            } else {
                s.steps = RouteStepApi.updateStep(s.steps, step);
                result.push(s);
            }
        })
        return RouteStepApi.selectStep(result, step);
    }

    static isValidDrop = (isRoot: boolean, steps: RouteStep[], position: number, droppingStep?: RouteStep, draggingStep?: RouteStep): boolean => {
        if (isRoot && steps.length === 1) {
            return draggingStep?.type === 'from';
        } else if (draggingStep?.type === 'from') {
            return false;
        } else if (droppingStep?.type === 'from') {
            return false;
        } else if (droppingStep?.type === 'when') {
            return (droppingStep as WhenStep).steps.length === 0;
        } else if (draggingStep?.type === 'from' && position !== 0) {
            return false;
        } else if (droppingStep?.uid === draggingStep?.uid) {
            return false;
        }
        return true;
    };

    private static move = (input: RouteStep[], from: number, to: number): RouteStep[] => {
        let numberOfDeletedElm = 1;
        const elm = input.splice(from, numberOfDeletedElm)[0];
        numberOfDeletedElm = 0;
        input.splice(to, numberOfDeletedElm, elm);
        return input;
    }

    static addStep = (steps: RouteStep[], step: RouteStep, position: number, move: boolean, parent?: RouteStep): RouteStep[] => {
        const result: RouteStep[] = [];
        if (parent) {
            result.push(...RouteStepApi.addStepIn(steps, step, position, move, parent));
        } else {
            if (move) {
                const from: number = steps.findIndex(s => s.uid === step.uid);
                result.push(...RouteStepApi.move(steps, from, position));
            } else if (steps.length === 1 && step.type === 'from') {
                result.push(step);
            } else {
                result.push(...steps);
                result.splice(position, 0, step);
            }
        }
        return RouteStepApi.selectStep(result, step);
    }

    private static addStepIn = (steps: RouteStep[], step: RouteStep, position: number, move: boolean, parent: RouteStep): RouteStep[] => {
        const result: RouteStep[] = [];
        steps.forEach(s => {
            if (s.uid === parent.uid) {
                if (move) {
                    const from: number = s.steps.findIndex(s => s.uid === step.uid);
                    if (position !== s.steps.length - 1) { // do not move to placeholder
                        s.steps = RouteStepApi.move(s.steps, from, position);
                    }
                } else {
                    s.steps.splice(position, 0, step);
                }
            } else {
                s.steps = RouteStepApi.addStepIn(s.steps, step, position, move, parent);
            }
            result.push(s);
        })
        return result;
    }

    static deleteStepById = (steps: RouteStep[], uid: string): RouteStep[] => {
        const result: RouteStep[] = [];
        steps.forEach(step => {
            if (step.uid !== uid) {
                step.steps = RouteStepApi.deleteStepById(step.steps, uid);
                result.push(step);
            }
        })
        return result;
    }

    static deleteEmptySteps = (steps: RouteStep[]): RouteStep[] => {
        const result: RouteStep[] = [];
        steps.forEach(step => {
            if (step.type !== 'empty') {
                step.steps = RouteStepApi.deleteEmptySteps(step.steps);
                result.push(step);
            }
        })
        return result;
    }

    static addChild = (steps: RouteStep[], step: RouteStep): RouteStep[] => {
        const result: RouteStep[] = [];
        steps.forEach(s => {
            if (s.uid === step.uid) {
                if (step.type === 'choice') {
                    s.steps.push(new WhenStep())
                }
            }
            s.steps = RouteStepApi.addChild(s.steps, step);
            result.push(s);
        })
        return result;
    }

    static getRoutingSteps = (): RouteStep[] => {
        const filter = new FilterStep({});
        const choice = new ChoiceStep();
        return [filter, choice];
    }

    static getStepCaption = (step: RouteStep, stepParent?: RouteStep): String => {
        switch (step.type) {
            case 'to':
                const to = (step as ToStep);
                return 'To: ' + (to.component === 'kamelet' && to.path ? KameletApi.findKameletByName(to.path + '').spec.definition.title : '');
            case 'from':
                const from = (step as ToStep);
                return 'From: ' + (from.component === 'kamelet' && from.path ? KameletApi.findKameletByName(from.path + '').spec.definition.title : '');
            case 'empty':
                return stepParent === undefined ? "Drop source here" : "Drop component here";
            default:
                return step.type[0].toUpperCase() + step.type.substring(1);
        }
    }

    static fromKamelet = (kamelet: Kamelet): ComponentStep => {
        const properties: Property[] = KameletApi.getKameletProperties(kamelet.metadata.name);
        return kamelet.type() === 'source'
            ? new FromStep({component: "kamelet", path: kamelet.metadata.name, properties: properties})
            : new ToStep({component: "kamelet", path: kamelet.metadata.name, properties: properties})
    }
    static fromTransferKamelet = (json: string): RouteStep => {
        const k: Kamelet = new Kamelet(JSON.parse(json));
        return RouteStepApi.fromKamelet(k);
    }
    static fromTransferJson = (json: string): RouteStep => {
        const step = new RouteStep(JSON.parse(json));
        switch (step.type) {
            case 'filter':
                return new FilterStep(step);
            case 'choice':
                return new ChoiceStep(step);
            case 'to':
                return new ToStep(step);
            case 'from':
                return new FromStep(step);
            default:
                return new EmptyStep();
        }
    }

    static nameFomTitle = (title: string): string => {
        return title.replace(/[^a-z0-9+]+/gi, '-').toLowerCase()
    }

    static titleFromName = (name?: string) => {
        return name ?
            name
                .replace(".yaml", '')
                .split('-')
                .map(value => RouteStepApi.capitalizeName(value))
                .reduce((previousValue, currentValue) => previousValue + " " + currentValue)
            : name;
    }

    static capitalizeName = (name: string) => {
        try {
            return name[0].toUpperCase() + name.substring(1);
        } catch (e) {
            return name;
        }
    }
}