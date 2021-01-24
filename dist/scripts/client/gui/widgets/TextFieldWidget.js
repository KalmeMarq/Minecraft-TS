export default class TextFieldWidget {
    constructor(x, y, width, height, placeholder) {
        this.maxStringLength = 32;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = '';
        this.placeholder = placeholder;
        this.isEnabled = true;
        this.textFieldBox = document.createElement('div');
        this.textFieldBox.style.position = 'absolute';
        this.textFieldBox.style.width = this.width * 2.55 + 'px';
        this.textFieldBox.style.height = this.height * 2.55 + 'px';
        this.textFieldBox.style.top = this.y * 2.55 + 'px';
        this.textFieldBox.style.left = this.x * 2.55 + 'px';
        this.textFieldBox.classList.add('text-field-box');
        this.textFieldBox.innerHTML = `
      <input type="text" value="" class="text-field">
    `;
        this.textFieldBox.firstElementChild.addEventListener('input', () => {
            this.text = this.textFieldBox.firstElementChild.value;
        });
    }
    render() {
        if (!document.body.contains(this.textFieldBox)) {
            document.getElementById('root').appendChild(this.textFieldBox);
        }
        return this.textFieldBox.firstElementChild;
    }
    getText() {
        return this.text;
    }
}
