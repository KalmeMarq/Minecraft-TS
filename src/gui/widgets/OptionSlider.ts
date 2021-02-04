import GameSettings from "../../GameSettings.js";
import Minecraft from "../../Minecraft.js";
import MathHelper from "../../utils/MathHelper.js";
import { int } from "../../utils/MouseHelper.js";
// import SliderPercentageOption from "../../settings/SliderPercentageOption";
import { GameSettingsSlider } from "./GameSettingsSlider.js";
import Widgets from "./Widget.js";

export default class OptionSlider extends Widgets {
  // protected func_230979_b_(): void {
  //   throw new Error("Method not implemented.");
  // }
  // protected func_230972_a_(): void {
  //   throw new Error("Method not implemented.");
  // }
  protected settings: GameSettings;
  protected sliderValue: number;
  private option: any;

   constructor(settings: GameSettings, xIn: number, yIn: number, widthIn: number, heightIn: number, defaultValue: number) {
      super(xIn, yIn, widthIn, heightIn, '');
      console.log(defaultValue);
      this.option = defaultValue;
      this.settings = settings;
      this.sliderValue = defaultValue;
      this.setMessage('Chat Scale: ' + int(defaultValue * 100) + '%')
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
      console.log(this.sliderValue);
      this.setSaveOptionValue(this.option);
    }
  }

   protected setSaveOptionValue(oqption: any): void {
      // this.option = ~~this.sliderValue /* .set(this.settings, this.option.denormalizeValue(this.sliderValue)) */;
    this.settings.chatScale = this.sliderValue;
      this.settings.saveOptions();
   }

   protected func_230979_b_(): void {
      // this.setMessage(this.option.func_238334_c_(this.settings));
   }

    public mouseDragged(mouseX: number, mouseY: number, dragX: number, dragY: number) {
      this.changeSliderValue(mouseX);
      return true
    }


  //  public func_241867_d() {
  //    /*  return this.option.getOptionValues(); */
  //  }
}
