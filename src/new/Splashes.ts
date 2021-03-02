import ResourceLocation from '@mcsrc/new/ResourceLocation';
import Calendar from './util/Calendar';
import Random from './util/math/Random';
import Session from './util/Session';

export default class Splashes {
  private static SPLASHES_LOCATION: ResourceLocation = new ResourceLocation('texts/splashes.txt');
  private static RANDOM: Random = new Random();
  private possibleSplashes: Array<string> = new Array<string>();
  private gameSession: Session;

  constructor(gameSessionIn: Session) {
    this.gameSession = gameSessionIn;
  }

  public async reload(): Promise<void> {
    this.apply(await this.prepare());
  }

  protected async prepare(): Promise<string[]> {
    try {
      const promise = await fetch(Splashes.SPLASHES_LOCATION.getFullPath()).then(res => res.text()).then(data => data.split(/\r?\n/));
      return await Promise.all(promise);
    } catch {
      return []
    }
  }

  protected apply(objectIn: Array<string>): void {
    this.possibleSplashes = [];
    this.possibleSplashes = objectIn;
  }

  public getSplashText(): string {
    const calendar: Calendar = new Calendar(new Date());

    if(calendar.get(1) + 1 === 12 && calendar.get(2) === 24) {
      return 'Merry X-mas!'
    } else if(calendar.get(1) + 1 === 1 && calendar.get(2) === 1) {
      return 'Happy new year!'
    } else if(calendar.get(1) + 1 === 10 && calendar.get(2) === 31) {
      return 'OOoooOOOoooo! Spooky!'
    } else if(this.possibleSplashes.length === 0) {
      return ''
    } else {
      return this.gameSession != null && Splashes.RANDOM.nextInt(this.possibleSplashes.length) == 42
        ? this.gameSession.getUsername().toUpperCase() + ' IS YOU'
        : this.possibleSplashes[Splashes.RANDOM.nextInt(this.possibleSplashes.length)]
    }
  }
}