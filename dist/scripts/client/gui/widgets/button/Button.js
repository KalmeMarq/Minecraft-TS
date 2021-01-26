import { clickXM, clickYM, ctx, scaleFactor, widgetsImg, resetClickXY } from '../../../../index.js';
import FontRenderer from '../../FontRenderer.js';
export default class Button {
    constructor(x, y, width, height, title, clickEv) {
        this.alpha = 1.0;
        this.visible = true;
        this.isHovered = false;
        this.focused = false;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.message = title;
        this.clickEv = clickEv;
        this.active = true;
    }
    getYImage(isHovered) {
        let i = 1;
        if (!this.active)
            i = 0;
        else if (isHovered)
            i = 2;
        return i;
    }
    renderButton(mouseX, mouseY) {
        let yUV = this.getYImage(this.isMouseOver(mouseX, mouseY));
        this.isHovered = this.isMouseOver(mouseX, mouseY);
        if (this.clicked(clickXM, clickYM)) {
            resetClickXY();
            const a = new Audio('./dist/resources/assets/minecraft/sounds/click_stereo.ogg');
            a.volume = 0.2;
            a.play();
            this.clickEv();
        }
        this.renderBg(widgetsImg, [0, 46 + 20 * yUV], [this.x, this.y], [this.width / 2, 20]);
        this.renderBg(widgetsImg, [200 - this.width / 2, 46 + 20 * yUV], [this.x + this.width / 2, this.y], [this.width / 2, 20]);
        let textColor = this.active ? 16777215 : 10526880;
        FontRenderer.renderCenteredText(this.message, this.x + this.width / 2, this.y + (this.height - 8) / 2, textColor);
    }
    renderBg(img, uv, offset, uvSize) {
        ctx.clearRect(offset[0], offset[1], uvSize[0], uvSize[1]);
        ctx.save();
        ctx.imageSmoothingEnabled = false;
        ctx.globalAlpha = this.alpha;
        ctx.drawImage(img, uv[0], uv[1], uvSize[0], uvSize[1], offset[0], offset[1], uvSize[0], uvSize[1]);
        ctx.restore();
    }
    clicked(clickX, clickY) {
        return this.active && this.visible && clickX >= this.x * scaleFactor && clickY >= this.y * scaleFactor && clickX < (this.x + this.width) * scaleFactor && clickY < (this.y + this.height) * scaleFactor;
    }
    isMouseOver(mouseX, mouseY) {
        return this.active && this.visible && mouseX >= this.x * scaleFactor && mouseY >= this.y * scaleFactor && mouseX <= (this.x + this.width) * scaleFactor && mouseY <= (this.y + this.height) * scaleFactor;
    }
    setActive(state) {
        this.active = state;
    }
}
