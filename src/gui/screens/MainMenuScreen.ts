import { editionImg, minecraftImg, ResourcesSplashes } from "../../index.js";
import TranslationTextComponent from "../../utils/TranslationText.js";
import FontRenderer from "../FontRenderer.js";
import Button from "../widgets/button/Button.js";
import OptionsScreen from "./OptionsScreen.js";
import ScreenP from "./ScreenP.js";

export default class MainMenuScreen extends ScreenP {
  private widthCopyright: number = 0;
  private widthCopyrightRest: number = 0;
  protected MINECRAFT_TITLE_IMG = minecraftImg;
  protected MINECRAFT_EDITION_IMG = editionImg;
  private showTitleWronglySpelled: boolean = (Math.random() < 1.0E-4);
  private splashText: any = this.getSplashText();

  public getSplashText(): string {
    const splashes = ResourcesSplashes;

    const date = new Date(),
          month = date.getMonth(),
          day = date.getDate();    

    const getRandomSplashText = () => {
      return splashes[~~(Math.random() * (splashes.length - 1))]
    }

    let randSplash = String(getRandomSplashText());

    if(month + 1 === 12 && day === 24) {
      randSplash = 'Merry X-mas!';
    } else if (month + 1 === 1 && day === 1) {
      randSplash = 'Happy new year!';
    } else if(month + 1 === 10 && day === 31) {
      randSplash = 'OOoooOOOoooo! Spooky!';
    }

    return randSplash;
  }

  public closeScreen(): void {
  }

  public shouldCloseOnEsc(): boolean {
    return false;
  }
  
  protected init(): void {
    let i = 24;
    let j = this.height / 4 + 48;

    this.widthCopyright = FontRenderer.getTextWidth("Not affiliated with Mojang Studios!");
    this.widthCopyrightRest = this.width - this.widthCopyright - 2;

    this.addButton(new Button(this.width  / 2 - 100, j, 200, 20, new TranslationTextComponent('menu.singleplayer').get(), () => {}));

    this.addButton(new Button(this.width  / 2 - 100, j + i * 1, 200, 20, new TranslationTextComponent('menu.multiplayer').get(), () => {}));

    this.addButton(new Button(this.width  / 2 - 100, j + i * 2, 200, 20, new TranslationTextComponent('menu.online').get(), () => {}));

    this.addButton(new Button(this.width  / 2 - 100, j + 72 + 12, 98, 20, new TranslationTextComponent('menu.options').get(), () => {
      this.minecraft.displayGuiScreen(new OptionsScreen(this))
    }));

    this.addButton(new Button(this.width  / 2 + 2, j + 72 + 12, 98, 20, new TranslationTextComponent('menu.quit').get(), () => {
      this.minecraft.shutdown();
    }));

    // this.buttons[0].changeFocus(true)
  }

  protected render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number): void {
    context.save();
    context.fillStyle = '#333';
    context.fillRect(0, 0, this.width, this.height);
    context.restore();

    context.save();
    let j = this.width / 2 - 137;
    if(this.showTitleWronglySpelled) {
      this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 0, 30, 0, 0, 99, 44);
      this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 99, 30, 129, 0, 27, 44);
      this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 99 + 26, 30, 126, 0, 3, 44);
      this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 99 + 26 + 3, 30, 99, 0, 26, 44);
      this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 155, 30, 0, 45, 155, 44);
    } else {
      this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 0, 30, 0, 0, 155, 44);
      this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 155, 30, 0, 45, 155, 44);
    }
    this.drawImg(context, this.MINECRAFT_EDITION_IMG, j + 88, 67, 0, 0, 98, 14);
    context.restore();

    context.save();
    
   
    const miliT = new Date().getMilliseconds();
    let f2 = 2.0 - Math.abs(Math.sin((miliT % 1000) / 1000.0 * (Math.PI * 2)) * 0.03);
    try {
      f2 = f2 * 100.0 / (FontRenderer.getTextWidth('sssssssssssssssssssssss') + 32);
    } catch {
      f2 = f2 * 100.0 / (context.measureText('Error').width + 32);
    }
    
    context.scale(f2, f2);
    context.rotate(-20 * Math.PI / 180);

    try {
      this.drawCenteredString(context, this.splashText, j + 88 + 70, 67 + 100 - 20, 16776960);
    } catch {
      this.drawCenteredString(context, 'Error', j + 88 + 70, 67 + 100, 16776960);
    }
    context.restore();

    let s = 'Minecraft JS 1.19.2';
    this.drawString(context, s, 2, this.height - 10, 16777215);

    let f = 'Not affiliated with Mojang Studios';
    if (mouseX > (this.widthCopyrightRest) && mouseX < (this.widthCopyrightRest + this.widthCopyright) && mouseY > (this.height - 10) && mouseY < this.height) {
      this.fill(context, (this.widthCopyrightRest - 1), this.height - 2, this.widthCopyright + 1, 1, 16777215)
    }

    this.drawString(context, 'Not affiliated with Mojang Studios', this.widthCopyrightRest, this.height - 10, 16777215);
  }
}