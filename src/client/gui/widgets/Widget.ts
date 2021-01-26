export default abstract class Widget {
  protected width: number;
  protected height: number;
  public x: number;
  public y: number;
  public message: string;
  private wasHovered: boolean = false;
  protected isHovered: boolean = false;
  public active = true;
  public visible = true;
  protected focused: boolean;

  constructor(x: number, y: number, width: number, height: number, title: string) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.message = title;
    this.focused = false;
  }

  public getHeightRealms() {
    return this.height;
  }

  protected getYImage(isHovered: boolean) {
    let i = 1;
    if (!this.active) i = 0;
    else if (isHovered) i = 2;
    return i;
  }

  public render(mouseX: number, mouseY: number) {
    if (this.visible) {
       this.isHovered = mouseX >= this.x && mouseY >= this.y && mouseX < this.x + this.width && mouseY < this.y + this.height;

       if (this.visible) {
          this.renderButton(mouseX, mouseY);
       }

       this.wasHovered = this.getHovered();
    }
  }

  public renderButton(mouseX: number, mouseY: number) {
  }

  protected renderBg(mouseX: number, mouseY: number) {
  }

  public onClick(mouseX: number, mouseY: number) {
  }

  public onRelease(mouseX: number, mouseY: number) {
  }

  protected onDrag(mouseX: number, mouseY: number, dragX: number, dragY: number) {
  }

  public mouseClicked(mouseX: number, mouseY: number, button: number) {
      if (this.active && this.visible) {
        if (this.isValidClickButton(button)) {
            let flag = this.clicked(mouseX, mouseY);
            if (flag) {
              this.onClick(mouseX, mouseY);
              return true;
            }
        }

        return false;
      } else {
        return false;
  }
}

 public mouseReleased(mouseX: number, mouseY: number, button: number) {
    if (this.isValidClickButton(button)) {
       this.onRelease(mouseX, mouseY);
       return true;
    } else {
       return false;
    }
 }

  protected isValidClickButton(button: number) {
    return button == 0;
  }

 public mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number) {
    if (this.isValidClickButton(button)) {
       this.onDrag(mouseX, mouseY, dragX, dragY);
       return true;
    } else {
       return false;
    }
 }

 protected clicked(mouseX: number, mouseY: number) {
    return this.active && this.visible && mouseX >= this.x && mouseY >= this.y && mouseX < (this.x + this.width) && mouseY < (this.y + this.height);
 }

 public getHovered() {
    return this.isHovered || this.focused;
 }

 public changeFocus(focus: boolean) {
    if (this.active && this.visible) {
       this.focused = !this.focused;
       this.onFocusedChanged(this.focused);
       return this.focused;
    } else {
       return false;
    }
 }

 protected onFocusedChanged(focused: boolean) {
 }

 public isMouseOver(mouseX: number, mouseY: number) {
    return this.active && this.visible && mouseX >= this.x && mouseY >= this.y && mouseX < (this.x + this.width) && mouseY < (this.y + this.height);
 }

 public renderToolTip(mouseX: number, mouseY: number) {
 }

 public playDownSound() {
 }

  public getWidth(): number {
    return this.width;
  }

  public setWidth(width: number): void {
    this.width = width;
  }

  public setAlpha(alpha: number): void {
    // this.alpha = alpha;
 }

 public isFocused(): boolean {
    return this.focused;
 }

 protected setFocused(focused: boolean) {
    this.focused = focused;
 }
}