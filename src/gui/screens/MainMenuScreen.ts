import JSONUI, { Type } from "../../utils/JSONUI.js";
import { int } from "../../utils/MouseHelper.js";
import { playSound } from "../../utils/PlaySound.js";
import { getResourceLocation, MCUI } from "../../utils/Resources.js";
import { consoleOutput, isInside } from "../../utils/Test.js";
import { getKeyTranslation } from "../../utils/TranslationText.js";
import Utils from "../../utils/Utils.js";
import FontRenderer from "../FontRenderer.js";
import Button from "../widgets/button/Button.js";
import ImageButton from "../widgets/button/ImageButton.js";
import { GameSettingsSlider } from "../widgets/GameSettingsSlider.js";
import OptionSlider from "../widgets/OptionSlider.js";
import Widgets from "../widgets/Widget.js";
import AccessibilityScreen from "./AccessibilityScreen.js";
import LanguageScreen from "./LanguageScreen.js";
import MultiplayerScreen from "./MultiplayerScreen.js";
import MultiplayerWarningScreen from "./MultiplayerWarningScreen.js";
import OptionsScreen from "./OptionsScreen.js";
import Screen from "./Screen.js";
import WinGameScreen from "./WinGameScreen.js";
import WorldSelectionScreen from "./WorldSelectionScreen.js";

export default class MainMenuScreen extends Screen {
  private widthCopyright: number = 0;
  private widthCopyrightRest: number = 0;
  protected MINECRAFT_TITLE_IMG = getResourceLocation('textures', 'gui/title/minecraft');
  protected MINECRAFT_EDITION_IMG = getResourceLocation('textures', 'gui/title/edition');
  protected WIDGETS_LOCATION = getResourceLocation('textures', 'gui/widgets');
  protected ACCESSIBILITY_TEXTURES = getResourceLocation('textures', 'gui/accessibility');
  private showTitleWronglySpelled: boolean = (Math.random() < 1.0E-4);
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

    // console.log(JSONUI.getObject(null, { type: 'panel', size: ["100%", 3], offset: [13, "76% - 12px"]}, this.width, this.height));
    
