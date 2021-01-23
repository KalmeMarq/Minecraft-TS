import { Minecraft } from '../../../index.js';
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
        window.addEventListener('keydown', e => {
            if (e.key === 'Escape' && this.shouldCloseOnEsc()) {
                this.closeScreen();
            }
        });
    }
    render() {
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
    init(width, height) {
        this.buttons = [];
        this.width = width;
        this.height = height;
        this.init();
        this.render();
        this.render();
    }
    init() {
    }
    shouldCloseOnEsc() {
        return true;
    }
    closeScreen() {
        this.minecraft.displayGuiScreen(null);
    }
    render() {
    }
    renderDirtBackground() {
        const dirt = document.createElement('div');
        dirt.style.position = 'absolute';
        dirt.style.top = '0px';
        dirt.style.left = '0px';
        dirt.style.background = 'rgb(61, 35, 13)';
        dirt.style.width = this.width + 'px';
        dirt.style.height = this.height + 'px';
        dirt.style.zIndex = '-15';
        document.getElementById('root').appendChild(dirt);
    }
}
