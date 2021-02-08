import { getKeyTranslation } from '../utils/TranslationText'

export default class PlayerModelPart {
  static readonly CAPE = new PlayerModelPart(0, 'cape')
  static readonly JACKET = new PlayerModelPart(1, 'jacket')
  static readonly LEFT_SLEEVE = new PlayerModelPart(2, 'left_sleeve')
  static readonly RIGHT_SLEEVE = new PlayerModelPart(3, 'right_sleeve')
  static readonly LEFT_PANTS_LEG = new PlayerModelPart(4, 'left_pants_leg')
  static readonly RIGHT_PANTS_LEG = new PlayerModelPart(5, 'right_pants_leg')
  static readonly HAT = new PlayerModelPart(6, 'hat');

  private partId;
  private partMask;
  private partName;
  private name;

  private constructor(partIdIn: number, partNameIn: string) {
     this.partId = partIdIn;
     this.partMask = 1 << partIdIn;
     this.partName = partNameIn;
     this.name = 'options.modelPart.' + partNameIn;
  }

  public getPartMask(): number {
     return this.partMask;
  }

  public getPartName(): string {
     return this.partName;
  }

  public getName(): string {
     return this.name;
  }
}

// export default class SoundCategory {
//   static MASTER = new SoundCategory('master');
//   static MUSIC = new SoundCategory('music');
//   static RECORDS = new SoundCategory('record');
//   static WEATHER = new SoundCategory('weather');
//   static BLOCKS = new SoundCategory('block');
//   static HOSTILE = new SoundCategory('hostile');
//   static NEUTRAL = new SoundCategory('neutral');
//   static PLAYERS = new SoundCategory('player');
//   static AMBIENT = new SoundCategory('ambient');
//   static VOICE = new SoundCategory('voice');

//   private static SOUND_CATEGORIES: Map<String, SoundCategory> = new Map(Object.values(SoundCategory).slice(0, -1));

//   private name: string;
//   private constructor(nameIn: string) {
//     this.name = nameIn;
//   }

//   public getName() {
//     return this.name;
//   }
// }