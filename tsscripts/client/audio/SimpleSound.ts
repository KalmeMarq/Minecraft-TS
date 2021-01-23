
class SimpleSound {
  public sound
  public volume
  public pitch

  constructor(sound: string, volume: number , pitch: number) {
    this.sound = sound
    this.volume = volume;
    this.pitch = pitch;
  }
}

class SimpleSounds {
   static master(soundIn: string, pitchIn: number) {
    return new SimpleSound(soundIn, pitchIn, 0.25);
  }
}
