import { clickXM, clickYM, ctx, font, scaleFactor, widgetsImg, resetClickXY, minecraftImg } from '../../index.js';
import ColorHelper from '../../util/ColorHelper.js';

export default abstract class AbstractGui {
  public static drawCenteredString(fontType: string, text: string, posX: number, posY: number, color: number) {
    ctx.save();
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    ctx.font = fontType;
    ctx.fillStyle = ColorHelper.getDarkerColor(color);
    ctx.fillText(text, posX + 1, posY + 1)
    ctx.fillStyle = ColorHelper.getColor(color) || 'white';
    ctx.fillText(text, posX, posY)
    ctx.restore();
  }

  public static drawString(fontType: string, text: string, posX: number, posY: number, color: number) {
    ctx.save();
    ctx.textBaseline = 'top';
    ctx.font = fontType;
    ctx.fillStyle = ColorHelper.getDarkerColor(color);
    ctx.fillText(text, posX + 1, posY + 1)
    ctx.fillStyle = ColorHelper.getColor(color) || 'white';
    ctx.fillText(text, posX, posY)
    ctx.restore();
  }

  public static drawImg(img: any, offsetX: number, offsetY: number, uvX: number, uvY: number, width: number, height: number) {
    ctx.drawImage(img, uvX, uvY, width, height, offsetX, offsetY, width, height);
  }
}