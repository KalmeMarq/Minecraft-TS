import { clickXM, clickYM, ctx, keyModifiers, keyName, resetKeyInfo, scaleFactor } from "../../../index.js";
import ColorHelper from "../../../util/ColorHelper.js";
import MathHelper from "../../../util/MathHelper.js";
import FontRenderer from "../FontRenderer.js";
import Widget from "./Widget.js";
export default class TextFieldWidget extends Widget {
    constructor(x, y, w, h, p_i232259_6_, title) {
        super(x, y, w, h, title);
        this.text = '';
        this.maxStringLength = 32;
        this.enableBackgroundDrawing = true;
        this.canLoseFocus = true;
        this.isEnabled = true;
        this.lineScrollOffset = 0;
        this.cursorPosition = 0;
        this.selectionEnd = 0;
        this.enabledColor = 14737632;
        this.disabledColor = 7368816;
        this.focused = false;
        if (p_i232259_6_ != null) {
            this.setText(p_i232259_6_.getText());
        }
    }
    setText(textIn) {
        if (textIn.length > this.maxStringLength) {
            this.text = textIn.substring(0, this.maxStringLength);
        }
        else {
            this.text = textIn;
        }
    }
    getText() {
        return this.text;
    }
    getSelectedText() {
        let i = this.cursorPosition < this.selectionEnd ? this.cursorPosition : this.selectionEnd;
        let j = this.cursorPosition < this.selectionEnd ? this.selectionEnd : this.cursorPosition;
        return this.text.substring(i, j);
    }
    mouseClicked(clickX, clickY) {
        if (!this.getVisible()) {
            return false;
        }
        else {
            let flag = clickX >= this.x * scaleFactor && clickX < (this.x + this.width) * scaleFactor && clickY >= this.y * scaleFactor && clickY < (this.y + this.height) * scaleFactor;
            if (this.canLoseFocus && flag) {
                this.focused = true;
            }
            if (this.isFocused() && flag) {
                let i = Math.floor(clickX) - this.x;
                if (this.enableBackgroundDrawing) {
                    i -= 4;
                }
                let s = this.text;
                this.setCursorPosition(this.text.length + this.lineScrollOffset);
                return true;
            }
            else {
                return false;
            }
        }
    }
    setFocused2(isFocusedIn) {
        this.setFocused(isFocusedIn);
    }
    setFocused(idk) {
        this.focused = idk;
    }
    keyPressed() {
        if (!this.canWrite()) {
            return false;
        }
        else {
            this.field_212956_h = keyModifiers.keyShift;
            if (false) {
                return true;
            }
            else if (false) {
                return true;
            }
            else if (false) {
                if (this.isEnabled) {
                }
                return true;
            }
            else if (false) {
                return true;
            }
            else {
                switch (keyName) {
                    case 'Backspace':
                        if (this.isEnabled) {
                            this.field_212956_h = false;
                            this.delete(-1);
                        }
                        break;
                    case 'F1':
                        break;
                    case 'F2':
                        break;
                    case 'F3':
                        break;
                    case 'F4':
                        break;
                    case 'F5':
                        break;
                    case 'F6':
                        break;
                    case 'F7':
                        break;
                    case 'F8':
                        break;
                    case 'F9':
                        break;
                    case 'F10':
                        break;
                    case 'F11':
                        break;
                    case 'F12':
                        break;
                    default:
                        if ((this.text + keyName).length <= this.maxStringLength) {
                            this.text += keyName;
                        }
                        break;
                }
                resetKeyInfo();
            }
        }
    }
    delete(p_212950_1_) {
        if (keyModifiers.keyCtrl) {
            this.deleteWords(p_212950_1_);
            resetKeyInfo();
        }
        else {
            this.deleteFromCursor(p_212950_1_);
            resetKeyInfo();
        }
    }
    deleteWords(num) {
        if (this.text !== '') {
            if (this.selectionEnd != this.cursorPosition) {
            }
            else {
                var string = this.text;
                string = string.split(" ");
                var stringArray = new Array();
                for (var j = 0; j < string.length; j++) {
                    stringArray.push(string[j]);
                    if (j !== string.length - 1) {
                        stringArray.push(" ");
                    }
                }
                let i = stringArray;
                i.pop();
                this.text = i.join('');
            }
        }
    }
    getNthWordFromCursor(numWords) {
        return this.getNthWordFromPos(numWords, this.getCursorPosition());
    }
    getNthWordFromPos(n, pos) {
        return this.getNthWordFromPosWS(n, pos, true);
    }
    getNthWordFromPosWS(n, pos, skipWs) {
        let i = pos;
        let flag = n < 0;
        let j = Math.abs(n);
        for (let k = 0; k < j; ++k) {
            if (!flag) {
                let l = this.text.length;
                i = this.text.split('').indexOf('32', i);
                if (i == -1) {
                    i = l;
                }
                else {
                    while (skipWs && i < l && this.text.charAt(i) == ' ') {
                        ++i;
                    }
                }
            }
            else {
                while (skipWs && i > 0 && this.text.charAt(i - 1) == ' ') {
                    --i;
                }
                while (i > 0 && this.text.charAt(i - 1) != ' ') {
                    --i;
                }
            }
        }
        return i;
    }
    deleteFromCursor(num) {
        if (this.text !== '') {
            if (this.selectionEnd != this.cursorPosition) {
            }
            else {
                let i = this.func_238516_r_(num);
                let j = Math.min(0, this.cursorPosition);
                let k = Math.max(0, this.cursorPosition);
                if (j != k) {
                    let s = String(this.text).slice(0, this.text.length - 1).toString();
                    this.text = s;
                    this.setCursorPosition(j);
                }
            }
        }
    }
    func_238516_r_(p_238516_1_) {
    }
    clampCursorPosition(pos) {
        this.cursorPosition = MathHelper.clamp(pos, 0, this.text.length);
    }
    setSelectionPos(position) {
        let i = this.text.length;
        this.selectionEnd = MathHelper.clamp(position, 0, i);
        if (this.lineScrollOffset > i) {
            this.lineScrollOffset = i;
        }
        let j = this.getAdjustedWidth();
        let s = this.text;
        let k = s.length + this.lineScrollOffset;
        if (this.selectionEnd == this.lineScrollOffset) {
            this.lineScrollOffset -= this.text.length;
        }
        if (this.selectionEnd > k) {
            this.lineScrollOffset += this.selectionEnd - k;
        }
        else if (this.selectionEnd <= this.lineScrollOffset) {
            this.lineScrollOffset -= this.lineScrollOffset - this.selectionEnd;
        }
        this.lineScrollOffset = MathHelper.clamp(this.lineScrollOffset, 0, i);
    }
    setCursorPosition(pos) {
        this.clampCursorPosition(pos);
        if (!this.field_212956_h) {
            this.setSelectionPos(this.cursorPosition);
        }
    }
    setCursorPositionEnd() {
        this.setCursorPosition(this.text.length);
    }
    canWrite() {
        return this.getVisible() && this.isFocused() && this.isEnabled;
    }
    isFocused() {
        return this.focused;
    }
    renderButton(mouseX, mouseY) {
        this.drawSelectionBox();
        this.mouseClicked(clickXM, clickYM);
        this.keyPressed();
        ctx.save();
        ctx.imageSmoothingEnabled = true;
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        let i = this.focused ? -1 : -6250336;
        ctx.strokeStyle = ColorHelper.getColor(i);
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.restore();
        let i2 = this.isEnabled ? this.enabledColor : this.disabledColor;
        let j = this.cursorPosition - this.lineScrollOffset;
        let k = this.selectionEnd - this.lineScrollOffset;
        let s = this.text;
        let flag = false;
        let flag1 = true;
        let l = this.enableBackgroundDrawing ? this.x + 4 : this.x;
        let i1 = this.enableBackgroundDrawing ? this.y + (this.height - 8) / 2 : this.y;
        let j1 = l;
        if (k > s.length) {
            k = s.length;
        }
        if (this.text !== '') {
            FontRenderer.renderText(this.text, j1, i1, i2);
        }
        else {
            if (!this.focused) {
                FontRenderer.renderText(this.message, j1, i1, 10526880);
            }
        }
        let flag2 = false;
        let k1 = j1;
        if (!flag) {
            k1 = j > 0 ? l + this.width : l;
        }
        else if (flag2) {
            k1 = j1 - 1;
            --j1;
        }
        if (this.focused) {
            if (flag2) {
            }
            else {
                FontRenderer.renderText("_", (this.x + FontRenderer.getTextWidth(this.text.split(''))) + 4, i1, i2);
            }
        }
    }
    drawSelectionBox() {
    }
    setMaxStringLength(length) {
        this.maxStringLength = length;
        if (this.text.length > length)
            this.text = this.text.substring(0, length);
    }
    getMaxStringLength() {
        return this.maxStringLength;
    }
    getCursorPosition() {
        return this.cursorPosition;
    }
    getEnableBackgroundDrawing() {
        return this.enableBackgroundDrawing;
    }
    setEnableBackgroundDrawing(enableBackgroundDrawingIn) {
        this.enableBackgroundDrawing = enableBackgroundDrawingIn;
    }
    setTextColor(color) {
        this.enabledColor = color;
    }
    setDisabledTextColour(color) {
        this.disabledColor = color;
    }
    getEnabled() {
        return this.isEnabled;
    }
    setEnabled(enabled) {
        this.isEnabled = enabled;
    }
    getAdjustedWidth() {
        return this.getEnableBackgroundDrawing() ? this.width - 8 : this.width;
    }
    getVisible() {
        return this.visible;
    }
    setVisible(isVisible) {
        this.visible = isVisible;
    }
}
