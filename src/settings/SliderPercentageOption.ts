import MathHelper from "@km.mcts/util/MathHelper";
import GameSettings from "../GameSettings";
import OptionSlider from "../gui/widgets/OptionSlider";
import Widget from "../gui/widgets/Widget";
import AbstractOption from "./AbstractOption";

export default class SliderPercentageOption extends AbstractOption {
  protected stepSize: number;
  protected minValue: number;
  protected maxValue: number;
  private getter: Function;
  private setter: Function;
  private getDisplayStringFunc: Function;

  constructor(translationKey: string, minValueIn: number, maxValueIn: number, stepSizeIn: number, getter: Function, setter: Function, getDisplayString: Function) {
    super(translationKey);
    this.minValue = minValueIn;
    this.maxValue = maxValueIn;
    this.stepSize = stepSizeIn;
    this.getter = getter;
    this.setter = setter;
    this.getDisplayStringFunc = getDisplayString;
  }

  public createWidget(options: GameSettings, xIn: number, yIn: number, widthIn: number): Widget {
    return new OptionSlider(options, xIn, yIn, widthIn, 20, this);
  }

  public normalizeValue(value: number): number {
    return MathHelper.clamp((this.snapToStepClamp(value) - this.minValue) / (this.maxValue - this.minValue), 0, 1);
  }

  public denormalizeValue(value: number): number {
    return this.snapToStepClamp(MathHelper.lerp(MathHelper.clamp(value, 0, 1), this.minValue, this.maxValue));
  }

  private snapToStepClamp(valueIn: number) {
    if (this.stepSize > 0) {
      valueIn = (this.stepSize * (Math.round(valueIn / this.stepSize)));
    }

    return MathHelper.clamp(valueIn, this.minValue, this.maxValue);
  }

  public getMinValue(): number {
    return this.minValue;
  }

  public getMaxValue(): number {
    return this.maxValue;
  }

  public setMaxValue(valueIn: number): void {
    this.maxValue = valueIn;
  }

  public set(options: GameSettings, valueIn: number): void {
    this.setter(options, valueIn);
  }

  public get(options: GameSettings) {
    return this.getter(options);
  }

  public getName(options: GameSettings) {
    return this.getDisplayStringFunc(options, this);
  }
}