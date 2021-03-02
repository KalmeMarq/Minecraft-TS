import Sound from "@mcsrc/new/audio/Sound";
import GameSettings from "@mcsrc/GameSettings";
import ResourceLocation from "../ResourceLocation";
import SoundEventAcessor from "./SoundEventAcessor";

interface ISound {
  key: string,
  data: {
    sounds: string[],
    subtitle?: string
  }
}

export default class SoundManager {
  private gameSettings: GameSettings;
  private soundRegistry: Map<string, SoundEventAcessor> = new Map();
  private sounds: Map<string, Sound> = new Map();

  constructor(gameSettings: GameSettings) {
    this.gameSettings = gameSettings;
  }

  public async reload(): Promise<void> {
    this.apply(await this.prepare());
  }

  protected async prepare(): Promise<any> {
    try {
    /*   const soundRegistry = new Map<string, SoundEventAcessor>();

      const sounds = await fetch(new ResourceLocation('sounds.json').getFullPath()).then(res => res.json()).then(data => data);
      Object.entries(await sounds).map(async(sound: any) => {
        sounds.set(JSON.stringify(new ResourceLocation(sound.sounds[0])), new Sound(new ResourceLocation(sounds[0]), 1, 1))
      }) */

      return Promise;
    } catch {
      return []
    }
  }

  protected async apply(objectIn: any): Promise<void> {
    // console.log(this.sounds);
  }
}