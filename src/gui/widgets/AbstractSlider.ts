import SoundHandler from "@mcsrc/audio/SoundHandler";
import MathHelper from "@mcsrc/new/util/MathHelper";
import Minecraft from "../../Minecraft";
import AbstractGui from "../AbstractGui";
import Widget from "./Widget";

export default abstract class AbstractSlider extends Widget {
  protected sliderValue: number;

  constructor(x: number, y: number, width: number, height: number, message: string, defaultValue: number) {
    super(x, y, width, height, message);
    this.sliderValue = defaultValue;
  }

   protected getYImage(isHovered: boolean): number {
     return 0;
   }

  protected renderBg(context: CanvasRenderingContext2D, minecraft: Minecraft, mouseX: number, mouseY: number) {
    let i = (this.getIsHovered() ? 2 : 1) * 20;
    const widgetsTexture = minecraft.getTextureManager().getTexture(Widget.WIDGETS_LOCATION);
    AbstractGui.blit(context, widgetsTexture, this.x + (this.sliderValue * (this.width - 8)), this.y, 0, 46 + i, 4, 20);
    AbstractGui.blit(context, widgetsTexture, this.x + (this.sliderValue * (this.width - 8)) + 4, this.y, 196, 46 + i, 4, 20);
  }

  public onClick(mouseX: number, mouseY: number) {
    this.changeSliderValue(mouseX);
  }

  public keyPressed(keyName: string, modifiers: any): boolean {
    if(this.isFocused()) {
      let isLeftArrow = keyName == 'ArrowLeft';
      if (isLeftArrow || keyName == 'ArrowRight') {
        let f = isLeftArrow ? -1.0 : 1.0;
        this.setSliderValue(this.sliderValue + (f / (this.width - 8)));
      }
    }
    return false;
  }

  private changeSliderValue(mouseX: number) {
    this.setSliderValue((mouseX - (this.x + 4)) / (this.width - 8));
  }

  protected setSliderValue(value: number) {
    let decimalValue = this.sliderValue;
    this.sliderValue = MathHelper.clamp(value, 0.0, 1.0);
    if (decimalValue != this.sliderValue) {
      this.setSaveOptionValue();
    }

    this.setName();
  }

  public onDrag(mouseX: number, mouseY: number, dragX: number, dragY: number): void {
    this.changeSliderValue(mouseX);
    super.onDrag(mouseX, mouseY, dragX, dragY);
  }

  public playDownSound(handler: SoundHandler) {
  }

  public onRelease(mouseX: number, mouseY: number) {
    super.playDownSound(Minecraft.getInstance().getSoundHandler());
  }

  protected abstract setName(): void;
  protected abstract setSaveOptionValue(): void;
}
