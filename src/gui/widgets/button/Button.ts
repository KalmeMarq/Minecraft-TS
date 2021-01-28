import Widgets from "../Widget.js";

class Button extends Widgets {
  private onPress: Function;

  constructor(x: number, y: number, width: number, height: number, title: string, onPress: Function) {
    super(x, y, width, height, title);
    this.onPress = onPress;
  }

  mouseClicked(mouseX: number, mouseY: number, button: number) {
    if(mouseX > this.x && mouseY > this.y && mouseX < this.x + this.width && mouseY < this.y + this.height) {
      this.onPress();
      const a = new Audio('resources/assets/minecraft/sounds/click_stereo.ogg');
      a.volume = 0.2;
      a.play();
    }
  }

  mouseReleased() {

  }
}

export default Button;