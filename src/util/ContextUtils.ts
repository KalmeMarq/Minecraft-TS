import AbstractGui from "@mcsrc/gui/AbstractGui";
import AbstractSlider from "@mcsrc/gui/widgets/AbstractSlider";
import { type } from "os";
import ColorHelper from "./ColorHelper";

export default class ContextUtils {
  public static rotateScale(ctx: CanvasRenderingContext2D, angle: number, x: number, y: number, scale = 1): void {
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.rotate(angle);
    ctx.translate(-x, -y);
  }

  public static createTilePattern(ctx: CanvasRenderingContext2D, src: HTMLImageElement | HTMLCanvasElement, tilesX: number, tilesY: number, tileXUV: number, tileYUV: number, tileWidth: number, tileHeight: number, hOffset: number, vOffset: number): void {
    for(let i = 0; i < tilesX; i++) {
      for(let j = 0; j < tilesY; j++) {
        ctx.drawImage(src, tileXUV, tileYUV, tileWidth, tileHeight, hOffset + i * tileWidth, vOffset + j * 16, tileWidth, tileHeight);
      }
    }
  }

  public static fill(ctx: CanvasRenderingContext2D, x0: number, x1: number, y0: number, y1: number, color: number, alpha: number = 1): void {
    let f = color >> 16 & 255;
    let f1 = color >> 8 & 255;
    let f2 = color & 255;

    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1 + x0, y0);
    ctx.lineTo(x0, y1 + y0);
    ctx.moveTo(x1 + x0, y0);
    ctx.lineTo(x0, y1 + y0);
    ctx.lineTo(x1 + x0, y1 + y0);
    ctx.fillStyle = `rgb(${f}, ${f1}, ${f2}, ${alpha})`;
    ctx.fill();
  }
}