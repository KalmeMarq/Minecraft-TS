import TranslationTextComponent, { getKeyTranslation } from "../../utils/TranslationText";
import Button from "../widgets/button/Button";
import TextFieldWidget from "../widgets/TextFieldWidget";
import Widget from "../widgets/Widget";
import CreateWorldScreen from "./CreateWorldScreen";
import Screen from "./Screen";

export default class WorldSelectionScreen extends Screen {
  public parentScreen;
  public deleteButton!: Button;
  public selectButton!: Button;
  public renameButton!: Button;
  public copyButton!: Button;
  private flag;
  protected searchField: TextFieldWidget | any;
  
  constructor(parentScreen: Screen) {
    super(getKeyTranslation('selectWorld.title'));
    this.parentScreen = parentScreen;
    this.flag = false;
  }

  public closeScreen(): void {
    this.minecraft.displayGuiScreen(this.parentScreen);
  }

  public tick(): void {
    this.searchField.tick();
  }

  protected init(): void {
    this.searchField = new TextFieldWidget(this.width / 2 - 100, 22, 200, 20, this.searchField, 'Placeholder here');
    this.children.push(this.searchField);
    // this.searchField.setMaxStringLength(44);

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
    this.searchField.renderObject(context, mouseX, mouseY);
  }
}