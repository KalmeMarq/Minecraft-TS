import playSound from "../../../util/PlaySound";
import Widget from "../Widget";

export default abstract class AbstractButton extends Widget {
  constructor(x: number, y: number, width: number, height: number, title: string) {
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
        playSound('sounds/click_stereo', 0.2);
        this.onPress();
        return true;
      }
    } else return false;
  }
}
