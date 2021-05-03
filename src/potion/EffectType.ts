import TextFormatting from "../util/text/TextFormatting";

export default class EffectType {
  public static BENEFICIAL = new EffectType(TextFormatting.BLUE)
  public static HARMFUL = new EffectType(TextFormatting.RED)
  public static NEUTRAL = new EffectType(TextFormatting.BLUE)

  private readonly tooltipFormatting: TextFormatting;

  private constructor(formatting: TextFormatting) {
    this.tooltipFormatting = formatting;
  }

  public getTooltipFormatting(): TextFormatting {
    return this.tooltipFormatting;
  }
}