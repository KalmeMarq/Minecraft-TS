import IInventory from "../util/interfaces/IInventory";

export default class Inventory implements IInventory {
  private readonly size: number;
  public items: any[] = new Array();

  public constructor(size: number) {
    this.size = size;
    this.items = new Array(this.size);
  }

  public getContainerSize(): number {
    return this.size;
  }
}