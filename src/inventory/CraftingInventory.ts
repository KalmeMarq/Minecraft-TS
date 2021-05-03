import IInventory from "../util/interfaces/IInventory";
import ItemStack from "../item/ItemStack";
import Container from "./Container";

export default class CraftingInventory implements IInventory {
  private /* readonly */ items: any[] = [];
  private readonly width: number;
  private readonly height: number;
  private readonly menu: Container;

  public constructor(container: Container, width: number, height: number) {
    this.items = new Array(width * height);
    this.menu = container;
    this.width = width;
    this.height = height;
  }

  public getContainerSize(): number {
    return this.items.length;
  }

  public isEmpty(): boolean {
    for(const itemstack of this.items as any[]) {
      if(itemstack === undefined) {
        return false;
      }
    }
    return true;
  }

  public clearContent(): void {
    this.items = new Array(this.width * this.height);
  }

  public getHeight(): number {
    return this.height;
  }

  public getWidth(): number {
    return this.width;
  }
}