import IInventory from "../util/interfaces/IInventory";
import IllegalArgumentException from "../util/exceptions/IllegalArgumentException";
import ContainerType from "./ContainerType";
import Slot from "./Slot";

export default abstract class Container {
  private readonly menuType: ContainerType<any> | undefined;
  public readonly containerId: number;
  public readonly slots: Slot[] = [];

  protected constructor(type: ContainerType<any> | undefined, id: number) {
    this.menuType = type;
    this.containerId = id;
  }

  protected static checkContainerSize(inventory: IInventory, size: number): void {
    let i = inventory.getContainerSize();
    if (i < size) {
       throw new IllegalArgumentException(`Container size ${i} is smaller than expected ${size}`);
    }
  }

  protected addSlot(slot: Slot): Slot {
    slot.index = this.slots.length;
    this.slots.push(slot);
    return slot;
  }

  public getSlot(index: number): Slot {
    return this.slots[index];
  }
}