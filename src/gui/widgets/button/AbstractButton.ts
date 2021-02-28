import Minecraft from "@mcsrc/Minecraft";
import TranslationTextComponent from "@mcsrc/util/text/TranslationTextComponent";
import Widget from "../Widget";

export default abstract class AbstractButton extends Widget {
  constructor(x: number, y: number, width: number, height: number, title: string | TranslationTextComponent) {
    super(x, y, width, height, title);
  }

  public abstract onPress(): void;

  public onClick(mouseX: number, mouseY: number): void {
    this.onPress();
  }

  public keyPressed(keyName: string, modifiers: any) {
    if(this.active && this.visible && this.getIsHovered()) {
      if(keyName != 'Enter' && keyName != ' ') {
        return false;
      } else {
        this.playDownSound(Minecraft.getInstance().getSoundHandler())
        this.onPress();
        return true;
      }
    } else return false;
  }
}