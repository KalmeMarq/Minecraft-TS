import IItemProvider from "../util/interfaces/IItemProvider";
import Item from "../item/Item";

export default class Block implements IItemProvider {
  private item: Item | undefined;

  public asItem(): Item {
    if(this.item === undefined) {
      this.item = Item.byBlock(this);
    }

    return this.item;
  }
}