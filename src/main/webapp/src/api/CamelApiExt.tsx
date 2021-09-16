import {CamelElement, FilterStep, FromStep, Integration, ProcessorStep} from "../model/CamelModel";
import {CamelMetadataApi, PropertyMeta} from "./CamelMetadata";
import {CamelApi} from "./CamelApi";

export class CamelApiExt {

    static addStepToIntegration = (integration: Integration, step: CamelElement, parentId: string): Integration => {
        if (step.dslName === 'fromStep') {
            integration.spec.flows.push(step as FromStep);
        } else {
            const flows = CamelApiExt.addStep(integration.spec.flows, step, parentId);
            integration.spec.flows = flows as FromStep[];
        }
        return integration;
    }

    static addStep = (steps: ProcessorStep[], step: ProcessorStep, parentId: string): ProcessorStep[] => {
        console.log(step);
        const result: ProcessorStep[] = [];
        steps.forEach(el => {
            console.log(el.dslName + " step uuid " + el.uuid);
            console.log("parent          " + parentId);
            switch (el.dslName) {
                case 'fromStep':
                    const fromSteps = (el as FromStep).from?.steps || [];
                    if (el.uuid === parentId) fromSteps.push(step);
                    (el as FromStep).from.steps = CamelApiExt.addStep(fromSteps, step, parentId);
                    break;
                case 'filterStep':
                    const filterSteps = (el as FilterStep).filter?.steps || [];
                    if (el.uuid === parentId) filterSteps.push(step);
                    (el as FilterStep).filter.steps = CamelApiExt.addStep(filterSteps, step, parentId);
                    break;
                case 'choiceStep':
                case 'otherwiseStep':
            }
            result.push(el);
        })
        return result;
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
        console.log(element)
        if (element && (element as any).parameters) {
            return (element as any).parameters[propertyName];
        }
    }
}
