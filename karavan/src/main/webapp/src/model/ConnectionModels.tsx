import {CamelUi} from "../api/CamelUi";

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

export class Outgoing {
  uuid: string = ''
  icon: string = CamelUi.getIconForName("");
  top: number = 0;
  left: number = 0;

  constructor(uuid: string, icon: string, top: number, left: number) {
    this.uuid = uuid;
    this.icon = icon;
    this.top = top;
    this.left = left;
  }
}

export class Path {
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