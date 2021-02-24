// import FocusableGui from "@km.mcts/gui/FocusableGui";
// import IGuiEventListener from "@km.mcts/interface/IGuiEventListener";
// import IRenderable from "@km.mcts/interface/IRenderable";
// import Minecraft from "@km.mcts/Minecraft";
// import MathHelper from "@km.mcts/util/MathHelper";

// export default class AbstractList<E extends AbstractListEntry<E>> extends FocusableGui implements IRenderable {
//   protected minecraft: Minecraft;
//   protected itemHeight: number;
//   private children: Array<E> = new AbstractList.SimpleArrayList();
//   protected width: number;
//   protected height: number;
//   protected y0: number;
//   protected y1: number;
//   protected x1: number;
//   protected x0: number;
//   protected centerListVertically: boolean = true;
//   private scrollAmount: number = 0;
//   private renderSelection: boolean = true;
//   private renderHeader: boolean = false;
//   protected headerHeight: number = 0;
//   private scrolling: boolean = false;
//   private selected: E | null = null;
//   private field_244603_t: boolean = true;
//   private field_244604_u: boolean = true;

//   constructor(mcIn: Minecraft, widthIn: number, heightIn: number, topIn: number, bottomIn: number, itemHeightIn: number) {
//     super();
//     this.minecraft = mcIn;
//     this.width = widthIn;
//     this.height = heightIn;
//     this.y0 = topIn;
//     this.y1 = bottomIn;
//     this.itemHeight = itemHeightIn;
//     this.x0 = 0;
//     this.x1 = widthIn;
//   }

//   public getRowWidth(): number {
//     return 220;
//   }

//   public getSelected(): E | null {
//     return this.selected;
//   }

//   public setSelected(entry: E | null): void  {
//     this.selected = entry;
//   }

//   public func_244605_b(p_244605_1_: boolean): void {
//     this.field_244603_t = p_244605_1_;
//   }

//   public func_244606_c(p_244606_1_: boolean): void {
//     this.field_244604_u = p_244606_1_;
//   }

//   public getListener(): E {
//     return super.getListener();
//  }

//   public getEventListeners(): Array<E> {
//     return this.children;
//   }

//   protected clearEntries(): void {
//     this.children = [];
//   }

//   protected replaceEntries(entries: Array<E>): void {
//     this.children = [];
//     this.children = [...entries];
//   }

//   protected getMaxPosition(): number {
//     return this.getItemCount() * this.itemHeight + this.headerHeight;
//   }

//   public getMaxScroll(): number {
//     return Math.max(0, this.getMaxPosition() - (this.y1 - this.y0 - 4));
//   }

//   public setScrollAmount(p_230932_1_: any) {
//     this.scrollAmount = MathHelper.clamp(p_230932_1_, 0.0, this.getMaxScroll());
//   }

//   protected getScrollbarPosition(): number {
//     return this.width / 2 + 124;
//  }

//   public getScrollAmount(): number {
//     return this.scrollAmount;
//   }

//   protected getRowTop(p_230962_1_: any) {
//     return this.y0 + 4 - this.getScrollAmount() + p_230962_1_ * this.itemHeight + this.headerHeight;
//   }

//   private getRowBottom(p_230948_1_: any) {
//     return this.getRowTop(p_230948_1_) + this.itemHeight;
//   }

//   public getRowLeft() {
//     return this.x0 + this.width / 2 - this.getRowWidth() / 2 + 2;
//   }

//   public addEntry(entry: any) {
//     this.children.push(entry);
//     return this.children.length - 1;
//   }

//   protected getEntry(index: number) {
//     return this.children[index];
//   }

//   protected getItemCount() {
//     return this.children.length;
//   }

//   private func_238480_f_(p_238480_1_: AbstractListEntry<E>): void {
//     p_238480_1_.list = this;
//   }

//   public getEntryAtPosition(p_230933_1_: number, p_230933_3_: number): E {
//     let i = this.getRowWidth() / 2;
//     let j = this.x0 + this.width / 2;
//     let k = j - i;
//     let l = j + i;
//     let i1 = Math.floor(p_230933_3_ - this.y0) - this.headerHeight + ~~this.getScrollAmount() - 4;
//     let j1 = i1 / this.itemHeight;
//     return <E>(p_230933_1_ < this.getScrollbarPosition() && p_230933_1_ >= k && p_230933_1_ <= l && j1 >= 0 && i1 >= 0 && j1 < this.getItemCount() ? this.getEventListeners().[j1] : null);
//  }
// }

// export abstract class AbstractListEntry<E extends AbstractListEntry<E>> implements IGuiEventListener {
//   public list!: AbstractList<E>;

//   public abstract render(context: CanvasRenderingContext2D, p_230432_2_: number, p_230432_3_: number, p_230432_4_: number, p_230432_5_: number, p_230432_6_: number, p_230432_7_: number, p_230432_8_: number, p_230432_9_: boolean, p_230432_10_: number): void;

//   public mouseMoved(xPos: number, mouseY: number): boolean {
//     return false;
//   }

//   public mouseClicked(mouseX: number, mouseY: number, button: number): boolean {
//     return false;
//   }

//   public mouseReleased(mouseX: number, mouseY: number, button: number): boolean {
//     return false;
//   }

//   public mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): boolean {
//     return false;
//   }

//   public mouseScrolled(mouseX: number, mouseY: number, delta: number): boolean {
//     return false;
//   }

//   public keyPressed(key: string, modifiers: any): boolean {
//     return false;
//   }

//   public keyReleased(key: string, modifiers: any): boolean {
//     return false;
//   }

//   public changeFocus(focus: any): boolean {
//     return false;
//   }

//   public isMouseOver(mouseX: number, mouseY: number): boolean {
//     return /* this.list.getEntryAtPosition(mouseX, mouseY) === this */ false;
//   }

//   public static SimpleArrayList = (() => {
//     class SimpleArrayList extends Array {
//       private field_216871_b = new Map<number, any>();
    
//       constructor() {
//         super();  
//       }
    
//       public get(p_get_1_: number): E {
//         return this.field_216871_b.get(p_get_1_);
//       }
    
//       /* public size(): number {
//         return this.field_216871_b.size();
//       } */
    
//      /*  public set(p_set_1_: number, p_set_2_: number) {
//         let e = this.field_216871_b.set(p_set_1_, p_set_2_);
//         this.func_238480_f_(p_set_2_);
//         return e;
//       }
    
//       public add(p_add_2_: E): void {
//           this.field_216871_b.push(p_add_2_);
//           AbstractList.this.func_238480_f_(p_add_2_);
//       } */
    
//      /*  public E remove(int p_remove_1_) {
//         return this.field_216871_b.remove(p_remove_1_);
//       } */
//     }

//     return SimpleArrayList;
//   })();
// }

// namespace AbstractList {
//   export type SimpleArrayList = typeof AbstractList.SimpleArrayList.prototype;
// }

// export enum Ordering {
//   UP,
//   DOWN
// }