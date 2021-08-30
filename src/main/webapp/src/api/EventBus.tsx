import { Subject } from 'rxjs';

const generator = new Subject<string>();
const events = new Subject<string>();

export class KaravanEvent{
    static KAMELETS_PREPARED: string = 'KAMELETS_PREPARED';
}

export const EventBus = {
    sendGenerate: (id: string) => generator.next(id),
    onGenerate: () => generator.asObservable(),

    sendEvent: (evt: string) => events.next(evt),
    onEvent: () => events.asObservable(),

};
