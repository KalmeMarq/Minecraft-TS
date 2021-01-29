import Widgets from "../Widget.js";

class Button extends Widgets {
  private onPress: Function;

  constructor(x: number, y: number, width: number, height: number, title: string, onPress: Function) {
    super(x, y, width, height, title);
    this.onPress = onPress;
  }

  mouseClicked(mouseX: number, mouseY: number, button: number) {
    if(this.clicked(mouseX, mouseY)) {
      this.onPress();
      const a = new Audio('resources/assets/minecraft/sounds/click_stereo.ogg');
      a.volume = 0.2;
      a.play();
    }
  }

  mouseReleased() {

  }

  keyDown(key: string, modifiers: {}) {
    if(this.focused && key === 'Enter') {
      this.focused = false;
      this.onPress();
      const a = new Audio('resources/assets/minecraft/sounds/click_stereo.ogg');
      a.volume = 0.2;
      a.play();
    }
  }
}

export default Button;