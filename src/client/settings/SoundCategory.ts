
export default class SoundCategory {
  public static MASTER = new SoundCategory('master')
  public static MUSIC = new SoundCategory('music')
  public static RECORDS = new SoundCategory('record')
  public static WEATHER = new SoundCategory('weather')
  public static BLOCKS = new SoundCategory('block')
  public static HOSTILE = new SoundCategory('hostile')
  public static NEUTRAL = new SoundCategory('neutral')
  public static PLAYERS = new SoundCategory('player')
  public static AMBIENT = new SoundCategory('ambient')
  public static VOICE = new SoundCategory('voice')

  private static readonly SOUND_CATEGORIES: Map<string, SoundCategory> = new Map(Object.values(SoundCategory).slice(0, -1))

  private readonly name: string
  private constructor (nameIn: string) {
    this.name = nameIn
  }

  public getName (): string {
    return this.name
  }
}
