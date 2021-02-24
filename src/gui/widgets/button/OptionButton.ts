import AbstractOption from "@km.mcts/settings/AbstractOption";
import Button from "./Button"

export default class OptionButton extends Button {
  private enumOptions: AbstractOption;

  constructor(x: number, y: number, width: number, height: number, enumOptions: any, title: string, onPressFunc: (button: Button) => void) {
    super(x, y, width, height, title, onPressFunc);
    this.enumOptions = enumOptions;
  }
}