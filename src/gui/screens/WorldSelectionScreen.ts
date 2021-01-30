import TranslationTextComponent from "../../utils/TranslationText.js";
import Button from "../widgets/button/Button.js";
import Screen from "./Screen.js";

export default class WorldSelectionScreen extends Screen {
  public parentScreen;
  public deleteButton: Button | any;
  public selectButton: Button | any;
  public renameButton: Button | any;
  public copyButton: Button | any;
  public flag;
  
  constructor(parentScreen: Screen) {
    super();
    this.parentScreen = parentScreen;
    this.deleteButton;
    this.selectButton;
    this.renameButton;
    this.copyButton;
    this.flag = false;
  }

  protected init(): void {
    this.addButton(new Button(this.width / 2 - 75, this.height / 2 - 20, 150, 20, new TranslationTextComponent("Simulate Select").get(), () => {
      this.flag = true;
      this.V()
    }));
    this.addButton(new Button(this.width / 2 - 75, this.height / 2 + 4, 150, 20, new TranslationTextComponent("Simulate Deselect").get(), () => {
      this.flag = false;
      this.V()
    }));

    this.selectButton = this.addButton(new Button(this.width / 2 - 154, this.height - 52, 150, 20, new TranslationTextComponent("selectWorld.select").get(), () => {
      return false;
    }));
    this.addButton(new Button(this.width / 2 + 4, this.height - 52, 150, 20, new TranslationTextComponent("selectWorld.create").get(), () => {
    }));
    this.renameButton = this.addButton(new Button(this.width / 2 - 154, this.height - 28, 72, 20, new TranslationTextComponent("selectWorld.edit").get(), () => {
      return false;
    }));
    this.deleteButton = this.addButton(new Button(this.width / 2 - 76, this.height - 28, 72, 20, new TranslationTextComponent("selectWorld.delete").get(), () => {
      return false;
    }));

    this.copyButton = this.addButton(new Button(this.width / 2 + 4, this.height - 28, 72, 20, new TranslationTextComponent("selectWorld.recreate").get(), () => {
      return false;
    }));
    this.addButton(new Button(this.width / 2 + 82, this.height - 28, 72, 20, new TranslationTextComponent("gui.cancel").get(), () => {
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));


    this.V()
  }

  closeScreen() {
    this.minecraft.displayGuiScreen(this.parentScreen);
  }

  V() {
    this.selectButton.active = this.flag;
    this.renameButton.active = this.flag;
    this.deleteButton.active = this.flag;
    this.copyButton.active = this.flag;
  }

  protected render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number): void {
    this.renderDirtBackground(context)
    this.drawCenteredString(context, new TranslationTextComponent("selectWorld.title").get(), this.width / 2, 8, 16777215);
  }
}