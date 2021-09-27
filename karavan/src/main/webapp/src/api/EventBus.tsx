import {Subject} from 'rxjs';
import {CamelElement} from "../model/CamelModel";

const positions = new Subject<DslPosition>();

export class DslPosition {
    step: CamelElement = new CamelElement("")
    rect: DOMRect = new DOMRect()

    constructor(step: CamelElement, rect: DOMRect) {
        this.step = step;
        this.rect = rect;
    }
}

export const EventBus = {
    sendPosition: (step: CamelElement, rect: DOMRect) => positions.next(new DslPosition(step, rect)),
    onPosition: () => positions.asObservable(),
};
