import Stats from 'stats.js'

export default class FPSCounter {
  public stats: any;
  private loopID: number = -1;
  private fpsLoopID: number = -1;
  public fps: number = 0;

  public constructor() {
    this.stats = Stats();
    this.stats.showPanel( 0 );
    document.body.appendChild( this.stats.dom );
    const loop = () => {
      this.stats.begin();
      this.stats.end();
      this.loopID = requestAnimationFrame(loop);
    }
    loop();

/*  let then = 0;
    const fpsLoop = (now: any) => {
      now *= 0.001;
      const deltaTime = now - then;
      then = now;
      const fps = 1 / deltaTime;
      console.log(~~fps);
      this.loopID1 = requestAnimationFrame(fpsLoop);
    }
    fpsLoop(); */
  }

  remove() {
    cancelAnimationFrame(this.loopID);
    this.stats.dom.remove();
    this.stats = undefined;
    this.loopID = -1;
  }

  changeVisiblity(value: boolean) {
    this.stats.dom.style.display = value ? 'block' : 'none'
  }

  readd() {
    this.stats = Stats();
    this.stats.showPanel( 0 );
    document.body.appendChild( this.stats.dom );
    const loop = () => {
      this.stats.begin();
      this.stats.end();
      this.loopID = requestAnimationFrame(loop);
    }
    loop();
  }
} 