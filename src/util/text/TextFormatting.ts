import Util from "../Util";

type ITextFormating = {
  formattingName: string,
  formattingCodeIn: string,
  fancyStylingIn?: boolean,
  index?: number,
  colorCode?: number | null
}

export default class TextFormatting {
  static readonly BLACK = new TextFormatting({formattingName: 'BLACK', formattingCodeIn: '0', index: 0, colorCode: 0});
  static readonly DARK_BLUE = new TextFormatting({formattingName: 'DARK_BLUE', formattingCodeIn: '1', index: 1, colorCode: 170});
  static readonly DARK_GREEN = new TextFormatting({formattingName: 'DARK_GREEN', formattingCodeIn: '2', index: 2, colorCode: 43520});
  static readonly DARK_AQUA = new TextFormatting({formattingName: 'DARK_AQUA', formattingCodeIn: '3', index: 3, colorCode: 43690});
  static readonly DARK_RED = new TextFormatting({formattingName: 'DARK_RED', formattingCodeIn: '4', index: 4, colorCode: 11141120});
  static readonly DARK_PURPLE = new TextFormatting({formattingName: 'DARK_PURPLE', formattingCodeIn: '5', index: 5, colorCode: 11141290});
  static readonly GOLD = new TextFormatting({formattingName: 'GOLD', formattingCodeIn: '6', index: 6, colorCode: 16755200});
  static readonly GRAY = new TextFormatting({formattingName: 'GRAY', formattingCodeIn: '7', index: 7, colorCode: 11184810});
  static readonly DARK_GRAY = new TextFormatting({formattingName: 'DARK_GRAY', formattingCodeIn: '8', index: 8, colorCode: 5592405});
  static readonly BLUE = new TextFormatting({formattingName: 'BLUE', formattingCodeIn: '9', index: 9, colorCode: 5592575});
  static readonly GREEN = new TextFormatting({formattingName: 'GREEN', formattingCodeIn: 'a', index: 10, colorCode: 5635925});
  static readonly AQUA = new TextFormatting({formattingName: 'AQUA', formattingCodeIn: 'b', index: 11, colorCode: 5636095});
  static readonly RED = new TextFormatting({formattingName: 'RED', formattingCodeIn: 'c', index: 12, colorCode: 16733525});
  static readonly LIGHT_PURPLE = new TextFormatting({formattingName: 'LIGHT_PURPLE', formattingCodeIn: 'd', index: 13, colorCode: 16733695});
  static readonly YELLOW = new TextFormatting({formattingName: 'YELLOW', formattingCodeIn: 'e', index: 14, colorCode: 16777045});
  static readonly WHITE = new TextFormatting({formattingName: 'WHITE', formattingCodeIn: 'f', index: 15, colorCode: 16777215});
  static readonly OBFUSCATED = new TextFormatting({formattingName: 'OBFUSCATED', formattingCodeIn: 'k', fancyStylingIn: true});
  static readonly BOLD = new TextFormatting({formattingName: 'BOLD', formattingCodeIn: 'l', fancyStylingIn: true});
  static readonly STRIKETHROUGH = new TextFormatting({formattingName: 'STRIKETHROUGH', formattingCodeIn: 'm', fancyStylingIn: true});
  static readonly UNDERLINE = new TextFormatting({formattingName: 'UNDERLINE', formattingCodeIn: 'n', fancyStylingIn: true});
  static readonly ITALIC = new TextFormatting({formattingName: 'ITALIC', formattingCodeIn: 'o', fancyStylingIn: true});
  static readonly RESET = new TextFormatting({formattingName: 'RESET', formattingCodeIn: 'r', index: -1, colorCode: null});

  private static NAME_MAPPING = new Map<string, TextFormatting>(Util.arrayToMap(Object.values(TextFormatting)));
  private static FORMATTING_CODE_PATTERN = (new RegExp('(?i)\u00a7[0-9A-FK-OR]')).compile();
  private name: string;
  private formattingCode: string;
  private fancyStyling: boolean;
  private controlString: string;
  private colorIndex: number;
  private color: number | null;

  private constructor({formattingName, formattingCodeIn, fancyStylingIn = false, index = -1, colorCode = null}: ITextFormating) {
    this.name = formattingName;
    this.formattingCode = formattingCodeIn;
    this.fancyStyling = fancyStylingIn;
    this.colorIndex = index;
    this.color = colorCode;
    this.controlString = "\u00a7" + formattingCodeIn;
  }

  private static lowercaseAlpha(string: string): string {
    return string.toLowerCase().replaceAll("[^a-z]", "");
  }

  public getColorIndex(): number {
    return this.colorIndex;
  }

  public isFancyStyling(): boolean {
    return this.fancyStyling;
  }

  public isColor(): boolean {
    return !this.fancyStyling && this != TextFormatting.RESET;
  }

  public getColor(): number | null {
    return this.color;
  }

  public getFriendlyName(): string {
    return this.name.toLowerCase();
  }

  public toString(): string {
    return this.controlString;
  }

  public static getTextWithoutFormattingCodes(text: string | null): string | null {
    return text == null ? null : (text).replaceAll(TextFormatting.FORMATTING_CODE_PATTERN, '');
  }

  public static getValueByName(friendlyName: string | null): TextFormatting | null {
    return friendlyName == null ? null : TextFormatting.NAME_MAPPING.get(TextFormatting.lowercaseAlpha(friendlyName))!;
  }
}