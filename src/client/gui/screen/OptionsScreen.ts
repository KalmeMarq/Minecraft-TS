import { TextComponent } from "../../../util/text/TextComponent";
import Button from "../widgets/Button";
import Screen from "./Screen";

export default class OptionsScreen extends Screen {
  private parentScreen: Screen;

  public constructor(parentScreen: Screen) {
    super(new TextComponent('options.title'))
    this.parentScreen = parentScreen;
  }

  protected init(): void {
    this.addButton(new Button(this.width / 2 - 100, this.height / 2 + 24, 200, 20, new TextComponent('test'), (button) => {
      this.mc.setScreen(this.parentScreen)
    }))
  }

  public render (mouseX: number, mouseY: number, partialTicks: number): void {
    super.render(mouseX, mouseY, partialTicks)
  }
}