import Minecraft from "../../Minecraft.js";
import MathHelper from "../../utils/MathHelper.js";
import { int } from "../../utils/MouseHelper.js";
import Widget from "./Widget.js";

export default abstract class AbstractSlider extends Widget {
   protected sliderValue: number;

  constructor(x: number, y: number, width: number, height: number, message: string, defaultValue: number) {
    super(x, y, width, height, message);
    this.sliderValue = defaultValue;
    this.setMessage('Chat Scale: ' + int(defaultValue * 100) + '%')
  }

   protected getYImage(isHovered: boolean): number {
     return 0;
   }

  protected renderBg(context: CanvasRenderingContext2D, minecraft: Minecraft, mouseX: number, mouseY: number) {
    let i = (this.getHovered() ? 2 : 1) * 20;
    this.blit(context, this.WIDGETS,this.x + (this.sliderValue * this.width - 8), this.y, 0, 46 + i, 4, 20);
    this.blit(context, this.WIDGETS,this.x + (this.sliderValue * this.width - 8) + 4, this.y, 196, 46 + i, 4, 20);
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

  protected setSliderValue(value: number): void {}

  // protected setSliderValue(value: number) {
  //   let d0 = this.sliderValue;
  //   this.sliderValue = MathHelper.clamp(value, 0.0, 1.0);
  //   if (d0 != this.sliderValue) {
  //     console.log(this.sliderValue);
  //     this.setSaveOptionValue();
  //   }

  //   // this.func_230979_b_();
  // }

/*   public mouseDragged(mouseX: number, mouseY: number, dragX: number, dragY: number) {
    this.changeSliderValue(mouseX);
    return true
  } */


  // public onRelease(mouseX: number, mouseY: number) {
  //   // super.playDownSound(Minecraft.getInstance().getSoundHandler());
  // }

  // protected abstract func_230979_b_(): void;

  protected abstract setSaveOptionValue(): void;
}
