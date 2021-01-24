import { widgetsImg } from "../../../index.js";
export default class Button {
  public x
  public y
  public width
  public height
  public text
  public isActive
  public isHovered
  public isFocused
  public clickAction
  public btn: any

  constructor(x: number, y: number, width: number, height: number, text: string, clickAction: any) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.isActive = true;
    this.isHovered = false;
    this.isFocused = false;
    this.clickAction = clickAction;

    this.btn = document.createElement('button');
    this.btn.style.width = this.width * 2.55 + 'px';
    this.btn.style.height = this.height * 2.55 + 'px';
    this.btn.style.top = this.y * 2.55 + 'px';
    this.btn.style.left = this.x * 2.55 + 'px';

    const btnBg = document.createElement('canvas');
    btnBg.classList.add('canvas-bg');
    const ctx = btnBg.getContext('2d');

    btnBg.style.transformOrigin = 'top left'
    btnBg.style.transform = 'scale(2.55)'

    btnBg.width = this.width;
    btnBg.height = this.height;

    const image = widgetsImg
  
    if(this.isActive) this.drawBtnBg({x: 0, y: 66}, image, btnBg, ctx);
    else this.drawBtnBg({x: 0, y: 46}, image, btnBg, ctx);

    const mouseEnterEv = () => {
      if(this.isActive) {
        this.drawBtnBg({x: 0, y: 86}, image, btnBg, ctx)
        this.isHovered = true;
      }
      else this.drawBtnBg({x: 0, y: 46}, image, btnBg, ctx);
    }

    const focusInEv = () => {
      if(this.isActive) this.drawBtnBg({x: 0, y: 86}, image, btnBg, ctx);
      else this.drawBtnBg({x: 0, y: 46}, image, btnBg, ctx);
      this.isFocused = true;
    }

    const mouseLeaveEv = () => {
      // if(!this.isFocused && this.isHovered) {
        if(this.isActive) {
          this.drawBtnBg({x: 0, y: 66}, image, btnBg, ctx);
          this.isHovered = false;
        }
        else this.drawBtnBg({x: 0, y: 46}, image, btnBg, ctx);
      // }
    }
    
    this.btn.addEventListener('mouseenter', mouseEnterEv);
    this.btn.addEventListener('focusin', focusInEv);
    this.btn.addEventListener('mouseleave', mouseLeaveEv);

    this.btn.addEventListener('focusout', () => {
      if(this.isActive) {
        this.drawBtnBg({x: 0, y: 66}, widgetsImg, btnBg, ctx)
        this.isFocused = false;
      }
      else this.drawBtnBg({x: 0, y: 46}, widgetsImg, btnBg, ctx);
    });

    if(typeof this.text === 'string') this.btn.textContent = this.text;
    else this.btn.appendChild(this.text);

    this.btn.appendChild(btnBg);

    this.btn.addEventListener('click', () => {
      const playSound = new Audio('./resources/assets/minecraft/sounds/click_stereo.ogg');
      playSound.play();
      this.btn.blur()
    });
    this.btn.addEventListener('click', this.clickAction);
  }

  draw() {}

  render() {
    if(!document.body.contains(this.btn)){
      document.getElementById('root')!.appendChild(this.btn)
    }
  }

  drawBtnBg(uv: {x: number, y: number}, img: any, cnv: HTMLCanvasElement, cont: any) {
    cont.drawImage(img, uv.x, uv.y, cnv.width / 2, 20, 0, 0, cnv.width / 2, cnv.height)
    cont.drawImage(img, 164 - ((cnv.width - 72) / 2), uv.y, cnv.width / 2, 20, cnv.width / 2, 0, cnv.width / 2, cnv.height)
  }

  active(state: boolean) {
    this.isActive = state;
    if(this.isActive) this.btn.classList.remove('disabled');
    else this.btn.classList.add('disabled');
    if(this.isActive) this.drawBtnBg({x: 0, y: 66}, widgetsImg, this.btn.firstElementChild!, this.btn.firstElementChild!.getContext('2d'));
    else this.drawBtnBg({x: 0, y: 46}, widgetsImg, this.btn.firstElementChild!, this.btn.firstElementChild!.getContext('2d'));
    this.render();
  }
}