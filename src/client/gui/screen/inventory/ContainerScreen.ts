import Container from "../../../../inventory/Container";
import Slot from "../../../../inventory/Slot";
import ResourceLocation from "../../../../resources/ResourceLocation";
import CanvasUtil from "../../../../util/CanvasUtil";
import { TextComponent } from "../../../../util/text/TextComponent";
import Player from "../../../../world/player/Player";
import PlayerInventory from "../../../../world/player/PlayerInventory";
import IHasContainer from "../../../../util/interfaces/IHasContainer";
import Screen from "../Screen";

export default abstract class ContainerScreen<T extends Container> extends Screen implements IHasContainer<T> {
  public static readonly INVENTORY_LOCATION: ResourceLocation = new ResourceLocation("textures/gui/container/inventory.png");
  protected imageWidth: number = 176;
  protected imageHeight: number = 166;
  protected titleLabelX: number;
  protected titleLabelY: number;
  protected inventoryLabelX: number;
  protected inventoryLabelY: number;
  protected readonly menu: T;
  protected readonly inventory: PlayerInventory;
  protected hoveredSlot: Slot | undefined;
  private clickedSlot: Slot | undefined;
  private lastClickSlot: Slot | undefined;
  protected leftPos: number = 0;
  protected topPos: number = 0;
  private lastClickTime: number = 0;
  private lastClickButton: number = 0;
  private doubleclick: boolean = false;

  public constructor(type: T, inventory: PlayerInventory, title: TextComponent) {
    super(title);
    this.menu = type;
    this.inventory = inventory;
    this.titleLabelX = 8;
    this.titleLabelY = 6;
    this.inventoryLabelX = 8;
    this.inventoryLabelY = this.imageHeight - 94;
  }

  protected init(): void {
    super.init();
    this.leftPos = ~~(this.width - this.imageWidth) / 2;
    this.topPos = ~~(this.height - this.imageHeight) / 2;
  }

  public render(mouseX: number, mouseY: number, partialTicks: number) {
    let i = this.leftPos;
    let j = this.topPos;
    this.renderBg(partialTicks, mouseX, mouseY);
    super.render(mouseX, mouseY, partialTicks);
    CanvasUtil.saveT();
    CanvasUtil.translateXY(i, j);
    this.hoveredSlot = undefined;
    let k = 240;
    let l = 240;

    for(let i1 = 0; i1 < this.menu.slots.length; ++i1) {
      let slot: Slot = this.menu.slots[i1];
      if (slot.isActive()) {
         this.renderSlot(slot);
      }

      if (this.isHovering(slot, mouseX, mouseY) && slot.isActive()) {
         this.hoveredSlot = slot;
         let j1 = slot.x;
         let k1 = slot.y;
         CanvasUtil.fillRect(j1, k1, j1 + 16, k1 + 16, 255, 0, 0, 0.5)
      }
    }
    this.renderLabels(mouseX, mouseY);

    // let playerinventory: PlayerInventory = (this.mc.player as Player).inventory;
    CanvasUtil.restoreT();
  }

  protected isHovering(slot: Slot, mouseX: number, mouseY: number, slotWidth: number = 16, slotHeight: number = 16): boolean {
    let i = this.leftPos;
    let j = this.topPos;
    mouseX = mouseX - i;
    mouseY = mouseY - j;
    return mouseX >= (slot.x - 1) && mouseX < (slot.x + slotWidth + 1) && mouseY >= (slot.y - 1) && mouseY < (slot.y + slotHeight + 1);
 }

  private renderSlot(slot: Slot): void {
    let i = slot.x;
    let j = slot.y;
    let flag: boolean = false;
    CanvasUtil.fillRect(i - 1, j - 1, i + 17, j + 17, 0, 0, 0, 0.75)
    CanvasUtil.fillRect(i, j, i + 16, j + 16, 130, 130, 130)
  }

  protected abstract renderBg(partialTicks: number, mouseX: number, mouseY: number): void;

  protected renderLabels(mouseX: number, mouseY: number): void {
    CanvasUtil.fillText(this.title.get(), this.titleLabelX, this.titleLabelY, 0, 0, 0);
    CanvasUtil.fillText('Inventory', this.inventoryLabelX, this.inventoryLabelY, 0, 0, 0);
  }

  private findSlot(mouseX: number, mouseY: number): Slot | undefined {
    for(let i = 0; i < this.menu.slots.length; ++i) {
       let slot: Slot = this.menu.slots[i];
       if (this.isHovering(slot, mouseX, mouseY) && slot.isActive()) {
          return slot;
       }
    }

    return undefined;
  }

  public isPauseScreen(): boolean {
    return false;
  }

  public getMenu(): T {
    return this.menu;
  }
}