import IInventory from "../util/interfaces/IInventory";
import PlayerInventory from "../world/player/PlayerInventory";

export default class Slot {
  private readonly slot: number;
  public readonly container: IInventory;
  public index: number = -1;
  public readonly x: number;
  public readonly y: number;

  public constructor(inventory: IInventory, slot: number, x: number, y: number) {
    this.container = inventory;
    this.slot = slot;
    this.x = x;
    this.y = y;
  }

  public isActive(): boolean {
    return true;
  }
}