import { getResourceLocation } from '../../utils/GetResources';
import Screen from './Screen'

export default class WinGameScreen extends Screen {
  private poem: boolean;
  private time: number = 0;
  private lines: any = null;
  private field_238664_v_: any = null;
  private totalScrollLength: number = 0;
  private scrollSpeed: number = 0.5;
  protected MINECRAFT_TITLE_IMG = getResourceLocation('textures', 'gui/title/minecraft');
  
  constructor(poemIn: boolean) {
    super();
    this.poem = poemIn;
    if(!poemIn) this.scrollSpeed = 0.75;
  }

  public tick(): void {
    if(this.totalScrollLength !== 0) {
      const f = (this.totalScrollLength + this.height + this.height + 24) / this.scrollSpeed;
      if (this.time > f) {
        this.sendRespawnPacket();
      }
    }
  }

  public closeScreen(): void {
    this.sendRespawnPacket();
  }

  private sendRespawnPacket(): void {
    this.minecraft.displayGuiScreen(null);
  }

  private drawWinGameScreen(context: CanvasRenderingContext2D, mouseX: number, mouseY: number) {
    let i = this.width;
    let f = -this.time * 0.5 * this.scrollSpeed;
    let f1 = this.height - this.time * 0.5 * this.scrollSpeed;
    let f2 = 0.015625;
    let f3 = this.time * 0.02;
    let f4 = (this.totalScrollLength + this.height + this.height + 24) / this.scrollSpeed;
    let f5 = (f4 - 20.0 - this.time) * 0.005;
    if (f5 < f3) {
       f3 = f5;
    }

    if (f3 > 1.0) {
       f3 = 1.0;
    }

    f3 = f3 * f3;
    f3 = f3 * 96 / 255;

    context.save();
    context.scale(this.minecraft.getScaleFactor() * 0.9, this.minecraft.getScaleFactor() * 0.9)
    context.fillStyle = context.createPattern(this.OPTIONS_BACKGROUND, 'repeat')!;
    context.fillRect(0, f * 2, this.width, this.height);
    context.fillStyle = 'rgba(0, 0, 0, 0.7)';
    context.fillRect(0, f * 2, this.width, this.height);
    context.restore()
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number) {
    this.drawWinGameScreen(context, mouseX, mouseY);
    // let i = 274;
    // let j = ~~(this.width / 2 - 137);
    // let k = ~~(/* this.height +*/ 50);
    // this.time += 1;
    // console.log(this.time)
    // const f = -this.time * this.scrollSpeed;

    // context.translate(0, f);

    // try {
    //   this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 0, k, 0, 0, 99, 44);
    //   this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 0, k, 0, 0, 99, 44);
    //   this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 99, k, 129, 0, 27, 44);
    //   this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 99 + 26, k, 126, 0, 3, 44);
    //   this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 99 + 26 + 3, k, 99, 0, 26, 44);
    //   this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 155, k, 0, 45, 155, 44);
    // } catch {

    // }
  }
}