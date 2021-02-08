import GameSettings from "../../GameSettings.js";
import Minecraft from "../../Minecraft.js";
import SliderPercentageOption from "../../settings/SliderPercentageOption.js";
import MathHelper from "../../utils/MathHelper.js";
import { double, float, int } from "../../utils/MouseHelper.js";
import { GameSettingsSlider } from "./GameSettingsSlider.js";
import Widgets from "./Widget.js";

/* export default class OptionSlider extends Widgets {
  protected settings: GameSettings;
  protected sliderValue: number;
  private option: SliderPercentageOption;

  constructor(settings: GameSettings, xIn: number, yIn: number, widthIn: number, heightIn: number, optionIn: SliderPercentageOption) {
    super(xIn, yIn, widthIn, heightIn, '');
    this.settings = settings;
    this.option = optionIn;
    this.sliderValue = (optionIn.normalizeValue(optionIn.get(settings)));
    this.func_230979_b_();
  }

  protected getYImage(isHovered: boolean): number {
    return 0;
  }

  protected renderBg(context: CanvasRenderingContext2D, minecraft: Minecraft, mouseX: number, mouseY: number) {
    let i = (this.getHovered() ? 2 : 1) * 20;
    this.blit(context, this.WIDGETS,this.x + (this.sliderValue * (this.width - 8)), this.y, 0, 46 + i, 4, 20);
    this.blit(context, this.WIDGETS,this.x + (this.sliderValue * (this.width - 8)) + 4, this.y, 196, 46 + i, 4, 20);
  }

  public onClick(mouseX: number, mouseY: number) {
    this.changeSliderValue(mouseX);
  }

  public keyDown(keyName: string, modifiers: any): boolean {
    let flag = keyName == 'ArrowRight';
    if (flag || keyName == 'ArrowLeft') {
      let f = flag ? -1.0 : 1.0;
      this.setSliderValue(this.sliderValue + (f / (this.width - 8)));
    }

    return false;
  }

  private changeSliderValue(mouseX: number) {
    this.setSliderValue((mouseX - (this.x + 4)) / (this.width - 8));
  }

   private setSliderValue(value: number) {
    let d0 = this.sliderValue;
    this.sliderValue = MathHelper.clamp(value, 0.0, 1.0);
    if (d0 != this.sliderValue) {
      this.setSaveOptionValue();
    }
  }

  public mouseDragged(mouseX: number, mouseY: number, dragX: number, dragY: number) {
    this.changeSliderValue(mouseX);
    return true
  }

  protected setSaveOptionValue() {
    this.option.set(this.settings, this.option.denormalizeValue(this.sliderValue));
    this.settings.saveOptions();
  }

  protected func_230979_b_() {
    this.setMessage(this.option.getName(this.settings));
  }
} */


export default class OptionSlider extends GameSettingsSlider {
  private option: SliderPercentageOption;

  constructor(settings: GameSettings, xIn: number, yIn: number, widthIn: number, heightIn: number, optionIn: SliderPercentageOption) {
    super(settings, xIn, yIn, widthIn, heightIn, (optionIn.normalizeValue(optionIn.get(settings))));
    this.option = optionIn;
    this.func_230979_b_();
  }

  protected setSaveOptionValue() {
    this.option.set(this.settings, this.option.denormalizeValue(this.sliderValue));
    this.settings.saveOptions();
  }

  protected func_230979_b_() {
    this.setMessage(this.option.getName(this.settings));
  }
}
