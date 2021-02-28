import GameSettings from "@mcsrc/GameSettings";
import Util from "@mcsrc/util/Util";
import ResourceLocation from "./ResourceLocation";

interface IC {
  filename: string
  data: any
}

export default class LanguageManager {
  private LANGFILES = ['en_us', 'pt_pt'];
  private languageFiles = new Map<string, { [key: string]: string }>();
  private currentLanguage: string;

  constructor(currLang: string) {
    this.currentLanguage = currLang;
  }

  public async load(): Promise<void> {
    this.apply(await this.prepare());
  }

  protected apply(objectIn: IC[]): void {
    this.languageFiles.clear();

    objectIn.forEach((file: IC) => {
      this.languageFiles.set(file.filename, file.data);      
    })
  }

  protected async prepare(): Promise<IC[]> {
    try {
      const promises = this.LANGFILES.map(async(file: string) => {
        const filePath = Util.formatString("lang/%s.json", file);
        const res = await fetch(new ResourceLocation(filePath).getFullPath());
        const data = await res.json();
        return { filename: file, data: data };
      });
      
      return await Promise.all(promises);
    } catch {
      return []
    }
  }

  public getLanguageData(name: string) {
    return this.languageFiles.get(name)!;
  }
}