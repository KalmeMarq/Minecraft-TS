import Sounds from '@mcsrc/audio/Sound';
import ResourceLocation from '@mcsrc/new/ResourceLocation';
import ColorHelper from '@mcsrc/util/ColorHelper';
import ContextUtils from '@mcsrc/util/ContextUtils';
import MathHelper from '@mcsrc/util/MathHelper';
import SoundCategory from '@mcsrc/util/SoundCategory';
import TranslationTextComponent from '@mcsrc/util/text/TranslationTextComponent';
import Util from '@mcsrc/util/Util';
import AbstractGui from '../AbstractGui';
import Button from '../widgets/button/Button';
import ImageButton from '../widgets/button/ImageButton';
import Widget from '../widgets/Widget';
import GuiScreen from './GuiScreen';
import LanguageScreen from './LanguageScreen';
import MultiplayerScreenScreen from './MultiplayerScreen';
import OptionsScreen from './OptionsScreen';

export default class MainMenuScreen extends GuiScreen {
  private static ACCESSIBILITY_TEXTURES: ResourceLocation = new ResourceLocation("textures/gui/accessibility.png");
  private static MINECRAFT_TITLE_TEXTURES: ResourceLocation = new ResourceLocation('textures/gui/title/minecraft.png');
  private static MINECRAFT_TITLE_EDITION: ResourceLocation = new ResourceLocation('textures/gui/title/edition.png');
  private showTitleWronglySpelled: boolean;
  private splashText: string = '';
  private buttonResetDemo!: Button;
  private showFadeInAnimation: boolean = false;
  private firstRenderTime: number = 0;
  private widthCopyright: number = 0;
  private widthCopyrightRest: number = 0;
  
  constructor(fadeIn?: boolean) {
    super('')
    if(fadeIn) this.showFadeInAnimation = fadeIn;
    this.showTitleWronglySpelled = Number(Math.random().toFixed(1)) < 1.0E-1;
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

    this.widthCopyright = this.font.getTextWidth('Copyright Mojang AB. Do not distribute!');
    this.widthCopyrightRest = this.width - this.widthCopyright - 2;

    const baseY = ~~this.height / 4 + 48;

    if(this.minecraft.getIsDemo()) this.addDemoButtons(baseY, 24);
    else this.addSingleplayerMultiplayerButtons(baseY, 24);

    
    this.addButton(new ImageButton(this.width / 2 - 124, baseY + 72 + 12, 20, 20, 0, 106, 20, Button.WIDGETS_LOCATION, 256, 256, (button) => {
      this.minecraft.displayGuiScreen(new LanguageScreen(this, this.minecraft.gameSettings));
    }, ''));

    this.addButton(new Button(this.width / 2 - 100, baseY + 72 + 12, 98, 20, new TranslationTextComponent('menu.options'), (button) => {
      this.minecraft.displayGuiScreen(new OptionsScreen(this, this.minecraft.gameSettings));
    }));

    this.addButton(new Button(this.width / 2 + 2, baseY + 72 + 12, 98, 20, new TranslationTextComponent('menu.quit'), (button) => {
      this.minecraft.shutdown();
    }));

    this.addButton(new ImageButton(this.width / 2 + 104, baseY + 72 + 12, 20, 20, 0, 0, 20, MainMenuScreen.ACCESSIBILITY_TEXTURES, 32, 64, (button) => {
    }, ''));
  }

  private addSingleplayerMultiplayerButtons(yIn: number, rowHeightIn: number): void {
    this.addButton(new Button(this.width / 2 - 100, yIn, 200, 20, new TranslationTextComponent('menu.singleplayer'), (button) => {
      this.minecraft.testSwitchLang();
    }));

    const flag = this.minecraft.isMultiplayerEnabled();

    (this.addButton(new Button(this.width / 2 - 100, yIn + rowHeightIn * 1, 200, 20, new TranslationTextComponent('menu.multiplayer'), (button) => {
      this.minecraft.displayGuiScreen(new MultiplayerScreenScreen(this))
    }))).active = flag;

    (this.addButton(new Button(this.width / 2 - 100, yIn + rowHeightIn * 2, 200, 20, new TranslationTextComponent('Reload Resources'), (button) => {
      this.minecraft.loadResources();
    }))).active = flag;
  }

