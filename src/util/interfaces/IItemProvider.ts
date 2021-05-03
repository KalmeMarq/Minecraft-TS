import Item from "../../item/Item";

export default interface IItemProvider {
  asItem(): Item;
}