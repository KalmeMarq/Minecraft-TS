export default class SoundEvent {
  private name: HTMLAudioElement;

  constructor(name: HTMLAudioElement) {
    this.name = name;
  }

  public getName(): HTMLAudioElement {
    return this.name;
  }
}
