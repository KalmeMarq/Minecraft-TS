
class Button {
  public x
  public y
  public width
  public height
  public text
  public isActive
  public clickAction
  public btn: any

  constructor(x: number, y: number, width: number, height: number, text: string, clickAction: any) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.isActive = true;
    this.clickAction = clickAction;

    this.btn = document.createElement('button');
  }

  render() {
    const btn = this.btn;

    btn.style.width = this.width * 2.55 + 'px';
    btn.style.height = this.height * 2.55 + 'px';
    btn.style.top = this.y + 'px';
    btn.style.left = this.x + 'px';

    const btnBg = document.createElement('canvas');
    btnBg.classList.add('canvas-bg');
    const ctx = btnBg.getContext('2d');

    btnBg.style.transformOrigin = 'top left'
    btnBg.style.transform = 'scale(2.55)'

    btnBg.width = this.width;
    btnBg.height = this.height;

    const image = new Image();
    image.src = '../../../../resources/assets/minecraft/textures/gui/widgets.png';

    function drawBtnBg(uv: {x: number, y: number}, img: any, cnv: HTMLCanvasElement, cont: any) {
      cont.drawImage(img, uv.x, uv.y, cnv.width / 2, 20, 0, 0, cnv.width / 2, cnv.height)
      cont.drawImage(img, 164 - ((cnv.width - 72) / 2), uv.y, cnv.width / 2, 20, cnv.width / 2, 0, cnv.width / 2, cnv.height)
    }
    
    image.onload = function() {
      if(!btn.classList.contains('disabled')) {
        drawBtnBg({x: 0, y: 66}, image, btnBg, ctx);
      }
      else {
        drawBtnBg({x: 0, y: 46}, image, btnBg, ctx);
      }
    }

    
    btn.addEventListener('mouseenter', () => {
      if(!btn.classList.contains('disabled')) {
        drawBtnBg({x: 0, y: 86}, image, btnBg, ctx);
      } else {
        drawBtnBg({x: 0, y: 46}, image, btnBg, ctx);
      }
      
    });

    btn.addEventListener('mouseleave', () => {
      if(!btn.classList.contains('disabled')) {
        drawBtnBg({x: 0, y: 66}, image, btnBg, ctx);
      } else {
        drawBtnBg({x: 0, y: 46}, image, btnBg, ctx);
      }
    });

    if(typeof this.text === 'string') {
      btn.textContent = this.text;
    } else {
      btn.appendChild(this.text)
    }

    btn.appendChild(btnBg);

    btn.addEventListener('click', this.clickAction);
    btn.addEventListener('click', () => {
      const playSound = new Audio('./resources/assets/minecraft/sounds/click_stereo.ogg');
      playSound.play();
      btn.blur()
    });
  
    if(!document.body.contains(btn)){
      document.getElementById('root')!.appendChild(btn)
    }
  }

  active(state: boolean) {
    this.isActive = state;
    if(this.isActive) {
      this.btn.classList.remove('disabled');
    } else {
      this.btn.classList.add('disabled')
    }
    this.render();
  }
}

export default Button;