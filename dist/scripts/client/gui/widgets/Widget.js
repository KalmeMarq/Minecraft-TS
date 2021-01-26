export default class Widget {
    constructor(x, y, width, height, title) {
        this.wasHovered = false;
        this.isHovered = false;
        this.active = true;
        this.visible = true;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.message = title;
        this.focused = false;
    }
    getHeightRealms() {
        return this.height;
    }
    getYImage(isHovered) {
        let i = 1;
        if (!this.active)
            i = 0;
        else if (isHovered)
            i = 2;
        return i;
    }
    render(mouseX, mouseY) {
        if (this.visible) {
            this.isHovered = mouseX >= this.x && mouseY >= this.y && mouseX < this.x + this.width && mouseY < this.y + this.height;
            if (this.visible) {
                this.renderButton(mouseX, mouseY);
            }
            this.wasHovered = this.getHovered();
        }
    }
    renderButton(mouseX, mouseY) {
    }
    renderBg(mouseX, mouseY) {
    }
    onClick(mouseX, mouseY) {
    }
    onRelease(mouseX, mouseY) {
    }
    onDrag(mouseX, mouseY, dragX, dragY) {
    }
    mouseClicked(mouseX, mouseY, button) {
        if (this.active && this.visible) {
            if (this.isValidClickButton(button)) {
                let flag = this.clicked(mouseX, mouseY);
                if (flag) {
                    this.onClick(mouseX, mouseY);
                    return true;
                }
            }
            return false;
        }
        else {
            return false;
        }
    }
    mouseReleased(mouseX, mouseY, button) {
        if (this.isValidClickButton(button)) {
            this.onRelease(mouseX, mouseY);
            return true;
        }
        else {
            return false;
        }
    }
    isValidClickButton(button) {
        return button == 0;
    }
    mouseDragged(mouseX, mouseY, button, dragX, dragY) {
        if (this.isValidClickButton(button)) {
            this.onDrag(mouseX, mouseY, dragX, dragY);
            return true;
        }
        else {
            return false;
        }
    }
    clicked(mouseX, mouseY) {
        return this.active && this.visible && mouseX >= this.x && mouseY >= this.y && mouseX < (this.x + this.width) && mouseY < (this.y + this.height);
    }
    getHovered() {
        return this.isHovered || this.focused;
    }
    changeFocus(focus) {
        if (this.active && this.visible) {
            this.focused = !this.focused;
            this.onFocusedChanged(this.focused);
            return this.focused;
        }
        else {
            return false;
        }
    }
    onFocusedChanged(focused) {
    }
    isMouseOver(mouseX, mouseY) {
        return this.active && this.visible && mouseX >= this.x && mouseY >= this.y && mouseX < (this.x + this.width) && mouseY < (this.y + this.height);
    }
    renderToolTip(mouseX, mouseY) {
    }
    playDownSound() {
    }
    getWidth() {
        return this.width;
    }
    setWidth(width) {
        this.width = width;
    }
    setAlpha(alpha) {
    }
    isFocused() {
        return this.focused;
    }
    setFocused(focused) {
        this.focused = focused;
    }
}
