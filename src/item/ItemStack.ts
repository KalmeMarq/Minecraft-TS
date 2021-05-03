import IItemProvider from "../util/interfaces/IItemProvider";
import Item from "./Item";

export default class ItemStack {
  private readonly item: Item | undefined;
  private count: number;

  public constructor(item: IItemProvider, count: number = 1) {
    this.item = item === null ? undefined : item.asItem();
    this.count = count;
  }
}