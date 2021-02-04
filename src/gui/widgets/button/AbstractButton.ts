import { playSound } from "../../../utils/PlaySound.js";
import Widget from "../Widget.js";

export default abstract class AbstractButton extends Widget {
  public PressFunc: any;

  constructor(x: number, y: number, width: number, height: number, title: string) {
    super(x, y, width, height, title);
  }

  public onClick(mouseX: number, mouseY: number): void {
    this.PressFunc();
  }

  public keyDown(keyName: string, modifiers: any) {
    if(this.active && this.visible && (this.isHovered || this.focused)) {
      if(keyName != 'Enter' && keyName != ' ') {
        return false;
      } else {
        playSound('sounds/click_stereo', 0.2);
        this.PressFunc();
        return true;
      }
    } else return false;
  }
}
