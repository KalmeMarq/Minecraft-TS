import { Minecraft } from '../../../index.js';

class Screen {
  constructor() {
    this.title;
    this.minecraft = Minecraft;
    this.width;
    this.height;
    this.buttons = [];

    window.addEventListener('keydown', e => {
      if(e.key === 'Escape' && this.shouldCloseOnEsc()) {
        this.closeScreen();
      }
    })
  }

  render() {
    document.getElementById('root').innerHTML = '';

    for(var i = 0; i < this.buttons.length; i++) {
       this.buttons[i].render();
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
    this.initCont();
    this.render();
    this.advancedRender();
  }

  shouldCloseOnEsc() {
    return true;
  }

  closeScreen() {
    this.minecraft.displayGuiScreen('none');
  }

  advancedRender() {
  }
}

export default Screen;