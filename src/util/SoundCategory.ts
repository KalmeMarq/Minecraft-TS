export default class SoundCategory {
  static MASTER = new SoundCategory("master");
  static MUSIC = new SoundCategory("music");
  static RECORDS = new SoundCategory("record");
  static WEATHER = new SoundCategory("weather");
  static BLOCKS = new SoundCategory("block");
  static HOSTILE = new SoundCategory("hostile");
  static NEUTRAL = new SoundCategory("neutral");
  static PLAYERS = new SoundCategory("player");
  static AMBIENT = new SoundCategory("ambient");
  static VOICE = new SoundCategory("voice");

  private static SOUND_CATEGORIES: Map<String, SoundCategory> = new Map(Object.values(SoundCategory).slice(0, -1));

  private name: string;
  private constructor(nameIn: string) {
    this.name = nameIn;
  }

  public getName() {
    return this.name;
  }
}