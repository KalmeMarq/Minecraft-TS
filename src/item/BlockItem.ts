import Block from "../block/Block";
import CustomMap from "../util/CustomMap";
import Item, { ItemProperties } from "./Item";
export class BlockItem extends Item {
  private readonly block: Block;

  public constructor(block: Block) {
    super(new ItemProperties());
    this.block = block;
  }

  public getBlock(): Block {
    return this.block;
  }

  public registerBlocks(p_195946_1_: CustomMap<Block, Item>, p_195946_2_: Item) {
    p_195946_1_.set(this.getBlock(), p_195946_2_);
  }
} 