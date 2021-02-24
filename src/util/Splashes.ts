import { getResourceLocation } from '@km.mcts/util/Resources';

export default class Splashes {
  private static SPLASHES = getResourceLocation('texts', 'splashes');
  private possibleSplashes: Array<string> = new Array();

  constructor() {
    this.reload();
  }

  public reload(): void {
    this.apply(this.prepare());
  }

  protected prepare(): Array<string> {
    try {
      return getResourceLocation('texts', 'splashes').split(/\r?\n/);
    } catch {
      return []
    }
  }

  protected apply(objectIn: Array<string>): void {
    this.possibleSplashes = [];
    this.possibleSplashes = objectIn;
  }

  public getSplashText() {
    const date = new Date(),
          month = date.getMonth(),
          day = date.getDate();

      // const getRandomSplashText = () => {
      //   return allSplashes[~~(Math.random() * (allSplashes.length - 1))]
      // }
  
    // let randSplash = String(getRandomSplashText());

    // if(month + 1 === 12 && day === 24) randSplash = 'Merry X-mas!';
    // else if (month + 1 === 1 && day === 1) randSplash = 'Happy new year!';
    // else if(month + 1 === 10 && day === 31) randSplash = 'OOoooOOOoooo! Spooky!';

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