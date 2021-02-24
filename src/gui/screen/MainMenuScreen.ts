import ColorHelper from "@km.mcts/util/ColorHelper";
import MathHelper from "@km.mcts/util/MathHelper";
import playSound from "@km.mcts/util/PlaySound";
import { getResourceLocation } from "@km.mcts/util/Resources";
import Util from "@km.mcts/util/Util";
import Button from "../widgets/button/Button";
import ImageButton from "../widgets/button/ImageButton";
import Widget from "../widgets/Widget";
import GuiScreen from "./GuiScreen";
import LanguageScreen from "./LanguageScreen";
import MultiplayerScreenScreen from "./MultiplayerScreen";
import OptionsScreen from "./OptionsScreen";

export default class MainMenuScreen extends GuiScreen {
  protected MINECRAFT_TITLE_IMG = getResourceLocation('textures', 'gui/title/minecraft');
  protected MINECRAFT_EDITION_IMG = getResourceLocation('textures', 'gui/title/edition');
  protected WIDGETS_LOCATION = getResourceLocation('textures', 'gui/widgets');
  protected ACCESSIBILITY_TEXTURES = getResourceLocation('textures', 'gui/accessibility');
  private splashText: string = '';
  private buttonResetDemo!: Button;
  private showFadeInAnimation: boolean = false;
  private firstRenderTime: number = 0;
  private widthCopyright: number = 0;
  private widthCopyrightRest: number = 0;
  
  constructor(fadeIn?: boolean) {
    super('')
    if(fadeIn) this.showFadeInAnimation = fadeIn;
  }

  public isPauseScreen(): boolean {
    return false;
  }

  public shouldCloseOnEsc(): boolean {
    return false;
  }

  public tick(): void {
  }

  protected init(): void {
    if(this.splashText === '') this.splashText = this.minecraft.getSplashes().getSplashText();

    this.widthCopyright = this.font.getTextWidth("Copyright Mojang AB. Do not distribute!");
    this.widthCopyrightRest = this.width - this.widthCopyright - 2;

    const baseY = ~~this.height / 4 + 48;

    if(this.minecraft.getIsDemo()) this.addDemoButtons(baseY, 24);
    else this.addSingleplayerMultiplayerButtons(baseY, 24);

    
    this.addButton(new ImageButton(this.width / 2 - 124, baseY + 72 + 12, 20, 20, 0, 106, 20, this.WIDGETS_LOCATION, 256, 256, (button) => {
      this.minecraft.displayGuiScreen(new LanguageScreen(this, this.minecraft.gameSettings));
    }, ''));

    this.addButton(new Button(this.width / 2 - 100, baseY + 72 + 12, 98, 20, Util.getTranslation('menu.options'), (button) => {
      this.minecraft.displayGuiScreen(new OptionsScreen(this, this.minecraft.gameSettings));
    }));

    this.addButton(new Button(this.width / 2 + 2, baseY + 72 + 12, 98, 20, Util.getTranslation('menu.quit'), (button) => {
      this.minecraft.shutdown();
    }));

    this.addButton(new ImageButton(this.width / 2 + 104, baseY + 72 + 12, 20, 20, 0, 0, 20, this.ACCESSIBILITY_TEXTURES, 32, 64, (button) => {
    }, ''));
  }

  private addSingleplayerMultiplayerButtons(yIn: number, rowHeightIn: number): void {
    this.addButton(new Button(this.width / 2 - 100, yIn, 200, 20, Util.getTranslation('menu.singleplayer'), (button) => {
    }));

    const flag = this.minecraft.isMultiplayerEnabled();

    (this.addButton(new Button(this.width / 2 - 100, yIn + rowHeightIn * 1, 200, 20, Util.getTranslation('menu.multiplayer'), (button) => {
      this.minecraft.displayGuiScreen(new MultiplayerScreenScreen(this))
    }))).active = flag;

    (this.addButton(new Button(this.width / 2 - 100, yIn + rowHeightIn * 2, 200, 20, Util.getTranslation('menu.online'), (button) => {
    }))).active = flag;
  }

