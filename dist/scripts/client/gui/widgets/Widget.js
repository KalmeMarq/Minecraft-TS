export default class Widget {
    constructor(x, y, width, height, title) {
        this.wasHovered = false;
        this.isHovered = false;
        this.active = true;
        this.visible = true;
        this.focused = false;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.message = title;
    }
}
