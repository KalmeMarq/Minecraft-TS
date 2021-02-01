import Widgets from "../Widget";
import AbstractButton from "./AbstractButton";

export default class Button extends AbstractButton {
  constructor(x: number, y: number, width: number, height: number, title: string, PressFunc: Function) {
    super(x, y, width, height, title);
    this.PressFunc = PressFunc;
  }
}