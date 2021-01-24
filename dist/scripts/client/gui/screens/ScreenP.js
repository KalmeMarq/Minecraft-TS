import { Minecraft, optionsBackgroundImg } from '../../../index.js';
import AbstractGui from '../AbstractGui.js';
export default class ScreenP extends AbstractGui {
    constructor() {
        super();
        this.buttons = new Array();
        this.title = '';
        this.minecraft = Minecraft;
        this.width = 0;
        this.height = 0;
        this.buttons = [];
    }
    setTitle(text) {
        this.title = text;
    }
    renderWidgets() {
        document.getElementById('root').innerHTML = '';
        for (var i = 0; i < this.buttons.length; i++) {
            let button = this.buttons[i];
            button.render();
        }
    }
    addButton(button) {
        this.buttons.push(button);
        return button;
    }
    initScreen(width, height) {
        this.buttons = [];
        this.width = width;
        this.height = height;
        this.init();
        this.renderWidgets();
        this.render();
    }
    shouldCloseOnEsc() {
        return true;
    }
    closeScreen() {
        this.minecraft.displayGuiScreen(null);
    }
    init() {
    }
    render() {
    }
    renderDirtBackground() {
        const canvas = document.createElement('canvas');
        canvas.style.transform = 'scale(' + 1.5 * (2.55 + 0.5) + ')';
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.className = 'canvas-bg';
        const ctx = canvas.getContext('2d');
        let img = optionsBackgroundImg;
        var ptrn = ctx.createPattern(img, 'repeat');
        ctx.fillStyle = ptrn;
        ctx.filter = 'brightness(35%)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        canvas.style.zIndex = '-5';
        document.getElementById('root').appendChild(canvas);
    }
}
