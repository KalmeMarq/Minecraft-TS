import GameSettings from "@mcsrc/GameSettings";
import AbstractGui from "@mcsrc/gui/AbstractGui";
import FocusableGui from "@mcsrc/gui/FocusableGui";
import GuiScreen from "@mcsrc/gui/screen/GuiScreen";
import IGuiEventListener from "@mcsrc/interface/IGuiEventListener";
import IRenderable from "@mcsrc/interface/IRenderable";
import Minecraft from "@mcsrc/Minecraft";
import AbstractOption from "@mcsrc/settings/AbstractOption";
import { settings } from "cluster";
import { create } from "domain";
import Widget from "../Widget";

export default class TestList extends FocusableGui implements IGuiEventListener, IRenderable {
  protected minecraft: Minecraft;
  protected width: number;
  protected height: number;
  protected itemHeight: number;
  protected yTop: number;
  protected yBottom: number;
  protected children = new Array();

  constructor(mcIn: Minecraft, width: number, height: number, topIn: number, bottomIn: number, itemHeightIn: number) {
    super();
    this.minecraft = mcIn;
    this.width = width;
    this.height = height;
    this.itemHeight = itemHeightIn;
    this.yTop = topIn;
    this.yBottom = bottomIn;
  }

  protected addEntry(entry: any) {
    this.children.push(entry);
    return this.children.length - 1;
 }

  public addOption(p_214334_1_: AbstractOption, p_214334_2_: AbstractOption | null) {
    this.addEntry(Row.create(this.minecraft.gameSettings, this.width, p_214334_1_, p_214334_2_));
  }

  public addOptions(p_214335_1_: AbstractOption[]): void {
    for(let i = 0; i < p_214335_1_.length; i += 2) {
      this.addOption(p_214335_1_[i], i < p_214335_1_.length - 1 ? p_214335_1_[i + 1] : null);
    }
  }

  /* protected getEntryAtPosition(mouseX: number, mouseY: number) {
     let i = this.getRowWidth() / 2;
     let j = 0 + this.width / 2;
     let k = j - i;
     let l = j + i;
     let i1 = Math.floor(mouseY - this.yTop) - 32 + 0 - 4;
     let j1 = i1 / this.itemHeight;
     return (mouseX < 0 && mouseX >= k && mouseX <= l && j1 >= 0 && i1 >= 0 && j1 < this.children.length ? this.getEventListeners().get(j1) : null);
  } */

  public mouseClicked(mouseX: number, mouseY: number, button: number): boolean {
    if(!this.isMouseOver(mouseX, mouseY)) {
      return false;
    } else {
     /*  let e: any = this.getEntryAtPosition(mouseX, mouseY);
      if (e != null) {
        if(e.mouseClicked(mouseX, mouseY, button)) {
          this.setListener(e);
          this.setDragging(true);
          return true;
        }
      } */

      this.children[0].widgets[0].mouseClicked(mouseX, mouseY)
      console.log(this.children[0].widgets[0]);
      

      return false;
    }
  }

  public mouseReleased(mouseX: number, mouseY: number, button: number) {
    return false;
  }

  public isMouseOver(mouseX: number, mouseY: number): boolean {
    return mouseY >= this.yTop && mouseY <= this.yBottom && mouseX >= 0 && mouseX <= this.width;
  }

  protected getRowTop(p_230962_1_: number) {
    return this.yTop + 4 - 0 + p_230962_1_ * this.itemHeight + 0;
  }

  private getRowBottom(p_230948_1_: number) {
    return this.getRowTop(p_230948_1_) + this.itemHeight;
  }

  public getRowLeft(): number {
    return this.width / 2 - this.getRowWidth() / 2 + 2;
  }

  public getRowWidth(): number {
    return 220;
  }

  protected renderList(context: CanvasRenderingContext2D, x: number, y: number, mouseX: number, mouseY: number, partialTicks: number): void {
    let i = this.children.length;

    for(let j = 0; j < i; ++j) {
      let k = this.getRowTop(j);
      let l = this.getRowBottom(j);

      if (l >= this.yTop && k <= this.yBottom) {
        let i1 = y + j * this.itemHeight;
        let j1 = this.itemHeight - 4;
        let e = this.children[j];
        let k1 = this.getRowWidth();
        let j2 = this.getRowLeft();
        e.render(context, j, k, j2, k1, j1, mouseX, mouseY, false, partialTicks);
      }
    }
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number, partialTicks: number): void {
      const src = this.minecraft.textureBuffer.get('options_bg_0');
      const src1 = this.minecraft.textureBuffer.get('options_bg_1');

      context.setTransform(this.minecraft.getMainCanvas().getGuiScaleFactor() + 3 - (3 - this.minecraft.getMainCanvas().getGuiScaleFactor()), 0, 0, this.minecraft.getMainCanvas().getGuiScaleFactor() + 3 - (3 - this.minecraft.getMainCanvas().getGuiScaleFactor()), 0, 0);
      for(let i = 0; i < this.width / 32; i++) {
        for(let j = 0; j < this.height / 32; j++) {
          AbstractGui.blit(context, src, 0 + i * 16, 0 + j * 16, 0, 0, 16, 16);
        }
      }

      for(let i = 0; i < this.width / 32; i++) {
        let h = (this.yBottom - this.yTop) / 32;
        for(let j = 0; j < h; j++) {
          if(j < h - 1) {
            AbstractGui.blit(context, src1, 0 + i * 16, (this.yTop / 2) + j * 16, 0, 0, 16, 16);
          } else {
            AbstractGui.blit(context, src1, 0 + i * 16, (this.yTop / 2) + j * 16, 0, 0, 16, 12);
          } 
        }
      }

      context.setTransform(this.minecraft.getMainCanvas().getGuiScaleFactor(), 0, 0, this.minecraft.getMainCanvas().getGuiScaleFactor(), 0, 0);
    
    this.renderList(context, 0, 0, mouseX, mouseY, partialTicks);
  }
}

class Row {
  private widgets: Array<Widget> = [];
  
  private constructor(widgetsIn: Array<Widget>) {
    this.widgets = widgetsIn;
  }
  
  public static create(settings: GameSettings, guiWidth: number, leftOption: AbstractOption, rightOption: AbstractOption | null) {
    let widget = leftOption.createWidget(settings, guiWidth / 2 - 155, 0, 150);
    return rightOption == null ? new Row([widget]) : new Row([widget, rightOption.createWidget(settings, guiWidth / 2 - 155 + 160, 0, 150)]);
  }

  public render(context: CanvasRenderingContext2D, p_230432_2_: number, p_230432_3_: number, p_230432_4_: number, p_230432_5_: number, p_230432_6_: number, p_230432_7_: number, p_230432_8_: number, p_230432_9_: boolean, p_230432_10_: number) {
    this.widgets.forEach((widget) => {
      widget.y = p_230432_3_;
      widget.render(context, p_230432_7_, p_230432_8_, p_230432_10_);
    });
  }
}