  private addDemoButtons(yIn: number, rowHeightIn: number): void {
    const flag = false;

    this.addButton(new Button(this.width / 2 - 100, yIn, 200, 20, Util.getTranslation('menu.playdemo'), (button) => {
    }));

    this.buttonResetDemo = this.addButton(new Button(this.width / 2 - 100, yIn + rowHeightIn * 1, 200, 20, Util.getTranslation('menu.resetdemo'), (button) => {
    }));

    this.buttonResetDemo.active = flag;
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number, partialTicks: number): void {
    context.fillStyle = ColorHelper.getColor(3289650);
    context.fillRect(0, 0, this.width, this.height);

    if(this.firstRenderTime === 0 && this.showFadeInAnimation) {
      this.firstRenderTime = Util.milliTime();
    }

    let f = this.showFadeInAnimation ? (Util.milliTime() - this.firstRenderTime) / 1000 : 1;
    if(f < 0) this.showFadeInAnimation = false;
    let f1 = this.showFadeInAnimation ? f : 1;

    if(this.showFadeInAnimation) {
      context.globalAlpha = f1;
    }

    let j = this.width / 2 - 137;

    try {
      if(!this.minecraft.textureBuffer.has('mctitle_0')) {
        this.minecraft.textureBuffer.add('mctitle_0', this.createBuffer(155, 44, (ctx) => {
          this.blit(ctx, this.MINECRAFT_TITLE_IMG, 0, 0, 0, 0, 155, 44);
          ctx.globalCompositeOperation = 'source-in';
          ctx.fillStyle = 'black';
          ctx.fillRect(0, 0, 155, 44);
        }));
  
        this.minecraft.textureBuffer.add('mctitle_1', this.createBuffer(155, 44, (ctx) => {
          this.blit(ctx, this.MINECRAFT_TITLE_IMG, 0, 0, 0, 45, 155, 44);
          ctx.globalCompositeOperation = 'source-in';
          ctx.fillStyle = 'black';
          ctx.fillRect(0, 0, 155, 44);
        }));
  
      } else {
        let mctitle_0 = this.minecraft.textureBuffer.get('mctitle_0');
        let mctitle_1 = this.minecraft.textureBuffer.get('mctitle_1');
  
        this.blit(context, mctitle_0, j, 30, 0, 0, 155, 44);
        this.blit(context, mctitle_0, j, 29, 0, 0, 155, 44);
        this.blit(context, mctitle_0, j, 31, 0, 0, 155, 44);
        this.blit(context, mctitle_0, j + 1, 29, 0, 0, 155, 44);
        this.blit(context, mctitle_0, j + 1, 31, 0, 0, 155, 44);
        this.blit(context, this.MINECRAFT_TITLE_IMG, j + 1, 30, 0, 0, 155, 44);
        this.blit(context, mctitle_1, j + 155 + 1, 30, 0, 0, 155, 44);
        this.blit(context, mctitle_1, j + 155, 29, 0, 0, 155, 44);
        this.blit(context, mctitle_1, j + 155, 31, 0, 0, 155, 44);
        this.blit(context, mctitle_1, j + 155 + 1, 29, 0, 0, 155, 44);
        this.blit(context, mctitle_1, j + 155 + 1, 31, 0, 0, 155, 44);
        this.blit(context, this.MINECRAFT_TITLE_IMG, j + 155, 30, 0, 45, 155, 44);
        this.blit(context, this.MINECRAFT_EDITION_IMG, j + 88, 67, 0, 0, 98, 14);
      }
    } catch(e) {
      console.log('Failed to render buffer');
    }

    context.save();
    let splash = { x: j + 240, y: 59, width: this.font.getTextWidth(this.splashText), height: 9}

    const miliT = Util.milliTime();
    let f2 = 1.5 - Math.abs(Math.sin((miliT % 1000) / 1000.0 * (Math.PI * 2)) * 0.1);
    f2 = f2 * 100.0 / (this.font.getTextWidth(this.splashText) + 32);

    context.translate( splash.x, splash.y);
    context.scale(f2, f2);
    context.rotate(-20 * Math.PI / 180);
    context.translate( -splash.x, -splash.y );

    this.drawCenteredString(context, this.font, this.splashText, splash.x, splash.y, 16776960);
    context.restore();

    let mc = 'Minecraft TS ' + this.minecraft.getVersion();
    if(this.minecraft.getIsDemo()) mc += " Demo";
    else mc += (this.minecraft.getVersionType() === "release" ? '' : '/' + this.minecraft.getVersionType());
    mc += `/${this.minecraft.getPlayerName()}`;
    if(this.minecraft.isModdedClient()) mc += Util.getTranslation("menu.modded");

    this.drawString(context, this.font, mc, 2, this.height - 10, 16777215)
    this.drawString(context, this.font, "Copyright Mojang AB. Do not distribute!", this.widthCopyrightRest, this.height - 10, 16777215);

    if(mouseX > this.widthCopyrightRest && mouseX < this.widthCopyrightRest + this.widthCopyright && mouseY > this.height - 10 && mouseY < this.height) {
      context.fillStyle = 'white';
      context.fillRect(this.widthCopyrightRest, this.height - 1, this.widthCopyrightRest + this.widthCopyright, 1);
     
    }

    for(const widget of this.buttons) {
      widget.setAlpha(f1);
    }

    super.render(context, mouseX, mouseY, partialTicks)
  }

  public mouseClicked(mouseX: number, mouseY: number, button: number): boolean {
    if(super.mouseClicked(mouseX, mouseY, button)) {
      return true;
    } else {
      if(mouseX > this.widthCopyrightRest && mouseX < (this.widthCopyrightRest + this.widthCopyright) && mouseY > (this.height - 10) && mouseY < this.height) {
        playSound('click_stereo', 0.5);
      }
      return false;
    }
  }
}