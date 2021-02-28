import GameSettings from "@mcsrc/GameSettings";
import Minecraft from "@mcsrc/Minecraft";
import SoundCategory from "@mcsrc/util/SoundCategory";
import Sounds from "./Sound";

export default class SoundHandler {
  public mc: Minecraft;
  public gameSettings: GameSettings;
  private audioCtx: AudioContext = new AudioContext();
  private gainNode: GainNode = this.audioCtx.createGain();
  private sounds: { [key: string]: AudioBuffer } = {}

  constructor(mcIn: Minecraft, gameSettings: GameSettings) {
    this.mc = mcIn;
    this.gameSettings = gameSettings;
    this.gainNode.connect(this.audioCtx.destination);
  }

  public async play(sound: Sounds, soundCategory: SoundCategory, volume: number) {
    if(!this.sounds[sound.getSoundName()]) {
      await this.add(sound);
    }

    const volumeWithCat = volume * (this.gameSettings.getSoundLevel(soundCategory)!);

    const source = this.audioCtx.createBufferSource();
    source.buffer = this.sounds[sound.getSoundName()];
    source.connect(this.gainNode);
    this.gainNode.gain.setValueAtTime(volumeWithCat, this.audioCtx.currentTime);
    source.start(0);
  }

  public async add(sound: Sounds) {
    await this.loadSound(sound.getBufferSrc()).then(data => this.sounds[sound.getSoundName()] = data);
  }
  
  public async loadSound(url: string) {
    return fetch(url)
      .then(res => res.arrayBuffer())
      .then(buffer => this.audioCtx.decodeAudioData(buffer));
  }
}