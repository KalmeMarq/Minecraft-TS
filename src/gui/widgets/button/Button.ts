import Widgets from "../Widget";
import AbstractButton from "./AbstractButton";

export default class Button extends AbstractButton {
  protected onPressFunc: Button.IPressable;
  constructor(x: number, y: number, width: number, height: number, title: string, onPressFunc: Button.IPressable) {
    super(x, y, width, height, title);
    this.onPressFunc = onPressFunc;
  }

  public onPress(): void {
    this.onPressFunc(this);
  }
}

export declare module Button {
  export type IPressable = (button: Button) => void;
}