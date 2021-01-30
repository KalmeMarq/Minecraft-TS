import { editionImg, minecraftImg, widgetsImg, accessibilityImg } from "../../utils/GetResources.js";
import { playSound } from "../../utils/PlaySound.js";
import TranslationTextComponent from "../../utils/TranslationText.js";
import FontRenderer from "../FontRenderer.js";
import Button from "../widgets/button/Button.js";
import ImageButton from "../widgets/button/ImageButton.js";
import Widgets from "../widgets/Widget.js";
import AccessibilityScreen from "./AccessibilityScreen.js";
import MultiplayerScreen from "./MultiplayerScreen.js";
import MultiplayerWarningScreen from "./MultiplayerWarningScreen.js";
import OptionsScreen from "./OptionsScreen.js";
import Screen from "./Screen.js";
import WorldSelectionScreen from "./WorldSelectionScreen.js";

export default class MainMenuScreen extends Screen {
  private widthCopyright: number = 0;
  private widthCopyrightRest: number = 0;
  protected MINECRAFT_TITLE_IMG: HTMLImageElement = minecraftImg;
  protected MINECRAFT_EDITION_IMG: HTMLImageElement = editionImg;
  protected WIDGETS_LOCATION: HTMLImageElement = widgetsImg;
  protected ACCESSIBILITY_TEXTURES: HTMLImageElement = accessibilityImg;
  private showTitleWronglySpelled: boolean = (Math.random() < 1.0E-1);
  private splashText: string = '';
  private buttonResetDemo: Widgets | null = null;

  public closeScreen(): boolean {
    return false;
  }

  public shouldCloseOnEsc(): boolean {
    return false;
  }
  
  protected init(): void {
    this.splashText = this.splashText !== '' ? this.splashText : this.minecraft.getSplashText();

    this.widthCopyright = FontRenderer.getTextWidth("Not affiliated with Mojang Studios!");
    this.widthCopyrightRest = this.width - this.widthCopyright - 2;

    let i = 24;
    let j = this.height / 4 + 48;

    if(this.minecraft.isDemo()) this.addDemoButtons(j, i);
    else this.addSingleplayerMultiplayerButtons(j, i);

    this.addButton(new ImageButton(this.width / 2 - 124, j + 72 + 12, 20, 20, 0, 106, 20, this.WIDGETS_LOCATION, 256, 256, () => {
      this.minecraft.displayGuiScreen(new OptionsScreen(this, this.minecraft.gameSettings));
    }, ''));

    this.addButton(new Button(this.width  / 2 - 100, j + 72 + 12, 98, 20, new TranslationTextComponent('menu.options').get(), () => {
      this.minecraft.displayGuiScreen(new OptionsScreen(this, this.minecraft.gameSettings))
    }));

    this.addButton(new Button(this.width  / 2 + 2, j + 72 + 12, 98, 20, new TranslationTextComponent('menu.quit').get(), () => {
      this.minecraft.shutdown();
    }));

    this.addButton(new ImageButton(this.width / 2 + 104, j + 72 + 12, 20, 20, 0, 0, 20, this.ACCESSIBILITY_TEXTURES, 32, 64, () => {
      this.minecraft.displayGuiScreen(new AccessibilityScreen(this, this.minecraft.gameSettings));
    }, ''));
  }

  private addSingleplayerMultiplayerButtons(yIn: number, rowHeightIn: number): void {
    this.addButton(new Button(this.width / 2 - 100, yIn, 200, 20, new TranslationTextComponent("menu.singleplayer").get(), () => {
       this.minecraft.displayGuiScreen(new WorldSelectionScreen(this));
    }));

    (this.addButton(new Button(this.width / 2 - 100, yIn + rowHeightIn * 1, 200, 20, new TranslationTextComponent("menu.multiplayer").get(), () => {
       let screen: Screen | null = (this.minecraft.gameSettings.skipMultiplayerWarning ? new MultiplayerScreen(this) : new MultiplayerWarningScreen(this));
       this.minecraft.displayGuiScreen(screen);
    })));

    (this.addButton(new Button(this.width / 2 - 100, yIn + rowHeightIn * 2, 200, 20, new TranslationTextComponent("menu.online").get(), () => {
      //  this.switchToRealms();
    })));
  }

