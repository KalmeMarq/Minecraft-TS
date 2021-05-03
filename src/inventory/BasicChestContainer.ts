import IInventory from "../util/interfaces/IInventory";
import PlayerInventory from "../world/player/PlayerInventory";
import Container from "./Container";
import ContainerType from "./ContainerType";
import Inventory from "./Inventory";
import Slot from "./Slot";

export default class BasicChestContainer extends Container {
  private readonly containerInv: IInventory;

  public constructor(id: number, inventory: PlayerInventory, containerInv: IInventory = new Inventory(9 * 3)) {
    super(ContainerType.BASIC_CHEST, id);
    this.containerInv = containerInv;
    Container.checkContainerSize(containerInv, 9 * 3);
    let i = (3 - 4) * 18;

    for(let j = 0; j < 3; ++j) {
      for(let k = 0; k < 9; ++k) {
        this.addSlot(new Slot(containerInv, k + j * 9, 8 + k * 18, 18 + j * 18));
      }
    }

    for(let l = 0; l < 3; ++l) {
      for(let j1 = 0; j1 < 9; ++j1) {
        this.addSlot(new Slot(inventory, j1 + l * 9 + 9, 8 + j1 * 18, 103 + l * 18 + i));
      }
    }

    for(let i1 = 0; i1 < 9; ++i1) {
      this.addSlot(new Slot(inventory, i1, 8 + i1 * 18, 161 + i));
    }
  }
}