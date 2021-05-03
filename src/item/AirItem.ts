import Block from "../block/Block";
import Item, { ItemProperties } from "./Item";
export class AirItem extends Item {
  private readonly block: Block;

  public constructor(block: Block) {
    super(new ItemProperties());
    this.block = block;
  }
}