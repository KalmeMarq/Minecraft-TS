import Button from "./Button";

export default class ImageButton extends Button {
   private resourceLocation: any;
   private xTexStart!: number;
   private yTexStart!: number;
   private yDiffText!: number;
   private textureWidth: number;
   private textureHeight: number;

  constructor(x: number, y: number, width: number, height: number, xUV: number, yUV: number, yUVSize: number, img: any, txrWidth: number, txrHeight: number, onPressFunc: (button: Button) => void, title: string) {
    super(x, y, width, height, title, onPressFunc);
    this.textureWidth = txrWidth;
    this.textureHeight = txrHeight;
    this.xTexStart = xUV;
    this.yTexStart = yUV;
    this.yDiffText = yUVSize;
    this.resourceLocation = img;
  }

  public setPosition(xIn: number, yIn: number) {
    this.x = xIn;
    this.y = yIn;
  }

  public renderButton(context: CanvasRenderingContext2D, mouseX: number, mouseY: number) {
    let y = this.yTexStart;
    if (this.getIsHovered()) y += this.yDiffText;
    context.globalAlpha = this.alpha;
    this.blit(context, this.resourceLocation, this.x, this.y, this.xTexStart, y, this.width, this.height);
    context.globalAlpha = 1;
  }
}
