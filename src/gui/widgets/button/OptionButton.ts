import Button from "./Button"

export default class OptionButton extends Button {
  private /* AbstractOption */ enumOptions;

  constructor(x: number, y: number, width: number, height: number, enumOptions: any, title: string, onPress: Function) {
    super(x, y, width, height, title, onPress);
    this.enumOptions = enumOptions;
  }
}