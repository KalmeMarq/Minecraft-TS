import { canvas, ctx, Minecraft, mouseXM, mouseYM, optionsBackgroundImg, scaleFactor } from '../../../index.js';
import AbstractGui from '../AbstractGui.js';
export default class ScreenP extends AbstractGui {
    constructor() {
        super();
        this.title = '';
        this.width = 0;
        this.height = 0;
        this.buttons = new Array();
        this.minecraft = Minecraft;
        this.buttons = [];
    }
    renderWidgets() {
        for (var i = 0; i < this.buttons.length; i++) {
            let button = this.buttons[i];
            button.renderButton(mouseXM, mouseYM);
        }
    }
    addButton(button) {
        let butston = button;
        this.buttons.push(butston);
        return butston;
    }
    initScreen(width, height) {
        this.buttons = [];
        this.width = width;
        this.height = height;
        this.init();
        this.render();
        this.renderWidgets();
    }
    init() {
    }
    render() {
    }
    renderDirtBackground() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var ptrn = ctx.createPattern(optionsBackgroundImg, 'repeat');
        ctx.save();
        ctx.scale(scaleFactor * 0.65, scaleFactor * 0.65);
        ctx.imageSmoothingEnabled = false;
        ctx.fillStyle = ptrn;
        ctx.filter = 'brightness(30%)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.filter = 'brightness(100%)';
        ctx.restore();
    }
}
