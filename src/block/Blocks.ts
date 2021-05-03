import Registry from "../util/Registry";
import { AirBlock } from "./AirBlock";
import Block from "./Block";

export default class Blocks {
  public static readonly AIR: Block = Blocks.register("air", new AirBlock());

  private static register(id: string, block: Block): Block {
    return Registry.register(Registry.BLOCK, id, block);
  }
}