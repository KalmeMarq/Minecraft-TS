import IGuiEventListener from "../../../util/interfaces/IGuiEventListener";
import IRenderable from "../../../util/interfaces/IRenderable";
import Minecraft from "../../Minecraft";

export default class RecipeBookGui implements IRenderable, IGuiEventListener {
  protected mc: Minecraft;
  private xOffset: number;
  private width: number;
  private height: number;

  public constructor(mcIn: Minecraft, width: number, height: number) {
    this.mc = mcIn;
    this.width = width;
    this.height = height;
    this.xOffset = 0;
  }

  render(mouseX: number, mouseY: number, partialTicks: number): void {
    return
  }

  mouseMoved(mouseX: number, mouseY: number): void {
    return
  }

  mouseClicked(mouseX: number, mouseY: number, button: number): boolean {
    return false;
  }

  mouseReleased(mouseX: number, mouseY: number, button: number): boolean {
    return false;
  }

  mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): boolean {
    return false;
  }

  mouseScrolled(mouseX: number, mouseY: number, deltaY: number): boolean {
    return false;
  }

  keyPressed(key: string, code: string, action: number): boolean {
    return false;
  }

  keyReleased(key: string, code: string, action: number): boolean {
    return false;
  }

  charTyped(char: number): boolean {
    return false;
  }

  changeFocus(focus: boolean): boolean {
    return false;
  }

  isMouseOver(mouseX: number, mouseY: number): boolean {
    return false;
  }
}