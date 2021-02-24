import { getResourceLocation } from "@km.mcts/util/Resources";
import FontRenderer from "./FontRenderer";

export default abstract class AbstractGui {
  public static BACKGROUND_LOCATION = getResourceLocation('textures', 'gui/options_background');

  protected hLine(context: CanvasRenderingContext2D, minX: number, maxX: number, y: number, color: string | number): void {
    if(maxX < minX) {
      let i = minX;
      minX = maxX;
      maxX = i;

      context.fillStyle = typeof color === 'number' ? 'white' : color;
      context.fillRect(minX, y, maxX + 1, y + 1);
    }
  }

  protected vLine(context: CanvasRenderingContext2D, x: number, minY: number, maxY: number, color: number | string): void {
    if(maxY < minY) {
       let i = minY;
       minY = maxY;
       maxY = i;
    }

    context.fillStyle = typeof color === 'number' ? 'white' : color;
    context.fillRect(x, minY + 1, x + 1, maxY);
  }

  protected blit(context: CanvasRenderingContext2D, img: HTMLImageElement | HTMLCanvasElement, x: number, y: number, uvX: number, uvY: number, width: number, height: number) {
    context.drawImage(img, uvX, uvY, width, height, x, y, width, height);
  }

  public drawCenteredString(context: CanvasRenderingContext2D, fontRenderer: FontRenderer, text: string, x: number, y: number, color: number | string) {
    fontRenderer.drawStringWithShadow(context, text, x - fontRenderer.getTextWidth(text) / 2, y, color);
  }

  public drawString(context: CanvasRenderingContext2D, fontRenderer: FontRenderer, text: string, x: number, y: number, color: number | string) {
    fontRenderer.drawStringWithShadow(context, text, x, y, color);
  }

  public createBuffer(bufferWidth: number, bufferHeight: number, draw: (ctx: CanvasRenderingContext2D) => void) {
    const ctx = <CanvasRenderingContext2D>(<HTMLCanvasElement>document.createElement('canvas')).getContext('2d');

    ctx.canvas.width = bufferWidth;
    ctx.canvas.height = bufferHeight;

    ctx.save();
    draw(ctx);
    ctx.restore()

    return ctx.canvas;
  }
}