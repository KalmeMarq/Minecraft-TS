import Widget from "../Widget.js";

export default abstract class AbstractButton extends Widget {
  constructor(x: number, y: number, width: number, height: number, title: string) {
    super(x, y, width, height, title);
  }

  public abstract onPress(): void;

  public onClick(mouseX: number, mouseY: number): void {
    this.onPress();
  }

  public keyPressed(keyS: string) {
    if(this.active && this.visible) {
      if(keyS != 'mouse right click' && keyS != 'mouse left click' && keyS != 'mouse middle click') {
        return false;
      } else {
        this.onPress();
        return true;
      }
    } else {
      return false;
    }
  }
}
