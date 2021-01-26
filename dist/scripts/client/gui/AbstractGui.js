import { ctx } from '../../index.js';
import ColorHelper from '../../util/ColorHelper.js';
export default class AbstractGui {
    static drawCenteredString(fontType, text, posX, posY, color) {
        ctx.save();
        ctx.textBaseline = 'top';
        ctx.textAlign = 'center';
        ctx.font = fontType;
        ctx.fillStyle = ColorHelper.getDarkerColor(color);
        ctx.fillText(text, posX + 1, posY + 1);
        ctx.fillStyle = ColorHelper.getColor(color) || 'white';
        ctx.fillText(text, posX, posY);
        ctx.restore();
    }
    static drawString(fontType, text, posX, posY, color) {
        ctx.save();
        ctx.textBaseline = 'top';
        ctx.font = fontType;
        ctx.fillStyle = ColorHelper.getDarkerColor(color);
        ctx.fillText(text, posX + 1, posY + 1);
        ctx.fillStyle = ColorHelper.getColor(color) || 'white';
        ctx.fillText(text, posX, posY);
        ctx.restore();
    }
    static drawImg(img, offsetX, offsetY, uvX, uvY, width, height) {
        ctx.drawImage(img, uvX, uvY, width, height, offsetX, offsetY, width, height);
    }
}
