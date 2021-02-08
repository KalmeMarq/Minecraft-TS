import SliderPercentageOption from "./SliderPercentageOption";

export default class SliderMultiplierOption extends SliderPercentageOption {
  constructor(translationKey: string, minValueIn: number, maxValueIn: number, stepSizeIn: number, getterIn: Function, setterIn: Function, getterDisplayString: Function) {
    super(translationKey, minValueIn, maxValueIn, stepSizeIn, getterIn, setterIn, getterDisplayString);
  }

  public normalizeValue(value: number) {
    return Math.log(value / this.minValue) / Math.log(this.maxValue / this.minValue);
  }

  public denormalizeValue(value: number) {
    return this.minValue * Math.pow(Math.E, Math.log(this.maxValue / this.minValue) * value);
  }
}
