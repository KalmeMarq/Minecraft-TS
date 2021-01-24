import ColorHelper from '../../util/ColorHelper.js';
export default class AbstractGui {
    constructor() {
        this.root = document.getElementById('root');
    }
    static drawCenteredString(matrix, text, posX, posY, color) {
        const span = document.createElement('span');
        span.innerText = text;
        span.style.color = ColorHelper.getColor(color) || 'white';
        span.style.position = 'absolute';
        span.style.top = posY * 2.55 + 'px';
        span.style.left = posX * 2.55 + 'px';
        span.style.transform = 'translate(-50%)';
        span.classList.add('text');
        matrix.appendChild(span);
    }
    static drawString(matrix, text, posX, posY, color) {
        const span = document.createElement('span');
        span.innerText = text;
        span.style.color = ColorHelper.getColor(color) || 'white';
        span.style.position = 'absolute';
        span.style.top = posY * 2.55 + 'px';
        span.style.left = posX * 2.55 + 'px';
        span.classList.add('text');
        matrix.appendChild(span);
    }
}
