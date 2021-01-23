export default class TextFieldWidget {
  public text: string
  public placeholder: string
  public maxStringLength = 32
  public x
  public y
  public width
  public height
  public isEnabled
  public textFieldBox: any
  public textField: any

  constructor(x: number, y: number, width: number, height: number, placeholder: string) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = '';
    this.placeholder = placeholder;
    this.isEnabled = true;

    this.textFieldBox = document.createElement('div');
    this.textField = document.createElement('input');
  }

  render() {
    this.textFieldBox.style.position = 'absolute';
    this.textFieldBox.style.width = this.width * 2.55 + 'px';
    this.textFieldBox.style.height = this.height * 2.55 + 'px';
    this.textFieldBox.style.top = this.y + 'px';
    this.textFieldBox.style.left = this.x + 'px';
    this.textFieldBox.classList.add('text-field-box');
    this.textField.classList.add('text-field');

    this.textField.setAttribute('placeholder', this.placeholder)
  
    this.textFieldBox.appendChild(this.textField);

    if(!document.body.contains(this.textFieldBox)){
      document.getElementById('root')!.appendChild(this.textFieldBox)
    }
  }

}