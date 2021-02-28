import AbstractOption from "@mcsrc/settings/AbstractOption";
import TranslationTextComponent from "@mcsrc/util/text/TranslationTextComponent";
import Button from "./Button"

export default class OptionButton extends Button {
  private enumOptions: AbstractOption;

  constructor(x: number, y: number, width: number, height: number, enumOptions: any, title: string | TranslationTextComponent, onPressFunc: (button: Button) => void) {
    super(x, y, width, height, title, onPressFunc);
    this.enumOptions = enumOptions;
  }
}