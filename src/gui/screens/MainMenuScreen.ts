import { int } from "../../utils/MouseHelper.js";
import { playSound } from "../../utils/PlaySound.js";
import { getResourceLocation, MCUI } from "../../utils/Resources.js";
import { consoleOutput, isInside } from "../../utils/Test.js";
import { getKeyTranslation } from "../../utils/TranslationText.js";
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

   /*  this.addButton(new OptionSlider(this.minecraft.gameSettings, 1, 1, 200, 20, this.minecraft.gameSettings.chatScale)); */

    this.genInit();
  }

  public genInit() {
    let screen: any = MCUI['main_menu_screen'];

    const getType = (superObj: any, obj: any) => {
      if(superObj === null) {
        if(obj.type) {
          return obj.type;
        } else {
          return new Error('Type not specified');
        }
      } else {
        if((obj.type && superObj.type) || (obj.type && !superObj.type)) {
          return obj.type;
        } else if(!obj.type && superObj.type) {
          return superObj.type;
        } else {
          throw new Error('Type not specified')
        } 
      }
    }

    const getOffsetX = (superObj: any, obj: any) => {
      if(superObj === null) {
        if(obj.offset) {
          return obj.offset[0].replace('px', '').replace('100%', 'this.width');
        } else {
          return new Error('Offset not specified');
        }
      } else {
        if((obj.offset && superObj.offset) || (obj.offset && !superObj.offset)) {
          return obj.offset[0].replace('px', '').replace('100%', 'this.width');
        } else if(!obj.offset && superObj.offset) {
          return superObj.offset[0].replace('px', '').replace('100%', 'this.width');
        } else {
          throw new Error('Offset not specified')
        } 
      }
    }

    const getOffsetY = (superObj: any, obj: any) => {
      if(superObj === null) {
        if(obj.offset) {
          return obj.offset[1].replace('px', '').replace('100%', 'this.height');
        } else {
          return new Error('Offset not specified');
        }
      } else {
        if((obj.offset && superObj.offset) || (obj.offset && !superObj.offset)) {
          return obj.offset[1].replace('px', '').replace('100%', 'this.height');
        } else if(!obj.offset && superObj.offset) {
          return superObj.offset[1].replace('px', '').replace('100%', 'this.height');
        } else {
          throw new Error('Offset not specified')
        } 
      }
    }

    const getWidth = (superObj: any, obj: any) => {
      if(superObj === null) {
        if(obj.size) {
          return obj.size[0];
        } else {
          return new Error('Size not specified');
        }
      } else {
        if((obj.size && superObj.size) || (obj.size && !superObj.size)) {
          return obj.size[0];
        } else if(!obj.size && superObj.size) {
          return superObj.size[0];
        } else {
          throw new Error('Size not specified')
        } 
      }
    }

    const getHeight = (superObj: any, obj: any) => {
      if(superObj === null) {
        if(obj.size) {
          return obj.size[1];
        } else {
          return new Error('Size not specified');
        }
      } else {
        if((obj.size && superObj.size) || (obj.size && !superObj.size)) {
          return obj.size[1];
        } else if(!obj.size && superObj.size) {
          return superObj.size[1];
        } else {
          throw new Error('Size not specified')
        } 
      }
    }

    const getText = (superObj: any, obj: any) => {
      if(superObj === null) {
        if(obj.text) {
          return obj.text;
        } else {
          return new Error('Text not specified');
        }
      } else {
        if((obj.text && superObj.text) || (obj.text && !superObj.text)) {
          return obj.text;
        } else if(!obj.text && superObj.text) {
          return superObj.text;
        } else {
          throw new Error('Text not specified')
        } 
      }
    }

    const getTexture = (superObj: any, obj: any) => {
      if(superObj === null) {
        if(obj.texture) {
          return obj.texture;
        } else {
          return new Error('Texture not specified');
        }
      } else {
        if((obj.texture && superObj.texture) || (obj.texture && !superObj.texture)) {
          return obj.texture;
        } else if(!obj.texture && superObj.texture) {
          return superObj.texture;
        } else {
          throw new Error('Texture not specified')
        } 
      }
    }

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
            window.close()
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
        let width: number;
        let height: number;
        let text: string;
        let ignored: boolean;
        let active: boolean;
        let pressFunc: Function;
  
        if(!(c.includes('@'))) {
          type = getType(null, d);
          x = eval(getOffsetX(null, d)), y = eval(getOffsetY(null, d));
          width = getWidth(null, d), height = getHeight(null, d);
          text = getText(null, d), pressFunc = getPressFunc(null, d);
          active = getActive(null, d);
          ignored = getIgnored(null, d);

          if(type === 'button') {
            let btn = new Button(x, y, width, height, getKeyTranslation(text), pressFunc);
            btn.active = active;
            btn.visible = !ignored;
            this.addButton(btn);
          } else if(type === 'button_image') {
            let texture = getTexture(null, d);
            let btn = new ImageButton(x, y, width, height, texture.base_uv[0], texture.base_uv[1], texture.base_uv_size[1], getResourceLocation('textures', texture.image), 256, 256, pressFunc, '');
            btn.active = active;
            btn.visible = !ignored;
            this.addButton(btn);
          }
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
          
          type = getType(superObj, d);
          x = eval(getOffsetX(superObj, d)), y = eval(getOffsetY(superObj, d));
          width = getWidth(superObj, d), height = getHeight(superObj, d);
          text = getText(superObj, d), pressFunc = getPressFunc(superObj, d);
          active = getActive(superObj, d);
          ignored = getIgnored(superObj, d);

          if(type === 'button') {
            let btn = new Button(x, y, width, height, getKeyTranslation(text), pressFunc);
            btn.active = active;
            btn.visible = !ignored;
            this.addButton(btn);
          } else if(type === 'button_image') {
            let texture = getTexture(superObj, d);
            let btn = new ImageButton(x, y, width, height, texture.base_uv[0], texture.base_uv[1], texture.base_uv_size[1], getResourceLocation('textures', texture.image), 256, 256, pressFunc, '');
            btn.active = active;
            btn.visible = !ignored;
            this.addButton(btn);
          }
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

      let offsetX = eval(obj.offset[0].replace('px', '').replace('100%', 'this.width'));
      let offsetY = eval(obj.offset[1].replace('px', '').replace('100%c', 'FontRenderer.getTextWidth(' + obj.text + ')').replace('100%', 'this.height'));

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
          }
        }
      }
    }
  }

  public mouseClicked(mouseX: number, mouseY: number, button: number) {
    super.mouseClicked(mouseX, mouseY, button);

    isInside(mouseX, mouseY, this.widthCopyrightRest, this.widthCopyright, (this.height - 10), 10, () => {
      playSound('click_stereo', 0.2);
      console.log('No credits sry :(');
    })
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number): void {
    this.fill(context, 0, 0, this.width, this.height, 3355443)

    isInside(mouseX, mouseY, this.widthCopyrightRest, this.widthCopyright, (this.height - 10), 10, () => {
      this.fill(context, (this.widthCopyrightRest - 1), this.height - 2, this.widthCopyright + 1, 1, 16777215)
    })

    this.genRender(context, mouseX, mouseY)
  }
}