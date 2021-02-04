// import AbstractOption from "../AbstractOption";
// import GameSettings from "../GameSettings";
// import OptionSlider from "../gui/widgets/OptionSlider";
// import MathHelper from "../utils/MathHelper";

// export default class SliderPercentageOption {
//   createWidget(settings: GameSettings, x: number, y: number, width: number) {

//   }

//   renderObject(context: CanvasRenderingContext2D, mouseX: number, mouseY: number): void {

//   }

//   mouseMoved(xPos: number, mouseY: number): void {
//   }
//   mouseClicked(mouseX: number, mouseY: number, button: number): void {
//   }
//   mouseReleased(mouseX: number, mouseY: number, button: number): void {
//   }
//   mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): void {
//   }
//   mouseScrolled(mouseX: number, mouseY: number, delta: number): void {
//   }
//   keyPressed(key: string, modifiers: any): void {
//   }
//   keyReleased(key: string, modifiers: any): void {

//   }
//   charTyped(key: string, modifiers: any): void {
//   }
//   changeFocus(focus: any): void {

//   }
//   isMouseOver(mouseX: number, mouseY: number): void {

//   }

//   //  protected stepSize: number;
//   //  protected minValue: number;
//   //  protected maxValue: number;
//   //  private getter: Function;
//   //  private setter: Function;
//   //  private getDisplayStringFunc: Function;

//   //  constructor(title: string, minValueIn: number, maxValueIn: number, stepSizeIn: number, getter: Function , setter: Function, getDisplayString: Function) {
//   //     super();
//   //     this.minValue = minValueIn;
//   //     this.maxValue = maxValueIn;
//   //     this.stepSize = stepSizeIn;
//   //     this.getter = getter;
//   //     this.setter = setter;
//   //     this.getDisplayStringFunc = getDisplayString;
//   //  }

//   //  public createWidget(options: GameSettings, xIn: number, yIn: number, widthIn: number) {
//   //     return new OptionSlider(options, xIn, yIn, widthIn, 20, this);
//   //  }

//   //  public normalizeValue(value: number) {
//   //     return MathHelper.clamp((this.snapToStepClamp(value) - this.minValue) / (this.maxValue - this.minValue), 0.0, 1.0);
//   //  }

//   //  public denormalizeValue(value: number) {
//   //     return this.snapToStepClamp(MathHelper.lerp(MathHelper.clamp(value, 0.0, 1.0), this.minValue, this.maxValue));
//   //  }

//   //  private snapToStepClamp(valueIn: number) {
//   //     if (this.stepSize > 0.0) {
//   //        valueIn = (this.stepSize * Math.round(valueIn / this.stepSize));
//   //     }

//   //     return MathHelper.clamp(valueIn, this.minValue, this.maxValue);
//   //  }

//   //  public getMinValue(): number {
//   //     return this.minValue;
//   //  }

//   //  public getMaxValue(): number {
//   //     return this.maxValue;
//   //  }

//   //  public setMaxValue(valueIn: number) {
//   //     this.maxValue = valueIn;
//   //  }

//   //  public set(options: GameSettings, valueIn: number) {
//   //     // this.setter.accept(options, valueIn);
//   //  }

//   //  public get(options:GameSettings) {
//   //     return this.getter.apply(options);
//   //  }

//   //  public func_238334_c_(p_238334_1_: GameSettings) {
//   //     return this.getDisplayStringFunc.apply(p_238334_1_, this);
//   //  }

// /*    public getOptionValues() {
//     return this.optionValues;
//  } */
// }