  private addDemoButtons(yIn: number, rowHeightIn: number): void {
    const flag = false;

    this.addButton(new Button(this.width / 2 - 100, yIn, 200, 20, new TranslationTextComponent('menu.playdemo'), (button) => {
    }));

    this.buttonResetDemo = this.addButton(new Button(this.width / 2 - 100, yIn + rowHeightIn * 1, 200, 20, new TranslationTextComponent('menu.resetdemo'), (button) => {
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
      const mcTitleTexture = this.minecraft.getTextureManager().getTexture(MainMenuScreen.MINECRAFT_TITLE_TEXTURES);

      const createBlackTitleBuffer = (name: string, xUV: number, yUV: number, width: number, height: number) => {
        this.minecraft.textureBuffer.add(name, AbstractGui.createBuffer(width, height, (ctx) => {
          AbstractGui.blit(ctx, mcTitleTexture, 0, 0, xUV, yUV, width, height);
          ctx.globalCompositeOperation = 'source-in';
          ctx.fillStyle = 'black';
          ctx.fillRect(0, 0, width, height);
        }));
      }

      if(this.showTitleWronglySpelled) {
        if(!this.minecraft.textureBuffer.has('mcwstitle_0')) {
          createBlackTitleBuffer('mcwstitle_0', 0, 0, 99, 44);
          createBlackTitleBuffer('mcwstitle_1', 129, 0, 27, 44);
          createBlackTitleBuffer('mcwstitle_2', 126, 0, 3, 44);
          createBlackTitleBuffer('mcwstitle_3', 99, 0, 26, 44);
          createBlackTitleBuffer('mcwstitle_4', 0, 45, 155, 44);
        } else {
          let mcwstitle_0 = this.minecraft.textureBuffer.get('mcwstitle_0');
          let mcwstitle_1 = this.minecraft.textureBuffer.get('mcwstitle_1');
          let mcwstitle_2 = this.minecraft.textureBuffer.get('mcwstitle_2');
          let mcwstitle_3 = this.minecraft.textureBuffer.get('mcwstitle_3');
          let mcwstitle_4 = this.minecraft.textureBuffer.get('mcwstitle_4');

          AbstractGui.blit(context, mcwstitle_0, j, 30, 0, 0, 99, 44);
          AbstractGui.blit(context, mcwstitle_0, j + 1, 31, 0, 0, 99, 44);
          AbstractGui.blit(context, mcwstitle_0, j + 1, 29, 0, 0, 99, 44);

          AbstractGui.blit(context, mcwstitle_1, j + 99 + 1, 30, 0, 0, 27, 44);
          AbstractGui.blit(context, mcwstitle_1, j + 99, 31, 0, 0, 27, 44);
          AbstractGui.blit(context, mcwstitle_1, j + 99, 29, 0, 0, 27, 44);

          AbstractGui.blit(context, mcwstitle_2, j + 99 + 26, 30, 0, 0, 3, 44);
          AbstractGui.blit(context, mcwstitle_2, j + 99 + 26 + 1, 31, 0, 0, 3, 44);
          AbstractGui.blit(context, mcwstitle_2, j + 99 + 26 + 1, 29, 0, 0, 3, 44);

          AbstractGui.blit(context, mcwstitle_3, j + 99 + 26 + 3, 30, 0, 0, 26, 44);
          AbstractGui.blit(context, mcwstitle_3, j + 99 + 26 + 3 + 1, 31, 0, 0, 26, 44);
          AbstractGui.blit(context, mcwstitle_3, j + 99 + 26 + 3 + 1, 29, 0, 0, 26, 44);

          AbstractGui.blit(context, mcwstitle_4, j + 155 + 1, 30, 0, 0, 155, 44);
          AbstractGui.blit(context, mcwstitle_4, j + 155, 31, 0, 0, 155, 44);
          AbstractGui.blit(context, mcwstitle_4, j + 155, 29, 0, 0, 155, 44);

          AbstractGui.blit(context, mcTitleTexture, j + 1, 30, 0, 0, 99, 44);
          AbstractGui.blit(context, mcTitleTexture, j + 99 + 1, 30, 129, 0, 27, 44);
          AbstractGui.blit(context, mcTitleTexture, j + 99 + 26 + 1, 30, 126, 0, 3, 44);
          AbstractGui.blit(context, mcTitleTexture, j + 99 + 26 + 3 + 1, 30, 99, 0, 26, 44);
          AbstractGui.blit(context, mcTitleTexture, j + 155, 30, 0, 45, 155, 44);
        }
      } else {
        if(!(this.minecraft.textureBuffer.has('mctitle_0') || this.minecraft.textureBuffer.has('mctitle_1'))) {
          createBlackTitleBuffer('mctitle_0', 0, 0, 155, 44);
          createBlackTitleBuffer('mctitle_1', 0, 45, 155, 44);
        } else {
          let mctitle_0 = this.minecraft.textureBuffer.get('mctitle_0');
          let mctitle_1 = this.minecraft.textureBuffer.get('mctitle_1');

          AbstractGui.blit(context, mctitle_0, j, 30, 0, 0, 155, 44);
          AbstractGui.blit(context, mctitle_0, j + 1, 29, 0, 0, 155, 44);
          AbstractGui.blit(context, mctitle_0, j + 1, 31, 0, 0, 155, 44);

          AbstractGui.blit(context, mctitle_1, j + 155 + 1, 30, 0, 0, 155, 44);
          AbstractGui.blit(context, mctitle_1, j + 155 + 1, 29, 0, 0, 155, 44);
          AbstractGui.blit(context, mctitle_1, j + 155 + 1, 31, 0, 0, 155, 44);

          AbstractGui.blit(context, mcTitleTexture, j + 1, 30, 0, 0, 155, 44);
          AbstractGui.blit(context, mcTitleTexture, j + 155, 30, 0, 45, 155, 44);
        }
      }

      const editionTexture = this.minecraft.getTextureManager().getTexture(MainMenuScreen.MINECRAFT_TITLE_EDITION);
      AbstractGui.blit(context, editionTexture, j + 88, 67, 0, 0, 98, 14);
    } catch(e) {
      console.log('Failed to render buffer');
    }

    context.save();
    let splash = { x: j + 240, y: 59, width: this.font.getTextWidth(this.splashText), height: 9}

    const miliT = Util.milliTime();
    let f2 = 1.5 - Math.abs(Math.sin((miliT % 1000) / 1000.0 * (Math.PI * 2)) * 0.1);
    f2 = f2 * 100.0 / (this.font.getTextWidth(this.splashText) + 32);

    ContextUtils.rotateScale(context, -20 * Math.PI / 180, splash.x, splash.y, f2);

    this.drawCenteredString(context, this.font, this.splashText, splash.x, splash.y, 16776960);
    context.restore();

    let mc = 'Minecraft TS ' + this.minecraft.getVersion();
    if(this.minecraft.getIsDemo()) mc += ' Demo';
    else mc += (this.minecraft.getVersionType() === 'release' ? '' : '/' + this.minecraft.getVersionType());
    mc += `/${this.minecraft.getPlayerName()}`;
    if(this.minecraft.isModdedClient()) mc += new TranslationTextComponent('menu.modded');

    this.drawString(context, this.font, mc, 2, this.height - 10, 16777215)
    this.drawString(context, this.font, 'Copyright Mojang AB. Do not distribute!', this.widthCopyrightRest, this.height - 10, 16777215);

    if(mouseX > this.widthCopyrightRest && mouseX < this.widthCopyrightRest + this.widthCopyright && mouseY > this.height - 10 && mouseY < this.height) {
      ContextUtils.fill(context, this.widthCopyrightRest, this.widthCopyrightRest + this.widthCopyright, this.height - 1, 1, 16777215);
    }

    for(const widget of this.buttons) {
      widget.setAlpha(f1);
    }

    super.render(context, mouseX, mouseY, partialTicks);
  }

  public mouseClicked(mouseX: number, mouseY: number, button: number): boolean {
    if(super.mouseClicked(mouseX, mouseY, button)) {
      return true;  
    } else {
      if(mouseX > this.widthCopyrightRest && mouseX < (this.widthCopyrightRest + this.widthCopyright) && mouseY > (this.height - 10) && mouseY < this.height) {
        this.minecraft.getSoundHandler().play(Sounds.clickStereo, SoundCategory.MASTER, 0.5)
      }
      return false;
    }
  }
}