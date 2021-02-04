import Button from "./Button.js"

export default class OptionButton extends Button {
  private /* AbstractOption */ enumOptions;

  constructor(x: number, y: number, width: number, height: number, enumOptions: any, title: string, PressFunc: Function) {
    super(x, y, width, height, title, PressFunc);
    this.enumOptions = enumOptions;
  }
}