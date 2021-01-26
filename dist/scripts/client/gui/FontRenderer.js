import { addCharacterRenderer, characterRenderers, ctx, fontImg, scaleFactor } from "../../index.js";
import ColorHelper from "../../util/ColorHelper.js";
let chars = {
    ' ': { x: 0, y: 0, w: 5, h: 8 },
    '.': { x: 111, y: 16, w: 4, h: 8 },
    '-': { x: 103, y: 16, w: 7, h: 8 },
    '!': { x: 7, y: 16, w: 4, h: 8 },
    '#': { x: 15, y: 16, w: 7, h: 8 },
    '$': { x: 23, y: 16, w: 7, h: 8 },
    '"': { x: 31, y: 16, w: 7, h: 8 },
    '%': { x: 39, y: 16, w: 7, h: 8 },
    '&': { x: 47, y: 16, w: 7, h: 8 },
    "'": { x: 55, y: 16, w: 4, h: 8 },
    '(': { x: 63, y: 16, w: 5, h: 8 },
    ')': { x: 71, y: 16, w: 7, h: 8 },
    '*': { x: 79, y: 16, w: 7, h: 8 },
    '+': { x: 87, y: 16, w: 7, h: 8 },
    ',': { x: 95, y: 16, w: 4, h: 8 },
    '/': { x: 103, y: 16, w: 7, h: 8 },
    '@': { x: 0, y: 0, w: 7, h: 8 },
    ':': { x: 0, y: 0, w: 7, h: 8 },
    '<': { x: 0, y: 0, w: 7, h: 8 },
    '>': { x: 0, y: 0, w: 7, h: 8 },
    '=': { x: 0, y: 0, w: 7, h: 8 },
    '?': { x: 0, y: 0, w: 7, h: 8 },
    '[': { x: 0, y: 0, w: 7, h: 8 },
    '\\': { x: 0, y: 0, w: 7, h: 8 },
    ']': { x: 0, y: 0, w: 7, h: 8 },
    '^': { x: 0, y: 0, w: 7, h: 8 },
    '{': { x: 0, y: 0, w: 7, h: 8 },
    '}': { x: 0, y: 0, w: 7, h: 8 },
    '|': { x: 0, y: 0, w: 7, h: 8 },
    '~': { x: 0, y: 0, w: 7, h: 8 },
    '0': { x: -1, y: 24, w: 7, h: 8 },
    '1': { x: 7, y: 24, w: 7, h: 8 },
    '2': { x: 15, y: 24, w: 7, h: 8 },
    '3': { x: 23, y: 24, w: 7, h: 8 },
    '4': { x: 31, y: 24, w: 7, h: 8 },
    '5': { x: 39, y: 24, w: 7, h: 8 },
    '6': { x: 47, y: 24, w: 7, h: 8 },
    '7': { x: 55, y: 24, w: 7, h: 8 },
    '8': { x: 63, y: 24, w: 7, h: 8 },
    '9': { x: 71, y: 24, w: 7, h: 8 },
    'A': { x: 7, y: 32, w: 7, h: 8 },
    'B': { x: 15, y: 32, w: 7, h: 8 },
    'C': { x: 23, y: 32, w: 7, h: 8 },
    'D': { x: 31, y: 32, w: 7, h: 8 },
    'E': { x: 39, y: 32, w: 7, h: 8 },
    'F': { x: 47, y: 32, w: 7, h: 8 },
    'G': { x: 55, y: 32, w: 7, h: 8 },
    'H': { x: 63, y: 32, w: 7, h: 8 },
    'I': { x: 71, y: 32, w: 6, h: 8 },
    'J': { x: 79, y: 32, w: 7, h: 8 },
    'K': { x: 87, y: 32, w: 7, h: 8 },
    'L': { x: 95, y: 32, w: 7, h: 8 },
    'M': { x: 103, y: 32, w: 7, h: 8 },
    'N': { x: 111, y: 32, w: 7, h: 8 },
    'O': { x: 119, y: 32, w: 7, h: 8 },
    'P': { x: -1, y: 40, w: 7, h: 8 },
    'Q': { x: 7, y: 40, w: 7, h: 8 },
    'R': { x: 15, y: 40, w: 7, h: 8 },
    'S': { x: 23, y: 40, w: 7, h: 8 },
    'T': { x: 31, y: 40, w: 7, h: 8 },
    'U': { x: 39, y: 40, w: 7, h: 8 },
    'V': { x: 47, y: 40, w: 7, h: 8 },
    'W': { x: 55, y: 40, w: 7, h: 8 },
    'X': { x: 63, y: 40, w: 7, h: 8 },
    'Y': { x: 71, y: 40, w: 7, h: 8 },
    'Z': { x: 79, y: 40, w: 7, h: 8 },
    'a': { x: 7, y: 48, w: 7, h: 8 },
    'b': { x: 15, y: 48, w: 7, h: 8 },
    'c': { x: 23, y: 48, w: 7, h: 8 },
    'd': { x: 31, y: 48, w: 7, h: 8 },
    'e': { x: 39, y: 48, w: 7, h: 8 },
    'f': { x: 47, y: 48, w: 6, h: 8 },
    'g': { x: 55, y: 48, w: 7, h: 8 },
    'h': { x: 63, y: 48, w: 7, h: 8 },
    'i': { x: 71, y: 48, w: 3, h: 8 },
    'j': { x: 79, y: 48, w: 7, h: 8 },
    'k': { x: 87, y: 48, w: 6, h: 8 },
    'l': { x: 95, y: 48, w: 4, h: 8 },
    'm': { x: 103, y: 48, w: 7, h: 8 },
    'n': { x: 111, y: 48, w: 7, h: 8 },
    'o': { x: 119, y: 48, w: 7, h: 8 },
    'p': { x: -1, y: 56, w: 7, h: 8 },
    'q': { x: 7, y: 56, w: 7, h: 8 },
    'r': { x: 15, y: 56, w: 7, h: 8 },
    's': { x: 23, y: 56, w: 7, h: 8 },
    't': { x: 31, y: 56, w: 5, h: 8 },
    'u': { x: 39, y: 56, w: 7, h: 8 },
    'v': { x: 47, y: 56, w: 7, h: 8 },
    'w': { x: 55, y: 56, w: 7, h: 8 },
    'x': { x: 63, y: 56, w: 7, h: 8 },
    'y': { x: 71, y: 56, w: 7, h: 8 },
    'z': { x: 79, y: 56, w: 7, h: 8 }
};
export class CharacterRenderer {
    constructor(char, color) {
        this.char = char;
        this.charWidth = chars[this.char].w;
        this.charHeight = chars[this.char].h;
        this.r = ColorHelper.getRed(color);
        this.g = ColorHelper.getGreen(color);
        this.b = ColorHelper.getBlue(color);
    }
    create() {
        const fontcanvas = document.createElement('canvas');
        const ctxfont = fontcanvas.getContext('2d');
        fontcanvas.width = this.charWidth;
        fontcanvas.height = this.charHeight;
        ctxfont.save();
        ctxfont.imageSmoothingEnabled = false;
        ctxfont.drawImage(fontImg, chars[this.char].x, chars[this.char].y, this.charWidth, this.charHeight, 0, 0, this.charWidth, this.charHeight);
        ctxfont.restore();
        ctxfont.scale(scaleFactor, scaleFactor);
        var myImg = ctxfont.getImageData(0, 0, this.charWidth * 3, this.charHeight * 3);
        ctxfont.clearRect(0, 0, this.charWidth, this.charHeight);
        for (var t = 0; t < myImg.data.length; t += 4) {
            myImg.data[t] = this.r;
            myImg.data[t + 1] = this.g;
            myImg.data[t + 2] = this.b;
        }
        ctxfont.putImageData(myImg, 0, 0);
        ctxfont.restore();
        return fontcanvas;
    }
    createShadow() {
        const fontcanvas = document.createElement('canvas');
        const ctxfont = fontcanvas.getContext('2d');
        fontcanvas.width = this.charWidth;
        fontcanvas.height = this.charHeight;
        ctxfont.save();
        ctxfont.imageSmoothingEnabled = false;
        ctxfont.drawImage(fontImg, chars[this.char].x, chars[this.char].y, this.charWidth, this.charHeight, 0, 0, this.charWidth, this.charHeight);
        ctxfont.scale(scaleFactor, scaleFactor);
        var myImg = ctxfont.getImageData(0, 0, this.charWidth * 3, this.charHeight * 3);
        ctxfont.clearRect(0, 0, this.charWidth, this.charHeight);
        for (var t = 0; t < myImg.data.length; t += 4) {
            myImg.data[t] = this.r - (42.5 * 5.4);
            myImg.data[t + 1] = this.g - (42.5 * 5.4);
            myImg.data[t + 2] = this.b - (42.5 * 5.4);
        }
        ctxfont.putImageData(myImg, 0, 0);
        ctxfont.restore();
        return fontcanvas;
    }
}
export default class FontRenderer {
    static getTextWidth(text) {
        let width = 0;
        for (let j = 0; j < text.length; j++) {
            width += chars[text[j]].w - 1;
        }
        return width;
    }
    static renderCenteredText(text, posX, posY, color) {
        let textChars = text.split('');
        let textwidth = FontRenderer.getTextWidth(textChars);
        for (var j = 0, k = posX; j < textChars.length; j++) {
            const char = textChars[j];
            if (!(characterRenderers[color] && characterRenderers[color][textChars[j]])) {
                addCharacterRenderer(color, textChars[j]);
            }
            ctx.drawImage(characterRenderers[color][char]['textShadow'], k - 1 - textwidth / 2 + 1, posY + 1);
            ctx.drawImage(characterRenderers[color][char]['text'], k - 1 - textwidth / 2, posY);
            k += chars[char].w - 1;
        }
    }
    static renderText(text, posX, posY, color) {
        let textChars = text.split('');
        let textwidth = FontRenderer.getTextWidth(textChars);
        for (var j = 0, k = posX; j < textChars.length; j++) {
            const char = textChars[j];
            if (!(characterRenderers[color] && characterRenderers[color][textChars[j]])) {
                addCharacterRenderer(color, textChars[j]);
            }
            ctx.drawImage(characterRenderers[color][char]['textShadow'], k - 1 + 1, posY + 1);
            ctx.drawImage(characterRenderers[color][char]['text'], k - 1, posY);
            k += chars[char].w - 1;
        }
    }
}