    // this.addButton(new OptionSlider(this.minecraft.gameSettings, 0, 0, 200, 20, 1))
    // console.log(JSONUI.sizeConversion(["12px", '33px + 12px + 50%'], this.width, this.height));
    this.genInit();
  }

  public genInit() {
    let screen: any = MCUI['main_menu_screen'];

    const getPressFunc = (superObj: any, obj: any): Function => {
      let id: string = obj.button_id || superObj.button_id || '';

      switch(id) {
        case 'button.menu_singleplayer':
          return () => {
            this.minecraft.displayGuiScreen(new WorldSelectionScreen(this));
          }
        case 'button.menu_multiplayer':
          return () => {
            let screen: Screen | null = (this.minecraft.gameSettings.skipMultiplayerWarning ? new MultiplayerScreen(this) : new MultiplayerWarningScreen(this));
            this.minecraft.displayGuiScreen(screen);
          }
        case 'button.menu_online':
          return function() {}
        case 'button.menu_options':
          return () => {
            this.minecraft.displayGuiScreen(new OptionsScreen(this, this.minecraft.gameSettings))
          }
        case 'button.settings_language':
          return () => {
            this.minecraft.displayGuiScreen(new LanguageScreen(this, this.minecraft.gameSettings))
          }
        case 'button.settings_accessibility':
          return () => {
            this.minecraft.displayGuiScreen(new AccessibilityScreen(this, this.minecraft.gameSettings));
          }
        case 'button.menu_quit':
          return () => {
            // window.close()
            console.log(this.minecraft.outputLog);
            this.minecraft.outputLog = ''
            
          }
        default:
          return function() {}
      }
    }

    const getActive = (superObj: any, obj: any) => {
      if(superObj === null) {
        if(obj.active) {
          return obj.active;
        } else {
          return true;
        }
      } else {
        if((obj.active && superObj.active) || (obj.active && !superObj.active)) {
          return obj.active;
        } else if(!obj.active && superObj.active) {
          return superObj.active;
        } else {
          return true
        } 
      }
    }

    const getIgnored = (superObj: any, obj: any) => {
      if(superObj === null) {
        if(obj.ignored) {
          return obj.ignored;
        } else {
          return false;
        }
      } else {
        if((obj.ignored && superObj.ignored) || (obj.ignored && !superObj.ignored)) {
          return !obj.ignored;
        } else if(!obj.ignored && superObj.ignored) {
          return !superObj.ignored;
        } else {
          return false
        } 
      }
    }
  
    Object.entries(screen.init.controls).forEach(([a, b]: any) => {
      Object.entries(b).forEach(([c, d]: any) => {
        let type: string;
        let x: number;
        let y: number;
        let offset: { x: number, y: number };
        let width: number;
        let height: number;
        let text: string;
        let ignored: boolean;
        let active: boolean;
        let pressFunc: Function;
  
        if(!(c.includes('@'))) {
          let obj = JSONUI.getObject(null, d, this.width, this.height, {});
          pressFunc = getPressFunc(null, d);
          let btn!: Widgets;

          switch(obj.type) {
            case Type.BUTTON:
              btn = new Button(
                obj.offset.x, obj.offset.y,
                obj.size.w, obj.size.h,
                getKeyTranslation(obj.text), pressFunc);
              break;
            case Type.BUTTON_IMAGE:
              btn = new ImageButton(
                obj.offset.x, obj.offset.y,
                obj.size.w, obj.size.h,
                obj.texture.base_uv[0], obj.texture.base_uv[1],
                obj.texture.base_uv_size[1], getResourceLocation('textures', obj.texture.image), 256, 256, pressFunc, '');
              break;
          }

          btn.active = obj.active;
          btn.visible = !obj.ignored;
          this.addButton(btn);
        } else {
          let superName: any = c.substr(c.indexOf('@') + 1);
          let namespace: any = superName.substr(0, superName.indexOf("."));
          let superObj: any;
          if(namespace !== '') {
            let a = superName.substr(superName.indexOf('.') + 1);
            superObj = MCUI[namespace][a];
          } else {
            superObj = screen[superName]
          }
        
          let obj = JSONUI.getObject(superObj, d, this.width, this.height, { '$is_demo': this.minecraft.isDemo() });
          pressFunc = getPressFunc(null, d);
          let btn!: Widgets;

          switch(obj.type) {
            case Type.BUTTON:
              btn = new Button(
                obj.offset.x, obj.offset.y,
                obj.size.w, obj.size.h,
                getKeyTranslation(obj.text), pressFunc);
              break;
            case Type.BUTTON_IMAGE:
              btn = new ImageButton(
                obj.offset.x, obj.offset.y,
                obj.size.w, obj.size.h,
                obj.texture.base_uv[0], obj.texture.base_uv[1],
                obj.texture.base_uv_size[1], getResourceLocation('textures', obj.texture.image), 256, 256, pressFunc, '');
              break;
          }

          btn.active = obj.active;
          btn.visible = !obj.ignored;
          this.addButton(btn);
        }
      })
    })
  }

  public genRender(context: CanvasRenderingContext2D, mouseX: number, mouseY: number) {
    let data = [
      {
        type: 'custom',
        renderer: 'title_renderer',
        offset: ['0px', '0px']
      },
      {
        type: 'custom',
        renderer: 'splash_renderer',
        offset: ['0px', '0px']
      },
      {
        type: 'label',
        text: '#mc_name',
        offset: ['2px', "100% - 10px"],
        color: [255, 255, 255]
      },
      {
        type: 'label',
        text: 'Not affiliated with Mojang Studios!',
        offset: ['100% - 170px', "100% - 10px"],
        color: [255, 255, 255]
      }
    ];

    for(var i = 0; i < data.length; i++) {
      const obj = data[i];

      let offsetX = eval(obj.offset[0].replace(/px/g, '').replace(/100%/g, 'this.width'));
      let offsetY = eval(obj.offset[1].replace(/px/g, '').replace(/100%c/g, 'FontRenderer.getTextWidth(' + obj.text + ')').replace(/100%/g, 'this.height'));

      if(obj.type === 'label' && obj.text) {
        let text = obj.text;
        if(text === '#mc_name') {
          text = "Minecraft JS " + this.minecraft.getVersion();
          if(this.minecraft.isDemo()) text += " Demo";
          else text += (this.minecraft.getVersionType() === "release" ? '' : '/' + this.minecraft.getVersionType());
          text += `/${this.minecraft.getUsername()}`;
          if(this.minecraft.isModdedClient()) text += getKeyTranslation("menu.modded");
        }

        this.drawString(context, text, offsetX, offsetY, 16777215);
      } else if(obj.type === 'custom') {
        if(obj.renderer!) {
          if(obj.renderer === 'title_renderer') {
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
            
            context.restore();
          } else if(obj.renderer === 'splash_renderer') {
            context.save();
            let j = this.width / 2 - 137;

          

            try {
              let splash = { x: j + 240, y: 59, width: FontRenderer.getTextWidth(this.splashText), height: 9}

              const miliT = new Date().getMilliseconds();
              let f2 = 1.5 - Math.abs(Math.sin((miliT % 1000) / 1000.0 * (Math.PI * 2)) * 0.1);
              f2 = f2 * 100.0 / (FontRenderer.getTextWidth(this.splashText) + 32);
  
              context.translate( splash.x, splash.y);
              context.scale(f2, f2);
              context.rotate(-20 * Math.PI / 180);
              context.translate( -splash.x, -splash.y );

              this.drawCenteredString(context, this.splashText, splash.x, splash.y, 16776960);
            } catch {
              let splash = { x: j + 240, y: 59, width: FontRenderer.getTextWidth('Error'), height: 9}
  
              const miliT = new Date().getMilliseconds();
              let f2 = 1.8 - Math.abs(Math.sin((miliT % 1000) / 1000.0 * (Math.PI * 2)) * 0.1);
              f2 = f2 * 100.0 / (context.measureText('Error').width + 32);
  
              context.translate( splash.x, splash.y);
              context.scale(f2, f2);
              context.rotate(-20 * Math.PI / 180);
              context.translate( -splash.x, -splash.y );

              this.drawCenteredString(context, 'Error', splash.x, splash.y, 16776960);
            }
            context.restore();
          }
        }
      }
    }
  }

  public mouseClicked(mouseX: number, mouseY: number, button: number) {
    super.mouseClicked(mouseX, mouseY, button);

    Utils.isInside(mouseX, mouseY, this.widthCopyrightRest, this.widthCopyright, (this.height - 10), 10, () => {
      playSound('click_stereo', 0.2);
      this.minecraft.displayGuiScreen(new WinGameScreen(false));
    })
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number): void {
    this.fill(context, 0, 0, this.width, this.height, 3355443)

    isInside(mouseX, mouseY, this.widthCopyrightRest, this.widthCopyright, (this.height - 10), 10, () => {
      this.fill(context, this.widthCopyrightRest, this.height - 2, this.widthCopyright + 1, 1, 16777215)
    })

    this.genRender(context, mouseX, mouseY)
  }
}