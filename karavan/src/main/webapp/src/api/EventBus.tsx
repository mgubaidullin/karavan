import {Subject} from 'rxjs';
import {CamelElement} from "../model/CamelModel";
import {CamelMetadataApi} from "./CamelMetadata";
import {CamelUi} from "./CamelUi";

const positions = new Subject<DslPosition>();

export class DslPosition {
    step: CamelElement = new CamelElement("")
    rect: DOMRect = new DOMRect()

    constructor(step: CamelElement, rect: DOMRect) {
        this.step = step;
        this.rect = rect;
    }
}

export class Incoming {
    uuid: string = ''
    icon: string = CamelUi.getIconForName("");
    top: number = 0;
    right: number = 0;

    constructor(uuid: string, icon: string, top: number, right: number) {
        this.uuid = uuid;
        this.icon = icon;
        this.top = top;
        this.right = right;
    }
}

export const EventBus = {
    sendPosition: (step: CamelElement, rect: DOMRect) => positions.next(new DslPosition(step, rect)),
    onPosition: () => positions.asObservable(),
};
