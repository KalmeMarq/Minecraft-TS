import Widget from "../Widget";

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
        const a = new Audio('resources/assets/minecraft/sounds/click_stereo.ogg');
        a.volume = 0.2;
        a.play();
        this.PressFunc();
        return true;
      }
    } else return false;
  }
}
