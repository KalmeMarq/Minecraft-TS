import TextFormatting from "../util/text/TextFormatting";

export default class Rarity {
  public static COMMON = new Rarity(TextFormatting.WHITE)
  public static UNCOMMON = new Rarity(TextFormatting.YELLOW)
  public static RARE = new Rarity(TextFormatting.AQUA)
  public static EPIC = new Rarity(TextFormatting.LIGHT_PURPLE)

  public readonly color: TextFormatting;

  private constructor(color: TextFormatting) {
    this.color = color;
  }
}