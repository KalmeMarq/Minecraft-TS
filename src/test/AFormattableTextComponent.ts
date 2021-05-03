// import Style from "../util/text/Style";
// import ATextComponent from "./ATextComponent";

// export default abstract class AFormattableTextComponent extends ATextComponent {
//   abstract setStyle(style: Style): AFormattableTextComponent;

//   append(text: string): AFormattableTextComponent {
//      return this.append(new StringTextComponent(text));
//   }

//   append(compoment: ATextComponent): AFormattableTextComponent;

//   withStyle(style: Style): AFormattableTextComponent {
//      this.setStyle(style.applyTo(this.getStyle()));
//      return this;
//   }

//   withStyle(TextFormatting... p_240701_1_): AFormattableTextComponent {
//      this.setStyle(this.getStyle().applyFormats(p_240701_1_));
//      return this;
//   }

//   // withStyle(TextFormatting p_240699_1_): AFormattableTextComponent {
//      this.setStyle(this.getStyle().applyFormat(p_240699_1_));
//      return this;
//   }
// }