  private addDemoButtons(yIn: number, rowHeightIn: number): void  {
    this.addButton(new Button(this.width / 2 - 100, yIn, 200, 20, new TranslationTextComponent("menu.playdemo").get(), () => {
    }));

    this.buttonResetDemo = this.addButton(new Button(this.width / 2 - 100, yIn + rowHeightIn * 1, 200, 20, new TranslationTextComponent("menu.resetdemo").get(), () => {
    }));

    this.buttonResetDemo.active = false;
  }

  public mouseClicked(mouseX: number, mouseY: number, button: number) {
    super.mouseClicked(mouseX, mouseY, button);

    if(mouseX > this.widthCopyrightRest && mouseX < (this.widthCopyrightRest + this.widthCopyright) && mouseY > (this.height - 10) && mouseY < this.height) {
      playSound('resources/assets/minecraft/sounds/click_stereo.ogg', 0.2);
      console.log('No credits sry :(');
    }
  }

  protected render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number): void {
    this.fill(context, 0, 0, this.width, this.height, 3355443)

    context.save();
    let j = this.width / 2 - 137;
    if(this.showTitleWronglySpelled) {
      this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 0, 30, 0, 0, 99, 44);
      this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 0, 30, 0, 0, 99, 44);
      this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 99, 30, 129, 0, 27, 44);
      this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 99 + 26, 30, 126, 0, 3, 44);
      this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 99 + 26 + 3, 30, 99, 0, 26, 44);
      this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 155, 30, 0, 45, 155, 44);
    } else {
      this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 1, 30, 0, 0, 155, 44);
      this.drawImg(context, this.MINECRAFT_TITLE_IMG, j - 1, 30, 0, 0, 155, 44);
      this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 0, 31, 0, 0, 155, 44);
      this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 0, 29, 0, 0, 155, 44);
      this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 0, 30, 0, 0, 155, 44);
      this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 155 + 1, 30, 0, 45, 155, 44);
      this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 155 - 1, 30, 0, 45, 155, 44);
      this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 155, 29, 0, 45, 155, 44);
      this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 155, 31, 0, 45, 155, 44);
      this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 155, 30, 0, 45, 155, 44);
    }
    this.drawImg(context, this.MINECRAFT_EDITION_IMG, j + 88, 67, 0, 0, 98, 14);
    const miliT = new Date().getMilliseconds();
    let f2 = 1.8 - Math.abs(Math.sin((miliT % 1000) / 1000.0 * (Math.PI * 2)) * 0.1);
    try {
      f2 = f2 * 100.0 / (FontRenderer.getTextWidth('ddddddddddddddddddddddd') + 32);
    } catch {
      f2 = f2 * 100.0 / (context.measureText('Error').width + 32);
    }
    
    context.scale(f2, f2);
    context.rotate(-20 * Math.PI / 180);
    context.translate(180, 90)

    try {
      this.drawCenteredString(context, this.splashText, j + 88 + 70 - (140 * f2), 67 + (this.height / (3)) - 20 - (70 * f2), 16776960);
    } catch {
      this.drawCenteredString(context, 'Error', j + 88 + 70, 67 + 100, 16776960);
    }
    context.restore();

    let s = "Minecraft JS " + this.minecraft.getVersion();
    if(this.minecraft.isDemo()) s += " Demo";
    else s += (this.minecraft.getVersionType() === "release" ? '' : '/' + this.minecraft.getVersionType());
    s += `/${this.minecraft.getUsername()}`;

    if(this.minecraft.isModdedClient()) s += new TranslationTextComponent("menu.modded").get();
    
    this.drawString(context, s, 2, this.height - 10, 16777215);

    if(mouseX > this.widthCopyrightRest && mouseX < (this.widthCopyrightRest + this.widthCopyright) && mouseY > (this.height - 10) && mouseY < this.height) {
      this.fill(context, (this.widthCopyrightRest - 1), this.height - 2, this.widthCopyright + 1, 1, 16777215)
    }

    this.drawString(context, 'Not affiliated with Mojang Studios!', this.widthCopyrightRest, this.height - 10, 16777215);
  }
}