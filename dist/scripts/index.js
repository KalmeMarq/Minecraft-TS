"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("AbstractOption", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AbstractOption {
    }
    exports.default = AbstractOption;
});
define("GameConfiguration", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GameConfiguration {
        constructor(userInfo, gameInfo) {
            this.userInfo = userInfo;
            this.gameInfo = gameInfo;
        }
    }
    exports.default = GameConfiguration;
    GameConfiguration.GameInformation = (() => {
        class GameInformation {
            constructor(isDemo, version, versionType, clientName) {
                this.isDemo = isDemo;
                this.version = version;
                this.versionType = versionType;
                this.clientName = clientName;
            }
        }
        return GameInformation;
    })();
    GameConfiguration.UserInformation = (() => {
        class UserInformation {
            constructor(userName) {
                this.userName = userName;
            }
        }
        return UserInformation;
    })();
});
define("interfaces/IResources", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("utils/JSONUtils", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class JSONUtils {
        static async getJSONFile(url, callback) {
            const data = await (await fetch(url)).json();
            callback(data);
        }
        static async getTextFile(url, callback) {
            const data = await (await fetch(url)).text();
            callback(data);
        }
    }
    exports.default = JSONUtils;
});
define("utils/GetResources", ["require", "exports", "gui/FontRenderer", "utils/JSONUtils"], function (require, exports, FontRenderer_js_1, JSONUtils_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getResources = exports.clickSound = exports.optionsBackgroundImg = exports.accessibilityImg = exports.checkboxImg = exports.widgetsImg = exports.editionImg = exports.minecraftImg = exports.mojangstudiosImg = exports.fontImg = exports.getFontChars = exports.getResourceLocation = exports.getResourceSound = exports.getResource = exports.addCharacterRenderer = exports.characterRenderers = exports.Resources = void 0;
    JSONUtils_js_1 = __importDefault(JSONUtils_js_1);
    exports.Resources = {
        languages: [],
        texts: {
            credits: [],
            end: [],
            splashes: []
        },
        font: {},
        textures: {},
        sounds: {}
    };
    exports.characterRenderers = {};
    let addCharacterRenderer = (color, char) => {
        if (!exports.characterRenderers[color]) {
            exports.characterRenderers[color] = {};
        }
        exports.characterRenderers[color][char] = {
            text: new FontRenderer_js_1.CharacterRenderer(char, color).create(),
            textShadow: new FontRenderer_js_1.CharacterRenderer(char, color).createShadow()
        };
    };
    exports.addCharacterRenderer = addCharacterRenderer;
    function getResource(src) {
        return exports.Resources.textures[src];
    }
    exports.getResource = getResource;
    function getResourceSound(src) {
        return exports.Resources.sounds[src];
    }
    exports.getResourceSound = getResourceSound;
    function getResourceLocation(type, src) {
        switch (type) {
            case 'texture':
                return exports.Resources.textures['./resources/assets/minecraft/' + src + '.png'];
                break;
            case 'sound':
                return exports.Resources.sounds['./resources/assets/minecraft/' + src + '.ogg'].cloneNode();
                break;
            case 'texts':
                return exports.Resources.texts[src];
                break;
            default:
                return false;
                break;
        }
    }
    exports.getResourceLocation = getResourceLocation;
    exports.getFontChars = {};
    exports.fontImg = new Image(256, 256);
    exports.mojangstudiosImg = new Image(256, 256);
    exports.minecraftImg = new Image(256, 256);
    exports.editionImg = new Image(256, 256);
    exports.widgetsImg = new Image(256, 256);
    exports.checkboxImg = new Image(256, 256);
    exports.accessibilityImg = new Image(256, 256);
    exports.optionsBackgroundImg = new Image(256, 256);
    exports.clickSound = new Audio();
    async function getResources() {
        const rootloc = 'resources/assets/minecraft';
        exports.fontImg.src = `./${rootloc}/textures/font/ascii.png`;
        exports.editionImg.src = `./${rootloc}/textures/gui/title/edition.png`;
        exports.minecraftImg.src = `./${rootloc}/textures/gui/title/minecraft.png`;
        exports.mojangstudiosImg.src = `./${rootloc}/textures/gui/title/mojangstudios.png`;
        exports.widgetsImg.src = `./resources/assets/minecraft/textures/gui/widgets.png`;
        exports.checkboxImg.src = `./${rootloc}/textures/gui/checkbox.png`;
        exports.accessibilityImg.src = `./${rootloc}/textures/gui/accessibility.png`;
        exports.optionsBackgroundImg.src = `./${rootloc}/textures/gui/options_background.png`;
        exports.clickSound.src = `https://raw.githubusercontent.com/KalmeMarq/Minecraft-JS-Assets/main/assets/sounds/click_stereo.ogg`;
        exports.Resources.textures[`./${rootloc}/textures/font/ascii.png`] = exports.fontImg;
        exports.Resources.textures[`./${rootloc}/textures/gui/title/edition.png`] = exports.editionImg;
        exports.Resources.textures[`./${rootloc}/textures/gui/title/minecraft.png`] = exports.minecraftImg;
        exports.Resources.textures[`./${rootloc}/textures/gui/title/mojangstudios.png`] = exports.mojangstudiosImg;
        exports.Resources.textures[`./resources/assets/minecraft/textures/gui/widgets.png`] = exports.checkboxImg;
        exports.Resources.textures[`./${rootloc}/textures/gui/checkbox.png`] = exports.accessibilityImg;
        exports.Resources.textures[`./${rootloc}/textures/gui/accessibility.png`] = exports.accessibilityImg;
        exports.Resources.textures[`./${rootloc}/textures/gui/options_background.png`] = exports.optionsBackgroundImg;
        exports.Resources.textures[`./${rootloc}/textures/gui/widgets.png`] = exports.widgetsImg;
        exports.Resources.sounds[`./${rootloc}/sounds/click_stereo.ogg`] = exports.clickSound;
        console.log(exports.Resources);
        await JSONUtils_js_1.default.getJSONFile(`./${rootloc}/lang/en_us.json`, (data) => exports.Resources.languages.push({ code: 'en_us', data: data }));
        ['credits', 'end', 'splashes'].forEach(async (name) => {
            const s = name;
            await JSONUtils_js_1.default.getTextFile(`https://raw.githubusercontent.com/KalmeMarq/Minecraft-JS-Assets/main/assets/texts/${name}.txt`, (data) => data.split(/\r?\n/).forEach((line) => exports.Resources.texts[s].push(line)));
        });
        await JSONUtils_js_1.default.getJSONFile(`./${rootloc}/font/font.json`, (data) => exports.Resources.font = data);
        exports.getFontChars = exports.Resources.font;
        if (exports.Resources.font !== {} && exports.Resources.languages !== [] && exports.Resources.texts.credits !== [] && exports.Resources.texts.splashes !== [])
            return exports.Resources;
    }
    exports.getResources = getResources;
});
define("utils/Resources", ["require", "exports", "utils/JSONUtils"], function (require, exports, JSONUtils_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getAllResources = exports.getResourceLocation = exports.MCUI = exports.MCResources = void 0;
    JSONUtils_js_2 = __importDefault(JSONUtils_js_2);
    exports.MCResources = {};
    exports.MCUI = {};
    function getResourceLocation(type, src) {
        switch (type) {
            case 'textures':
                return exports.MCResources['assets/minecraft/textures/' + src + '.png'];
            case 'sounds':
                return exports.MCResources['assets/minecraft/sounds/' + src + '.ogg'].cloneNode();
            case 'texts':
                return exports.MCResources['assets/minecraft/texts/' + src + '.txt'];
            case 'fonts':
                return exports.MCResources['assets/minecraft/font/' + src + '.json'];
            case 'langs':
                return exports.MCResources['assets/minecraft/lang/' + src + '.json'];
            default:
                return false;
        }
    }
    exports.getResourceLocation = getResourceLocation;
    async function getAllResources() {
        [
            'item/yellow_dye', 'font/ascii', 'gui/title/edition',
            'gui/title/minecraft', 'gui/title/mojangstudios', 'gui/checkbox', 'gui/accessibility', 'gui/icons', 'gui/options_background', 'gui/widgets'
        ].forEach(async (file) => {
            if (!exports.MCResources['assets/minecraft/textures/' + file + '.png']) {
                var myImage = new Image();
                var myRequest = new Request('./resources/assets/minecraft/textures/' + file + '.png');
                fetch(myRequest)
                    .then(response => response.blob())
                    .then(function (myBlob) {
                    var objectURL = URL.createObjectURL(myBlob);
                    myImage.src = objectURL;
                    exports.MCResources['assets/minecraft/textures/' + file + '.png'] = myImage;
                    console.log('assets/minecraft/textures/' + file + '.png');
                });
            }
        });
        await JSONUtils_js_2.default.getJSONFile('./src/ui/_ui_defs.json', ((data) => {
            data.ui_defs.forEach(async (file) => {
                await JSONUtils_js_2.default.getJSONFile('./src/' + file, ((data) => {
                    exports.MCUI[data.namespace] = data;
                }));
            });
        }));
        console.log(exports.MCUI);
        [
            'en_us'
        ].forEach(async (file) => {
            if (!exports.MCResources['assets/minecraft/lang/' + file + '.json']) {
                async function tryToGetData() {
                    let data = null;
                    let trys = 0;
                    while (data == null) {
                        data = await (await fetch('./resources/assets/minecraft/lang/' + file + '.json')).json();
                        if ((trys++) == 69420)
                            break;
                    }
                    if (data == null)
                        throw new Error("Unable to fetch data.");
                    return data;
                }
                exports.MCResources['assets/minecraft/lang/' + file + '.json'] = await tryToGetData();
                console.log('assets/minecraft/lang/' + file + '.json');
            }
        });
        ['credits', 'end', 'splashes'].forEach(async (file) => {
            if (!exports.MCResources['assets/minecraft/texts/' + file + '.txt']) {
                await JSONUtils_js_2.default.getTextFile('./resources/assets/minecraft/texts/' + file + '.txt', (data) => {
                    exports.MCResources['assets/minecraft/texts/' + file + '.txt'] = [];
                    data.split(/\r?\n/).forEach((line) => exports.MCResources['assets/minecraft/texts/' + file + '.txt'].push(line));
                    console.log('assets/minecraft/texts/' + file + '.txt');
                });
            }
        });
        ['click_stereo'].forEach(async (file) => {
            if (!exports.MCResources['assets/minecraft/sounds/' + file + '.ogg']) {
                let audio = new Audio('./resources/assets/minecraft/sounds/' + file + '.ogg');
                exports.MCResources['assets/minecraft/sounds/' + file + '.ogg'] = audio;
                console.log('assets/minecraft/sounds/' + file + '.ogg');
            }
        });
        await JSONUtils_js_2.default.getJSONFile(`./resources/assets/minecraft/font/font.json`, (data) => exports.MCResources['assets/minecraft/font/font.json'] = data);
        let i = (!exports.MCResources['assets/minecraft/font/font.json']);
        while (i) {
            if (!i) {
                return exports.MCResources;
                break;
            }
        }
    }
    exports.getAllResources = getAllResources;
});
define("utils/ColorHelper", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ColorHelper {
        static getAlpha(packetColor) {
            return packetColor >>> 24;
        }
        static getRed(packedColor) {
            return packedColor >> 16 & 255;
        }
        static getGreen(packedColor) {
            return packedColor >> 8 & 255;
        }
        static getBlue(packedColor) {
            return packedColor & 255;
        }
        static packColor(red, green, blue) {
            return `rgb(${red}, ${green}, ${blue})`;
        }
        static packDarkerColor(red, green, blue) {
            return `rgb(${red - 42.5 * 5.4}, ${green - 42.5 * 5.4}, ${blue - 42.5 * 5.4})`;
        }
        static getColor(color) {
            return this.packColor(this.getRed(color), this.getGreen(color), this.getBlue(color));
        }
        static getDarkerColor(color) {
            return this.packDarkerColor(this.getRed(color), this.getGreen(color), this.getBlue(color));
        }
    }
    exports.default = ColorHelper;
});
define("gui/FontRenderer", ["require", "exports", "utils/Resources", "utils/ColorHelper"], function (require, exports, Resources_js_1, ColorHelper_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CharacterRenderer = exports.addCharacterRenderer = exports.characterRenderers = void 0;
    ColorHelper_js_1 = __importDefault(ColorHelper_js_1);
    exports.characterRenderers = {};
    let addCharacterRenderer = (color, char) => {
        if (!exports.characterRenderers[color]) {
            exports.characterRenderers[color] = {};
        }
        exports.characterRenderers[color][char] = {
            text: new CharacterRenderer(char, color).create(),
            textShadow: new CharacterRenderer(char, color).createShadow()
        };
    };
    exports.addCharacterRenderer = addCharacterRenderer;
    class CharacterRenderer {
        constructor(char, color) {
            this.char = char;
            this.charWidth = Resources_js_1.getResourceLocation('fonts', 'font')[this.char].w;
            this.charHeight = Resources_js_1.getResourceLocation('fonts', 'font')[this.char].h;
            this.r = ColorHelper_js_1.default.getRed(color);
            this.g = ColorHelper_js_1.default.getGreen(color);
            this.b = ColorHelper_js_1.default.getBlue(color);
        }
        create() {
            const ctxfont = document.createElement('canvas').getContext('2d');
            ctxfont.canvas.width = this.charWidth;
            ctxfont.canvas.height = this.charHeight;
            ctxfont.drawImage(Resources_js_1.getResourceLocation('textures', 'font/ascii'), Resources_js_1.getResourceLocation('fonts', 'font')[this.char].x, Resources_js_1.getResourceLocation('fonts', 'font')[this.char].y, this.charWidth, this.charHeight, 0, 0, this.charWidth, this.charHeight);
            ctxfont.save();
            let myImg = ctxfont.getImageData(0, 0, this.charWidth * 3, this.charHeight * 3);
            ctxfont.clearRect(0, 0, this.charWidth, this.charHeight);
            for (var p = 0; p < myImg.data.length; p += 4)
                myImg.data[p] = this.r, myImg.data[p + 1] = this.g, myImg.data[p + 2] = this.b;
            ctxfont.restore();
            ctxfont.putImageData(myImg, 0, 0);
            return ctxfont.canvas;
        }
        createShadow() {
            const ctxfont = document.createElement('canvas').getContext('2d');
            ctxfont.canvas.width = this.charWidth;
            ctxfont.canvas.height = this.charHeight;
            ctxfont.drawImage(Resources_js_1.getResourceLocation('textures', 'font/ascii'), Resources_js_1.getResourceLocation('fonts', 'font')[this.char].x, Resources_js_1.getResourceLocation('fonts', 'font')[this.char].y, this.charWidth, this.charHeight, 0, 0, this.charWidth, this.charHeight);
            ctxfont.save();
            let myImg = ctxfont.getImageData(0, 0, this.charWidth * 3, this.charHeight * 3);
            ctxfont.clearRect(0, 0, this.charWidth, this.charHeight);
            for (var p = 0; p < myImg.data.length; p += 4)
                myImg.data[p] = this.r * 0.18, myImg.data[p + 1] = this.g * 0.18, myImg.data[p + 2] = this.b * 0.18;
            ctxfont.restore();
            ctxfont.putImageData(myImg, 0, 0);
            return ctxfont.canvas;
        }
    }
    exports.CharacterRenderer = CharacterRenderer;
    class FontRenderer {
        static getTextWidth(text) {
            let width = 0;
            text.split('').forEach((char, idx) => width += Resources_js_1.getResourceLocation('fonts', 'font')[text[idx]].w - 1);
            return width;
        }
        static drawStringWithShadow(context, text, posX, posY, color, _formatting) {
            for (var j = 0, k = posX; j < text.length; j++) {
                const char = text[j];
                if (!(exports.characterRenderers[color] && exports.characterRenderers[color][char]))
                    exports.addCharacterRenderer(color, char);
                context.drawImage(exports.characterRenderers[color][char]['textShadow'], k - 1 + 1, posY + 1);
                context.drawImage(exports.characterRenderers[color][char]['text'], k - 1, posY);
                k += Resources_js_1.getResourceLocation('fonts', 'font')[char].w - 1;
            }
        }
        static filll(context, minX, minY, maxX, maxY, color) {
            context.save();
            context.fillStyle = ColorHelper_js_1.default.getColor(color);
            context.fillRect(minX, minY, maxX, maxY);
            context.stroke();
        }
    }
    exports.default = FontRenderer;
});
define("interfaces/IGuiEventListener", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("utils/MouseHelper", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.double = exports.float = exports.long = exports.int = exports.short = exports.byte = exports.isDouble = exports.isFloat = exports.isLong = exports.isInt = exports.isShort = exports.isByte = void 0;
    class MouseHelper {
        constructor(minecraftIn, context) {
            this.mouseX = 0;
            this.mouseY = 0;
            this.ignoreFirstMove = true;
            this.xVelocity = 0;
            this.yVelocity = 0;
            this.eventTime = 0;
            this.activeButton = -1;
            this.mouseGrabbed = false;
            this.minecraft = minecraftIn;
            this.context = context;
        }
        mouseButtonCallback(button, action) {
            const flag = action === 1;
            const btn = button;
            let x = this.mouseX / 3;
            let y = this.mouseY / 3;
            if (flag) {
                this.activeButton = button;
                if (this.minecraft.currentScreen)
                    this.minecraft.currentScreen.mouseClicked(x, y, btn);
            }
            else {
                this.activeButton = -1;
                if (this.minecraft.currentScreen)
                    this.minecraft.currentScreen.mouseReleased(x, y, btn);
            }
        }
        cursorPosCallback(xpos, ypos, button) {
            if (this.ignoreFirstMove) {
                this.mouseX = xpos;
                this.mouseY = ypos;
                this.ignoreFirstMove = false;
            }
            let iguieventlistener = this.minecraft.currentScreen;
            if (iguieventlistener != null) {
                let d0 = xpos / this.minecraft.getScaleFactor();
                let d1 = ypos / this.minecraft.getScaleFactor();
                iguieventlistener.mouseMoved(d0, d1);
                if (this.activeButton != -1) {
                    let d2 = (xpos - this.mouseX) * this.minecraft.getScaleFactor();
                    let d3 = (ypos - this.mouseY) * this.minecraft.getScaleFactor();
                    iguieventlistener.mouseDragged(d0, d1, this.activeButton, d2, d3);
                }
            }
            if (this.isMouseGrabbed()) {
                this.xVelocity += xpos - this.mouseX;
                this.yVelocity += ypos - this.mouseY;
            }
            this.mouseX = xpos;
            this.mouseY = ypos;
        }
        isMouseGrabbed() {
            return this.mouseGrabbed;
        }
        scrollCallback(xoffset, yoffset) {
            let d0 = (this.minecraft.gameSettings.discreteMouseScroll ? Math.sign(yoffset) : yoffset) * this.minecraft.gameSettings.mouseWheelSensitivity;
            if (this.minecraft.currentScreen != null) {
                let d1 = this.mouseX * this.minecraft.getScaleFactor();
                let d2 = this.mouseY * this.minecraft.getScaleFactor();
                if (this.minecraft.currentScreen)
                    this.minecraft.currentScreen.mouseScrolled(d1, d2, d0);
            }
        }
        registerCallbacks() {
            this.context.canvas.addEventListener('mousemove', (e) => {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;
                this.cursorPosCallback(e.clientX, e.clientY, e.button);
            });
            this.context.canvas.addEventListener('mousedown', (e) => {
                this.mouseButtonCallback(e.button, 1);
            });
            this.context.canvas.addEventListener('mouseup', (e) => {
                this.mouseButtonCallback(e.button, 0);
            });
            this.context.canvas.addEventListener('contextmenu', (e) => {
                e.preventDefault();
            });
            this.context.canvas.addEventListener('wheel', (e) => {
                this.scrollCallback(e.deltaX, e.deltaY);
            });
        }
        getMouseX() {
            return this.mouseX;
        }
        getMouseY() {
            return this.mouseY;
        }
    }
    exports.default = MouseHelper;
    const isByte = (a) => {
        if (Number.isInteger(a) && !(a < -128 || a > 127))
            return a;
        else
            throw new Error('Number is not a byte');
    };
    exports.isByte = isByte;
    const isShort = (a) => {
        if (Number.isInteger(a) && !(a < -32768 || a > 32767))
            return a;
        else
            throw new Error('Number is not a short');
    };
    exports.isShort = isShort;
    const isInt = (a) => {
        if ((Number.isInteger(a) || 0) && !(a < 2E-21 && a > 2E31 - 1))
            return a;
        else
            throw new Error('Number is not an integer');
    };
    exports.isInt = isInt;
    const isLong = (a) => {
        if (Number.isInteger(a) && !(a < 2E-63 && a > 2E63 - 1))
            return a;
        else
            throw new Error('Number is not a long');
    };
    exports.isLong = isLong;
    const isFloat = (a) => {
        if (!(Number.isInteger(a) && (a < 2E-21 || a > 2E31 - 1)))
            return a;
        else
            throw new Error('Number is not a float');
    };
    exports.isFloat = isFloat;
    const isDouble = (a) => {
        if (!(Number.isInteger(a) && a < 2E-63 || a > 2E63 - 1))
            return a;
        else
            throw new Error('Number is not a double');
    };
    exports.isDouble = isDouble;
    const byte = (a) => isByte(~~a);
    exports.byte = byte;
    const short = (a) => isShort(~~a);
    exports.short = short;
    const int = (a) => isInt(~~a);
    exports.int = int;
    const long = (a) => isLong(~~a);
    exports.long = long;
    const float = (a) => isFloat(a);
    exports.float = float;
    const double = (a) => isDouble(a);
    exports.double = double;
});
define("utils/PlaySound", ["require", "exports", "utils/Resources"], function (require, exports, Resources_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.playSound = void 0;
    function playSound(src, volume) {
        let sound = Resources_js_2.getResourceLocation('sounds', src);
        sound.volume = volume;
        sound.play();
    }
    exports.playSound = playSound;
});
define("utils/Test", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.consoleOutput = exports.isInside = void 0;
    const isInside = (a, b, c, d, e, f, callback) => a > c && a < c + d && b > e && b < e + f ? callback() : false;
    exports.isInside = isInside;
    function consoleOutput(type, content, style = '') {
        switch (type) {
            case 'log':
                console.log('%c' + content, style);
                break;
            case 'error':
                console.error('%c' + content, style);
                break;
            default:
                console.log(content);
                break;
        }
    }
    exports.consoleOutput = consoleOutput;
});
define("utils/TranslationText", ["require", "exports", "utils/Resources"], function (require, exports, Resources_js_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getKeyTranslation = void 0;
    class TranslationTextComponent {
        constructor(translateKey) {
            this.translateKey = translateKey;
        }
        get() {
            try {
                const lang = localStorage.getItem('GameSettings') && JSON.parse(localStorage.getItem('GameSettings')).language ? JSON.parse(localStorage.getItem('GameSettings')).language : 'en_us';
                const displayLang = Resources_js_3.getResourceLocation('langs', lang);
                if (!displayLang[this.translateKey] || displayLang[this.translateKey] === '')
                    return String(this.translateKey);
                return displayLang[this.translateKey];
            }
            catch (err) {
                console.error(err);
            }
        }
    }
    exports.default = TranslationTextComponent;
    function getKeyTranslation(key) {
        try {
            const lang = localStorage.getItem('GameSettings') && JSON.parse(localStorage.getItem('GameSettings')).language ? JSON.parse(localStorage.getItem('GameSettings')).language : 'en_us';
            const displayLang = Resources_js_3.getResourceLocation('langs', lang);
            if (!displayLang[key] || displayLang[key] === '')
                return String(key);
            return displayLang[key];
        }
        catch (err) {
            console.error(err);
            return '';
        }
    }
    exports.getKeyTranslation = getKeyTranslation;
});
define("interfaces/IRenderable", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("gui/AbstractGui", ["require", "exports", "utils/ColorHelper", "gui/FontRenderer"], function (require, exports, ColorHelper_js_2, FontRenderer_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ColorHelper_js_2 = __importDefault(ColorHelper_js_2);
    FontRenderer_js_2 = __importDefault(FontRenderer_js_2);
    class AbstractGui {
        testConsole(text) {
            console.log(text);
        }
        drawString(context, text, posX, posY, color, ..._formatting) {
            FontRenderer_js_2.default.drawStringWithShadow(context, text, posX, posY, color, _formatting);
        }
        drawCenteredString(context, text, posX, posY, color, ..._formatting) {
            FontRenderer_js_2.default.drawStringWithShadow(context, text, posX - (FontRenderer_js_2.default.getTextWidth(text) / 2), posY, color, _formatting);
        }
        drawImg(context, img, offsetX, offsetY, uvX, uvY, width, height) {
            context.drawImage(img, uvX, uvY, width, height, offsetX, offsetY, width, height);
        }
        fill(context, minX, minY, maxX, maxY, color) {
            context.save();
            context.beginPath();
            context.fillStyle = ColorHelper_js_2.default.getColor(color);
            context.fillRect(minX, minY, maxX, maxY);
            context.stroke();
        }
        blit(context, img, x, y, uvX, uvY, width, height) {
            context.drawImage(img, uvX, uvY, width, height, x, y, width, height);
        }
    }
    exports.default = AbstractGui;
});
define("gui/widgets/Widget", ["require", "exports", "utils/Resources", "utils/PlaySound", "gui/AbstractGui", "utils/MouseHelper", "Minecraft"], function (require, exports, Resources_js_4, PlaySound_js_1, AbstractGui_js_1, MouseHelper_js_1, Minecraft_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    AbstractGui_js_1 = __importDefault(AbstractGui_js_1);
    Minecraft_js_1 = __importDefault(Minecraft_js_1);
    class Widgets extends AbstractGui_js_1.default {
        constructor(x, y, width, height, title) {
            super();
            this.WIDGETS = Resources_js_4.getResourceLocation('textures', 'gui/widgets');
            this.wasHovered = false;
            this.isHovered = false;
            this.active = true;
            this.visible = true;
            this.alpha = 1.0;
            this.focused = false;
            this.x = MouseHelper_js_1.int(x);
            this.y = MouseHelper_js_1.int(y);
            this.width = MouseHelper_js_1.int(width);
            this.height = MouseHelper_js_1.int(height);
            this.message = title;
        }
        getYImage(isHovered) {
            let y = 1;
            if (!this.active)
                y = 0;
            else if (isHovered)
                y = 2;
            return y;
        }
        renderObject(context, mouseX, mouseY) {
            if (this.visible) {
                this.isHovered = mouseX >= this.x && mouseY >= this.y && mouseX < this.x + this.width && mouseY < this.y + this.height;
                if (this.visible)
                    this.renderButton(context, mouseX, mouseY);
                this.wasHovered = this.isHovered;
            }
        }
        changeFocus(focus) {
            if (this.active && this.visible) {
                this.focused = true;
                return this.focused;
            }
            else {
                return false;
            }
        }
        renderButton(context, mouseX, mouseY) {
            let minecraft = Minecraft_js_1.default.getInstance;
            let yUV = this.getYImage(this.getHovered());
            context.save();
            context.globalAlpha = this.alpha;
            this.blit(context, this.WIDGETS, this.x, this.y, 0, 46 + yUV * 20, this.width / 2, this.height);
            this.blit(context, this.WIDGETS, this.x + this.width / 2, this.y, 200 - this.width / 2, 46 + yUV * 20, this.width / 2, this.height);
            let color = this.active ? 16777215 : 10526880;
            this.drawCenteredString(context, this.message, this.x + this.width / 2, this.y + (this.height - 8) / 2, color);
            this.renderBg(context, minecraft, mouseX, mouseY);
            context.restore();
        }
        renderBg(context, minecraft, mouseX, mouseY) {
        }
        getHovered() {
            return this.isHovered || this.focused;
        }
        onClick(mouseX, mouseY) {
        }
        onRelease(mouseX, mouseY) {
        }
        onDrag(mouseX, mouseY, dragX, dragY) {
        }
        mouseClicked(mouseX, mouseY, button) {
            if (this.active && this.visible) {
                if (this.isValidClickButton(button)) {
                    let flag = this.clicked(mouseX, mouseY);
                    if (flag) {
                        this.focused = true;
                        PlaySound_js_1.playSound('click_stereo', 0.2);
                        this.onClick(mouseX, mouseY);
                    }
                }
            }
        }
        mouseReleased(mouseX, mouseY, button) {
            if (this.isValidClickButton(button)) {
                this.onRelease(mouseX, mouseY);
                return true;
            }
            else
                return false;
        }
        clicked(mouseX, mouseY) {
            return this.clicked && this.active && this.visible && mouseX >= this.x && mouseY >= this.y && mouseX < (this.x + this.width) && mouseY < (this.y + this.height);
        }
        isMouseOver(mouseX, mouseY) {
            return this.active && this.visible && mouseX >= this.x && mouseY >= this.y && mouseX <= (this.x + this.width) && mouseY <= (this.y + this.height);
        }
        mouseMoved(xPos, mouseY) {
        }
        mouseDragged(mouseX, mouseY, button, dragX, dragY) {
            this.onDrag(mouseX, mouseY, dragX, dragY);
            return true;
        }
        mouseScrolled(mouseX, mouseY, delta) {
        }
        keyPressed(key, modifiers) {
        }
        keyReleased(key, modifiers) {
        }
        keyDown(key, modifiers) {
        }
        charTyped() { }
        isValidClickButton(button) {
            return button == 0;
        }
        getWidth() {
            return this.width;
        }
        setWidth(width) {
            this.width = width;
        }
        setAlpha(alpha) {
            this.alpha = alpha;
        }
        setMessage(message) {
            this.message = message;
        }
        getMessage() {
            return this.message;
        }
        isFocused() {
            return this.focused;
        }
        setFocused(focused) {
            this.focused = focused;
        }
    }
    exports.default = Widgets;
});
define("gui/widgets/button/AbstractButton", ["require", "exports", "utils/PlaySound", "gui/widgets/Widget"], function (require, exports, PlaySound_js_2, Widget_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Widget_js_1 = __importDefault(Widget_js_1);
    class AbstractButton extends Widget_js_1.default {
        constructor(x, y, width, height, title) {
            super(x, y, width, height, title);
        }
        onClick(mouseX, mouseY) {
            this.PressFunc();
        }
        keyDown(keyName, modifiers) {
            if (this.active && this.visible && (this.isHovered || this.focused)) {
                if (keyName != 'Enter' && keyName != ' ') {
                    return false;
                }
                else {
                    PlaySound_js_2.playSound('sounds/click_stereo', 0.2);
                    this.PressFunc();
                    return true;
                }
            }
            else
                return false;
        }
    }
    exports.default = AbstractButton;
});
define("gui/widgets/button/Button", ["require", "exports", "gui/widgets/button/AbstractButton"], function (require, exports, AbstractButton_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    AbstractButton_js_1 = __importDefault(AbstractButton_js_1);
    class Button extends AbstractButton_js_1.default {
        constructor(x, y, width, height, title, PressFunc) {
            super(x, y, width, height, title);
            this.PressFunc = PressFunc;
        }
    }
    exports.default = Button;
});
define("gui/widgets/button/ImageButton", ["require", "exports", "gui/widgets/button/Button"], function (require, exports, Button_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Button_js_1 = __importDefault(Button_js_1);
    class ImageButton extends Button_js_1.default {
        constructor(x, y, width, height, xUV, yUV, yUVSize, img, txrWidth, txrHeight, onPress, title) {
            super(x, y, width, height, title, onPress);
            this.textureWidth = txrWidth;
            this.textureHeight = txrHeight;
            this.xTexStart = xUV;
            this.yTexStart = yUV;
            this.yDiffText = yUVSize;
            this.resourceLocation = img;
        }
        setPosition(xIn, yIn) {
            this.x = xIn;
            this.y = yIn;
        }
        renderButton(context, mouseX, mouseY) {
            let y = this.yTexStart;
            if (this.getHovered())
                y += this.yDiffText;
            context.save();
            context.globalAlpha = this.alpha;
            this.blit(context, this.resourceLocation, this.x, this.y, this.xTexStart, y, this.width, this.height);
            context.restore();
        }
    }
    exports.default = ImageButton;
});
define("utils/MathHelper", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MathHelper {
        static clamp(num, min, max) {
            if (num < min)
                return min;
            else
                return num > max ? max : num;
        }
        static lerp(pct, start, end) {
            return start + pct * (end - start);
        }
        static ceil(value) {
            let i = ~~value;
            return value > i ? i + 1 : i;
        }
    }
    exports.default = MathHelper;
});
define("gui/widgets/AbstractSlider", ["require", "exports", "utils/MouseHelper", "gui/widgets/Widget"], function (require, exports, MouseHelper_js_2, Widget_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Widget_js_2 = __importDefault(Widget_js_2);
    class AbstractSlider extends Widget_js_2.default {
        constructor(x, y, width, height, message, defaultValue) {
            super(x, y, width, height, message);
            this.sliderValue = defaultValue;
            this.setMessage('Chat Scale: ' + MouseHelper_js_2.int(defaultValue * 100) + '%');
        }
        getYImage(isHovered) {
            return 0;
        }
        renderBg(context, minecraft, mouseX, mouseY) {
            let i = (this.getHovered() ? 2 : 1) * 20;
            this.blit(context, this.WIDGETS, this.x + (this.sliderValue * this.width - 8), this.y, 0, 46 + i, 4, 20);
            this.blit(context, this.WIDGETS, this.x + (this.sliderValue * this.width - 8) + 4, this.y, 196, 46 + i, 4, 20);
        }
        onClick(mouseX, mouseY) {
            this.changeSliderValue(mouseX);
        }
        keyDown(keyName, modifiers) {
            let flag = keyName == 'ArrowRight';
            if (flag || keyName == 'ArrowLeft') {
                let f = flag ? -1.0 : 1.0;
                this.setSliderValue(this.sliderValue + (f / (this.width - 8)));
            }
            return false;
        }
        changeSliderValue(mouseX) {
            this.setSliderValue((mouseX - (this.x + 4)) / (this.width - 8));
        }
        setSliderValue(value) { }
    }
    exports.default = AbstractSlider;
});
define("gui/widgets/GameSettingsSlider", ["require", "exports", "gui/widgets/AbstractSlider"], function (require, exports, AbstractSlider_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GameSettingsSlider = void 0;
    AbstractSlider_js_1 = __importDefault(AbstractSlider_js_1);
    class GameSettingsSlider extends AbstractSlider_js_1.default {
        constructor(settings, x, y, width, height, defaultValue) {
            super(x, y, width, height, '', defaultValue);
            this.settings = settings;
        }
    }
    exports.GameSettingsSlider = GameSettingsSlider;
});
define("gui/widgets/OptionSlider", ["require", "exports", "utils/MathHelper", "utils/MouseHelper", "gui/widgets/Widget"], function (require, exports, MathHelper_js_1, MouseHelper_js_3, Widget_js_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    MathHelper_js_1 = __importDefault(MathHelper_js_1);
    Widget_js_3 = __importDefault(Widget_js_3);
    class OptionSlider extends Widget_js_3.default {
        constructor(settings, xIn, yIn, widthIn, heightIn, defaultValue) {
            super(xIn, yIn, widthIn, heightIn, '');
            console.log(defaultValue);
            this.option = defaultValue;
            this.settings = settings;
            this.sliderValue = defaultValue;
            this.setMessage('Chat Scale: ' + MouseHelper_js_3.int(defaultValue * 100) + '%');
        }
        getYImage(isHovered) {
            return 0;
        }
        renderBg(context, minecraft, mouseX, mouseY) {
            let i = (this.getHovered() ? 2 : 1) * 20;
            this.blit(context, this.WIDGETS, this.x + (this.sliderValue * (this.width - 8)), this.y, 0, 46 + i, 4, 20);
            this.blit(context, this.WIDGETS, this.x + (this.sliderValue * (this.width - 8)) + 4, this.y, 196, 46 + i, 4, 20);
        }
        onClick(mouseX, mouseY) {
            this.changeSliderValue(mouseX);
        }
        keyDown(keyName, modifiers) {
            let flag = keyName == 'ArrowRight';
            if (flag || keyName == 'ArrowLeft') {
                let f = flag ? -1.0 : 1.0;
                this.setSliderValue(this.sliderValue + (f / (this.width - 8)));
            }
            return false;
        }
        changeSliderValue(mouseX) {
            this.setSliderValue((mouseX - (this.x + 4)) / (this.width - 8));
        }
        setSliderValue(value) {
            let d0 = this.sliderValue;
            this.sliderValue = MathHelper_js_1.default.clamp(value, 0.0, 1.0);
            if (d0 != this.sliderValue) {
                console.log(this.sliderValue);
                this.setSaveOptionValue(this.option);
            }
        }
        setSaveOptionValue(oqption) {
            this.settings.chatScale = this.sliderValue;
            this.settings.saveOptions();
        }
        func_230979_b_() {
        }
        mouseDragged(mouseX, mouseY, dragX, dragY) {
            this.changeSliderValue(mouseX);
            return true;
        }
    }
    exports.default = OptionSlider;
});
define("gui/widgets/button/OptionButton", ["require", "exports", "gui/widgets/button/Button"], function (require, exports, Button_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Button_js_2 = __importDefault(Button_js_2);
    class OptionButton extends Button_js_2.default {
        constructor(x, y, width, height, enumOptions, title, PressFunc) {
            super(x, y, width, height, title, PressFunc);
            this.enumOptions = enumOptions;
        }
    }
    exports.default = OptionButton;
});
define("gui/screens/Screen", ["require", "exports", "gui/AbstractGui", "gui/widgets/button/OptionButton", "utils/Resources"], function (require, exports, AbstractGui_js_2, OptionButton_js_1, Resources_js_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    AbstractGui_js_2 = __importDefault(AbstractGui_js_2);
    OptionButton_js_1 = __importDefault(OptionButton_js_1);
    class Screen extends AbstractGui_js_2.default {
        constructor(...args) {
            super();
            this.OPTIONS_BACKGROUND = Resources_js_5.getResourceLocation('textures', 'gui/options_background');
            this.minecraft = null;
            this.width = 0;
            this.height = 0;
            this.children = new Array();
            this.buttons = new Array();
            this.focusedWidget = -1;
            this.isDragging = false;
            if (args.length === 1)
                this.title = args[0];
        }
        getDragging() {
            return this.isDragging;
        }
        setDragging(dragging) {
            this.isDragging = dragging;
        }
        initScreen(minecraft, width, height) {
            this.minecraft = minecraft;
            this.buttons = [];
            this.children = [];
            this.width = width;
            this.height = height;
            this.init();
            this.focusedWidget > -1 && this.children[this.focusedWidget] ? this.children[this.focusedWidget].changeFocus(true) : null;
        }
        init() {
        }
        renderObject(context, mouseX, mouseY) {
            this.render(context, mouseX, mouseY);
            for (var i = 0; i < this.buttons.length; ++i) {
                this.buttons[i].renderObject(context, mouseX, mouseY);
            }
        }
        addButton(button) {
            this.buttons.push(button);
            return this.addListener(button);
        }
        addListener(listener) {
            this.children.push(listener);
            return listener;
        }
        getEventListeners() {
            return this.children;
        }
        render(context, mouseX, mouseY) {
        }
        mouseClicked(mouseX, mouseY, button) {
            for (const iguieventlistener of this.getEventListeners()) {
                iguieventlistener.mouseClicked(mouseX, mouseY, button);
            }
            this.setDragging(true);
        }
        mouseReleased(mouseX, mouseY, button) {
            this.setDragging(false);
            for (const iguieventlistener of this.getEventListeners()) {
                iguieventlistener.mouseReleased(mouseX, mouseY, button);
            }
            this.focusedWidget = -1;
        }
        mouseDragged(mouseX, mouseY, button, dragX, dragY) {
            this.children[0].mouseDragged(mouseX, mouseY, button, dragX, dragY);
        }
        isMouseOver(mouseX, mouseY) {
            return false;
        }
        mouseScrolled(mouseX, mouseY, delta) {
            for (const iguieventlistener of this.getEventListeners()) {
                iguieventlistener.mouseScrolled(mouseX, mouseY, delta);
            }
        }
        mouseMoved() {
            return false;
        }
        keyPressed(key, modifiers) {
            for (const iguieventlistener of this.getEventListeners()) {
                iguieventlistener.keyPressed(key, modifiers);
            }
        }
        keyReleased(key, modifiers) {
            for (const iguieventlistener of this.getEventListeners()) {
                iguieventlistener.keyReleased(key, modifiers);
            }
        }
        tick() {
        }
        keyDown(key, modifiers) {
            let flag = true;
            for (let i = 0; i < this.getEventListeners().length; i++) {
                const iguieventlistener = this.getEventListeners()[i];
                iguieventlistener.keyDown(key, modifiers);
                if (iguieventlistener instanceof OptionButton_js_1.default)
                    flag = false;
            }
            if (key === 'F3')
                this.minecraft.gameSettings.showFPS = !this.minecraft.gameSettings.showFPS;
            else if (key == 'Escape' && this.shouldCloseOnEsc())
                this.closeScreen();
            else if (key == 'Tab')
                this.changeFocus(true);
            else if (key == 'Enter' && this.focusedWidget !== -1 && flag)
                this.focusedWidget = -1;
        }
        charTyped() {
            return false;
        }
        onClose() {
        }
        shouldCloseOnEsc() {
            return true;
        }
        closeScreen() {
            this.minecraft.displayGuiScreen(null);
        }
        renderDirtBackground(context) {
            if (this.minecraft !== null) {
                context.save();
                context.scale(this.minecraft.getScaleFactor() * 0.65, this.minecraft.getScaleFactor() * 0.65);
                context.fillStyle = context.createPattern(this.OPTIONS_BACKGROUND, 'repeat');
                context.fillRect(0, 0, context.canvas.width, context.canvas.height);
                context.fillStyle = 'rgba(0, 0, 0, 0.7)';
                context.fillRect(0, 0, context.canvas.width, context.canvas.height);
                context.restore();
            }
        }
        changeFocus(focus) {
            if (this.focusedWidget + 2 > this.children.length)
                this.focusedWidget = -1;
            while (true) {
                this.focusedWidget++;
                if (this.children[this.focusedWidget].active) {
                    for (var i = 0; i < this.children.length; i++)
                        this.children[i].focused = false;
                    break;
                }
            }
            return false;
        }
    }
    exports.default = Screen;
});
define("gui/screens/SettingsScreen", ["require", "exports", "gui/screens/Screen"], function (require, exports, Screen_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Screen_js_1 = __importDefault(Screen_js_1);
    class SettingsScreen extends Screen_js_1.default {
        constructor(previousScreen, gameSettingsObj, title) {
            super(title);
            this.parentScreen = previousScreen;
            this.gameSettings = gameSettingsObj;
        }
        onClose() {
            this.minecraft.gameSettings.saveOptions();
        }
        closeScreen() {
            this.minecraft.displayGuiScreen(this.parentScreen);
        }
        render(context, mouseX, mouseY) {
            this.renderDirtBackground(context);
        }
    }
    exports.default = SettingsScreen;
});
define("gui/screens/AccessibilityScreen", ["require", "exports", "GameOption", "utils/TranslationText", "gui/widgets/button/Button", "gui/screens/SettingsScreen"], function (require, exports, GameOption_js_1, TranslationText_js_1, Button_js_3, SettingsScreen_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    GameOption_js_1 = __importDefault(GameOption_js_1);
    Button_js_3 = __importDefault(Button_js_3);
    SettingsScreen_js_1 = __importDefault(SettingsScreen_js_1);
    class AccessibilityScreen extends SettingsScreen_js_1.default {
        constructor(parentScreen, gameSettingsObj) {
            super(parentScreen, gameSettingsObj, TranslationText_js_1.getKeyTranslation("options.accessibility.title"));
            this.SCREEN_OPTIONS = [GameOption_js_1.default.NARRATOR_STATUS, GameOption_js_1.default.ShowSubtitlesOption, GameOption_js_1.default.AutoJumpOption, GameOption_js_1.default.SNEAK, GameOption_js_1.default.SPRINT];
        }
        init() {
            let index = 0;
            for (const iterator of this.SCREEN_OPTIONS) {
                let x = this.width / 2 - 155 + (index % 2) * 160;
                let y = this.height / 6 - 12 + 24 * (index >> 1);
                this.addButton(iterator.createWidget(this.minecraft.gameSettings, x, y, 150));
                index++;
            }
            this.addButton(new Button_js_3.default(this.width / 2 - 100, this.height - 27, 200, 20, TranslationText_js_1.getKeyTranslation("gui.done"), () => {
                this.minecraft.displayGuiScreen(this.parentScreen);
            }));
        }
        render(context, mouseX, mouseY) {
            super.render(context, mouseX, mouseY);
            this.drawCenteredString(context, this.title, this.width / 2, 20, 16777215);
        }
    }
    exports.default = AccessibilityScreen;
});
define("gui/screens/LanguageScreen", ["require", "exports", "utils/TranslationText", "gui/widgets/button/Button", "gui/screens/SettingsScreen"], function (require, exports, TranslationText_js_2, Button_js_4, SettingsScreen_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Button_js_4 = __importDefault(Button_js_4);
    SettingsScreen_js_2 = __importDefault(SettingsScreen_js_2);
    class LanguageScreen extends SettingsScreen_js_2.default {
        constructor(parentScreen, gameSettingsObj) {
            super(parentScreen, gameSettingsObj, TranslationText_js_2.getKeyTranslation("options.language"));
        }
        init() {
            this.addButton(new Button_js_4.default(this.width / 2 - 100, this.height - 27, 200, 20, TranslationText_js_2.getKeyTranslation("gui.done"), () => {
                this.minecraft.displayGuiScreen(this.parentScreen);
            }));
        }
        render(context, mouseX, mouseY) {
            super.render(context, mouseX, mouseY);
            this.drawCenteredString(context, this.title, this.width / 2, 20, 16777215);
        }
    }
    exports.default = LanguageScreen;
});
define("gui/screens/MultiplayerScreen", ["require", "exports", "utils/TranslationText", "gui/widgets/button/Button", "gui/screens/Screen"], function (require, exports, TranslationText_js_3, Button_js_5, Screen_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Button_js_5 = __importDefault(Button_js_5);
    Screen_js_2 = __importDefault(Screen_js_2);
    class MultiplayerScreen extends Screen_js_2.default {
        constructor(parentScreen) {
            super(TranslationText_js_3.getKeyTranslation('multiplayer.title'));
            this.parentScreen = parentScreen;
            this.flag = false;
        }
        init() {
            this.btnSelectServer = this.addButton(new Button_js_5.default(this.width / 2 - 154, this.height - 52, 100, 20, TranslationText_js_3.getKeyTranslation("selectServer.select"), () => {
            }));
            this.addButton(new Button_js_5.default(this.width / 2 - 50, this.height - 52, 100, 20, TranslationText_js_3.getKeyTranslation("selectServer.direct"), () => {
            }));
            this.addButton(new Button_js_5.default(this.width / 2 + (4 + 50), this.height - 52, 100, 20, TranslationText_js_3.getKeyTranslation("selectServer.add"), () => {
                this.flag = !this.flag;
            }));
            this.btnEditServer = this.addButton(new Button_js_5.default(this.width / 2 - 154, this.height - 28, 70, 20, TranslationText_js_3.getKeyTranslation("selectServer.edit"), () => {
            }));
            this.btnDeleteServer = this.addButton(new Button_js_5.default(this.width / 2 - 74, this.height - 28, 70, 20, TranslationText_js_3.getKeyTranslation("selectServer.delete"), () => {
            }));
            this.addButton(new Button_js_5.default(this.width / 2 + 4, this.height - 28, 70, 20, TranslationText_js_3.getKeyTranslation("selectServer.refresh"), () => {
                this.flag = false;
                this.refreshServerList();
            }));
            this.addButton(new Button_js_5.default(this.width / 2 + (4 + 76), this.height - 28, 75, 20, TranslationText_js_3.getKeyTranslation("gui.cancel"), () => {
                this.minecraft.displayGuiScreen(this.parentScreen);
            }));
            this.setActive();
        }
        refreshServerList() {
            this.minecraft.displayGuiScreen(new MultiplayerScreen(this.parentScreen));
        }
        setActive() {
            this.btnEditServer.active = this.flag;
            this.btnSelectServer.active = this.flag;
            this.btnDeleteServer.active = this.flag;
        }
        render(context, mouseX, mouseY) {
            this.renderDirtBackground(context);
            this.drawCenteredString(context, this.title, this.width / 2, 20, 16777215);
        }
    }
    exports.default = MultiplayerScreen;
});
define("gui/widgets/button/CheckboxButton", ["require", "exports", "utils/Resources", "gui/widgets/button/AbstractButton"], function (require, exports, Resources_js_6, AbstractButton_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CheckboxButton = void 0;
    AbstractButton_js_2 = __importDefault(AbstractButton_js_2);
    class CheckboxButton extends AbstractButton_js_2.default {
        constructor(x, y, width, height, title, stored) {
            super(x, y, width, height, title);
            this.TEXTURE = Resources_js_6.getResourceLocation('textures', 'gui/checkbox');
            this.checked = false;
            if (stored != null) {
                this.setChecked(stored.isChecked());
            }
        }
        onPress() {
            this.checked = !this.checked;
        }
        onClick(mouseX, mouseY) {
            this.onPress();
        }
        isChecked() {
            return this.checked;
        }
        setChecked(state) {
            this.checked = state;
        }
        renderButton(context, mouseX, mouseY) {
            this.blit(context, this.TEXTURE, this.x, this.y, this.getHovered() ? 20 : 0, this.checked ? 20 : 0, 20, this.height);
            this.drawString(context, this.getMessage(), this.x + 24, this.y + (this.height - 8) / 2, 14737632);
        }
    }
    exports.CheckboxButton = CheckboxButton;
});
define("gui/screens/MultiplayerWarningScreen", ["require", "exports", "utils/TranslationText", "gui/screens/Screen", "gui/widgets/button/Button", "gui/widgets/button/CheckboxButton", "gui/screens/MultiplayerScreen"], function (require, exports, TranslationText_js_4, Screen_js_3, Button_js_6, CheckboxButton_js_1, MultiplayerScreen_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Screen_js_3 = __importDefault(Screen_js_3);
    Button_js_6 = __importDefault(Button_js_6);
    MultiplayerScreen_js_1 = __importDefault(MultiplayerScreen_js_1);
    class MultiplayerWarningScreen extends Screen_js_3.default {
        constructor(prevScreen) {
            super();
            this.header = TranslationText_js_4.getKeyTranslation("multiplayerWarning.header");
            this.message = TranslationText_js_4.getKeyTranslation("multiplayerWarning.message");
            this.checkboxText = TranslationText_js_4.getKeyTranslation("multiplayerWarning.check");
            this.prevScreen = prevScreen;
        }
        init() {
            this.addButton(new Button_js_6.default(this.width / 2 - 155, 100 + 180, 150, 20, TranslationText_js_4.getKeyTranslation('gui.proceed'), () => {
                if (this.cautionCheckbox.isChecked()) {
                    this.minecraft.gameSettings.skipMultiplayerWarning = true;
                    this.minecraft.gameSettings.saveOptions();
                }
                this.minecraft.displayGuiScreen(new MultiplayerScreen_js_1.default(this.prevScreen));
            }));
            this.addButton(new Button_js_6.default(this.width / 2 - 155 + 160, 100 + 180, 150, 20, TranslationText_js_4.getKeyTranslation('gui.back'), () => {
                this.minecraft.displayGuiScreen(this.prevScreen);
            }));
            this.cautionCheckbox = new CheckboxButton_js_1.CheckboxButton(this.width / 2 - 155 + 80, 76 + 180, 150, 20, this.checkboxText, this.cautionCheckbox);
            this.addButton(this.cautionCheckbox);
        }
        render(context, mouseX, mouseY) {
            this.renderDirtBackground(context);
            this.drawString(context, this.header, 25, 30, 16777215);
            this.drawString(context, this.message, 25, 70, 16777215);
        }
    }
    exports.default = MultiplayerWarningScreen;
});
define("gui/screens/ChatOptionsScreen", ["require", "exports", "GameOption", "utils/TranslationText", "gui/widgets/button/Button", "gui/screens/SettingsScreen"], function (require, exports, GameOption_js_2, TranslationText_js_5, Button_js_7, SettingsScreen_js_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    GameOption_js_2 = __importDefault(GameOption_js_2);
    Button_js_7 = __importDefault(Button_js_7);
    SettingsScreen_js_3 = __importDefault(SettingsScreen_js_3);
    class ChatOptionsScreen extends SettingsScreen_js_3.default {
        constructor(parentScreen, gameSettingsObj) {
            super(parentScreen, gameSettingsObj, TranslationText_js_5.getKeyTranslation("options.chat.title"));
            this.SCREEN_OPTIONS = [GameOption_js_2.default.CHAT_VISIBILITY, GameOption_js_2.default.CHAT_COLOR, GameOption_js_2.default.CHAT_LINKS, GameOption_js_2.default.CHAT_LINKS_PROMPT, GameOption_js_2.default.NARRATOR_STATUS];
        }
        init() {
            let index = 0;
            for (const iterator of this.SCREEN_OPTIONS) {
                let x = this.width / 2 - 155 + (index % 2) * 160;
                let y = this.height / 6 - 12 + 24 * (index >> 1);
                this.addButton(iterator.createWidget(this.minecraft.gameSettings, x, y, 150));
                index++;
            }
            this.addButton(new Button_js_7.default(this.width / 2 - 100, this.height - 27, 200, 20, TranslationText_js_5.getKeyTranslation("gui.done"), () => {
                this.minecraft.displayGuiScreen(this.parentScreen);
            }));
        }
        render(context, mouseX, mouseY) {
            super.render(context, mouseX, mouseY);
            this.drawCenteredString(context, this.title, this.width / 2, 20, 16777215);
        }
    }
    exports.default = ChatOptionsScreen;
});
define("gui/screens/ControlsScreen", ["require", "exports", "utils/TranslationText", "gui/widgets/button/Button", "gui/screens/SettingsScreen"], function (require, exports, TranslationText_js_6, Button_js_8, SettingsScreen_js_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Button_js_8 = __importDefault(Button_js_8);
    SettingsScreen_js_4 = __importDefault(SettingsScreen_js_4);
    class ControlsScreen extends SettingsScreen_js_4.default {
        constructor(parentScreen, gameSettingsObj) {
            super(parentScreen, gameSettingsObj, TranslationText_js_6.getKeyTranslation("controls.title"));
        }
        init() {
            this.addButton(new Button_js_8.default(this.width / 2 + 5, this.height - 27, 150, 20, TranslationText_js_6.getKeyTranslation("gui.done"), () => {
                this.minecraft.displayGuiScreen(this.parentScreen);
            }));
        }
        render(context, mouseX, mouseY) {
            super.render(context, mouseX, mouseY);
            this.drawCenteredString(context, this.title, this.width / 2, 20, 16777215);
        }
    }
    exports.default = ControlsScreen;
});
define("gui/screens/CustomizeSkinScreen", ["require", "exports", "utils/TranslationText", "gui/widgets/button/Button", "gui/screens/SettingsScreen"], function (require, exports, TranslationText_js_7, Button_js_9, SettingsScreen_js_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Button_js_9 = __importDefault(Button_js_9);
    SettingsScreen_js_5 = __importDefault(SettingsScreen_js_5);
    class CustomizeSkinScreen extends SettingsScreen_js_5.default {
        constructor(parentScreen, gameSettingsObj) {
            super(parentScreen, gameSettingsObj, TranslationText_js_7.getKeyTranslation("options.skinCustomisation.title"));
        }
        init() {
            this.addButton(new Button_js_9.default(this.width / 2 - 100, this.height - 27, 200, 20, TranslationText_js_7.getKeyTranslation("gui.done"), () => {
                this.minecraft.displayGuiScreen(this.parentScreen);
            }));
        }
        render(context, mouseX, mouseY) {
            super.render(context, mouseX, mouseY);
            this.drawCenteredString(context, this.title, this.width / 2, 20, 16777215);
        }
    }
    exports.default = CustomizeSkinScreen;
});
define("gui/screens/OptionsSoundsScreen", ["require", "exports", "GameOption", "utils/TranslationText", "gui/widgets/button/Button", "gui/widgets/button/OptionButton", "gui/screens/SettingsScreen"], function (require, exports, GameOption_js_3, TranslationText_js_8, Button_js_10, OptionButton_js_2, SettingsScreen_js_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    GameOption_js_3 = __importDefault(GameOption_js_3);
    Button_js_10 = __importDefault(Button_js_10);
    OptionButton_js_2 = __importDefault(OptionButton_js_2);
    SettingsScreen_js_6 = __importDefault(SettingsScreen_js_6);
    class OptionsSoundsScreen extends SettingsScreen_js_6.default {
        constructor(parentScreen, gameSettingsObj) {
            super(parentScreen, gameSettingsObj, TranslationText_js_8.getKeyTranslation("options.sounds.title"));
        }
        init() {
            let index = 1;
            const basePosX = this.width / 2 - 75;
            const basePosY = this.height / 6 - 12;
            this.addButton(new OptionButton_js_2.default(basePosX, basePosY + 24 * (index >> 1), 150, 20, GameOption_js_3.default.ShowSubtitlesOption, GameOption_js_3.default.ShowSubtitlesOption.func_238152_c_(this.gameSettings), () => {
                GameOption_js_3.default.ShowSubtitlesOption.nextValue(this.minecraft.gameSettings);
                this.minecraft.gameSettings.saveOptions();
            }));
            this.addButton(new Button_js_10.default(basePosX - 25, basePosY + 180, 200, 20, TranslationText_js_8.getKeyTranslation("gui.done"), () => {
                this.minecraft.displayGuiScreen(this.parentScreen);
            }));
        }
        render(context, mouseX, mouseY) {
            super.render(context, mouseX, mouseY);
            this.drawCenteredString(context, this.title, this.width / 2, 15, 16777215);
        }
    }
    exports.default = OptionsSoundsScreen;
});
define("gui/screens/VideoSettingsScreen", ["require", "exports", "GameOption", "utils/TranslationText", "gui/widgets/button/Button", "gui/screens/SettingsScreen"], function (require, exports, GameOption_js_4, TranslationText_js_9, Button_js_11, SettingsScreen_js_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    GameOption_js_4 = __importDefault(GameOption_js_4);
    Button_js_11 = __importDefault(Button_js_11);
    SettingsScreen_js_7 = __importDefault(SettingsScreen_js_7);
    class VideoSettingsScreen extends SettingsScreen_js_7.default {
        constructor(parentScreen, gameSettingsObj) {
            super(parentScreen, gameSettingsObj, TranslationText_js_9.getKeyTranslation("options.videoTitle"));
            this.SCREEN_OPTIONS = [GameOption_js_4.default.AdvancedItemTooltipsOption, GameOption_js_4.default.AutoJumpOption, GameOption_js_4.default.ForceUnicodeFont, GameOption_js_4.default.HeldItemTooltipsOption, GameOption_js_4.default.HideGUIOption, GameOption_js_4.default.RawMouseInputOption, GameOption_js_4.default.ShowFPSOption, GameOption_js_4.default.SkipMultiplayerWarningOption, GameOption_js_4.default.VsyncOption, GameOption_js_4.default.CLOUDS_OPTION, GameOption_js_4.default.GRAPHICS_FANCINESS, GameOption_js_4.default.AMBIENT_OCCLUSION_STATUS, GameOption_js_4.default.ATTACK_INDICATOR_STATUS, GameOption_js_4.default.CHAT_VISIBILITY, GameOption_js_4.default.HAND_SIDE, GameOption_js_4.default.PARTICLE_STATUS, GameOption_js_4.default.POINT_OF_VIEW];
        }
        init() {
            let index = 0;
            for (const iterator of this.SCREEN_OPTIONS) {
                let x = this.width / 2 - 155 + (index % 2) * 160;
                let y = this.height / 6 - 12 + (index >> 1) * 24;
                this.addButton(iterator.createWidget(this.minecraft.gameSettings, x, y, 150));
                index++;
            }
            this.addButton(new Button_js_11.default(this.width / 2 - 100, this.height - 27, 200, 20, TranslationText_js_9.getKeyTranslation("gui.done"), () => {
                this.minecraft.displayGuiScreen(this.parentScreen);
            }));
        }
        render(context, mouseX, mouseY) {
            super.render(context, mouseX, mouseY);
            this.drawCenteredString(context, this.title, this.width / 2, 20, 16777215);
        }
    }
    exports.default = VideoSettingsScreen;
});
define("gui/screens/OptionsScreen", ["require", "exports", "GameOption", "utils/TranslationText", "gui/widgets/button/Button", "gui/screens/AccessibilityScreen", "gui/screens/ChatOptionsScreen", "gui/screens/ControlsScreen", "gui/screens/CustomizeSkinScreen", "gui/screens/LanguageScreen", "gui/screens/OptionsSoundsScreen", "gui/screens/Screen", "gui/screens/VideoSettingsScreen"], function (require, exports, GameOption_js_5, TranslationText_js_10, Button_js_12, AccessibilityScreen_js_1, ChatOptionsScreen_js_1, ControlsScreen_js_1, CustomizeSkinScreen_js_1, LanguageScreen_js_1, OptionsSoundsScreen_js_1, Screen_js_4, VideoSettingsScreen_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    GameOption_js_5 = __importDefault(GameOption_js_5);
    Button_js_12 = __importDefault(Button_js_12);
    AccessibilityScreen_js_1 = __importDefault(AccessibilityScreen_js_1);
    ChatOptionsScreen_js_1 = __importDefault(ChatOptionsScreen_js_1);
    ControlsScreen_js_1 = __importDefault(ControlsScreen_js_1);
    CustomizeSkinScreen_js_1 = __importDefault(CustomizeSkinScreen_js_1);
    LanguageScreen_js_1 = __importDefault(LanguageScreen_js_1);
    OptionsSoundsScreen_js_1 = __importDefault(OptionsSoundsScreen_js_1);
    Screen_js_4 = __importDefault(Screen_js_4);
    VideoSettingsScreen_js_1 = __importDefault(VideoSettingsScreen_js_1);
    class OptionsScreen extends Screen_js_4.default {
        constructor(parentScreen, gameSettingsObj) {
            super(TranslationText_js_10.getKeyTranslation('options.title'));
            this.SCREEN_OPTIONS = [GameOption_js_5.default.TestOption, GameOption_js_5.default.ShowFPSOption];
            this.parentScreen = parentScreen;
            this.settings = gameSettingsObj;
        }
        closeScreen() {
            this.minecraft.displayGuiScreen(this.parentScreen);
        }
        init() {
            let index = 0;
            for (const iterator of this.SCREEN_OPTIONS) {
                let x = this.width / 2 - 155 + (index % 2) * 160;
                let y = this.height / 6 - 12 + 24 * (index >> 1);
                this.addButton(iterator.createWidget(this.minecraft.gameSettings, x, y, 150));
                index++;
            }
            const baseY = this.height / 6 - 6;
            const baseX0 = this.width / 2 - 155;
            const baseX1 = baseX0 + 160;
            this.addButton(new Button_js_12.default(baseX0, baseY + 48, 150, 20, TranslationText_js_10.getKeyTranslation('options.skinCustomisation'), () => {
                this.minecraft.displayGuiScreen(new CustomizeSkinScreen_js_1.default(this, this.settings));
            }));
            this.addButton(new Button_js_12.default(baseX1, baseY + 48, 150, 20, TranslationText_js_10.getKeyTranslation('options.sounds'), () => {
                this.minecraft.displayGuiScreen(new OptionsSoundsScreen_js_1.default(this, this.settings));
            }));
            this.addButton(new Button_js_12.default(baseX0, baseY + 72, 150, 20, TranslationText_js_10.getKeyTranslation('options.video'), () => {
                this.minecraft.displayGuiScreen(new VideoSettingsScreen_js_1.default(this, this.settings));
            }));
            this.addButton(new Button_js_12.default(baseX1, baseY + 72, 150, 20, TranslationText_js_10.getKeyTranslation('options.controls'), () => {
                this.minecraft.displayGuiScreen(new ControlsScreen_js_1.default(this, this.settings));
            }));
            this.addButton(new Button_js_12.default(baseX0, baseY + 96, 150, 20, TranslationText_js_10.getKeyTranslation('options.language'), () => {
                this.minecraft.displayGuiScreen(new LanguageScreen_js_1.default(this, this.settings));
            }));
            this.addButton(new Button_js_12.default(baseX1, baseY + 96, 150, 20, TranslationText_js_10.getKeyTranslation('options.chat.title'), () => {
                this.minecraft.displayGuiScreen(new ChatOptionsScreen_js_1.default(this, this.settings));
            }));
            this.addButton(new Button_js_12.default(baseX0, baseY + 120, 150, 20, TranslationText_js_10.getKeyTranslation('options.resourcepack'), () => { }));
            this.addButton(new Button_js_12.default(baseX1, baseY + 120, 150, 20, TranslationText_js_10.getKeyTranslation('options.accessibility.title'), () => {
                this.minecraft.displayGuiScreen(new AccessibilityScreen_js_1.default(this, this.settings));
            }));
            this.addButton(new Button_js_12.default(this.width / 2 - 100, baseY + 174, 200, 20, TranslationText_js_10.getKeyTranslation('gui.done'), () => {
                this.minecraft.displayGuiScreen(this.parentScreen);
            }));
        }
        render(context, mouseX, mouseY) {
            this.renderDirtBackground(context);
            this.drawCenteredString(context, this.title, this.width / 2, 15, 16777215);
        }
    }
    exports.default = OptionsScreen;
});
define("gui/widgets/TextFieldWidget", ["require", "exports", "utils/ColorHelper", "utils/MathHelper", "gui/FontRenderer", "gui/widgets/Widget"], function (require, exports, ColorHelper_js_3, MathHelper_js_2, FontRenderer_js_3, Widget_js_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ColorHelper_js_3 = __importDefault(ColorHelper_js_3);
    MathHelper_js_2 = __importDefault(MathHelper_js_2);
    FontRenderer_js_3 = __importDefault(FontRenderer_js_3);
    Widget_js_4 = __importDefault(Widget_js_4);
    class TextFieldWidget extends Widget_js_4.default {
        constructor(x, y, w, h, p_i232259_6_, title) {
            super(x, y, w, h, title);
            this.text = '';
            this.maxStringLength = 32;
            this.cursorCounter = 0;
            this.enableBackgroundDrawing = true;
            this.canLoseFocus = true;
            this.lineScrollOffset = 0;
            this.cursorPosition = 0;
            this.selectionEnd = 0;
            this.enabledColor = 14737632;
            this.disabledColor = 7368816;
            this.focused = false;
            if (p_i232259_6_ instanceof TextFieldWidget) {
                this.setText(p_i232259_6_.getText());
                this.cursorCounter = p_i232259_6_.cursorCounter;
                this.focused = p_i232259_6_.focused;
            }
        }
        setText(textIn) {
            if (textIn.length > this.maxStringLength) {
                let i = textIn;
                this.text = i.substring(0, this.maxStringLength);
            }
            else
                this.text = textIn;
        }
        getText() {
            return this.text;
        }
        tick() {
            this.cursorCounter++;
        }
        delete(modifiers, p_212950_1_) {
            if (modifiers.controlKeyDown) {
                this.deleteWords(p_212950_1_);
            }
            else {
                this.deleteFromCursor(p_212950_1_);
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
                    let k = true;
                    let l = i.length - 1;
                    while (k) {
                        if (i[l] !== '' && i[l] !== ' ') {
                            break;
                        }
                        else {
                            i.pop();
                        }
                        l--;
                    }
                    this.text = i.join('');
                }
            }
        }
        getNthWordFromCursor(numWords) {
            return this.getNthWordFromPos(numWords, this.getCursorPosition());
        }
        getCursorPosition() {
            return this.cursorPosition;
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
                    let k = Math.max(1, this.cursorPosition);
                    if (j != k) {
                        let s = String(this.text).slice(0, this.text.length - 1).toString();
                        this.text = s;
                        this.setCursorPosition(j);
                    }
                }
            }
        }
        clampCursorPosition(pos) {
            this.cursorPosition = MathHelper_js_2.default.clamp(pos, 0, this.text.length);
        }
        getAdjustedWidth() {
            return this.getEnableBackgroundDrawing() ? this.width - 8 : this.width;
        }
        getEnableBackgroundDrawing() {
            return this.enableBackgroundDrawing;
        }
        setEnableBackgroundDrawing(enableBackgroundDrawingIn) {
            this.enableBackgroundDrawing = enableBackgroundDrawingIn;
        }
        setSelectionPos(position) {
            let i = this.text.length;
            this.selectionEnd = MathHelper_js_2.default.clamp(position, 0, i);
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
            this.lineScrollOffset = MathHelper_js_2.default.clamp(this.lineScrollOffset, 0, i);
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
            return this.visible && this.focused && this.active;
        }
        keyDown(keyName, modifiers) {
            if (!this.canWrite()) {
                return false;
            }
            else {
                this.field_212956_h = modifiers.shiftKeyDown;
                if (false) {
                    return true;
                }
                else if (false) {
                    return true;
                }
                else if (false) {
                    if (this.active) {
                    }
                    return true;
                }
                else if (false) {
                    return true;
                }
                else {
                    switch (keyName) {
                        case 'Backspace':
                            if (this.active) {
                                this.field_212956_h = false;
                                this.delete(modifiers, -1);
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
                        case 'Control':
                            break;
                        case 'Alt':
                            break;
                        case 'Tab':
                            break;
                        case 'Enter':
                            break;
                        case 'Shift':
                            break;
                        case 'CapsLock':
                            break;
                        case 'NumLock':
                            break;
                        case 'ArrowLeft':
                            this.moveCursorBy(-1);
                            break;
                        case 'ArrowRight':
                            break;
                        default:
                            if ((this.text + keyName).length <= this.maxStringLength) {
                                this.text += keyName;
                            }
                            break;
                    }
                }
            }
        }
        moveCursorBy(num) {
            this.setCursorPosition(this.func_238516_r_(num - 10));
        }
        func_238516_r_(p_238516_1_) {
            return this.func_240980_a_(this.text, this.cursorPosition, p_238516_1_);
        }
        func_240980_a_(p_240980_0_, p_240980_1_, p_240980_2_) {
            let i = p_240980_0_.length;
            if (p_240980_2_ >= 0) {
            }
            else {
                for (var k = p_240980_2_; p_240980_1_ > 0 && k < 0; ++k) {
                    --p_240980_1_;
                    --p_240980_1_;
                }
            }
            return p_240980_1_;
        }
        renderButton(context, mouseX, mouseY) {
            let borderColor = this.focused ? -1 : -6250336;
            context.save();
            context.fillStyle = 'black';
            context.fillRect(this.x, this.y, this.width, this.height);
            context.strokeStyle = ColorHelper_js_3.default.getColor(borderColor);
            context.strokeRect(this.x, this.y, this.width, this.height);
            context.restore();
            let textColor = this.active ? this.enabledColor : this.disabledColor;
            let j = this.cursorPosition - this.lineScrollOffset;
            let k = this.selectionEnd - this.lineScrollOffset;
            let flag = j >= 0 && j <= this.text.length;
            let flag1 = this.isFocused() && flag;
            let s = this.text;
            let l = this.enableBackgroundDrawing ? this.x + 4 : this.x;
            let i1 = this.enableBackgroundDrawing ? this.y + (this.height - 8) / 2 : this.y;
            let j1 = l;
            if (k > this.text.length) {
                k = this.text.length;
            }
            let flag2 = this.cursorPosition < this.text.length || this.text.length >= this.maxStringLength;
            let k1 = j1;
            if (!flag) {
                k1 = j > 0 ? l + this.width : l;
            }
            else if (flag2) {
                k1 = j1 - 1;
                --j1;
            }
            if (this.text !== '') {
                this.drawString(context, this.text, j1, i1, textColor);
            }
            else {
                if (!this.focused) {
                    this.drawString(context, this.getMessage(), j1, i1, 10526880);
                }
            }
            if (s !== '' && flag && j < s.length) {
                FontRenderer_js_3.default.drawStringWithShadow(context, s.substring(j), j1, i1, textColor, []);
            }
            if (flag1) {
                if (flag2 && false) {
                }
                else {
                    this.drawString(context, "_", (this.x + FontRenderer_js_3.default.getTextWidth(this.text)) + 4, i1, textColor);
                }
            }
        }
        mouseClicked(mouseX, mouseY, button) {
            if (!this.visible) {
                return false;
            }
            else {
                let flag = mouseX > this.x && mouseX < (this.x + this.width) && mouseY > this.y && mouseY < (this.y + this.height);
                if (this.canLoseFocus && flag) {
                    this.focused = true;
                }
                if (this.isFocused() && flag) {
                    let i = Math.floor(mouseX) - this.x;
                    if (this.enableBackgroundDrawing) {
                        i -= 4;
                    }
                    let s = this.text;
                    this.setCursorPosition(this.text.length + this.lineScrollOffset);
                    return true;
                }
                else {
                    this.focused = false;
                    return false;
                }
            }
        }
        changeFocus(focus) {
            if (this.active && this.visible) {
                this.focused = true;
                return this.focused;
            }
            else {
                return false;
            }
        }
    }
    exports.default = TextFieldWidget;
});
define("gui/screens/CreateWorldScreen", ["require", "exports", "utils/TranslationText", "gui/widgets/button/Button", "gui/screens/Screen"], function (require, exports, TranslationText_js_11, Button_js_13, Screen_js_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Button_js_13 = __importDefault(Button_js_13);
    Screen_js_5 = __importDefault(Screen_js_5);
    class WorldSelectionScreen extends Screen_js_5.default {
        constructor(parentScreen) {
            super(TranslationText_js_11.getKeyTranslation('selectWorld.create'));
            this.parentScreen = parentScreen;
        }
        closeScreen() {
            this.minecraft.displayGuiScreen(this.parentScreen);
        }
        init() {
            const posX0 = this.width / 2 - 155;
            const posX1 = this.width / 2 + 5;
            this.addButton(new Button_js_13.default(posX1, this.height - 28, 150, 20, TranslationText_js_11.getKeyTranslation('gui.cancel'), () => {
                this.minecraft.displayGuiScreen(this.parentScreen);
            }));
        }
        render(context, mouseX, mouseY) {
            this.renderDirtBackground(context);
            this.drawCenteredString(context, this.title, this.width / 2, 20, 16777215);
        }
    }
    exports.default = WorldSelectionScreen;
});
define("gui/screens/WorldSelectionScreen", ["require", "exports", "utils/TranslationText", "gui/widgets/button/Button", "gui/widgets/TextFieldWidget", "gui/screens/CreateWorldScreen", "gui/screens/Screen"], function (require, exports, TranslationText_js_12, Button_js_14, TextFieldWidget_js_1, CreateWorldScreen_js_1, Screen_js_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Button_js_14 = __importDefault(Button_js_14);
    TextFieldWidget_js_1 = __importDefault(TextFieldWidget_js_1);
    CreateWorldScreen_js_1 = __importDefault(CreateWorldScreen_js_1);
    Screen_js_6 = __importDefault(Screen_js_6);
    class WorldSelectionScreen extends Screen_js_6.default {
        constructor(parentScreen) {
            super(TranslationText_js_12.getKeyTranslation('selectWorld.title'));
            this.parentScreen = parentScreen;
            this.flag = false;
        }
        closeScreen() {
            this.minecraft.displayGuiScreen(this.parentScreen);
        }
        tick() {
            this.searchField.tick();
        }
        init() {
            this.searchField = new TextFieldWidget_js_1.default(this.width / 2 - 100, 22, 200, 20, this.searchField, 'Placeholder here');
            this.children.push(this.searchField);
            this.addButton(new Button_js_14.default(this.width / 2 - 75, this.height / 2 - 20, 150, 20, TranslationText_js_12.getKeyTranslation("Simulate Select/Deselect"), () => this.flag = !this.flag));
            this.selectButton = this.addButton(new Button_js_14.default(this.width / 2 - 154, this.height - 52, 150, 20, TranslationText_js_12.getKeyTranslation("selectWorld.select"), () => { }));
            this.addButton(new Button_js_14.default(this.width / 2 + 4, this.height - 52, 150, 20, TranslationText_js_12.getKeyTranslation("selectWorld.create"), () => {
                this.minecraft.displayGuiScreen(new CreateWorldScreen_js_1.default(this));
            }));
            this.renameButton = this.addButton(new Button_js_14.default(this.width / 2 - 154, this.height - 28, 72, 20, TranslationText_js_12.getKeyTranslation("selectWorld.edit"), () => { }));
            this.deleteButton = this.addButton(new Button_js_14.default(this.width / 2 - 76, this.height - 28, 72, 20, TranslationText_js_12.getKeyTranslation("selectWorld.delete"), () => { }));
            this.copyButton = this.addButton(new Button_js_14.default(this.width / 2 + 4, this.height - 28, 72, 20, TranslationText_js_12.getKeyTranslation("selectWorld.recreate"), () => { }));
            this.addButton(new Button_js_14.default(this.width / 2 + 82, this.height - 28, 72, 20, TranslationText_js_12.getKeyTranslation("gui.cancel"), () => {
                this.minecraft.displayGuiScreen(this.parentScreen);
            }));
            this.setActive();
        }
        setActive() {
            this.selectButton.active = this.flag;
            this.renameButton.active = this.flag;
            this.deleteButton.active = this.flag;
            this.copyButton.active = this.flag;
        }
        render(context, mouseX, mouseY) {
            this.renderDirtBackground(context);
            this.drawCenteredString(context, this.title, this.width / 2, 8, 16777215);
            this.searchField.renderObject(context, mouseX, mouseY);
        }
    }
    exports.default = WorldSelectionScreen;
});
define("gui/screens/MainMenuScreen", ["require", "exports", "utils/PlaySound", "utils/Resources", "utils/Test", "utils/TranslationText", "gui/FontRenderer", "gui/widgets/button/Button", "gui/widgets/button/ImageButton", "gui/screens/AccessibilityScreen", "gui/screens/LanguageScreen", "gui/screens/MultiplayerScreen", "gui/screens/MultiplayerWarningScreen", "gui/screens/OptionsScreen", "gui/screens/Screen", "gui/screens/WorldSelectionScreen"], function (require, exports, PlaySound_js_3, Resources_js_7, Test_js_1, TranslationText_js_13, FontRenderer_js_4, Button_js_15, ImageButton_js_1, AccessibilityScreen_js_2, LanguageScreen_js_2, MultiplayerScreen_js_2, MultiplayerWarningScreen_js_1, OptionsScreen_js_1, Screen_js_7, WorldSelectionScreen_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    FontRenderer_js_4 = __importDefault(FontRenderer_js_4);
    Button_js_15 = __importDefault(Button_js_15);
    ImageButton_js_1 = __importDefault(ImageButton_js_1);
    AccessibilityScreen_js_2 = __importDefault(AccessibilityScreen_js_2);
    LanguageScreen_js_2 = __importDefault(LanguageScreen_js_2);
    MultiplayerScreen_js_2 = __importDefault(MultiplayerScreen_js_2);
    MultiplayerWarningScreen_js_1 = __importDefault(MultiplayerWarningScreen_js_1);
    OptionsScreen_js_1 = __importDefault(OptionsScreen_js_1);
    Screen_js_7 = __importDefault(Screen_js_7);
    WorldSelectionScreen_js_1 = __importDefault(WorldSelectionScreen_js_1);
    class MainMenuScreen extends Screen_js_7.default {
        constructor() {
            super(...arguments);
            this.widthCopyright = 0;
            this.widthCopyrightRest = 0;
            this.MINECRAFT_TITLE_IMG = Resources_js_7.getResourceLocation('textures', 'gui/title/minecraft');
            this.MINECRAFT_EDITION_IMG = Resources_js_7.getResourceLocation('textures', 'gui/title/edition');
            this.WIDGETS_LOCATION = Resources_js_7.getResourceLocation('textures', 'gui/widgets');
            this.ACCESSIBILITY_TEXTURES = Resources_js_7.getResourceLocation('textures', 'gui/accessibility');
            this.showTitleWronglySpelled = (Math.random() < 1.0E-4);
            this.splashText = '';
            this.buttonResetDemo = null;
        }
        closeScreen() {
            return false;
        }
        shouldCloseOnEsc() {
            return false;
        }
        init() {
            this.splashText = this.splashText !== '' ? this.splashText : this.minecraft.getSplashText();
            this.widthCopyright = FontRenderer_js_4.default.getTextWidth("Not affiliated with Mojang Studios!");
            this.widthCopyrightRest = this.width - this.widthCopyright - 2;
            this.genInit();
        }
        genInit() {
            let screen = Resources_js_7.MCUI['main_menu_screen'];
            const getType = (superObj, obj) => {
                if (superObj === null) {
                    if (obj.type) {
                        return obj.type;
                    }
                    else {
                        return new Error('Type not specified');
                    }
                }
                else {
                    if ((obj.type && superObj.type) || (obj.type && !superObj.type)) {
                        return obj.type;
                    }
                    else if (!obj.type && superObj.type) {
                        return superObj.type;
                    }
                    else {
                        throw new Error('Type not specified');
                    }
                }
            };
            const getOffsetX = (superObj, obj) => {
                if (superObj === null) {
                    if (obj.offset) {
                        return obj.offset[0].replace('px', '').replace('100%', 'this.width');
                    }
                    else {
                        return new Error('Offset not specified');
                    }
                }
                else {
                    if ((obj.offset && superObj.offset) || (obj.offset && !superObj.offset)) {
                        return obj.offset[0].replace('px', '').replace('100%', 'this.width');
                    }
                    else if (!obj.offset && superObj.offset) {
                        return superObj.offset[0].replace('px', '').replace('100%', 'this.width');
                    }
                    else {
                        throw new Error('Offset not specified');
                    }
                }
            };
            const getOffsetY = (superObj, obj) => {
                if (superObj === null) {
                    if (obj.offset) {
                        return obj.offset[1].replace('px', '').replace('100%', 'this.height');
                    }
                    else {
                        return new Error('Offset not specified');
                    }
                }
                else {
                    if ((obj.offset && superObj.offset) || (obj.offset && !superObj.offset)) {
                        return obj.offset[1].replace('px', '').replace('100%', 'this.height');
                    }
                    else if (!obj.offset && superObj.offset) {
                        return superObj.offset[1].replace('px', '').replace('100%', 'this.height');
                    }
                    else {
                        throw new Error('Offset not specified');
                    }
                }
            };
            const getWidth = (superObj, obj) => {
                if (superObj === null) {
                    if (obj.size) {
                        return obj.size[0];
                    }
                    else {
                        return new Error('Size not specified');
                    }
                }
                else {
                    if ((obj.size && superObj.size) || (obj.size && !superObj.size)) {
                        return obj.size[0];
                    }
                    else if (!obj.size && superObj.size) {
                        return superObj.size[0];
                    }
                    else {
                        throw new Error('Size not specified');
                    }
                }
            };
            const getHeight = (superObj, obj) => {
                if (superObj === null) {
                    if (obj.size) {
                        return obj.size[1];
                    }
                    else {
                        return new Error('Size not specified');
                    }
                }
                else {
                    if ((obj.size && superObj.size) || (obj.size && !superObj.size)) {
                        return obj.size[1];
                    }
                    else if (!obj.size && superObj.size) {
                        return superObj.size[1];
                    }
                    else {
                        throw new Error('Size not specified');
                    }
                }
            };
            const getText = (superObj, obj) => {
                if (superObj === null) {
                    if (obj.text) {
                        return obj.text;
                    }
                    else {
                        return new Error('Text not specified');
                    }
                }
                else {
                    if ((obj.text && superObj.text) || (obj.text && !superObj.text)) {
                        return obj.text;
                    }
                    else if (!obj.text && superObj.text) {
                        return superObj.text;
                    }
                    else {
                        throw new Error('Text not specified');
                    }
                }
            };
            const getTexture = (superObj, obj) => {
                if (superObj === null) {
                    if (obj.texture) {
                        return obj.texture;
                    }
                    else {
                        return new Error('Texture not specified');
                    }
                }
                else {
                    if ((obj.texture && superObj.texture) || (obj.texture && !superObj.texture)) {
                        return obj.texture;
                    }
                    else if (!obj.texture && superObj.texture) {
                        return superObj.texture;
                    }
                    else {
                        throw new Error('Texture not specified');
                    }
                }
            };
            const getPressFunc = (superObj, obj) => {
                let id = obj.button_id || superObj.button_id || '';
                switch (id) {
                    case 'button.menu_singleplayer':
                        return () => {
                            this.minecraft.displayGuiScreen(new WorldSelectionScreen_js_1.default(this));
                        };
                    case 'button.menu_multiplayer':
                        return () => {
                            let screen = (this.minecraft.gameSettings.skipMultiplayerWarning ? new MultiplayerScreen_js_2.default(this) : new MultiplayerWarningScreen_js_1.default(this));
                            this.minecraft.displayGuiScreen(screen);
                        };
                    case 'button.menu_online':
                        return function () { };
                    case 'button.menu_options':
                        return () => {
                            this.minecraft.displayGuiScreen(new OptionsScreen_js_1.default(this, this.minecraft.gameSettings));
                        };
                    case 'button.settings_language':
                        return () => {
                            this.minecraft.displayGuiScreen(new LanguageScreen_js_2.default(this, this.minecraft.gameSettings));
                        };
                    case 'button.settings_accessibility':
                        return () => {
                            this.minecraft.displayGuiScreen(new AccessibilityScreen_js_2.default(this, this.minecraft.gameSettings));
                        };
                    case 'button.menu_quit':
                        return () => {
                            window.close();
                        };
                    default:
                        return function () { };
                }
            };
            const getActive = (superObj, obj) => {
                if (superObj === null) {
                    if (obj.active) {
                        return obj.active;
                    }
                    else {
                        return true;
                    }
                }
                else {
                    if ((obj.active && superObj.active) || (obj.active && !superObj.active)) {
                        return obj.active;
                    }
                    else if (!obj.active && superObj.active) {
                        return superObj.active;
                    }
                    else {
                        return true;
                    }
                }
            };
            const getIgnored = (superObj, obj) => {
                if (superObj === null) {
                    if (obj.ignored) {
                        return obj.ignored;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    if ((obj.ignored && superObj.ignored) || (obj.ignored && !superObj.ignored)) {
                        return !obj.ignored;
                    }
                    else if (!obj.ignored && superObj.ignored) {
                        return !superObj.ignored;
                    }
                    else {
                        return false;
                    }
                }
            };
            Object.entries(screen.init.controls).forEach(([a, b]) => {
                Object.entries(b).forEach(([c, d]) => {
                    let type;
                    let x;
                    let y;
                    let width;
                    let height;
                    let text;
                    let ignored;
                    let active;
                    let pressFunc;
                    if (!(c.includes('@'))) {
                        type = getType(null, d);
                        x = eval(getOffsetX(null, d)), y = eval(getOffsetY(null, d));
                        width = getWidth(null, d), height = getHeight(null, d);
                        text = getText(null, d), pressFunc = getPressFunc(null, d);
                        active = getActive(null, d);
                        ignored = getIgnored(null, d);
                        if (type === 'button') {
                            let btn = new Button_js_15.default(x, y, width, height, TranslationText_js_13.getKeyTranslation(text), pressFunc);
                            btn.active = active;
                            btn.visible = !ignored;
                            this.addButton(btn);
                        }
                        else if (type === 'button_image') {
                            let texture = getTexture(null, d);
                            let btn = new ImageButton_js_1.default(x, y, width, height, texture.base_uv[0], texture.base_uv[1], texture.base_uv_size[1], Resources_js_7.getResourceLocation('textures', texture.image), 256, 256, pressFunc, '');
                            btn.active = active;
                            btn.visible = !ignored;
                            this.addButton(btn);
                        }
                    }
                    else {
                        let superName = c.substr(c.indexOf('@') + 1);
                        let namespace = superName.substr(0, superName.indexOf("."));
                        let superObj;
                        if (namespace !== '') {
                            let a = superName.substr(superName.indexOf('.') + 1);
                            superObj = Resources_js_7.MCUI[namespace][a];
                        }
                        else {
                            superObj = screen[superName];
                        }
                        type = getType(superObj, d);
                        x = eval(getOffsetX(superObj, d)), y = eval(getOffsetY(superObj, d));
                        width = getWidth(superObj, d), height = getHeight(superObj, d);
                        text = getText(superObj, d), pressFunc = getPressFunc(superObj, d);
                        active = getActive(superObj, d);
                        ignored = getIgnored(superObj, d);
                        if (type === 'button') {
                            let btn = new Button_js_15.default(x, y, width, height, TranslationText_js_13.getKeyTranslation(text), pressFunc);
                            btn.active = active;
                            btn.visible = !ignored;
                            this.addButton(btn);
                        }
                        else if (type === 'button_image') {
                            let texture = getTexture(superObj, d);
                            let btn = new ImageButton_js_1.default(x, y, width, height, texture.base_uv[0], texture.base_uv[1], texture.base_uv_size[1], Resources_js_7.getResourceLocation('textures', texture.image), 256, 256, pressFunc, '');
                            btn.active = active;
                            btn.visible = !ignored;
                            this.addButton(btn);
                        }
                    }
                });
            });
        }
        genRender(context, mouseX, mouseY) {
            let data = [
                {
                    type: 'custom',
                    renderer: 'title_renderer',
                    offset: ['0px', '0px']
                },
                {
                    type: 'custom',
                    renderer: 'splash_renderer',
                    offset: ['0px', '0px']
                },
                {
                    type: 'label',
                    text: '#mc_name',
                    offset: ['2px', "100% - 10px"],
                    color: [255, 255, 255]
                },
                {
                    type: 'label',
                    text: 'Not affiliated with Mojang Studios!',
                    offset: ['100% - 170px', "100% - 10px"],
                    color: [255, 255, 255]
                }
            ];
            for (var i = 0; i < data.length; i++) {
                const obj = data[i];
                let offsetX = eval(obj.offset[0].replace('px', '').replace('100%', 'this.width'));
                let offsetY = eval(obj.offset[1].replace('px', '').replace('100%c', 'FontRenderer.getTextWidth(' + obj.text + ')').replace('100%', 'this.height'));
                if (obj.type === 'label' && obj.text) {
                    let text = obj.text;
                    if (text === '#mc_name') {
                        text = "Minecraft JS " + this.minecraft.getVersion();
                        if (this.minecraft.isDemo())
                            text += " Demo";
                        else
                            text += (this.minecraft.getVersionType() === "release" ? '' : '/' + this.minecraft.getVersionType());
                        text += `/${this.minecraft.getUsername()}`;
                        if (this.minecraft.isModdedClient())
                            text += TranslationText_js_13.getKeyTranslation("menu.modded");
                    }
                    this.drawString(context, text, offsetX, offsetY, 16777215);
                }
                else if (obj.type === 'custom') {
                    if (obj.renderer) {
                        if (obj.renderer === 'title_renderer') {
                            context.save();
                            let j = this.width / 2 - 137;
                            if (this.showTitleWronglySpelled) {
                                this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 0, 30, 0, 0, 99, 44);
                                this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 0, 30, 0, 0, 99, 44);
                                this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 99, 30, 129, 0, 27, 44);
                                this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 99 + 26, 30, 126, 0, 3, 44);
                                this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 99 + 26 + 3, 30, 99, 0, 26, 44);
                                this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 155, 30, 0, 45, 155, 44);
                            }
                            else {
                                this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 1, 30, 0, 0, 155, 44);
                                this.drawImg(context, this.MINECRAFT_TITLE_IMG, j - 1, 30, 0, 0, 155, 44);
                                this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 0, 31, 0, 0, 155, 44);
                                this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 0, 29, 0, 0, 155, 44);
                                this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 0, 30, 0, 0, 155, 44);
                                this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 155 + 1, 30, 0, 45, 155, 44);
                                this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 155 - 1, 30, 0, 45, 155, 44);
                                this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 155, 29, 0, 45, 155, 44);
                                this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 155, 31, 0, 45, 155, 44);
                                this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 155, 30, 0, 45, 155, 44);
                            }
                            this.drawImg(context, this.MINECRAFT_EDITION_IMG, j + 88, 67, 0, 0, 98, 14);
                            context.restore();
                        }
                        else if (obj.renderer === 'splash_renderer') {
                            context.save();
                            let j = this.width / 2 - 137;
                            const miliT = new Date().getMilliseconds();
                            let f2 = 1.8 - Math.abs(Math.sin((miliT % 1000) / 1000.0 * (Math.PI * 2)) * 0.1);
                            try {
                                f2 = f2 * 100.0 / (FontRenderer_js_4.default.getTextWidth('ddddddddddddddddddddddd') + 32);
                            }
                            catch {
                                f2 = f2 * 100.0 / (context.measureText('Error').width + 32);
                            }
                            context.scale(f2, f2);
                            context.rotate(-20 * Math.PI / 180);
                            context.translate(180, 90);
                            try {
                                this.drawCenteredString(context, this.splashText, j + 88 + 70 - (140 * f2), 67 + (this.height / (3)) - 20 - (70 * f2), 16776960);
                            }
                            catch {
                                this.drawCenteredString(context, 'Error', j + 88 + 70, 67 + 100, 16776960);
                            }
                            context.restore();
                        }
                    }
                }
            }
        }
        mouseClicked(mouseX, mouseY, button) {
            super.mouseClicked(mouseX, mouseY, button);
            Test_js_1.isInside(mouseX, mouseY, this.widthCopyrightRest, this.widthCopyright, (this.height - 10), 10, () => {
                PlaySound_js_3.playSound('click_stereo', 0.2);
                console.log('No credits sry :(');
            });
        }
        render(context, mouseX, mouseY) {
            this.fill(context, 0, 0, this.width, this.height, 3355443);
            Test_js_1.isInside(mouseX, mouseY, this.widthCopyrightRest, this.widthCopyright, (this.height - 10), 10, () => {
                this.fill(context, (this.widthCopyrightRest - 1), this.height - 2, this.widthCopyright + 1, 1, 16777215);
            });
            this.genRender(context, mouseX, mouseY);
        }
    }
    exports.default = MainMenuScreen;
});
define("index", ["require", "exports", "GameConfiguration", "Minecraft", "utils/Resources"], function (require, exports, GameConfiguration_js_1, Minecraft_js_2, Resources_js_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.shutdown = void 0;
    GameConfiguration_js_1 = __importDefault(GameConfiguration_js_1);
    Minecraft_js_2 = __importDefault(Minecraft_js_2);
    class Main {
        static async main() {
            await Resources_js_8.getAllResources();
            await Resources_js_8.getAllResources();
            await Resources_js_8.getAllResources();
            const gameconfigs = new GameConfiguration_js_1.default(new GameConfiguration_js_1.default.UserInformation('KalmeMarq'), new GameConfiguration_js_1.default.GameInformation(false, '1.42.0', 'release', 'vanilla'));
            let minecraft;
            try {
                minecraft = new Minecraft_js_2.default(gameconfigs);
                console.log('Minecraft Initialized!');
            }
            catch (e) {
                console.log('Couldn\'t Initialize Minecraft! What a pain..');
                console.log(e);
            }
        }
    }
    exports.default = Main;
    function shutdown() {
        window.close();
    }
    exports.shutdown = shutdown;
    Main.main();
});
define("utils/KeyboardListener", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class KeyboardListener {
        constructor(minecraftIn) {
            this.mc = minecraftIn;
        }
        onKeyEvent(key, action, modifiers) {
            const iguieventlistener = this.mc.currentScreen;
            if (action != 1) {
                if (action == 0)
                    if (this.mc.currentScreen)
                        iguieventlistener.keyReleased(key, modifiers);
                    else if (this.mc.currentScreen)
                        this.mc.currentScreen.keyDown(key, modifiers);
            }
            else if (this.mc.currentScreen)
                iguieventlistener.keyPressed(key, modifiers);
        }
        setupCallbacks() {
            const call_imit = (e, idx) => {
                this.onKeyEvent(e.key, idx, {
                    altKeyDown: e.getModifierState('Alt'),
                    altGrKeyDown: e.getModifierState('AltGraph'),
                    capsLockKeyDown: e.getModifierState('CapsLock'),
                    controlKeyDown: e.getModifierState('Control'),
                    numLockKeyDown: e.getModifierState('NumLock'),
                    shiftKeyDown: e.getModifierState('Shift')
                });
            };
            window.addEventListener('keypress', (e) => call_imit(e, 1));
            window.addEventListener('keyup', (e) => call_imit(e, 0));
            window.addEventListener('keydown', (e) => {
                if (!(e.key == 'F11' || e.key == 'F12'))
                    e.preventDefault();
                call_imit(e, 2);
            });
        }
    }
    exports.default = KeyboardListener;
});
define("gui/IngameGui", ["require", "exports", "utils/MathHelper", "utils/Resources", "gui/AbstractGui"], function (require, exports, MathHelper_js_3, Resources_js_9, AbstractGui_js_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    MathHelper_js_3 = __importDefault(MathHelper_js_3);
    AbstractGui_js_3 = __importDefault(AbstractGui_js_3);
    class IngameGui extends AbstractGui_js_3.default {
        constructor(mcIn) {
            super();
            this.playerHealth = 20;
            this.mc = mcIn;
        }
        renderIngameGui(context) {
            this.scaledWidth = this.mc.canvasWidth / this.mc.getScaleFactor();
            this.scaledHeight = this.mc.canvasHeight / this.mc.getScaleFactor();
            this.fill(context, 0, 0, window.innerWidth, window.innerHeight, 3355443);
            this.drawCenteredString(context, 'hey hey', this.scaledWidth / 2, this.scaledHeight / 2, -1);
            let i = this.scaledWidth / 2;
            let j = -90;
            let k = 182;
            let l = 91;
            this.blit(context, Resources_js_9.getResourceLocation('textures', 'gui/widgets'), i - 91, this.scaledHeight - 22, 0, 0, 182, 22);
            this.blit(context, Resources_js_9.getResourceLocation('textures', 'gui/widgets'), i - 91 - 1 + 0 * 20, this.scaledHeight - 22 - 1, 0, 22, 24, 22);
            this.func_238457_e_(context);
        }
        func_238457_e_(context) {
            let i = 20;
            let flag = this.healthUpdateCounter > this.ticks && (this.healthUpdateCounter - this.ticks) / 3 % 2 == 1;
            let j = new Date().getMilliseconds();
            if (i < this.playerHealth && 0 > 0) {
                this.lastSystemTime = j;
                this.healthUpdateCounter = (this.ticks + 20);
            }
            else if (i > this.playerHealth && 0 > 0) {
                this.lastSystemTime = j;
                this.healthUpdateCounter = (this.ticks + 10);
            }
            if (j - this.lastSystemTime > 1000) {
                this.playerHealth = i;
                this.lastPlayerHealth = i;
                this.lastSystemTime = j;
            }
            this.playerHealth = i;
            let k = this.lastPlayerHealth;
            let l = 20;
            let i1 = this.scaledWidth / 2 - 91;
            let j1 = this.scaledWidth / 2 + 91;
            let k1 = this.scaledHeight - 39;
            let f = 20;
            let l1 = MathHelper_js_3.default.ceil(0);
            let i2 = MathHelper_js_3.default.ceil((f + l1) / 2.0 / 10.0);
            let j2 = Math.max(10 - (i2 - 2), 3);
            let k2 = k1 - (i2 - 1) * j2 - 10;
            let l2 = k1 - 10;
            let i3 = l1;
            let j3 = 20;
            let k3 = -1;
            for (let l3 = 0; l3 < 10; ++l3) {
                if (j3 > 0) {
                    let i4 = i1 + l3 * 8;
                    if (l3 * 2 + 1 < j3) {
                        this.blit(context, Resources_js_9.getResourceLocation('textures', 'gui/icons'), i4, k2, 34, 9, 9, 9);
                    }
                    if (l3 * 2 + 1 == j3) {
                        this.blit(context, Resources_js_9.getResourceLocation('textures', 'gui/icons'), i4, k2, 25, 9, 9, 9);
                    }
                    if (l3 * 2 + 1 > j3) {
                        this.blit(context, Resources_js_9.getResourceLocation('textures', 'gui/icons'), i4, k2, 16, 9, 9, 9);
                    }
                }
            }
            for (let l5 = MathHelper_js_3.default.ceil((f + l1) / 2.0) - 1; l5 >= 0; --l5) {
                let i6 = 16;
                let j4 = 0;
                if (flag) {
                    j4 = 1;
                }
                let k4 = MathHelper_js_3.default.ceil((l5 + 1) / 10.0) - 1;
                let l4 = i1 + l5 % 10 * 8;
                let i5 = k1 - k4 * j2;
                if (i3 <= 0 && l5 == k3) {
                    i5 -= 2;
                }
                let j5 = 0;
                if (true) {
                    j5 = 5;
                }
                this.blit(context, Resources_js_9.getResourceLocation('textures', 'gui/icons'), l4, i5, 16 + j4 * 9, 9 * j5, 9, 9);
                if (flag) {
                    if (l5 * 2 + 1 < k) {
                        this.blit(context, Resources_js_9.getResourceLocation('textures', 'gui/icons'), l4, i5, i6 + 54, 9 * j5, 9, 9);
                    }
                    if (l5 * 2 + 1 == k) {
                        this.blit(context, Resources_js_9.getResourceLocation('textures', 'gui/icons'), l4, i5, i6 + 63, 9 * j5, 9, 9);
                    }
                }
                if (i3 > 0) {
                    if (i3 == l1 && l1 % 2 == 1) {
                        this.blit(context, Resources_js_9.getResourceLocation('textures', 'gui/icons'), l4, i5, i6 + 153, 9 * j5, 9, 9);
                        --i3;
                    }
                    else {
                        this.blit(context, Resources_js_9.getResourceLocation('textures', 'gui/icons'), l4, i5, i6 + 144, 9 * j5, 9, 9);
                        i3 -= 2;
                    }
                }
                else {
                    if (l5 * 2 + 1 < i) {
                        this.blit(context, Resources_js_9.getResourceLocation('textures', 'gui/icons'), l4, i5, i6 + 36, 9 * j5, 9, 9);
                    }
                    if (l5 * 2 + 1 == i) {
                        this.blit(context, Resources_js_9.getResourceLocation('textures', 'gui/icons'), l4, i5, i6 + 45, 9 * j5, 9, 9);
                    }
                }
            }
            for (let k6 = 0; k6 < 10; ++k6) {
                let i7 = k1;
                let k7 = 16;
                let i8 = 0;
                let k8 = j1 - k6 * 8 - 9;
                this.blit(context, Resources_js_9.getResourceLocation('textures', 'gui/icons'), k8, i7, 16 + i8 * 9, 27, 9, 9);
                if (k6 * 2 + 1 < l) {
                    this.blit(context, Resources_js_9.getResourceLocation('textures', 'gui/icons'), k8, i7, k7 + 36, 27, 9, 9);
                }
                if (k6 * 2 + 1 == l) {
                    this.blit(context, Resources_js_9.getResourceLocation('textures', 'gui/icons'), k8, i7, k7 + 45, 27, 9, 9);
                }
            }
            l2 -= 10;
        }
    }
    exports.default = IngameGui;
});
define("Minecraft", ["require", "exports", "GameSettings", "gui/FontRenderer", "gui/screens/MainMenuScreen", "index", "utils/Resources", "utils/KeyboardListener", "utils/MouseHelper", "gui/IngameGui"], function (require, exports, GameSettings_js_1, FontRenderer_js_5, MainMenuScreen_js_1, index_js_1, Resources_js_10, KeyboardListener_js_1, MouseHelper_js_4, IngameGui_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    GameSettings_js_1 = __importDefault(GameSettings_js_1);
    FontRenderer_js_5 = __importDefault(FontRenderer_js_5);
    MainMenuScreen_js_1 = __importDefault(MainMenuScreen_js_1);
    KeyboardListener_js_1 = __importDefault(KeyboardListener_js_1);
    MouseHelper_js_4 = __importDefault(MouseHelper_js_4);
    IngameGui_js_1 = __importDefault(IngameGui_js_1);
    class Timer {
        constructor(ticks, lastSyncSysClock) {
            this.renderPartialTicks = 0;
            this.elapsedPartialTicks = 0;
            this.lastSyncSysClock = 0;
            this.tickLength = 0;
            this.tickLength = 1000.0 / ticks;
            this.lastSyncSysClock = lastSyncSysClock;
        }
        getPartialTicks(gameTime) {
            this.elapsedPartialTicks = (gameTime - this.lastSyncSysClock) / this.tickLength;
            this.lastSyncSysClock = gameTime;
            this.renderPartialTicks += this.elapsedPartialTicks;
            let i = Math.ceil(this.renderPartialTicks);
            this.renderPartialTicks -= i;
            return i;
        }
    }
    class Minecraft {
        constructor(gameConfig) {
            this.context = document.getElementById('root').getContext('2d');
            this.canvasX = 0;
            this.canvasY = 0;
            this.canvasWidth = window.innerWidth;
            this.canvasHeight = window.innerHeight;
            this.scaleFactor = 3;
            this.fps = 0;
            this.timer = new Timer(20.0, 0);
            this.times = [];
            this.running = true;
            this.currentScreen = null;
            this.outputLog = '';
            Minecraft.instance = this;
            this.gameconfiguration = gameConfig;
            this.gameSettings = new GameSettings_js_1.default(this);
            this.mouseHelper = new MouseHelper_js_4.default(this, this.context);
            this.keyboardListener = new KeyboardListener_js_1.default(this);
            this.mouseHelper.registerCallbacks();
            this.keyboardListener.setupCallbacks();
            this.updateCanvasSize();
            this.run();
            this.ingameGUI = new IngameGui_js_1.default(this);
            this.outputLog = '';
        }
        static getInstance() {
            return this.instance;
        }
        shutdown() {
            this.running = false;
            console.log(this.outputLog);
            index_js_1.shutdown();
        }
        setFpsVisibility(state) {
            this.gameSettings.showFPS = state;
        }
        isFpsVisible() {
            return this.gameSettings.showFPS;
        }
        getSplashText() {
            function getRandSplash() {
                const splashes = Resources_js_10.getResourceLocation('texts', 'splashes'), date = new Date(), month = date.getMonth(), day = date.getDate();
                const getRandomSplashText = () => {
                    return splashes[~~(Math.random() * (splashes.length - 1))];
                };
                let randSplash = String(getRandomSplashText());
                if (month + 1 === 12 && day === 24)
                    randSplash = 'Merry X-mas!';
                else if (month + 1 === 1 && day === 1)
                    randSplash = 'Happy new year!';
                else if (month + 1 === 10 && day === 31)
                    randSplash = 'OOoooOOOoooo! Spooky!';
                return randSplash;
            }
            return getRandSplash();
        }
        run() {
            this.context.canvas.width = this.canvasWidth;
            this.context.canvas.height = this.canvasHeight;
            this.context.scale(this.scaleFactor, this.scaleFactor);
            this.context.imageSmoothingEnabled = false;
            const runLoop = () => {
                requestAnimationFrame(runLoop);
                if (this.running) {
                    this.displayGuiScreen(this.currentScreen);
                    if (true) {
                        let j = this.timer.getPartialTicks(new Date().getMilliseconds());
                        for (var k = 0; k < Math.min(10, j); ++k) {
                            this.runTick();
                        }
                    }
                    if (this.gameSettings.showFPS) {
                        this.context.save();
                        this.context.scale(0.666, 0.666);
                        let fps = this.gameSettings.vsync ? (this.getFPS() > this.gameSettings.framerateLimit ? this.gameSettings.framerateLimit : this.getFPS()) : this.getFPS();
                        FontRenderer_js_5.default.drawStringWithShadow(this.context, `${String(fps)}/${this.gameSettings.framerateLimit}`, 2, 2, 16777215, []);
                        this.context.restore();
                    }
                }
            };
            requestAnimationFrame(runLoop);
        }
        getFPS() {
            var now = performance.now();
            while (this.times.length > 0 && this.times[0] <= now - 1000)
                this.times.shift();
            this.times.push(now);
            this.fps = this.times.length;
            return this.fps;
        }
        runTick() {
            if (this.currentScreen != null) {
                this.currentScreen.tick();
            }
        }
        displayGuiScreen(guiScreenIn) {
            if (this.currentScreen != null)
                this.currentScreen.onClose();
            if (guiScreenIn === null)
                guiScreenIn = new MainMenuScreen_js_1.default();
            this.currentScreen = guiScreenIn;
            if (guiScreenIn !== null) {
                try {
                    const i = this.mouseHelper.getMouseX(), j = this.mouseHelper.getMouseY();
                    guiScreenIn.initScreen(this, this.canvasWidth / this.scaleFactor, this.canvasHeight / this.scaleFactor);
                    guiScreenIn.renderObject(this.context, i / this.scaleFactor, j / this.scaleFactor);
                }
                catch (e) {
                    console.log(e);
                }
            }
        }
        updateCanvasSize() {
            window.addEventListener('resize', () => {
                this.canvasWidth = window.innerWidth;
                this.canvasHeight = window.innerHeight;
                this.context.canvas.width = this.canvasWidth;
                this.context.canvas.height = this.canvasHeight;
                this.context.scale(this.scaleFactor, this.scaleFactor);
                this.context.imageSmoothingEnabled = false;
            });
        }
        getScaleFactor() {
            return this.scaleFactor;
        }
        isDemo() {
            return this.gameconfiguration.gameInfo.isDemo;
        }
        isModdedClient() {
            return this.gameconfiguration.gameInfo.clientName !== 'vanilla';
        }
        getVersionType() {
            return this.gameconfiguration.gameInfo.versionType;
        }
        getVersion() {
            return this.gameconfiguration.gameInfo.version;
        }
        getUsername() {
            return this.gameconfiguration.userInfo.userName;
        }
    }
    exports.default = Minecraft;
});
define("settings/AmbientOcclusionStatus", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AmbientOcclusionStatus {
        constructor(id, key) {
            this.id = id;
            this.key = key;
            AmbientOcclusionStatus.AllValues[id] = this;
        }
        static byId(id) {
            let ids = [];
            Object.keys(this.AllValues).forEach((id) => ids.push(Number(id)));
            if (id == ids.length)
                id = 0;
            return this.AllValues[id];
        }
    }
    exports.default = AmbientOcclusionStatus;
    AmbientOcclusionStatus.AllValues = {};
    AmbientOcclusionStatus.OFF = new AmbientOcclusionStatus(0, 'options.ao.off');
    AmbientOcclusionStatus.MIN = new AmbientOcclusionStatus(1, 'options.ao.min');
    AmbientOcclusionStatus.MAX = new AmbientOcclusionStatus(2, 'options.ao.max');
});
define("settings/AttackIndicatorStatus", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AttackIndicatorStatus {
        constructor(id, key) {
            this.id = id;
            this.key = key;
            AttackIndicatorStatus.AllValues[id] = this;
        }
        static byId(id) {
            let ids = [];
            Object.keys(this.AllValues).forEach((id) => ids.push(Number(id)));
            if (id == ids.length)
                id = 0;
            return this.AllValues[id];
        }
    }
    exports.default = AttackIndicatorStatus;
    AttackIndicatorStatus.AllValues = {};
    AttackIndicatorStatus.OFF = new AttackIndicatorStatus(0, 'options.off');
    AttackIndicatorStatus.CROSSHAIR = new AttackIndicatorStatus(1, 'options.attack.crosshair');
    AttackIndicatorStatus.HOTBAR = new AttackIndicatorStatus(2, 'options.attack.hotbar');
});
define("settings/ChatVisibility", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ChatVisibility {
        constructor(id, key) {
            this.id = id;
            this.key = key;
            ChatVisibility.AllValues[id] = this;
        }
        static byId(id) {
            let ids = [];
            Object.keys(this.AllValues).forEach((id) => ids.push(Number(id)));
            if (id == ids.length)
                id = 0;
            return this.AllValues[id];
        }
    }
    exports.default = ChatVisibility;
    ChatVisibility.AllValues = {};
    ChatVisibility.FULL = new ChatVisibility(0, 'options.chat.visibility.full');
    ChatVisibility.SYSTEM = new ChatVisibility(1, 'options.chat.visibility.system');
    ChatVisibility.HIDDEN = new ChatVisibility(2, 'options.chat.visibility.hidden');
});
define("settings/CloudOption", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CloudOption {
        constructor(id, key) {
            this.id = id;
            this.key = key;
            CloudOption.AllValues[id] = this;
        }
        static byId(id) {
            let ids = [];
            Object.keys(this.AllValues).forEach((id) => ids.push(Number(id)));
            if (id == ids.length)
                id = 0;
            return this.AllValues[id];
        }
    }
    exports.default = CloudOption;
    CloudOption.AllValues = {};
    CloudOption.OFF = new CloudOption(0, 'options.off');
    CloudOption.FAST = new CloudOption(1, 'options.clouds.fast');
    CloudOption.FANCY = new CloudOption(2, 'options.clouds.fancy');
});
define("settings/GraphicsFanciness", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GraphicsFanciness {
        constructor(id, key) {
            this.id = id;
            this.key = key;
            GraphicsFanciness.AllValues[id] = this;
        }
        static byId(id) {
            let ids = [];
            Object.keys(this.AllValues).forEach((id) => ids.push(Number(id)));
            if (id == ids.length)
                id = 0;
            return this.AllValues[id];
        }
    }
    exports.default = GraphicsFanciness;
    GraphicsFanciness.AllValues = {};
    GraphicsFanciness.FAST = new GraphicsFanciness(0, 'options.graphics.fast');
    GraphicsFanciness.FANCY = new GraphicsFanciness(1, 'options.graphics.fancy');
    GraphicsFanciness.FABULOUS = new GraphicsFanciness(2, 'options.graphics.fabulous');
});
define("settings/HandSide", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HandSide {
        constructor(id, key) {
            this.id = id;
            this.key = key;
            HandSide.AllValues[id] = this;
        }
        static byId(id) {
            let ids = [];
            Object.keys(this.AllValues).forEach((id) => ids.push(Number(id)));
            if (id == ids.length)
                id = 0;
            return this.AllValues[id];
        }
    }
    exports.default = HandSide;
    HandSide.AllValues = {};
    HandSide.LEFT = new HandSide(0, 'options.mainHand.left');
    HandSide.RIGHT = new HandSide(1, 'options.mainHand.right');
});
define("settings/KeyBinding", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Keybinding {
        constructor(description, keyname, category) {
            this.keyDescription = description;
            this.keyName = keyname;
            this.keyNameDefault = this.keyName;
            this.keyCategory = category;
            Keybinding.KEYBIND_ARRAY.set(description, this);
            Keybinding.HASH.set(this.keyName, this);
            Keybinding.KEYBIND_SET.add(category);
        }
    }
    exports.default = Keybinding;
    Keybinding.KEYBIND_ARRAY = new Map();
    Keybinding.HASH = new Map();
    Keybinding.CATEGORY_ORDER = new Map([
        ["key.categories.movement", 1],
        ["key.categories.gameplay", 2],
        ["key.categories.inventory", 3],
        ["key.categories.creative", 4],
        ["key.categories.multiplayer", 5],
        ["key.categories.ui", 6],
        ["key.categories.misc", 7]
    ]);
    Keybinding.KEYBIND_SET = new Set();
});
define("settings/NarratorStatus", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class NarratorStatus {
        constructor(id, key) {
            this.id = id;
            this.key = key;
            NarratorStatus.AllValues[id] = this;
        }
        static byId(id) {
            let ids = [];
            Object.keys(this.AllValues).forEach((id) => ids.push(Number(id)));
            if (id == ids.length)
                id = 0;
            return this.AllValues[id];
        }
    }
    exports.default = NarratorStatus;
    NarratorStatus.AllValues = {};
    NarratorStatus.OFF = new NarratorStatus(0, 'options.narrator.off');
    NarratorStatus.ALL = new NarratorStatus(1, 'options.narrator.all');
    NarratorStatus.CHAT = new NarratorStatus(2, 'options.narrator.chat');
    NarratorStatus.SYSTEM = new NarratorStatus(3, 'options.narrator.system');
});
define("settings/ParticleStatus", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ParticleStatus {
        constructor(id, key) {
            this.id = id;
            this.key = key;
            ParticleStatus.AllValues[id] = this;
        }
        static byId(id) {
            let ids = [];
            Object.keys(this.AllValues).forEach((id) => ids.push(Number(id)));
            if (id == ids.length)
                id = 0;
            return this.AllValues[id];
        }
    }
    exports.default = ParticleStatus;
    ParticleStatus.AllValues = {};
    ParticleStatus.ALL = new ParticleStatus(0, 'options.particles.all');
    ParticleStatus.DESCREASED = new ParticleStatus(1, 'options.particles.decreased');
    ParticleStatus.MINIMAL = new ParticleStatus(2, 'options.particles.minimal');
});
define("settings/PointOfView", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PointOfView {
        constructor(id, key) {
            this.id = id;
            this.key = key;
            PointOfView.AllValues[id] = this;
        }
        static byId(id) {
            let ids = [];
            Object.keys(this.AllValues).forEach((id) => ids.push(Number(id)));
            if (id == ids.length)
                id = 0;
            return this.AllValues[id];
        }
    }
    exports.default = PointOfView;
    PointOfView.AllValues = {};
    PointOfView.FIRST_PERSON = new PointOfView(0, 'FIRST_PERSON');
    PointOfView.THIRD_PERSON_BACK = new PointOfView(1, 'THIRD_PERSON_BACK');
    PointOfView.THIRD_PERSON_FRONT = new PointOfView(2, 'THIRD_PERSON_FRONT');
});
define("settings/SneakOption", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SneakOption {
        constructor(id, key) {
            this.id = id;
            this.key = key;
            SneakOption.AllValues[id] = this;
        }
        static byId(id) {
            let ids = [];
            Object.keys(this.AllValues).forEach((id) => ids.push(Number(id)));
            if (id == ids.length)
                id = 0;
            return this.AllValues[id];
        }
    }
    exports.default = SneakOption;
    SneakOption.AllValues = {};
    SneakOption.HOLD = new SneakOption(0, 'options.key.hold');
    SneakOption.TOGGLE = new SneakOption(1, 'options.key.toggle');
});
define("settings/SprintOption", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SprintOption {
        constructor(id, key) {
            this.id = id;
            this.key = key;
            SprintOption.AllValues[id] = this;
        }
        static byId(id) {
            let ids = [];
            Object.keys(this.AllValues).forEach((id) => ids.push(Number(id)));
            if (id == ids.length)
                id = 0;
            return this.AllValues[id];
        }
    }
    exports.default = SprintOption;
    SprintOption.AllValues = {};
    SprintOption.HOLD = new SprintOption(0, 'options.key.hold');
    SprintOption.TOGGLE = new SprintOption(1, 'options.key.toggle');
});
define("GameSettings", ["require", "exports", "settings/AmbientOcclusionStatus", "settings/AttackIndicatorStatus", "settings/ChatVisibility", "settings/CloudOption", "settings/GraphicsFanciness", "settings/HandSide", "settings/KeyBinding", "settings/NarratorStatus", "settings/ParticleStatus", "settings/PointOfView", "settings/SneakOption", "settings/SprintOption"], function (require, exports, AmbientOcclusionStatus_js_1, AttackIndicatorStatus_js_1, ChatVisibility_js_1, CloudOption_js_1, GraphicsFanciness_js_1, HandSide_js_1, KeyBinding_js_1, NarratorStatus_js_1, ParticleStatus_js_1, PointOfView_js_1, SneakOption_js_1, SprintOption_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    AmbientOcclusionStatus_js_1 = __importDefault(AmbientOcclusionStatus_js_1);
    AttackIndicatorStatus_js_1 = __importDefault(AttackIndicatorStatus_js_1);
    ChatVisibility_js_1 = __importDefault(ChatVisibility_js_1);
    CloudOption_js_1 = __importDefault(CloudOption_js_1);
    GraphicsFanciness_js_1 = __importDefault(GraphicsFanciness_js_1);
    HandSide_js_1 = __importDefault(HandSide_js_1);
    KeyBinding_js_1 = __importDefault(KeyBinding_js_1);
    NarratorStatus_js_1 = __importDefault(NarratorStatus_js_1);
    ParticleStatus_js_1 = __importDefault(ParticleStatus_js_1);
    PointOfView_js_1 = __importDefault(PointOfView_js_1);
    SneakOption_js_1 = __importDefault(SneakOption_js_1);
    SprintOption_js_1 = __importDefault(SprintOption_js_1);
    class GameSettings {
        constructor(mcIn) {
            this.optionsLS = 'GameSettings';
            this.graphicFanciness = GraphicsFanciness_js_1.default.FANCY;
            this.cloudsOption = CloudOption_js_1.default.FANCY;
            this.ambientOcclusion = AmbientOcclusionStatus_js_1.default.MAX;
            this.attackIndicator = AttackIndicatorStatus_js_1.default.CROSSHAIR;
            this.narratorStatus = NarratorStatus_js_1.default.OFF;
            this.chatVisibility = ChatVisibility_js_1.default.FULL;
            this.handSide = HandSide_js_1.default.LEFT;
            this.particleStatus = ParticleStatus_js_1.default.ALL;
            this.pointOfView = PointOfView_js_1.default.FIRST_PERSON;
            this.mouseSensitivity = 0.5;
            this.renderDistanceChunks = -1;
            this.chatOpacity = 1.0;
            this.chatLineSpacing = 0.0;
            this.chatScale = 0.7;
            this.chatWidth = 1.0;
            this.chatHeightUnfocused = 0.44366196;
            this.chatHeightFocused = 1.0;
            this.chatDelay = 0.0;
            this.accessibilityTextBackgroundOpacity = 0.5;
            this.advancedItemTooltips = false;
            this.heldItemTooltips = true;
            this.testthing = false;
            this.framerateLimit = 60;
            this.showFPS = true;
            this.skipMultiplayerWarning = false;
            this.biomeBlendRadius = 2;
            this.mouseWheelSensitivity = 1.0;
            this.rawMouseInput = true;
            this.autoJump = true;
            this.autoSuggestCommands = true;
            this.chatColor = true;
            this.chatLinks = true;
            this.chatLinksPrompt = true;
            this.vsync = true;
            this.entityShadows = true;
            this.forceUnicodeFont = false;
            this.invertMouse = false;
            this.discreteMouseScroll = false;
            this.realmsNotifications = true;
            this.reducedDebugInfo = false;
            this.snooper = true;
            this.showSubtitles = false;
            this.accessibilityTextBackground = true;
            this.touchscreen = false;
            this.fullscreen = false;
            this.viewBobbing = true;
            this.toggleCrouch = SneakOption_js_1.default.HOLD;
            this.toggleSprint = SprintOption_js_1.default.HOLD;
            this.language = 'en_us';
            this.hideGUI = false;
            this.showDebugInfo = false;
            this.fov = 70.0;
            this.screenEffectScale = 1.0;
            this.fovScaleEffect = 1.0;
            this.gamma = 1.0;
            this.guiScale = 3.0;
            this.keyBindForward = new KeyBinding_js_1.default("key.forward", 'w', "key.categories.movement");
            this.keyBindLeft = new KeyBinding_js_1.default("key.left", 'a', "key.categories.movement");
            this.keyBindBack = new KeyBinding_js_1.default("key.back", 's', "key.categories.movement");
            this.keyBindRight = new KeyBinding_js_1.default("key.right", 'd', "key.categories.movement");
            this.keyBindJump = new KeyBinding_js_1.default("key.jump", ' ', "key.categories.movement");
            this.keyBindInventory = new KeyBinding_js_1.default("key.inventory", 'e', "key.categories.inventory");
            this.keyBindSwapHands = new KeyBinding_js_1.default("key.swapOffhand", 'f', "key.categories.inventory");
            this.keyBindDrop = new KeyBinding_js_1.default("key.drop", 'q', "key.categories.inventory");
            this.keyBindUseItem = new KeyBinding_js_1.default("key.use", 'button1', "key.categories.gameplay");
            this.keyBindAttack = new KeyBinding_js_1.default("key.attack", 'button0', "key.categories.gameplay");
            this.keyBindPickBlock = new KeyBinding_js_1.default("key.pickItem", 'button2', "key.categories.gameplay");
            this.keyBindChat = new KeyBinding_js_1.default("key.chat", 't', "key.categories.multiplayer");
            this.keyBindPlayerList = new KeyBinding_js_1.default("key.playerlist", 'tab', "key.categories.multiplayer");
            this.keyBindCommand = new KeyBinding_js_1.default("key.command", ' ', "key.categories.multiplayer");
            this.field_244602_au = new KeyBinding_js_1.default("key.socialInteractions", 'p', "key.categories.multiplayer");
            this.keyBindScreenshot = new KeyBinding_js_1.default("key.screenshot", 'F2', "key.categories.misc");
            this.keyBindTogglePerspective = new KeyBinding_js_1.default("key.togglePerspective", 'F5', "key.categories.misc");
            this.keyBindSmoothCamera = new KeyBinding_js_1.default("key.smoothCamera", '', "key.categories.misc");
            this.keyBindFullscreen = new KeyBinding_js_1.default("key.fullscreen", 'F11', "key.categories.misc");
            this.keyBindSpectatorOutlines = new KeyBinding_js_1.default("key.spectatorOutlines", '', "key.categories.misc");
            this.keyBindAdvancements = new KeyBinding_js_1.default("key.advancements", 'l', "key.categories.misc");
            this.keyBindSaveToolbar = new KeyBinding_js_1.default("key.saveToolbarActivator", 'x', "key.categories.creative");
            this.keyBindLoadToolbar = new KeyBinding_js_1.default("key.loadToolbarActivator", 'c', "key.categories.creative");
            this.mc = mcIn;
            this.loadOptions();
        }
        loadOptions() {
            if (localStorage.getItem('GameSettings')) {
                const Options = JSON.parse(localStorage.getItem('GameSettings'));
                this.testthing = Options.testthing ? Options.testthing : this.testthing;
                this.framerateLimit = Options.framerateLimit ? Options.framerateLimit : this.framerateLimit;
                this.showFPS = Options.showFPS ? Options.showFPS : this.showFPS;
                this.language = Options.language ? Options.language : this.language;
                this.advancedItemTooltips = Options.advancedItemTooltips ? Options.advancedItemTooltips : this.advancedItemTooltips;
                this.heldItemTooltips = Options.heldItemTooltips ? Options.heldItemTooltips : this.heldItemTooltips;
                this.rawMouseInput = Options.rawMouseInput ? Options.rawMouseInput : this.rawMouseInput;
                this.skipMultiplayerWarning = Options.skipMultiplayerWarning ? Options.skipMultiplayerWarning : this.skipMultiplayerWarning;
                this.autoJump = Options.autoJump ? Options.autoJump : this.autoJump;
                this.vsync = Options.vsync ? Options.vsync : this.vsync;
                this.forceUnicodeFont = Options.forceUnicodeFont ? Options.forceUnicodeFont : this.forceUnicodeFont;
                this.showSubtitles = Options.showSubtitles ? Options.showSubtitles : this.showSubtitles;
                this.hideGUI = Options.hideGUI ? Options.hideGUI : this.hideGUI;
                this.graphicFanciness = Options.graphicFanciness ? Options.graphicFanciness : this.graphicFanciness;
                this.cloudsOption = Options.cloudsOption ? Options.cloudsOption : this.cloudsOption;
                this.ambientOcclusion = Options.ambientOcclusion ? Options.ambientOcclusion : this.ambientOcclusion;
                this.attackIndicator = Options.attackIndicator ? Options.attackIndicator : this.attackIndicator;
                this.chatVisibility = Options.chatVisibility ? Options.chatVisibility : this.chatVisibility;
                this.handSide = Options.handSide ? Options.handSide : this.handSide;
                this.particleStatus = Options.particleStatus ? Options.particleStatus : this.particleStatus;
                this.pointOfView = Options.pointOfView ? Options.pointOfView : this.pointOfView;
                this.narratorStatus = Options.narratorStatus ? Options.narratorStatus : this.narratorStatus;
                this.toggleCrouch = Options.toggleCrouch ? Options.toggleCrouch : this.toggleCrouch;
                this.toggleSprint = Options.toggleSprint ? Options.toggleSprint : this.toggleSprint;
                this.chatScale = Options.chatScale ? Options.chatScale : this.chatScale;
            }
        }
        saveOptions() {
            localStorage.setItem('GameSettings', JSON.stringify({
                testthing: this.testthing,
                framerateLimit: this.framerateLimit,
                showFPS: this.showFPS,
                skipMultiplayerWarning: this.skipMultiplayerWarning,
                language: this.language,
                advancedItemTooltips: this.advancedItemTooltips,
                heldItemTooltips: this.heldItemTooltips,
                rawMouseInput: this.rawMouseInput,
                autoJump: this.autoJump,
                vsync: this.vsync,
                forceUnicodeFont: this.forceUnicodeFont,
                showSubtitles: this.showSubtitles,
                hideGUI: this.hideGUI,
                graphicFanciness: this.graphicFanciness,
                cloudsOption: this.cloudsOption,
                ambientOcclusion: this.ambientOcclusion,
                attackIndicator: this.attackIndicator,
                chatVisibility: this.chatVisibility,
                handSide: this.handSide,
                particleStatus: this.particleStatus,
                pointOfView: this.pointOfView,
                narratorStatus: this.narratorStatus,
                toggleCrouch: this.toggleCrouch,
                toggleSprint: this.toggleSprint,
                chatScale: this.chatScale
            }));
        }
        test(i) {
            if (Object.prototype.hasOwnProperty.call(this, i)) {
                return this[i];
            }
            return false;
        }
        accept(i, value) {
            if (Object.prototype.hasOwnProperty.call(this, i)) {
                return this[i] = value;
            }
            return false;
        }
    }
    exports.default = GameSettings;
});
define("settings/BooleanOption", ["require", "exports", "AbstractOption", "gui/widgets/button/OptionButton", "utils/TranslationText"], function (require, exports, AbstractOption_js_1, OptionButton_js_3, TranslationText_js_14) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    AbstractOption_js_1 = __importDefault(AbstractOption_js_1);
    OptionButton_js_3 = __importDefault(OptionButton_js_3);
    class BooleanOption extends AbstractOption_js_1.default {
        constructor(translationKeyIn, getter, setter) {
            super();
            this.text = translationKeyIn;
            this.getter = getter;
            this.setter = setter;
        }
        set(options, valueIn) {
            this.setPriv(options, valueIn);
        }
        setPriv(options, valueIn) {
            this.setter(options, valueIn);
        }
        get(options) {
            return (this.getter(options));
        }
        nextValue(options) {
            this.set(options, !this.get(options));
        }
        createWidget(options, xIn, yIn, widthIn) {
            return new OptionButton_js_3.default(xIn, yIn, widthIn, 20, 0, this.func_238152_c_(options), () => {
                this.nextValue(options);
                options.saveOptions();
            });
        }
        func_238152_c_(p_238152_1_) {
            return `${TranslationText_js_14.getKeyTranslation(this.text)}: ${this.get(p_238152_1_) == false ? TranslationText_js_14.getKeyTranslation('options.off') : TranslationText_js_14.getKeyTranslation('options.on')}`;
        }
    }
    exports.default = BooleanOption;
});
define("settings/IteratableOption", ["require", "exports", "AbstractOption", "gui/widgets/button/OptionButton", "utils/TranslationText"], function (require, exports, AbstractOption_js_2, OptionButton_js_4, TranslationText_js_15) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    AbstractOption_js_2 = __importDefault(AbstractOption_js_2);
    OptionButton_js_4 = __importDefault(OptionButton_js_4);
    class IteratableOption extends AbstractOption_js_2.default {
        constructor(translationKeyIn, getterIn, setterIn) {
            super();
            this.text = translationKeyIn;
            this.setter = setterIn;
            this.getter = getterIn;
        }
        setValueIndex(options, valueIn) {
            this.setter(options, valueIn);
            options.saveOptions();
        }
        createWidget(options, xIn, yIn, widthIn) {
            return new OptionButton_js_4.default(xIn, yIn, widthIn, 20, this, this.getName(options), () => {
                this.setValueIndex(options, 1);
            });
        }
        get(options) {
            return (this.getter(options));
        }
        getName(settings) {
            return TranslationText_js_15.getKeyTranslation(this.text) + ': ' + TranslationText_js_15.getKeyTranslation(this.getter(settings).key);
        }
    }
    exports.default = IteratableOption;
});
define("GameOption", ["require", "exports", "settings/AmbientOcclusionStatus", "settings/AttackIndicatorStatus", "settings/BooleanOption", "settings/ChatVisibility", "settings/CloudOption", "settings/GraphicsFanciness", "settings/HandSide", "settings/IteratableOption", "settings/NarratorStatus", "settings/ParticleStatus", "settings/PointOfView", "settings/SneakOption", "settings/SprintOption"], function (require, exports, AmbientOcclusionStatus_js_2, AttackIndicatorStatus_js_2, BooleanOption_js_1, ChatVisibility_js_2, CloudOption_js_2, GraphicsFanciness_js_2, HandSide_js_2, IteratableOption_js_1, NarratorStatus_js_2, ParticleStatus_js_2, PointOfView_js_2, SneakOption_js_2, SprintOption_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    AmbientOcclusionStatus_js_2 = __importDefault(AmbientOcclusionStatus_js_2);
    AttackIndicatorStatus_js_2 = __importDefault(AttackIndicatorStatus_js_2);
    BooleanOption_js_1 = __importDefault(BooleanOption_js_1);
    ChatVisibility_js_2 = __importDefault(ChatVisibility_js_2);
    CloudOption_js_2 = __importDefault(CloudOption_js_2);
    GraphicsFanciness_js_2 = __importDefault(GraphicsFanciness_js_2);
    HandSide_js_2 = __importDefault(HandSide_js_2);
    IteratableOption_js_1 = __importDefault(IteratableOption_js_1);
    NarratorStatus_js_2 = __importDefault(NarratorStatus_js_2);
    ParticleStatus_js_2 = __importDefault(ParticleStatus_js_2);
    PointOfView_js_2 = __importDefault(PointOfView_js_2);
    SneakOption_js_2 = __importDefault(SneakOption_js_2);
    SprintOption_js_2 = __importDefault(SprintOption_js_2);
    class GameOption {
    }
    exports.default = GameOption;
    GameOption.ShowFPSOption = new BooleanOption_js_1.default('Show FPS', (settings) => {
        return settings.showFPS;
    }, (settings, optionValues) => {
        settings.showFPS = optionValues;
    });
    GameOption.AdvancedItemTooltipsOption = new BooleanOption_js_1.default('Advanced tooltips', (settings) => {
        return settings.advancedItemTooltips;
    }, (settings, optionValues) => {
        settings.advancedItemTooltips = optionValues;
    });
    GameOption.HeldItemTooltipsOption = new BooleanOption_js_1.default('Held tooltips', (settings) => {
        return settings.heldItemTooltips;
    }, (settings, optionValues) => {
        settings.heldItemTooltips = optionValues;
    });
    GameOption.RawMouseInputOption = new BooleanOption_js_1.default('options.rawMouseInput', (settings) => {
        return settings.rawMouseInput;
    }, (settings, optionValues) => {
        settings.rawMouseInput = optionValues;
    });
    GameOption.SkipMultiplayerWarningOption = new BooleanOption_js_1.default('Skip Multiplayer Warning', (settings) => {
        return settings.skipMultiplayerWarning;
    }, (settings, optionValues) => {
        settings.skipMultiplayerWarning = optionValues;
    });
    GameOption.AutoJumpOption = new BooleanOption_js_1.default('options.autoJump', (settings) => {
        return settings.autoJump;
    }, (settings, optionValues) => {
        settings.autoJump = optionValues;
    });
    GameOption.VsyncOption = new BooleanOption_js_1.default('options.vsync', (settings) => {
        return settings.vsync;
    }, (settings, optionValues) => {
        settings.vsync = optionValues;
    });
    GameOption.ForceUnicodeFont = new BooleanOption_js_1.default('options.forceUnicodeFont', (settings) => {
        return settings.forceUnicodeFont;
    }, (settings, optionValues) => {
        settings.forceUnicodeFont = optionValues;
    });
    GameOption.ShowSubtitlesOption = new BooleanOption_js_1.default('options.showSubtitles', (settings) => {
        return settings.showSubtitles;
    }, (settings, optionValues) => {
        settings.showSubtitles = optionValues;
    });
    GameOption.HideGUIOption = new BooleanOption_js_1.default('Hide GUI', (settings) => {
        return settings.hideGUI;
    }, (settings, optionValues) => {
        settings.hideGUI = optionValues;
    });
    GameOption.TestOption = new BooleanOption_js_1.default('Test', (settings) => {
        return settings.testthing;
    }, (settings, optionValues) => {
        settings.testthing = optionValues;
    });
    GameOption.CHAT_COLOR = new BooleanOption_js_1.default("options.chat.color", (settings) => {
        return settings.chatColor;
    }, (settings, optionValues) => {
        settings.chatColor = optionValues;
    });
    GameOption.CHAT_LINKS = new BooleanOption_js_1.default("options.chat.links", (settings) => {
        return settings.chatLinks;
    }, (settings, optionValues) => {
        settings.chatLinks = optionValues;
    });
    GameOption.CHAT_LINKS_PROMPT = new BooleanOption_js_1.default("options.chat.links.prompt", (settings) => {
        return settings.chatLinksPrompt;
    }, (settings, optionValues) => {
        settings.chatLinksPrompt = optionValues;
    });
    GameOption.SPRINT = new IteratableOption_js_1.default('key.sprint', (settings) => {
        return settings.toggleSprint;
    }, (settings) => {
        settings.toggleSprint = SprintOption_js_2.default.byId(settings.toggleSprint.id + 1);
    });
    GameOption.SNEAK = new IteratableOption_js_1.default('key.sneak', (settings) => {
        return settings.toggleCrouch;
    }, (settings) => {
        settings.toggleCrouch = SneakOption_js_2.default.byId(settings.toggleCrouch.id + 1);
    });
    GameOption.GRAPHICS_FANCINESS = new IteratableOption_js_1.default('options.graphics', (settings) => {
        return settings.graphicFanciness;
    }, (settings) => {
        settings.graphicFanciness = GraphicsFanciness_js_2.default.byId(settings.graphicFanciness.id + 1);
    });
    GameOption.CLOUDS_OPTION = new IteratableOption_js_1.default('options.renderClouds', (settings) => {
        return settings.cloudsOption;
    }, (settings) => {
        settings.cloudsOption = CloudOption_js_2.default.byId(settings.cloudsOption.id + 1);
    });
    GameOption.AMBIENT_OCCLUSION_STATUS = new IteratableOption_js_1.default('options.ao', (settings) => {
        return settings.ambientOcclusion;
    }, (settings) => {
        settings.ambientOcclusion = AmbientOcclusionStatus_js_2.default.byId(settings.ambientOcclusion.id + 1);
    });
    GameOption.ATTACK_INDICATOR_STATUS = new IteratableOption_js_1.default('options.attackIndicator', (settings) => {
        return settings.attackIndicator;
    }, (settings) => {
        settings.attackIndicator = AttackIndicatorStatus_js_2.default.byId(settings.attackIndicator.id + 1);
    });
    GameOption.CHAT_VISIBILITY = new IteratableOption_js_1.default('options.attackIndicator', (settings) => {
        return settings.chatVisibility;
    }, (settings) => {
        settings.chatVisibility = ChatVisibility_js_2.default.byId(settings.chatVisibility.id + 1);
    });
    GameOption.HAND_SIDE = new IteratableOption_js_1.default('options.mainHand', (settings) => {
        return settings.handSide;
    }, (settings) => {
        settings.handSide = HandSide_js_2.default.byId(settings.handSide.id + 1);
    });
    GameOption.PARTICLE_STATUS = new IteratableOption_js_1.default('options.particles', (settings) => {
        return settings.particleStatus;
    }, (settings) => {
        settings.particleStatus = ParticleStatus_js_2.default.byId(settings.particleStatus.id + 1);
    });
    GameOption.NARRATOR_STATUS = new IteratableOption_js_1.default('options.particles', (settings) => {
        return settings.narratorStatus;
    }, (settings) => {
        settings.narratorStatus = NarratorStatus_js_2.default.byId(settings.narratorStatus.id + 1);
    });
    GameOption.POINT_OF_VIEW = new IteratableOption_js_1.default('POINT_OF_VIEW', (settings) => {
        return settings.pointOfView;
    }, (settings) => {
        settings.pointOfView = PointOfView_js_2.default.byId(settings.pointOfView.id + 1);
    });
});
define("gui/FocusableGui", ["require", "exports", "gui/AbstractGui"], function (require, exports, AbstractGui_js_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    AbstractGui_js_4 = __importDefault(AbstractGui_js_4);
    class FocusableGui extends AbstractGui_js_4.default {
        constructor() {
            super(...arguments);
            this.listener = null;
        }
        getListener() {
            return this.listener;
        }
        setListener(listener) {
            this.listener = listener;
        }
    }
    exports.default = FocusableGui;
});
define("settings/EnumOption", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EnumOption {
        constructor(id, key) {
            this.id = id;
            this.key = key;
            EnumOption.AllValues[id] = this;
        }
        static byId(id) {
            let ids = [];
            Object.keys(this.AllValues).forEach((id) => ids.push(Number(id)));
            if (id == ids.length)
                id = 0;
            return this.AllValues[id];
        }
    }
    exports.default = EnumOption;
    EnumOption.AllValues = {};
});
