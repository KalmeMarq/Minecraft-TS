import ColorHelper from "../utils/ColorHelper";
import FontRenderer from "./FontRenderer";

abstract class AbstractGui {
  public testConsole(text: string) {
    console.log(text)
  }

  public drawString(context: CanvasRenderingContext2D, text: string, posX: number, posY: number, color: number) {
    FontRenderer.drawStringWithShadow(context, text, posX, posY, color);
  }

  public drawCenteredString(context: CanvasRenderingContext2D, text: string, posX: number, posY: number, color: number) {
    FontRenderer.drawStringWithShadow(context, text, posX - (FontRenderer.getTextWidth(text) / 2), posY, color);
  }

  public drawImg(context: CanvasRenderingContext2D, img: any, offsetX: number, offsetY: number, uvX: number, uvY: number, width: number, height: number) {
    context.drawImage(img, uvX, uvY, width, height, offsetX, offsetY, width, height);
  }

  public fill(context: CanvasRenderingContext2D, minX: number, minY: number, maxX: number, maxY: number, color: number) {
    context.save();
    context.beginPath();
    context.fillStyle = ColorHelper.getColor(color);
    context.fillRect(minX, minY, maxX, maxY);
    context.stroke();
  }
}

export default AbstractGui;