import ResourceLocation from '@mcsrc/new/ResourceLocation';

export default class Splashes {
  private static SPLASHES: any;
  private possibleSplashes: Array<string> = new Array();

  constructor() {
  }

  public async load(): Promise<void> {
    const res = await fetch(new ResourceLocation('font/default.json').getFullPath());
    const data = await res.json();
    Splashes.SPLASHES = data;
    this.apply(await this.prepare());
  }

  protected apply(objectIn: Array<string>): void {
    this.possibleSplashes = [];
    this.possibleSplashes = objectIn;
  }

  protected async prepare(): Promise<string[]> {
    try {
      const promise = await fetch('./resources/assets/minecraft/texts/splashes.txt').then(res => res.text()).then(data => data.split(/\r?\n/));
      return await Promise.all(promise);
    } catch {
      return []
    }
  }

  public getSplashText() {
    const date = new Date(),
          month = date.getMonth(),
          day = date.getDate();

    if(month + 1 === 12 && day === 24) {
      return 'Merry X-mas!'
    } else if(month + 1 === 1 && day === 1) {
      return 'Happy new year!'
    } else if(month + 1 === 10 && day === 31) {
      return 'OOoooOOOoooo! Spooky!'
    } else if(this.possibleSplashes.length === 0) {
      return ''
    } else {
      return this.possibleSplashes[Math.ceil(Math.random() * (this.possibleSplashes.length - 1))]
    }
  }
}