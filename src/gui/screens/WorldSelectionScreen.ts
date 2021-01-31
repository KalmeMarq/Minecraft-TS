import TranslationTextComponent, { getKeyTranslation } from "../../utils/TranslationText.js";
import Button from "../widgets/button/Button.js";
import Widget from "../widgets/Widget.js";
import CreateWorldScreen from "./CreateWorldScreen.js";
import Screen from "./Screen.js";

export default class WorldSelectionScreen extends Screen {
  public parentScreen;
  public deleteButton!: Widget;
  public selectButton!: Widget;
  public renameButton!: Widget;
  public copyButton!: Widget;
  private flag;
  
  constructor(parentScreen: Screen) {
    super(getKeyTranslation('selectWorld.title'));
    this.parentScreen = parentScreen;
    this.flag = false;
  }

  public closeScreen(): void {
    this.minecraft.displayGuiScreen(this.parentScreen);
  }

  protected init(): void {
    this.addButton(new Button(this.width / 2 - 75, this.height / 2 - 20, 150, 20, getKeyTranslation("Simulate Select/Deselect"), () => this.flag = !this.flag));

    this.selectButton = this.addButton(new Button(this.width / 2 - 154, this.height - 52, 150, 20, getKeyTranslation("selectWorld.select"), () => {}));

    this.addButton(new Button(this.width / 2 + 4, this.height - 52, 150, 20, getKeyTranslation("selectWorld.create"), () => {
      this.minecraft.displayGuiScreen(new CreateWorldScreen(this));
    }));

    this.renameButton = this.addButton(new Button(this.width / 2 - 154, this.height - 28, 72, 20, getKeyTranslation("selectWorld.edit"), () => {}));

    this.deleteButton = this.addButton(new Button(this.width / 2 - 76, this.height - 28, 72, 20, getKeyTranslation("selectWorld.delete"), () => {}));

    this.copyButton = this.addButton(new Button(this.width / 2 + 4, this.height - 28, 72, 20, getKeyTranslation("selectWorld.recreate"), () => {}));

    this.addButton(new Button(this.width / 2 + 82, this.height - 28, 72, 20, getKeyTranslation("gui.cancel"), () => {
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));

    this.setActive();
  }

  private setActive(): void {
    this.selectButton.active = this.flag;
    this.renameButton.active = this.flag;
    this.deleteButton.active = this.flag;
    this.copyButton.active = this.flag;
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number): void {
    this.renderDirtBackground(context)
    this.drawCenteredString(context, this.title, this.width / 2, 8, 16777215);
  }
}