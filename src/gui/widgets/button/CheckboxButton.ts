import { checkboxImg } from "../../../utils/GetResources";
import AbstractButton from "./AbstractButton";

export class CheckboxButton extends AbstractButton {
  // public PressFunc: any;
  private TEXTURE = checkboxImg;
  public checked: boolean = false;
  private field_238499_c_: boolean | any;

  constructor(x: number, y: number, width: number, height: number, title: string,/*  checked: boolean, */ stored: CheckboxButton) {
    super(x, y, width, height, title);  
    // this.checked = checked;
    if (stored != null) {
      this.setChecked(stored.isChecked());
    }
  }

  public onPress(): void {
    this.checked = !this.checked;
  }

  public onClick(mouseX: number, mouseY: number): void {
    this.onPress()
  }

  public isChecked(): boolean {
    return this.checked;
  }

  public setChecked(state: boolean): void {
    this.checked = state;
  }

  public renderButton(context: CanvasRenderingContext2D, mouseX: number, mouseY: number) {
    this.blit(context, this.TEXTURE, this.x, this.y, this.getHovered() ? 20 : 0, this.checked ? 20 : 0, 20, this.height);
    // this.renderBg(context, minecraft, mouseX, mouseY);
    // if(this.field_238499_c_) {
        this.drawString(context, this.getMessage(), this.x + 24, this.y + (this.height - 8) / 2, 14737632);
    // }
  }
}
