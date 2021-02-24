import ColorHelper from "@km.mcts/util/ColorHelper";
import { getResourceLocation } from "@km.mcts/util/Resources";
import Util from "@km.mcts/util/Util";
import { type } from "os";
import { stringify } from "querystring";

export default class FontRenderer {
  public static hasCatchedError = false; 
  public ref = getResourceLocation('fonts', 'default');
  public fonts = { ascii: getResourceLocation('textures', 'font/ascii'), accented: getResourceLocation('textures', 'font/accented')};
  public asciiChars: any[] = [];
  public accentedChars: any[] = [];
  public asciiCharsStore: { [key: string]: CharacterInfo } = {};
  public accentedCharsStore: { [key: string]: CharacterInfo } = {};
  public allCharsStore: { [key: string]: CharacterInfo } = {};
  public characterBuffer: CharacterBuffer = new CharacterBuffer();

  constructor() {
    this.ref.providers[2].chars.forEach((line: any) => {
      line.split('').forEach((char: any) => {
        this.asciiChars.push(char)
      })
    })

    this.asciiChars.forEach(char => {
      this.asciiCharsStore[char] = new CharacterInfo('ascii', this.fonts, this.asciiChars, char);
    })

    this.ref.providers[1].chars.forEach((line: any) => {
      line.split('').forEach((char: any) => {
        this.accentedChars.push(char)
      })
    })

    this.accentedChars.forEach(char => {
      this.accentedCharsStore[char] = new CharacterInfo('accented', this.fonts, this.accentedChars, char);
    })

    Object.entries(this.asciiCharsStore).forEach(([key, value]) => {
      if(!this.allCharsStore[key]) {
        this.allCharsStore[key] = value;
      }
    })

    
    Object.entries(this.accentedCharsStore).forEach(([key, value]) => {
      if(!this.allCharsStore[key]) {
        this.allCharsStore[key] = value;
      }
    })
  }

  public drawStringWithShadow(context: CanvasRenderingContext2D, text: string, x: number, y: number, color: number | string) {
    const c = typeof color === 'number' ? ColorHelper.getColor(color) : color;
    const cS = typeof color === 'number' ? ColorHelper.getDarkerColor(color) : 'black';

    for(let i = 0, k = x; i < text.length; i++) {
      let char = text[i];
      let charInfo = this.allCharsStore[char];

      if(this.characterBuffer.get(char, c).src === null) {
        this.characterBuffer.add(this.allCharsStore[char], c)
  
        if(this.characterBuffer.get(char, cS).src === null) {
          this.characterBuffer.add(this.allCharsStore[char], cS)
        }
      } else {
        let o = charInfo.type == 'ascii' ? 0 : 3;
        context.drawImage(this.characterBuffer.get(char, cS).src!, k + 1, y + 1 - o)
        context.drawImage(this.characterBuffer.get(char, c).src!, k, y - o)
  
  
        k += charInfo.width;
        if(char !== ' ') k--;
      }
    }
  }

  public getTextWidth(text: string): number {
    let j = 0;
    for(let i = 0; i < text.length; i++) {
      try {
        let charInfo = this.allCharsStore[text[i]];
        j += charInfo.width - 1;
      } catch(e) {
        if(!FontRenderer.hasCatchedError) {
          FontRenderer.hasCatchedError = true;
          Util.createLog(`Char not found!`)
        }
      }
    }
    

    return j;
  }
}

interface ICharacterBuffer {
  [key: string]: {
    [colorKey: string]: HTMLCanvasElement;
  }
}

export class CharacterBuffer {
  public static hasCatchedError = false;
  private buffer: ICharacterBuffer = {};

  constructor() {
  }

  public add(charInfo: CharacterInfo, color: string): void {
 /*    try { */
      if(!this.buffer[charInfo.char]) this.buffer[charInfo.char] = {};
    
      if(!this.buffer[charInfo.char][color]) {
        const c = <HTMLCanvasElement>document.createElement('canvas');
        const ctx = <CanvasRenderingContext2D>(c.getContext('2d'));
        c.width = charInfo.width;
        c.height = charInfo.height;
        
        ctx.save();
        ctx.globalAlpha = 1
        ctx.drawImage(charInfo.fontImg, charInfo.xUV, charInfo.yUV, charInfo.width, charInfo.height, 0, 0, charInfo.width, charInfo.height);
        ctx.globalCompositeOperation = 'source-in';
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, charInfo.width, charInfo.height);
        ctx.restore()

        this.buffer[charInfo.char][color] = ctx.canvas;
      }
/*     } catch(e) {
      if(!CharacterBuffer.hasCatchedError) {
        CharacterBuffer.hasCatchedError = true;
        Util.createLog(`Char not found!`)
      }
    } */
  }

  public get(char: string, color: string): { char: string, color: string, src: HTMLCanvasElement | null } {
    let c: HTMLCanvasElement | null = null;
    if(this.buffer[char] && this.buffer[char][color]) {
      c = this.buffer[char][color]
    }

    return {
      char: char,
      color: color,
      src: c
    }
  }
}

export class CharacterInfo {
  public char;
  public width;
  public height;
  public baseWidth;
  public baseHeight;
  public xIndex;
  public yIndex;
  public xUV;
  public yUV;
  public fontImg;
  public type;

  constructor(type: string, font: { [key: string]: HTMLImageElement }, chars: any, char: string) {
    this.type = type;
    this.fontImg = font[type];
    this.char = char;
    this.baseWidth = type == 'ascii' ? 7 : 10;
    this.baseHeight = type == 'ascii' ? 8 : 12;

    this.width = type == 'ascii' ? 7 : 7;

    const specialChars = {
      'i': 3,
      'ì': 3,
      '.': 3,
      '\'': 3,
      ':': 3,
      ',': 2,
      'f': 6,
      'k': 6,
      '(': 6,
      ' ': 4,
      'l': 4,
      '`': 5,
      't': 5,
      'I': 5,
      '"': 5
    }

    Object.entries(specialChars).forEach(([key, value]) => key == char ? this.width = value : null);
   
    this.height = type == 'ascii' ? 8 : 12;

    let charIdx = chars.findIndex((i: any) => i == char);
    this.yIndex = Number(~~(charIdx / 16));
    this.xIndex = Number((charIdx % 16));

    this.xUV = this.xIndex + (this.xIndex * this.baseWidth);
    this.yUV = (this.yIndex * this.baseHeight);

    if(this.type == 'accented') {
      this.yIndex = Number(~~(charIdx / 16));
      this.xIndex = Number((charIdx % 16));

      this.xUV = this.xIndex + (this.xIndex * (this.baseWidth - 2));
      this.yUV = (this.yIndex * this.baseHeight);
    }
  }
}