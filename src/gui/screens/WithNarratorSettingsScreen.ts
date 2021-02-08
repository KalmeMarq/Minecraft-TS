// import GameOption from "../../GameOption";
// import GameSettings from "../../GameSettings";
// import AbstractOption from "../../settings/AbstractOption";
// import { getKeyTranslation } from "../../utils/TranslationText";
// import Button from "../widgets/button/Button";
// import Widget from "../widgets/Widget";
// import SettingsScreen from "./SettingsScreen";

import SettingsScreen from "./SettingsScreen";

// export default abstract class WithNarratorSettingsScreen extends SettingsScreen {
//    private field_243313_c: GameOption[];
//    private field_243314_p!: Widget;
//    private field_243315_q: OptionsRowList;

//    constructor(parentScreen: Screen, settings: GameSettings, p_i242058_3_: string, p_i242058_4_: AbstractOption[]) {
//     super(parentScreen, settings, p_i242058_3_);
//     this.field_243313_c = p_i242058_4_;
//   }

//   protected init(): void {
//     this.field_243315_q = new OptionsRowList(this.minecraft, this.width, this.height, 32, this.height - 32, 25);
//     this.field_243315_q.addOptions(this.field_243313_c);
//     this.children.push(this.field_243315_q);
//     this.addDoneButton();
//   }

//   protected addDoneButton(): void {
//     this.addButton(new Button(this.width / 2 - 100, this.height - 27, 200, 20, getKeyTranslation('gui.done'), () => {
//       this.minecraft.displayGuiScreen(this.parentScreen);
//     }));
//   }

//   public render(matrixStack: context, mouseX: number, mouseY: number) {
//     this.renderDirtBackground(matrixStack);
//     this.field_243315_q.render(matrixStack, mouseX, mouseY);
//     this.drawCenteredString(matrixStack, this.font, this.title, this.width / 2, 20, 16777215);
//     super.render(matrixStack, mouseX, mouseY, partialTicks);
//     let list = func_243293_a(this.field_243315_q, mouseX, mouseY);
//     if (list != null) {
//         this.renderTooltip(matrixStack, list, mouseX, mouseY);
//     }

//   }
// }

/* export default class WithScrollingSettings extends SettingsScreen {
  private : GameOption[];
}
 */