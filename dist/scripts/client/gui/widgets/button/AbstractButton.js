import Widget from "../Widget.js";
export default class AbstractButton extends Widget {
    constructor(x, y, width, height, title) {
        super(x, y, width, height, title);
    }
    onClick(mouseX, mouseY) {
        this.onPress();
    }
    keyPressed(keyS) {
        if (this.active && this.visible) {
            if (keyS != 'mouse right click' && keyS != 'mouse left click' && keyS != 'mouse middle click') {
                return false;
            }
            else {
                this.onPress();
                return true;
            }
        }
        else {
            return false;
        }
    }
}
