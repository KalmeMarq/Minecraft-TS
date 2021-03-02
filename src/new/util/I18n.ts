import Minecraft from "@mcsrc/Minecraft";
import Util from "@mcsrc/util/Util";

export default class I18n {
  public static format(translateKey: string, ...params: any[]): string {
    let s = Minecraft.getInstance().getLanguageManager().getTranslation(translateKey);

    try {
      return Util.formatString(s, params);
    } catch (e) {
      return "Format error: " + s;
    }
  }
}