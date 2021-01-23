import ColorHelper from '../ColorHelper.js';
export default function drawString(matrix, text, posX, posY, color) {
    const span = document.createElement('span');
    span.innerText = text;
    span.style.color = ColorHelper.getColor(1347420415) || 'white';
    span.style.position = 'absolute';
    span.style.top = posY + 'px';
    span.style.left = posX + 'px';
    span.classList.add('text');
    matrix.appendChild(span);
}
