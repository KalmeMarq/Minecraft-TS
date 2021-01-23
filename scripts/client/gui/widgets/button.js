class Button {
  constructor(x, y, width, height, text, clickAction) {
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
    this.btn.style.position = 'absolute';
    this.btn.style.width = this.width * 2.55 + 'px';
    this.btn.style.height = this.height * 2.55 + 'px';
    this.btn.style.top = this.y + 'px';
    this.btn.style.left = this.x + 'px';

    if(typeof this.text === 'string') {
      this.btn.textContent = this.text;
    } else {
      this.btn.appendChild(this.text)
    }

    this.btn.addEventListener('click', this.clickAction);
  
    if(!document.body.contains(this.btn)){
      document.getElementById('root').appendChild(this.btn)
    }
  }

  active(state) {
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