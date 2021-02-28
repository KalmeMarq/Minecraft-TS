import SliderPercentageOption from "@mcsrc/settings/SliderPercentageOption";
import GameSettings from "../../GameSettings";
import Minecraft from "../../Minecraft";
import { GameSettingsSlider } from "./GameSettingsSlider";
import Widgets from "./Widget";

export default class OptionSlider extends GameSettingsSlider {
  private option: SliderPercentageOption;

  constructor(settings: GameSettings, xIn: number, yIn: number, widthIn: number, heightIn: number, optionIn: SliderPercentageOption) {
    super(settings, xIn, yIn, widthIn, heightIn, (optionIn.normalizeValue(optionIn.get(settings))));
    this.option = optionIn;
    this.setName();
  }

  protected setSaveOptionValue() {
    this.option.set(this.settings, this.option.denormalizeValue(this.sliderValue));
    this.settings.saveOptions();
  }

  protected setName() {
    this.setMessage(this.option.getName(this.settings));
  }
}
