import AbstractOption from "../../GameOption";
import GameSettings from "../../GameSettings";
import TranslationTextComponent from "../../utils/TranslationText";
import Button from "../widgets/button/Button";
import OptionButton from "../widgets/button/OptionButton";
import Screen from "./Screen";
import SettingsScreen from "./SettingsScreen";

export default class ChatOptionsScreen extends SettingsScreen {
  private SCREEN_OPTIONS: AbstractOption[] = [AbstractOption.CHAT_VISIBILITY, AbstractOption.CHAT_COLOR, AbstractOption.CHAT_LINKS, AbstractOption.CHAT_LINKS_PROMPT, AbstractOption.NARRATOR_STATUS];

  constructor(parentScreen: Screen, gameSettingsObj: GameSettings) {
    super(parentScreen, gameSettingsObj,  new TranslationTextComponent("options.chat.title").get())
  }

  protected init(): void {
    let index = 0;
    for (const iterator of this.SCREEN_OPTIONS) {
      let x = this.width / 2 - 155 + (index % 2) * 160;
      let y = this.height / 6 - 12 + 24 * (index >> 1);
      this.addButton((iterator as any).createWidget(this.minecraft.gameSettings, x, y, 150));
      index++;
    }

    this.addButton(new Button(this.width / 2 - 100, this.height - 27, 200, 20, new TranslationTextComponent("gui.done").get(), () => {
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number) {
    super.render(context, mouseX, mouseY);
    this.drawCenteredString(context, this.title, this.width / 2, 20, 16777215);
  }
}