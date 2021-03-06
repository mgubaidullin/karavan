import {CamelElement, FromStep, Integration, ProcessorStep} from "../model/CamelModel";
import {CamelMetadataApi, PropertyMeta} from "./CamelMetadata";
import {CamelApi} from "./CamelApi";

export class CamelApiExt {

    static addStepToIntegration = (integration: Integration, step: CamelElement, parentId: string): Integration => {
        if (step.dslName === 'fromStep') {
            integration.spec.flows.push(step as FromStep);
        } else {
            const flows = CamelApi.addStep(integration.spec.flows, step, parentId);
            integration.spec.flows = flows as FromStep[];
        }
        return integration;
    }

    static deleteStepFromIntegration = (integration: Integration, uuidToDelete: string): Integration => {
        const flows = CamelApi.deleteStep(integration.spec.flows, uuidToDelete);
        integration.spec.flows = flows as FromStep[];
        return integration;
    }

    static getExpressionLanguage = (element: CamelElement | undefined): string | undefined => {
        const el: any = Object.assign({}, element);
        if (el.hasOwnProperty('expression') && el.expression) {
            return el.expression.language
        } else {
            return undefined;
        }
    }

    static getExpressionValue = (element: CamelElement | undefined): string | undefined => {
        const language = CamelApiExt.getExpressionLanguage(element);
        if (language) {
            return (element as any).expression[language];
        } else {
            return undefined;
        }
    }

    static updateIntegration = (integration: Integration, e: CamelElement, updatedUuid: string): Integration => {
        const int: Integration = new Integration({...integration});
        const flows = integration.spec.flows.map(f => CamelApiExt.updateElement(f, e) as FromStep)
        const flows2 = flows.map(f => CamelApi.createFrom(f));
        int.spec.flows = flows2
        return int;
    }

    static updateElement = (element: CamelElement, e: CamelElement): CamelElement => {
        if (element.uuid === e.uuid) {
            return e;
        }
        const result: any = Object.assign({}, element)
        Object.keys(result).forEach(key => {
            if (result[key] instanceof CamelElement) {
                result[key] = CamelApiExt.updateElement(result[key], e)
            } else if (Array.isArray(result[key])) {
                result[key] = CamelApiExt.updateElements(result[key], e)
            }
        })
        return result as CamelElement
    }

    static updateElements = (elements: CamelElement[], e: CamelElement): CamelElement[] => {
        const result: any[] = []
        elements.forEach(element => {
            const newElement = CamelApiExt.updateElement(element, e)
            result.push(newElement)
        })
        return result
    }


    static getElementProperties = (name: string | undefined): PropertyMeta[] => {
        const result: PropertyMeta[] = []
        let uri = undefined;
        let expression = undefined;
        let parameters = undefined;
        if (name)
            CamelMetadataApi.getElementMeta(name)?.properties
                .filter(p => p.name !== 'steps' && p.name !== 'inheritErrorHandler')
                .filter(p => !p.isObject || (p.isObject && p.name === 'expression'))
                .forEach(p => {
                    switch (p.name) {
                        case 'uri':
                            uri = p;
                            break
                        case 'expression':
                            expression = p;
                            break
                        case 'parameters':
                            parameters = p;
                            break
                        default:
                            result.push(p)
                    }
                })
        if (uri) result.unshift(uri)
        if (expression) result.unshift(expression)
        if (parameters) result.push(parameters)
        return result
    }

    static getParametersValue = (element: CamelElement | undefined, propertyName: string): any => {
        if (element && (element as any).parameters) {
            return (element as any).parameters[propertyName];
        }
    }

    static getToStepsFromIntegration = (integration: Integration): [CamelElement, number][] => {
        const result: [CamelElement, number][] = [];
        integration.spec.flows.forEach((flow, index) => {
            const steps: [CamelElement, number][] = CamelApiExt.getToStepsFromStep(flow.from, 0);
            result.push(...steps);
        })
        return result;
    }

    static getToStepsFromStep = (step: ProcessorStep, level: number): [CamelElement, number][] => {
        const result: [CamelElement, number][] = [];
        if (step.dslName === 'toStep') result.push([step, level]);
        const element: any = Object.assign({}, step);
        Object.keys(element).forEach(key => {
            if (element[key] instanceof CamelElement) {
                const steps = CamelApiExt.getToStepsFromStep(element[key], level + 1);
                result.push(...steps);
            } else if (Array.isArray(element[key])) {
                const parallel = element.dslName === 'multicast' || element.dslName === 'choice';
                const increase = element.dslName === 'otherwise' ? 3 : 1;
                const steps = CamelApiExt.getStepsFromSteps(element[key], level + increase, parallel);
                result.push(...steps);
            }
        })
        return result;
    }

    static getStepsFromSteps = (steps: CamelElement[], level: number, parallel: boolean): [CamelElement, number][] => {
        const result: [CamelElement, number][] = [];
        steps.forEach((step,index) => {
            const steps = CamelApiExt.getToStepsFromStep(step, level + (parallel ? 1 : index));
            result.push(...steps);
        })
        return result;
    }
}
