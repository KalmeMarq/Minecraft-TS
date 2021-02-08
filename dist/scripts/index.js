"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
                await JSONUtils_js_2.default.getJSONFile('./src/' + file, ((dataa) => {
                    if (!exports.MCUI[dataa.namespace]) {
                        exports.MCUI[dataa.namespace] = dataa;
                    }
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
                myImg.data[p] = this.r * 0.13, myImg.data[p + 1] = this.g * 0.13, myImg.data[p + 2] = this.b * 0.13;
            ctxfont.restore();
            ctxfont.putImageData(myImg, 0, 0);
            return ctxfont.canvas;
        }
    }
    exports.CharacterRenderer = CharacterRenderer;
    class FontRenderer {
        static getTextWidth(text) {
            const flag = localStorage.getItem('Options') ? 'true'.equals(localStorage.getItem('Options').split('\n').filter(x => x.includes('forceUnicodeFont:'))[0].split(':')[1]) : false;
            if (flag) {
                return document.getElementById('root').getContext('2d').measureText(text).width;
            }
            else {
                let width = 0;
                text.split('').forEach((char, idx) => width += Resources_js_1.getResourceLocation('fonts', 'font')[text[idx]].w - 1);
                return width;
            }
        }
        static drawStringWithShadow(context, text, posX, posY, color, _formatting) {
            const flag = localStorage.getItem('Options') ? 'true'.equals(localStorage.getItem('Options').split('\n').filter(x => x.includes('forceUnicodeFont:'))[0].split(':')[1]) : false;
            if (flag) {
                context.save();
                context.font = 'lighter 10px Arial';
                context.fillStyle = ColorHelper_js_1.default.getDarkerColor(color);
                context.fillText(text, posX + 1, posY + 14 / 2 + 1);
                context.fillStyle = ColorHelper_js_1.default.getColor(color);
                context.fillText(text, posX, posY + 14 / 2);
                context.restore();
            }
            else {
                for (var j = 0, k = posX; j < text.length; j++) {
                    const char = text[j];
                    if (!(exports.characterRenderers[color] && exports.characterRenderers[color][char]))
                        exports.addCharacterRenderer(color, char);
                    context.drawImage(exports.characterRenderers[color][char]['textShadow'], k - 1 + 1, posY + 1);
                    context.drawImage(exports.characterRenderers[color][char]['text'], k - 1, posY);
                    k += Resources_js_1.getResourceLocation('fonts', 'font')[char].w - 1;
                }
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
define("utils/JSONUI", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Type = void 0;
    class JSONUI {
        static getObject(superObj, obj, fullWidth, fullHeight, hardcoded) {
            let newObj = {
                type: 'panel',
                size: { w: 0, h: 0 },
                offset: { x: 0, y: 0 },
                text: '',
                active: true,
                ignored: false,
                texture: {}
            };
            if (superObj === null) {
                Object.entries(obj).forEach(([key, value]) => {
                    switch (key) {
                        case 'size':
                            newObj[key] = JSONUI.sizeConversion(value, fullWidth, fullHeight);
                            break;
                        case 'offset':
                            newObj[key] = JSONUI.offsetConversion(value, fullWidth, fullHeight);
                            break;
                        case 'texture': JSONUI.getTexture(null, obj);
                        default:
                            newObj[key] = value;
                            break;
                    }
                });
            }
            else if (superObj !== null) {
                let props = new Map();
                Object.entries(superObj).forEach(([key, value]) => {
                    switch (key) {
                        case 'size':
                            newObj[key] = JSONUI.sizeConversion(value, fullWidth, fullHeight);
                            break;
                        case 'offset':
                            newObj[key] = JSONUI.offsetConversion(value, fullWidth, fullHeight);
                            break;
                        case 'texture':
                            newObj[key] = JSONUI.getTexture(null, obj);
                        case 'ignored':
                            newObj[key] = false;
                            break;
                        default:
                            newObj[key] = value;
                            break;
                    }
                });
                Object.entries(obj).forEach(([key, value]) => {
                    switch (key) {
                        case 'size':
                            newObj[key] = JSONUI.sizeConversion(value, fullWidth, fullHeight);
                            break;
                        case 'offset':
                            newObj[key] = JSONUI.offsetConversion(value, fullWidth, fullHeight);
                            break;
                        case 'texture':
                            newObj[key] = JSONUI.getTexture(null, obj);
                        case 'ignored':
                            newObj[key] = false;
                            break;
                        default:
                            newObj[key] = value;
                            break;
                    }
                });
            }
            return newObj;
        }
        static offsetConversion(offset, fullWidth, fullHeight) {
            if (offset.length > 2)
                throw new Error('Offset is invalid');
            let x = offset[0];
            let y = offset[1];
            let newX = '';
            let newY = '';
            if (typeof x === 'string') {
                x.split(' ').map((value) => {
                    const isPx = value.slice(-2) === 'px';
                    const isPer = value.slice(-1) === '%';
                    if (isPx)
                        newX += value.slice(0, -2);
                    else if (isPer)
                        newX += ~~(fullWidth / (100 / Number(value.slice(0, -1))));
                    else
                        newX += value;
                });
            }
            else {
                newX += x;
            }
            if (typeof y === 'string') {
                y.split(' ').map((value) => {
                    const isPx = value.slice(-2) === 'px';
                    const isPer = value.slice(-1) === '%';
                    if (isPx)
                        newY += value.slice(0, -2);
                    else if (isPer)
                        newY += ~~(fullHeight / (100 / Number(value.slice(0, -1))));
                    else
                        newY += value;
                });
            }
            else {
                newY += y;
            }
            return { x: eval(newX), y: eval(newY) };
        }
        static sizeConversion(size, fullWidth, fullHeight) {
            if (size.length > 2)
                throw new Error('Size is invalid');
            let w = size[0];
            let h = size[1];
            let newW = '';
            let newH = '';
            if (typeof w === 'string') {
                w.split(' ').map((value) => {
                    const isPx = value.slice(-2) === 'px';
                    const isPer = value.slice(-1) === '%';
                    if (isPx)
                        newW += value.slice(0, -2);
                    else if (isPer)
                        newW += ~~(fullHeight / (100 / Number(value.slice(0, -1))));
                    else
                        newW += value;
                });
            }
            else {
                newW += w;
            }
            if (typeof h === 'string') {
                h.split(' ').map((value) => {
                    const isPx = value.slice(-2) === 'px';
                    const isPer = value.slice(-1) === '%';
                    if (isPx)
                        newH += value.slice(0, -2);
                    else if (isPer)
                        newH += ~~(fullHeight / (100 / Number(value.slice(0, -1))));
                    else
                        newH += value;
                });
            }
            else {
                newH += h;
            }
            return { w: eval(newW), h: eval(newH) };
        }
    }
    exports.default = JSONUI;
    JSONUI.getType = (superObj, obj) => {
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
    JSONUI.convertOffset = (obj, arr) => {
        let y = arr.map((o) => {
            if (typeof o !== "number") {
                if (o.includes('px')) {
                    return o.replace('px', '');
                }
                else if (o.slice(-1) === '%') {
                    let u = o.replace('%', '');
                    let p = 'this.width / ' + (100 / Number(u)).toString();
                    return p;
                }
            }
            return o;
        });
        return y.join('');
    };
    JSONUI.getOffsetX = (superObj, obj) => {
        if (superObj === null) {
            if (obj.offset) {
                return JSONUI.convertOffset(obj, obj.offset[0].split(' '));
            }
            else {
                return new Error('Offset not specified');
            }
        }
        else {
            if ((obj.offset && superObj.offset) || (obj.offset && !superObj.offset)) {
                return obj.offset[0].replace(/px/g, '').replace(/100%/g, 'this.width').replace(/50%/g, 'this.width / 2');
            }
            else if (!obj.offset && superObj.offset) {
                return superObj.offset[0].replace(/px/g, '').replace(/100%/g, 'this.width').replace(/50%/g, 'this.width / 2');
            }
            else {
                throw new Error('Offset not specified');
            }
        }
    };
    JSONUI.getOffsetY = (superObj, obj) => {
        if (superObj === null) {
            if (obj.offset) {
                return obj.offset[1].replace(/px/g, '').replace(/100%/g, 'this.height');
            }
            else {
                return new Error('Offset not specified');
            }
        }
        else {
            if ((obj.offset && superObj.offset) || (obj.offset && !superObj.offset)) {
                return obj.offset[1].replace(/px/g, '').replace(/100%/g, 'this.height');
            }
            else if (!obj.offset && superObj.offset) {
                return superObj.offset[1].replace(/px/g, '').replace(/100%/g, 'this.height');
            }
            else {
                throw new Error('Offset not specified');
            }
        }
    };
    JSONUI.getWidth = (superObj, obj) => {
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
    JSONUI.getHeight = (superObj, obj) => {
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
    JSONUI.getText = (superObj, obj) => {
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
    JSONUI.getTexture = (superObj, obj) => {
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
    var Type;
    (function (Type) {
        Type["PANEL"] = "panel";
        Type["STACK_PANEL"] = "stack_panel";
        Type["LABEL"] = "label";
        Type["IMAGE"] = "image";
        Type["BUTTON"] = "button";
        Type["BUTTON_IMAGE"] = "button_image";
    })(Type = exports.Type || (exports.Type = {}));
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
define("utils/Utils", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Utils {
        static isInside(a, b, c, d, e, f, callback) {
            a > c && a < c + d && b > e && b < e + f ? callback() : false;
        }
        static sortIteratable(id, nextId) {
            return id.getId() - nextId.getId();
        }
    }
    exports.default = Utils;
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
            this.renderBg(context, minecraft, mouseX, mouseY);
            let color = this.active ? 16777215 : 10526880;
            this.drawCenteredString(context, this.message, this.x + this.width / 2, this.y + (this.height - 8) / 2, color);
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
                        this.playClickSound();
                        this.onClick(mouseX, mouseY);
                    }
                }
            }
        }
        playClickSound() {
            PlaySound_js_1.playSound('click_stereo', 0.2);
        }
        mouseReleased(mouseX, mouseY, button) {
            if (this.clicked(mouseX, mouseY) && this.isValidClickButton(button)) {
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
        static normalizeAngle(x, y) {
            return x - (y * Math.floor(x / y));
        }
        static sqrt(value) {
            return Math.sqrt(value);
        }
    }
    exports.default = MathHelper;
});
define("gui/widgets/AbstractSlider", ["require", "exports", "utils/MathHelper", "utils/PlaySound", "gui/widgets/Widget"], function (require, exports, MathHelper_js_1, PlaySound_js_3, Widget_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    MathHelper_js_1 = __importDefault(MathHelper_js_1);
    Widget_js_2 = __importDefault(Widget_js_2);
    class AbstractSlider extends Widget_js_2.default {
        constructor(x, y, width, height, message, defaultValue) {
            super(x, y, width, height, message);
            this.sliderValue = defaultValue;
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
            if (this.focused) {
                let flag = keyName == 'ArrowLeft';
                if (flag || keyName == 'ArrowRight') {
                    let f = flag ? -1.0 : 1.0;
                    this.setSliderValue(this.sliderValue + (f / (this.width - 8)));
                }
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
                this.setSaveOptionValue();
            }
        }
        mouseDragged(mouseX, mouseY, dragX, dragY) {
            if (this.focused || this.clicked(mouseX, mouseY)) {
                this.changeSliderValue(mouseX);
            }
            return true;
        }
        playClickSound() {
            return false;
        }
        onRelease(mouseX, mouseY) {
            if (this.clicked(mouseX, mouseY)) {
                PlaySound_js_3.playSound('click_stereo', 0.2);
            }
        }
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
define("settings/AbstractOption", ["require", "exports", "utils/MouseHelper", "utils/TranslationText"], function (require, exports, MouseHelper_1, TranslationText_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class NewAbstractOption {
        constructor(translationKeyIn) {
            this.translatedBaseMessage = translationKeyIn;
        }
        getBaseMessageTranslation() {
            return this.translatedBaseMessage;
        }
        getGenericValueComponent(valueMessage) {
            return TranslationText_1.getKeyTranslation(this.getBaseMessageTranslation()) + ': ' + TranslationText_1.getKeyTranslation(valueMessage);
        }
        getPercentValueComponent(percentage) {
            return TranslationText_1.getKeyTranslation(this.getBaseMessageTranslation()) + `: ${MouseHelper_1.int(percentage * 100)}%`;
        }
        getPixelValueComponent(value) {
            return `${TranslationText_1.getKeyTranslation(this.getBaseMessageTranslation())}: ${value}px`;
        }
        getPercentageAddMessage(doubleIn) {
            return `${TranslationText_1.getKeyTranslation(this.getBaseMessageTranslation())}: ${MouseHelper_1.int(doubleIn)}`;
        }
        getMessageWithValue(value) {
            return this.getGenericValueComponent(value.toString());
        }
    }
    exports.default = NewAbstractOption;
});
define("settings/SliderPercentageOption", ["require", "exports", "gui/widgets/OptionSlider", "utils/MathHelper", "settings/AbstractOption"], function (require, exports, OptionSlider_1, MathHelper_1, AbstractOption_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    OptionSlider_1 = __importDefault(OptionSlider_1);
    MathHelper_1 = __importDefault(MathHelper_1);
    AbstractOption_1 = __importDefault(AbstractOption_1);
    class SliderPercentageOption extends AbstractOption_1.default {
        constructor(translationKey, minValueIn, maxValueIn, stepSizeIn, getter, setter, getDisplayString) {
            super(translationKey);
            this.minValue = minValueIn;
            this.maxValue = maxValueIn;
            this.stepSize = stepSizeIn;
            this.getter = getter;
            this.setter = setter;
            this.getDisplayStringFunc = getDisplayString;
        }
        createWidget(options, xIn, yIn, widthIn) {
            return new OptionSlider_1.default(options, xIn, yIn, widthIn, 20, this);
        }
        normalizeValue(value) {
            return MathHelper_1.default.clamp((this.snapToStepClamp(value) - this.minValue) / (this.maxValue - this.minValue), 0, 1);
        }
        denormalizeValue(value) {
            return this.snapToStepClamp(MathHelper_1.default.lerp(MathHelper_1.default.clamp(value, 0, 1), this.minValue, this.maxValue));
        }
        snapToStepClamp(valueIn) {
            if (this.stepSize > 0) {
                valueIn = (this.stepSize * (Math.round(valueIn / this.stepSize)));
            }
            return MathHelper_1.default.clamp(valueIn, this.minValue, this.maxValue);
        }
        getMinValue() {
            return this.minValue;
        }
        getMaxValue() {
            return this.maxValue;
        }
        setMaxValue(valueIn) {
            this.maxValue = valueIn;
        }
        set(options, valueIn) {
            this.setter(options, valueIn);
        }
        get(options) {
            return this.getter(options);
        }
        getName(options) {
            return this.getDisplayStringFunc(options, this);
        }
    }
    exports.default = SliderPercentageOption;
});
define("gui/widgets/OptionSlider", ["require", "exports", "gui/widgets/GameSettingsSlider"], function (require, exports, GameSettingsSlider_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class OptionSlider extends GameSettingsSlider_js_1.GameSettingsSlider {
        constructor(settings, xIn, yIn, widthIn, heightIn, optionIn) {
            super(settings, xIn, yIn, widthIn, heightIn, (optionIn.normalizeValue(optionIn.get(settings))));
            this.option = optionIn;
            this.func_230979_b_();
        }
        setSaveOptionValue() {
            this.option.set(this.settings, this.option.denormalizeValue(this.sliderValue));
            this.settings.saveOptions();
        }
        func_230979_b_() {
            this.setMessage(this.option.getName(this.settings));
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
            for (const iguieventlistener of this.getEventListeners()) {
                iguieventlistener.mouseDragged(mouseX, mouseY, button, dragX, dragY);
            }
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
            else if (key == 'Escape' && this.shouldCloseOnEsc()) {
                this.closeScreen();
                this.onClose();
            }
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
            this.SCREEN_OPTIONS = [
                GameOption_js_1.default.NARRATOR,
                GameOption_js_1.default.SHOW_SUBTITLES,
                GameOption_js_1.default.ACCESSIBILITY_TEXT_BACKGROUND_OPACITY,
                GameOption_js_1.default.ACCESSIBILITY_TEXT_BACKGROUND,
                GameOption_js_1.default.CHAT_OPACITY,
                GameOption_js_1.default.LINE_SPACING,
                GameOption_js_1.default.DELAY_INSTANT,
                GameOption_js_1.default.AUTO_JUMP,
                GameOption_js_1.default.SNEAK,
                GameOption_js_1.default.SPRINT,
                GameOption_js_1.default.FOV_EFFECT_SCALE_SLIDER,
                GameOption_js_1.default.SCREEN_EFFECT_SCALE_SLIDER
            ];
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
define("gui/screens/LanguageScreen", ["require", "exports", "GameOption", "utils/TranslationText", "gui/widgets/button/Button", "gui/widgets/button/OptionButton", "gui/screens/SettingsScreen"], function (require, exports, GameOption_js_2, TranslationText_js_2, Button_js_4, OptionButton_js_2, SettingsScreen_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    GameOption_js_2 = __importDefault(GameOption_js_2);
    Button_js_4 = __importDefault(Button_js_4);
    OptionButton_js_2 = __importDefault(OptionButton_js_2);
    SettingsScreen_js_2 = __importDefault(SettingsScreen_js_2);
    class LanguageScreen extends SettingsScreen_js_2.default {
        constructor(parentScreen, gameSettingsObj) {
            super(parentScreen, gameSettingsObj, TranslationText_js_2.getKeyTranslation("options.language"));
            this.warningInfo = `(${TranslationText_js_2.getKeyTranslation("options.languageWarning")})`;
        }
        init() {
            this.forceUnicodeFontBtn = this.addButton(new OptionButton_js_2.default(this.width / 2 - 155, this.height - 38, 150, 20, GameOption_js_2.default.FORCE_UNICODE_FONT, GameOption_js_2.default.FORCE_UNICODE_FONT.getName(this.gameSettings), () => {
                GameOption_js_2.default.FORCE_UNICODE_FONT.nextValue(this.gameSettings);
                this.gameSettings.saveOptions();
            }));
            this.confirmSettingsBtn = this.addButton(new Button_js_4.default(this.width / 2 - 155 + 160, this.height - 38, 150, 20, TranslationText_js_2.getKeyTranslation('gui.done'), () => {
                this.minecraft.displayGuiScreen(this.parentScreen);
            }));
            super.init();
        }
        render(context, mouseX, mouseY) {
            super.render(context, mouseX, mouseY);
            this.drawCenteredString(context, this.title, this.width / 2, 20, 16777215);
            this.drawCenteredString(context, this.warningInfo, this.width / 2, this.height - 56, 8421504);
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
define("gui/screens/ChatOptionsScreen", ["require", "exports", "GameOption", "utils/TranslationText", "gui/widgets/button/Button", "gui/screens/SettingsScreen"], function (require, exports, GameOption_js_3, TranslationText_js_5, Button_js_7, SettingsScreen_js_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    GameOption_js_3 = __importDefault(GameOption_js_3);
    Button_js_7 = __importDefault(Button_js_7);
    SettingsScreen_js_3 = __importDefault(SettingsScreen_js_3);
    class ChatOptionsScreen extends SettingsScreen_js_3.default {
        constructor(parentScreen, gameSettingsObj) {
            super(parentScreen, gameSettingsObj, TranslationText_js_5.getKeyTranslation("options.chat.title"));
            this.SCREEN_OPTIONS = [
                GameOption_js_3.default.CHAT_VISIBILITY,
                GameOption_js_3.default.CHAT_COLOR,
                GameOption_js_3.default.CHAT_LINKS,
                GameOption_js_3.default.CHAT_LINKS_PROMPT,
                GameOption_js_3.default.CHAT_OPACITY,
                GameOption_js_3.default.ACCESSIBILITY_TEXT_BACKGROUND_OPACITY,
                GameOption_js_3.default.CHAT_SCALE,
                GameOption_js_3.default.LINE_SPACING,
                GameOption_js_3.default.DELAY_INSTANT,
                GameOption_js_3.default.CHAT_WIDTH,
                GameOption_js_3.default.CHAT_HEIGHT_FOCUSED,
                GameOption_js_3.default.CHAT_HEIGHT_UNFOCUSED,
                GameOption_js_3.default.NARRATOR,
                GameOption_js_3.default.AUTO_SUGGEST_COMMANDS,
                GameOption_js_3.default.HIDE_MATCHED_NAMES,
                GameOption_js_3.default.REDUCED_DEBUG_INFO
            ];
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
define("gui/screens/MouseSettingsScreen", ["require", "exports", "GameOption", "utils/TranslationText", "gui/widgets/button/Button", "gui/screens/SettingsScreen"], function (require, exports, GameOption_1, TranslationText_2, Button_1, SettingsScreen_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    GameOption_1 = __importDefault(GameOption_1);
    Button_1 = __importDefault(Button_1);
    SettingsScreen_1 = __importDefault(SettingsScreen_1);
    class MouseSettingsScreen extends SettingsScreen_1.default {
        constructor(parentScreen, settings) {
            super(parentScreen, settings, TranslationText_2.getKeyTranslation('options.mouse_settings.title'));
        }
        init() {
            let index = 0;
            for (const iterator of MouseSettingsScreen.OPTIONS) {
                let x = this.width / 2 - 155 + (index % 2) * 160;
                let y = this.height / 6 - 12 + (index >> 1) * 24;
                this.addButton(iterator.createWidget(this.minecraft.gameSettings, x, y, 150));
                index++;
            }
            this.addButton(new Button_1.default(this.width / 2 - 100, this.height - 27, 200, 20, TranslationText_2.getKeyTranslation('gui.done'), () => {
                this.gameSettings.saveOptions();
                this.minecraft.displayGuiScreen(this.parentScreen);
            }));
        }
        render(context, mouseX, mouseY) {
            super.render(context, mouseX, mouseY);
            this.renderDirtBackground(context);
            this.drawCenteredString(context, this.title, this.width / 2, 5, 16777215);
        }
    }
    exports.default = MouseSettingsScreen;
    MouseSettingsScreen.OPTIONS = [
        GameOption_1.default.SENSITIVITY,
        GameOption_1.default.INVERT_MOUSE,
        GameOption_1.default.MOUSE_WHEEL_SENSITIVITY,
        GameOption_1.default.DISCRETE_MOUSE_SCROLL,
        GameOption_1.default.TOUCHSCREEN
    ];
});
define("gui/screens/ControlsScreen", ["require", "exports", "GameOption", "utils/TranslationText", "gui/widgets/button/Button", "gui/screens/MouseSettingsScreen", "gui/screens/SettingsScreen"], function (require, exports, GameOption_js_4, TranslationText_js_6, Button_js_8, MouseSettingsScreen_js_1, SettingsScreen_js_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    GameOption_js_4 = __importDefault(GameOption_js_4);
    Button_js_8 = __importDefault(Button_js_8);
    MouseSettingsScreen_js_1 = __importDefault(MouseSettingsScreen_js_1);
    SettingsScreen_js_4 = __importDefault(SettingsScreen_js_4);
    class ControlsScreen extends SettingsScreen_js_4.default {
        constructor(parentScreen, gameSettingsObj) {
            super(parentScreen, gameSettingsObj, TranslationText_js_6.getKeyTranslation('controls.title'));
        }
        init() {
            this.addButton(new Button_js_8.default(this.width / 2 - 155, 18, 150, 20, TranslationText_js_6.getKeyTranslation('options.mouse_settings'), () => {
                this.minecraft.displayGuiScreen(new MouseSettingsScreen_js_1.default(this, this.gameSettings));
            }));
            this.addButton(GameOption_js_4.default.AUTO_JUMP.createWidget(this.gameSettings, this.width / 2 - 155 + 160, 18, 150));
            this.buttonReset = this.addButton(new Button_js_8.default(this.width / 2 - 155, this.height - 29, 150, 20, TranslationText_js_6.getKeyTranslation('controls.resetAll'), () => {
            }));
            this.addButton(new Button_js_8.default(this.width / 2 + 5, this.height - 29, 150, 20, TranslationText_js_6.getKeyTranslation('gui.done'), () => {
                this.minecraft.displayGuiScreen(this.parentScreen);
            }));
        }
        render(context, mouseX, mouseY) {
            super.render(context, mouseX, mouseY);
            this.drawCenteredString(context, this.title, this.width / 2, 8, 16777215);
            let flag = false;
            this.buttonReset.active = flag;
        }
    }
    exports.default = ControlsScreen;
});
define("settings/PlayerModelPart", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PlayerModelPart {
        constructor(partIdIn, partNameIn) {
            this.partId = partIdIn;
            this.partMask = 1 << partIdIn;
            this.partName = partNameIn;
            this.name = 'options.modelPart.' + partNameIn;
        }
        getPartMask() {
            return this.partMask;
        }
        getPartName() {
            return this.partName;
        }
        getName() {
            return this.name;
        }
    }
    exports.default = PlayerModelPart;
    PlayerModelPart.CAPE = new PlayerModelPart(0, 'cape');
    PlayerModelPart.JACKET = new PlayerModelPart(1, 'jacket');
    PlayerModelPart.LEFT_SLEEVE = new PlayerModelPart(2, 'left_sleeve');
    PlayerModelPart.RIGHT_SLEEVE = new PlayerModelPart(3, 'right_sleeve');
    PlayerModelPart.LEFT_PANTS_LEG = new PlayerModelPart(4, 'left_pants_leg');
    PlayerModelPart.RIGHT_PANTS_LEG = new PlayerModelPart(5, 'right_pants_leg');
    PlayerModelPart.HAT = new PlayerModelPart(6, 'hat');
});
define("gui/screens/CustomizeSkinScreen", ["require", "exports", "GameOption", "settings/PlayerModelPart", "utils/TranslationText", "gui/widgets/button/Button", "gui/widgets/button/OptionButton", "gui/screens/SettingsScreen"], function (require, exports, GameOption_js_5, PlayerModelPart_js_1, TranslationText_js_7, Button_js_9, OptionButton_js_3, SettingsScreen_js_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    GameOption_js_5 = __importDefault(GameOption_js_5);
    PlayerModelPart_js_1 = __importDefault(PlayerModelPart_js_1);
    Button_js_9 = __importDefault(Button_js_9);
    OptionButton_js_3 = __importDefault(OptionButton_js_3);
    SettingsScreen_js_5 = __importDefault(SettingsScreen_js_5);
    class CustomizeSkinScreen extends SettingsScreen_js_5.default {
        constructor(parentScreen, gameSettingsObj) {
            super(parentScreen, gameSettingsObj, TranslationText_js_7.getKeyTranslation("options.skinCustomisation.title"));
        }
        init() {
            let index = 0;
            for (const playermodelpart of Object.values(PlayerModelPart_js_1.default)) {
                this.addButton(new Button_js_9.default(this.width / 2 - 155 + index % 2 * 160, this.height / 6 + 24 * (index >> 1), 150, 20, this.func_238655_a_(playermodelpart), () => {
                    this.gameSettings.switchModelPartEnabled(playermodelpart);
                }));
                ++index;
            }
            this.addButton(new OptionButton_js_3.default(this.width / 2 - 155 + index % 2 * 160, this.height / 6 + 24 * (index >> 1), 150, 20, GameOption_js_5.default.MAIN_HAND, GameOption_js_5.default.MAIN_HAND.getName(this.gameSettings), () => {
                GameOption_js_5.default.MAIN_HAND.setValueIndex(this.gameSettings, 1);
                this.gameSettings.saveOptions();
            }));
            ++index;
            if (index % 2 == 1)
                ++index;
            this.addButton(new Button_js_9.default(this.width / 2 - 100, this.height / 6 + 24 * (index >> 1), 200, 20, TranslationText_js_7.getKeyTranslation("gui.done"), () => {
                this.minecraft.displayGuiScreen(this.parentScreen);
            }));
        }
        render(context, mouseX, mouseY) {
            super.render(context, mouseX, mouseY);
            this.drawCenteredString(context, this.title, this.width / 2, 20, 16777215);
        }
        func_238655_a_(p_238655_1_) {
            return `${TranslationText_js_7.getKeyTranslation(p_238655_1_.getName())}: ${TranslationText_js_7.getKeyTranslation(this.gameSettings.getModelParts().has(p_238655_1_) ? 'options.on' : 'options.off')}`;
        }
    }
    exports.default = CustomizeSkinScreen;
});
define("utils/SoundCategory", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SoundCategory {
        constructor(nameIn) {
            this.name = nameIn;
        }
        getName() {
            return this.name;
        }
    }
    exports.default = SoundCategory;
    SoundCategory.MASTER = new SoundCategory("master");
    SoundCategory.MUSIC = new SoundCategory("music");
    SoundCategory.RECORDS = new SoundCategory("record");
    SoundCategory.WEATHER = new SoundCategory("weather");
    SoundCategory.BLOCKS = new SoundCategory("block");
    SoundCategory.HOSTILE = new SoundCategory("hostile");
    SoundCategory.NEUTRAL = new SoundCategory("neutral");
    SoundCategory.PLAYERS = new SoundCategory("player");
    SoundCategory.AMBIENT = new SoundCategory("ambient");
    SoundCategory.VOICE = new SoundCategory("voice");
    SoundCategory.SOUND_CATEGORIES = new Map(Object.values(SoundCategory).slice(0, -1));
});
define("gui/widgets/SoundSlider", ["require", "exports", "utils/MouseHelper", "utils/TranslationText", "gui/widgets/GameSettingsSlider"], function (require, exports, MouseHelper_2, TranslationText_3, GameSettingsSlider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SoundSlider extends GameSettingsSlider_1.GameSettingsSlider {
        constructor(settings, x, y, category, width) {
            super(settings.gameSettings, x, y, width, 20, (settings.gameSettings.getSoundLevel(category) ? Number(settings.gameSettings.getSoundLevel(category)) : 1));
            this.category = category;
            this.setSliderText();
        }
        setSliderText() {
            let per = String(this.sliderValue == this.getYImage(false) ? TranslationText_3.getKeyTranslation('option.off') : String((MouseHelper_2.int(this.sliderValue * 100.0)) + "%"));
            this.setMessage((TranslationText_3.getKeyTranslation("soundCategory." + this.category.getName())) + ": " + (per));
        }
        setSaveOptionValue() {
            this.settings.setSoundLevel(this.category, this.sliderValue);
            this.settings.saveOptions();
        }
    }
    exports.default = SoundSlider;
});
define("gui/screens/OptionsSoundsScreen", ["require", "exports", "GameOption", "utils/TranslationText", "gui/widgets/button/Button", "gui/widgets/button/OptionButton", "gui/screens/SettingsScreen", "utils/SoundCategory", "gui/widgets/SoundSlider"], function (require, exports, GameOption_js_6, TranslationText_js_8, Button_js_10, OptionButton_js_4, SettingsScreen_js_6, SoundCategory_js_1, SoundSlider_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    GameOption_js_6 = __importDefault(GameOption_js_6);
    Button_js_10 = __importDefault(Button_js_10);
    OptionButton_js_4 = __importDefault(OptionButton_js_4);
    SettingsScreen_js_6 = __importDefault(SettingsScreen_js_6);
    SoundCategory_js_1 = __importDefault(SoundCategory_js_1);
    SoundSlider_js_1 = __importDefault(SoundSlider_js_1);
    class OptionsSoundsScreen extends SettingsScreen_js_6.default {
        constructor(parentScreen, gameSettingsObj) {
            super(parentScreen, gameSettingsObj, TranslationText_js_8.getKeyTranslation("options.sounds.title"));
        }
        init() {
            let index = 0;
            this.addButton(new SoundSlider_js_1.default(this.minecraft, this.width / 2 - 155 + index % (2 * 160), this.height / 6 - 12 + 24 * (index >> 1), SoundCategory_js_1.default.MASTER, 310));
            index = index + 2;
            for (let i = 0; i < Object.values(SoundCategory_js_1.default).length; i++) {
                if (i !== 0 && i !== Object.values(SoundCategory_js_1.default).length - 1) {
                    const soundcategory = Object.values(SoundCategory_js_1.default)[i];
                    this.addButton(new SoundSlider_js_1.default(this.minecraft, this.width / 2 - 155 + index % 2 * 160, this.height / 6 - 12 + 24 * (index >> 1), soundcategory, 150));
                    ++index;
                }
            }
            const basePosX = this.width / 2 - 75;
            const basePosY = this.height / 6 - 12;
            index++;
            this.addButton(new OptionButton_js_4.default(basePosX, basePosY + 24 * (index >> 1), 150, 20, GameOption_js_6.default.SHOW_SUBTITLES, GameOption_js_6.default.SHOW_SUBTITLES.getName(this.gameSettings), () => {
                GameOption_js_6.default.SHOW_SUBTITLES.nextValue(this.minecraft.gameSettings);
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
define("gui/screens/VideoSettingsScreen", ["require", "exports", "GameOption", "utils/TranslationText", "gui/widgets/button/Button", "gui/screens/SettingsScreen"], function (require, exports, GameOption_js_7, TranslationText_js_9, Button_js_11, SettingsScreen_js_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    GameOption_js_7 = __importDefault(GameOption_js_7);
    Button_js_11 = __importDefault(Button_js_11);
    SettingsScreen_js_7 = __importDefault(SettingsScreen_js_7);
    class VideoSettingsScreen extends SettingsScreen_js_7.default {
        constructor(parentScreen, gameSettingsObj) {
            super(parentScreen, gameSettingsObj, TranslationText_js_9.getKeyTranslation("options.videoTitle"));
            this.SCREEN_OPTIONS = [
                GameOption_js_7.default.GRAPHICS_FANCINESS,
                GameOption_js_7.default.RENDER_DISTANCE,
                GameOption_js_7.default.AO,
                GameOption_js_7.default.FRAMERATE_LIMIT,
                GameOption_js_7.default.VSYNC,
                GameOption_js_7.default.VIEW_BOBBING,
                GameOption_js_7.default.GUI_SCALE,
                GameOption_js_7.default.ATTACK_INDICATOR,
                GameOption_js_7.default.GAMMA,
                GameOption_js_7.default.RENDER_CLOUDS,
                GameOption_js_7.default.FULLSCREEN,
                GameOption_js_7.default.PARTICLES,
                GameOption_js_7.default.MIPMAP_LEVELS,
                GameOption_js_7.default.ENTITY_SHADOWS,
                GameOption_js_7.default.SCREEN_EFFECT_SCALE_SLIDER,
                GameOption_js_7.default.ENTITY_DISTANCE_SCALING,
                GameOption_js_7.default.FOV_EFFECT_SCALE_SLIDER
            ];
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
            this.drawCenteredString(context, this.title, this.width / 2, 5, 16777215);
        }
    }
    exports.default = VideoSettingsScreen;
});
define("gui/screens/DebugSettings", ["require", "exports", "GameOption", "utils/TranslationText", "gui/widgets/button/Button", "gui/screens/SettingsScreen"], function (require, exports, GameOption_js_8, TranslationText_js_10, Button_js_12, SettingsScreen_js_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    GameOption_js_8 = __importDefault(GameOption_js_8);
    Button_js_12 = __importDefault(Button_js_12);
    SettingsScreen_js_8 = __importDefault(SettingsScreen_js_8);
    class DebugSettingsScreen extends SettingsScreen_js_8.default {
        constructor(parentScreen, gameSettingsObj) {
            super(parentScreen, gameSettingsObj, TranslationText_js_10.getKeyTranslation("Debug"));
            this.SCREEN_OPTIONS = [
                GameOption_js_8.default.SHOW_FPS,
                GameOption_js_8.default.ADVANCED_TOOLTIPS,
                GameOption_js_8.default.HELD_TOOLTIPS,
                GameOption_js_8.default.HIDE_GUI,
                GameOption_js_8.default.POINT_OF_VIEW,
                GameOption_js_8.default.SNOOPER,
                GameOption_js_8.default.SKIP_MULTIPLAYER_WARNING
            ];
        }
        init() {
            let index = 0;
            for (const iterator of this.SCREEN_OPTIONS) {
                let x = this.width / 2 - 155 + (index % 2) * 160;
                let y = this.height / 6 - 12 + (index >> 1) * 24;
                this.addButton(iterator.createWidget(this.minecraft.gameSettings, x, y, 150));
                index++;
            }
            this.addButton(new Button_js_12.default(this.width / 2 - 100, this.height - 27, 200, 20, TranslationText_js_10.getKeyTranslation("gui.done"), () => {
                this.minecraft.displayGuiScreen(this.parentScreen);
            }));
        }
        render(context, mouseX, mouseY) {
            super.render(context, mouseX, mouseY);
            this.drawCenteredString(context, this.title, this.width / 2, 20, 16777215);
        }
    }
    exports.default = DebugSettingsScreen;
});
define("gui/screens/OptionsScreen", ["require", "exports", "GameOption", "utils/TranslationText", "gui/widgets/button/Button", "gui/screens/AccessibilityScreen", "gui/screens/ChatOptionsScreen", "gui/screens/ControlsScreen", "gui/screens/CustomizeSkinScreen", "gui/screens/LanguageScreen", "gui/screens/OptionsSoundsScreen", "gui/screens/Screen", "gui/screens/VideoSettingsScreen", "gui/screens/DebugSettings"], function (require, exports, GameOption_js_9, TranslationText_js_11, Button_js_13, AccessibilityScreen_js_1, ChatOptionsScreen_js_1, ControlsScreen_js_1, CustomizeSkinScreen_js_1, LanguageScreen_js_1, OptionsSoundsScreen_js_1, Screen_js_4, VideoSettingsScreen_js_1, DebugSettings_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    GameOption_js_9 = __importDefault(GameOption_js_9);
    Button_js_13 = __importDefault(Button_js_13);
    AccessibilityScreen_js_1 = __importDefault(AccessibilityScreen_js_1);
    ChatOptionsScreen_js_1 = __importDefault(ChatOptionsScreen_js_1);
    ControlsScreen_js_1 = __importDefault(ControlsScreen_js_1);
    CustomizeSkinScreen_js_1 = __importDefault(CustomizeSkinScreen_js_1);
    LanguageScreen_js_1 = __importDefault(LanguageScreen_js_1);
    OptionsSoundsScreen_js_1 = __importDefault(OptionsSoundsScreen_js_1);
    Screen_js_4 = __importDefault(Screen_js_4);
    VideoSettingsScreen_js_1 = __importDefault(VideoSettingsScreen_js_1);
    DebugSettings_js_1 = __importDefault(DebugSettings_js_1);
    class OptionsScreen extends Screen_js_4.default {
        constructor(parentScreen, gameSettingsObj) {
            super(TranslationText_js_11.getKeyTranslation('options.title'));
            this.SCREEN_OPTIONS = [
                GameOption_js_9.default.FOV,
                GameOption_js_9.default.REALMS_NOTIFICATIONS
            ];
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
            this.addButton(new Button_js_13.default(baseX0, baseY + 24, 150, 20, TranslationText_js_11.getKeyTranslation('Debug'), () => {
                this.minecraft.displayGuiScreen(new DebugSettings_js_1.default(this, this.settings));
            }));
            this.addButton(new Button_js_13.default(baseX0, baseY + 48, 150, 20, TranslationText_js_11.getKeyTranslation('options.skinCustomisation'), () => {
                this.minecraft.displayGuiScreen(new CustomizeSkinScreen_js_1.default(this, this.settings));
            }));
            this.addButton(new Button_js_13.default(baseX1, baseY + 48, 150, 20, TranslationText_js_11.getKeyTranslation('options.sounds'), () => {
                this.minecraft.displayGuiScreen(new OptionsSoundsScreen_js_1.default(this, this.settings));
            }));
            this.addButton(new Button_js_13.default(baseX0, baseY + 72, 150, 20, TranslationText_js_11.getKeyTranslation('options.video'), () => {
                this.minecraft.displayGuiScreen(new VideoSettingsScreen_js_1.default(this, this.settings));
            }));
            this.addButton(new Button_js_13.default(baseX1, baseY + 72, 150, 20, TranslationText_js_11.getKeyTranslation('options.controls'), () => {
                this.minecraft.displayGuiScreen(new ControlsScreen_js_1.default(this, this.settings));
            }));
            this.addButton(new Button_js_13.default(baseX0, baseY + 96, 150, 20, TranslationText_js_11.getKeyTranslation('options.language'), () => {
                this.minecraft.displayGuiScreen(new LanguageScreen_js_1.default(this, this.settings));
            }));
            this.addButton(new Button_js_13.default(baseX1, baseY + 96, 150, 20, TranslationText_js_11.getKeyTranslation('options.chat.title'), () => {
                this.minecraft.displayGuiScreen(new ChatOptionsScreen_js_1.default(this, this.settings));
            }));
            this.addButton(new Button_js_13.default(baseX0, baseY + 120, 150, 20, TranslationText_js_11.getKeyTranslation('options.resourcepack'), () => { }));
            this.addButton(new Button_js_13.default(baseX1, baseY + 120, 150, 20, TranslationText_js_11.getKeyTranslation('options.accessibility.title'), () => {
                this.minecraft.displayGuiScreen(new AccessibilityScreen_js_1.default(this, this.settings));
            }));
            this.addButton(new Button_js_13.default(this.width / 2 - 100, baseY + 174, 200, 20, TranslationText_js_11.getKeyTranslation('gui.done'), () => {
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
define("gui/widgets/TextFieldWidget", ["require", "exports", "utils/ColorHelper", "utils/MathHelper", "gui/FontRenderer", "gui/widgets/Widget"], function (require, exports, ColorHelper_js_3, MathHelper_js_2, FontRenderer_js_3, Widget_js_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ColorHelper_js_3 = __importDefault(ColorHelper_js_3);
    MathHelper_js_2 = __importDefault(MathHelper_js_2);
    FontRenderer_js_3 = __importDefault(FontRenderer_js_3);
    Widget_js_3 = __importDefault(Widget_js_3);
    class TextFieldWidget extends Widget_js_3.default {
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
define("gui/screens/CreateWorldScreen", ["require", "exports", "utils/TranslationText", "gui/widgets/button/Button", "gui/screens/Screen"], function (require, exports, TranslationText_js_12, Button_js_14, Screen_js_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Button_js_14 = __importDefault(Button_js_14);
    Screen_js_5 = __importDefault(Screen_js_5);
    class WorldSelectionScreen extends Screen_js_5.default {
        constructor(parentScreen) {
            super(TranslationText_js_12.getKeyTranslation('selectWorld.create'));
            this.parentScreen = parentScreen;
        }
        closeScreen() {
            this.minecraft.displayGuiScreen(this.parentScreen);
        }
        init() {
            const posX0 = this.width / 2 - 155;
            const posX1 = this.width / 2 + 5;
            this.addButton(new Button_js_14.default(posX1, this.height - 28, 150, 20, TranslationText_js_12.getKeyTranslation('gui.cancel'), () => {
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
define("gui/screens/WorldSelectionScreen", ["require", "exports", "utils/TranslationText", "gui/widgets/button/Button", "gui/widgets/TextFieldWidget", "gui/screens/CreateWorldScreen", "gui/screens/Screen"], function (require, exports, TranslationText_js_13, Button_js_15, TextFieldWidget_js_1, CreateWorldScreen_js_1, Screen_js_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Button_js_15 = __importDefault(Button_js_15);
    TextFieldWidget_js_1 = __importDefault(TextFieldWidget_js_1);
    CreateWorldScreen_js_1 = __importDefault(CreateWorldScreen_js_1);
    Screen_js_6 = __importDefault(Screen_js_6);
    class WorldSelectionScreen extends Screen_js_6.default {
        constructor(parentScreen) {
            super(TranslationText_js_13.getKeyTranslation('selectWorld.title'));
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
            this.addButton(new Button_js_15.default(this.width / 2 - 75, this.height / 2 - 20, 150, 20, TranslationText_js_13.getKeyTranslation("Simulate Select/Deselect"), () => this.flag = !this.flag));
            this.selectButton = this.addButton(new Button_js_15.default(this.width / 2 - 154, this.height - 52, 150, 20, TranslationText_js_13.getKeyTranslation("selectWorld.select"), () => { }));
            this.addButton(new Button_js_15.default(this.width / 2 + 4, this.height - 52, 150, 20, TranslationText_js_13.getKeyTranslation("selectWorld.create"), () => {
                this.minecraft.displayGuiScreen(new CreateWorldScreen_js_1.default(this));
            }));
            this.renameButton = this.addButton(new Button_js_15.default(this.width / 2 - 154, this.height - 28, 72, 20, TranslationText_js_13.getKeyTranslation("selectWorld.edit"), () => { }));
            this.deleteButton = this.addButton(new Button_js_15.default(this.width / 2 - 76, this.height - 28, 72, 20, TranslationText_js_13.getKeyTranslation("selectWorld.delete"), () => { }));
            this.copyButton = this.addButton(new Button_js_15.default(this.width / 2 + 4, this.height - 28, 72, 20, TranslationText_js_13.getKeyTranslation("selectWorld.recreate"), () => { }));
            this.addButton(new Button_js_15.default(this.width / 2 + 82, this.height - 28, 72, 20, TranslationText_js_13.getKeyTranslation("gui.cancel"), () => {
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
define("gui/screens/MainMenuScreen", ["require", "exports", "utils/JSONUI", "utils/PlaySound", "utils/Resources", "utils/Test", "utils/TranslationText", "utils/Utils", "gui/FontRenderer", "gui/widgets/button/Button", "gui/widgets/button/ImageButton", "gui/screens/AccessibilityScreen", "gui/screens/LanguageScreen", "gui/screens/MultiplayerScreen", "gui/screens/MultiplayerWarningScreen", "gui/screens/OptionsScreen", "gui/screens/Screen", "gui/screens/WorldSelectionScreen"], function (require, exports, JSONUI_js_1, PlaySound_js_4, Resources_js_7, Test_js_1, TranslationText_js_14, Utils_js_1, FontRenderer_js_4, Button_js_16, ImageButton_js_1, AccessibilityScreen_js_2, LanguageScreen_js_2, MultiplayerScreen_js_2, MultiplayerWarningScreen_js_1, OptionsScreen_js_1, Screen_js_7, WorldSelectionScreen_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    JSONUI_js_1 = __importStar(JSONUI_js_1);
    Utils_js_1 = __importDefault(Utils_js_1);
    FontRenderer_js_4 = __importDefault(FontRenderer_js_4);
    Button_js_16 = __importDefault(Button_js_16);
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
                            console.log(this.minecraft.outputLog);
                            this.minecraft.outputLog = '';
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
                    let offset;
                    let width;
                    let height;
                    let text;
                    let ignored;
                    let active;
                    let pressFunc;
                    if (!(c.includes('@'))) {
                        let obj = JSONUI_js_1.default.getObject(null, d, this.width, this.height, {});
                        pressFunc = getPressFunc(null, d);
                        let btn;
                        switch (obj.type) {
                            case JSONUI_js_1.Type.BUTTON:
                                btn = new Button_js_16.default(obj.offset.x, obj.offset.y, obj.size.w, obj.size.h, TranslationText_js_14.getKeyTranslation(obj.text), pressFunc);
                                break;
                            case JSONUI_js_1.Type.BUTTON_IMAGE:
                                btn = new ImageButton_js_1.default(obj.offset.x, obj.offset.y, obj.size.w, obj.size.h, obj.texture.base_uv[0], obj.texture.base_uv[1], obj.texture.base_uv_size[1], Resources_js_7.getResourceLocation('textures', obj.texture.image), 256, 256, pressFunc, '');
                                break;
                        }
                        btn.active = obj.active;
                        btn.visible = !obj.ignored;
                        this.addButton(btn);
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
                        let obj = JSONUI_js_1.default.getObject(superObj, d, this.width, this.height, { '$is_demo': this.minecraft.isDemo() });
                        pressFunc = getPressFunc(null, d);
                        let btn;
                        switch (obj.type) {
                            case JSONUI_js_1.Type.BUTTON:
                                btn = new Button_js_16.default(obj.offset.x, obj.offset.y, obj.size.w, obj.size.h, TranslationText_js_14.getKeyTranslation(obj.text), pressFunc);
                                break;
                            case JSONUI_js_1.Type.BUTTON_IMAGE:
                                btn = new ImageButton_js_1.default(obj.offset.x, obj.offset.y, obj.size.w, obj.size.h, obj.texture.base_uv[0], obj.texture.base_uv[1], obj.texture.base_uv_size[1], Resources_js_7.getResourceLocation('textures', obj.texture.image), 256, 256, pressFunc, '');
                                break;
                        }
                        btn.active = obj.active;
                        btn.visible = !obj.ignored;
                        this.addButton(btn);
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
                let offsetX = eval(obj.offset[0].replace(/px/g, '').replace(/100%/g, 'this.width'));
                let offsetY = eval(obj.offset[1].replace(/px/g, '').replace(/100%c/g, 'FontRenderer.getTextWidth(' + obj.text + ')').replace(/100%/g, 'this.height'));
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
                            text += TranslationText_js_14.getKeyTranslation("menu.modded");
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
                            try {
                                let splash = { x: j + 240, y: 59, width: FontRenderer_js_4.default.getTextWidth(this.splashText), height: 9 };
                                const miliT = new Date().getMilliseconds();
                                let f2 = 1.5 - Math.abs(Math.sin((miliT % 1000) / 1000.0 * (Math.PI * 2)) * 0.1);
                                f2 = f2 * 100.0 / (FontRenderer_js_4.default.getTextWidth(this.splashText) + 32);
                                context.translate(splash.x, splash.y);
                                context.scale(f2, f2);
                                context.rotate(-20 * Math.PI / 180);
                                context.translate(-splash.x, -splash.y);
                                this.drawCenteredString(context, this.splashText, splash.x, splash.y, 16776960);
                            }
                            catch {
                                let splash = { x: j + 240, y: 59, width: FontRenderer_js_4.default.getTextWidth('Error'), height: 9 };
                                const miliT = new Date().getMilliseconds();
                                let f2 = 1.8 - Math.abs(Math.sin((miliT % 1000) / 1000.0 * (Math.PI * 2)) * 0.1);
                                f2 = f2 * 100.0 / (context.measureText('Error').width + 32);
                                context.translate(splash.x, splash.y);
                                context.scale(f2, f2);
                                context.rotate(-20 * Math.PI / 180);
                                context.translate(-splash.x, -splash.y);
                                this.drawCenteredString(context, 'Error', splash.x, splash.y, 16776960);
                            }
                            context.restore();
                        }
                    }
                }
            }
        }
        mouseClicked(mouseX, mouseY, button) {
            super.mouseClicked(mouseX, mouseY, button);
            Utils_js_1.default.isInside(mouseX, mouseY, this.widthCopyrightRest, this.widthCopyright, (this.height - 10), 10, () => {
                PlaySound_js_4.playSound('click_stereo', 0.2);
                console.log('No credits sry :(');
            });
        }
        render(context, mouseX, mouseY) {
            this.fill(context, 0, 0, this.width, this.height, 3355443);
            Test_js_1.isInside(mouseX, mouseY, this.widthCopyrightRest, this.widthCopyright, (this.height - 10), 10, () => {
                this.fill(context, this.widthCopyrightRest, this.height - 2, this.widthCopyright + 1, 1, 16777215);
            });
            this.genRender(context, mouseX, mouseY);
        }
    }
    exports.default = MainMenuScreen;
});
define("utils/String", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    String.prototype.equals = function (equalsto) {
        return String(this) === equalsto;
    };
});
define("index", ["require", "exports", "GameConfiguration", "Minecraft", "utils/Resources", "utils/String"], function (require, exports, GameConfiguration_js_1, Minecraft_js_2, Resources_js_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.shutdown = void 0;
    GameConfiguration_js_1 = __importDefault(GameConfiguration_js_1);
    Minecraft_js_2 = __importDefault(Minecraft_js_2);
    if (localStorage.getItem('GameSettings'))
        localStorage.removeItem('GameSettings');
    if (localStorage.getItem('Resources'))
        localStorage.removeItem('Resources');
    if (localStorage.getItem('prevScreen'))
        localStorage.removeItem('prevScreen');
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
                    iguieventlistener.keyReleased(key, modifiers);
                else
                    this.mc.currentScreen.keyDown(key, modifiers);
            }
            else
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
define("Minecraft", ["require", "exports", "GameSettings", "gui/FontRenderer", "gui/screens/MainMenuScreen", "index", "utils/Resources", "utils/KeyboardListener", "utils/MouseHelper", "gui/IngameGui"], function (require, exports, GameSettings_js_1, FontRenderer_js_5, MainMenuScreen_js_1, index_js_1, Resources_js_10, KeyboardListener_js_1, MouseHelper_js_2, IngameGui_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    GameSettings_js_1 = __importDefault(GameSettings_js_1);
    FontRenderer_js_5 = __importDefault(FontRenderer_js_5);
    MainMenuScreen_js_1 = __importDefault(MainMenuScreen_js_1);
    KeyboardListener_js_1 = __importDefault(KeyboardListener_js_1);
    MouseHelper_js_2 = __importDefault(MouseHelper_js_2);
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
            this.instanceNew = this;
            Minecraft.instance = this;
            this.gameconfiguration = gameConfig;
            this.gameSettings = new GameSettings_js_1.default(this);
            this.mouseHelper = new MouseHelper_js_2.default(this, this.context);
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
        getInstanceNew() {
            return this.instanceNew;
        }
        openFullscreen() {
            let elem = document.documentElement;
            if (elem.requestFullscreen)
                elem.requestFullscreen();
        }
        closeFullscreen() {
            if (document.exitFullscreen)
                document.exitFullscreen();
        }
        shutdown() {
            this.running = false;
            console.log(this.outputLog);
            index_js_1.shutdown();
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
        getForceUnicodeFont() {
            return this.gameSettings.forceUnicodeFont;
        }
    }
    exports.default = Minecraft;
});
define("settings/AmbientOcclusionStatus", ["require", "exports", "utils/MathHelper", "utils/Utils"], function (require, exports, MathHelper_2, Utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    MathHelper_2 = __importDefault(MathHelper_2);
    Utils_1 = __importDefault(Utils_1);
    class AmbientOcclusionStatus {
        constructor(id, key) {
            this.id = id;
            this.key = key;
        }
        getId() {
            return this.id;
        }
        getKey() {
            return this.key;
        }
        static byId(id) {
            return AmbientOcclusionStatus.BY_ID[MathHelper_2.default.normalizeAngle(id, AmbientOcclusionStatus.BY_ID.length)];
        }
    }
    exports.default = AmbientOcclusionStatus;
    AmbientOcclusionStatus.OFF = new AmbientOcclusionStatus(0, 'options.ao.off');
    AmbientOcclusionStatus.MIN = new AmbientOcclusionStatus(1, 'options.ao.min');
    AmbientOcclusionStatus.MAX = new AmbientOcclusionStatus(2, 'options.ao.max');
    AmbientOcclusionStatus.BY_ID = Object.values(AmbientOcclusionStatus).sort(Utils_1.default.sortIteratable);
});
define("settings/AttackIndicatorStatus", ["require", "exports", "utils/MathHelper", "utils/Utils"], function (require, exports, MathHelper_3, Utils_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    MathHelper_3 = __importDefault(MathHelper_3);
    Utils_2 = __importDefault(Utils_2);
    class AttackIndicatorStatus {
        constructor(id, key) {
            this.id = id;
            this.key = key;
        }
        getId() {
            return this.id;
        }
        getKey() {
            return this.key;
        }
        static byId(id) {
            return AttackIndicatorStatus.BY_ID[MathHelper_3.default.normalizeAngle(id, AttackIndicatorStatus.BY_ID.length)];
        }
    }
    exports.default = AttackIndicatorStatus;
    AttackIndicatorStatus.OFF = new AttackIndicatorStatus(0, 'options.off');
    AttackIndicatorStatus.CROSSHAIR = new AttackIndicatorStatus(1, 'options.attack.crosshair');
    AttackIndicatorStatus.HOTBAR = new AttackIndicatorStatus(2, 'options.attack.hotbar');
    AttackIndicatorStatus.BY_ID = Object.values(AttackIndicatorStatus).sort(Utils_2.default.sortIteratable);
});
define("settings/ChatVisibility", ["require", "exports", "utils/MathHelper", "utils/Utils"], function (require, exports, MathHelper_4, Utils_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    MathHelper_4 = __importDefault(MathHelper_4);
    Utils_3 = __importDefault(Utils_3);
    class ChatVisibility {
        constructor(id, key) {
            this.id = id;
            this.key = key;
        }
        getId() {
            return this.id;
        }
        getKey() {
            return this.key;
        }
        static byId(id) {
            return ChatVisibility.BY_ID[MathHelper_4.default.normalizeAngle(id, ChatVisibility.BY_ID.length)];
        }
    }
    exports.default = ChatVisibility;
    ChatVisibility.FULL = new ChatVisibility(0, 'options.chat.visibility.full');
    ChatVisibility.HIDDEN = new ChatVisibility(2, 'options.chat.visibility.hidden');
    ChatVisibility.SYSTEM = new ChatVisibility(1, 'options.chat.visibility.system');
    ChatVisibility.BY_ID = Object.values(ChatVisibility).sort(Utils_3.default.sortIteratable);
});
define("settings/CloudOption", ["require", "exports", "utils/MathHelper", "utils/Utils"], function (require, exports, MathHelper_5, Utils_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    MathHelper_5 = __importDefault(MathHelper_5);
    Utils_4 = __importDefault(Utils_4);
    class CloudOption {
        constructor(id, key) {
            this.id = id;
            this.key = key;
        }
        getId() {
            return this.id;
        }
        getKey() {
            return this.key;
        }
        static byId(id) {
            return CloudOption.BY_ID[MathHelper_5.default.normalizeAngle(id, CloudOption.BY_ID.length)];
        }
    }
    exports.default = CloudOption;
    CloudOption.OFF = new CloudOption(0, 'options.off');
    CloudOption.FAST = new CloudOption(1, 'options.clouds.fast');
    CloudOption.FANCY = new CloudOption(2, 'options.clouds.fancy');
    CloudOption.BY_ID = Object.values(CloudOption).sort(Utils_4.default.sortIteratable);
});
define("settings/GraphicsFanciness", ["require", "exports", "utils/MathHelper", "utils/Utils"], function (require, exports, MathHelper_6, Utils_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    MathHelper_6 = __importDefault(MathHelper_6);
    Utils_5 = __importDefault(Utils_5);
    class GraphicsFanciness {
        constructor(id, key) {
            this.id = id;
            this.key = key;
        }
        getId() {
            return this.id;
        }
        getKey() {
            return this.key;
        }
        static byId(id) {
            return GraphicsFanciness.BY_ID[MathHelper_6.default.normalizeAngle(id, GraphicsFanciness.BY_ID.length)];
        }
    }
    exports.default = GraphicsFanciness;
    GraphicsFanciness.FAST = new GraphicsFanciness(0, 'options.graphics.fast');
    GraphicsFanciness.FANCY = new GraphicsFanciness(1, 'options.graphics.fancy');
    GraphicsFanciness.FABULOUS = new GraphicsFanciness(2, 'options.graphics.fabulous');
    GraphicsFanciness.BY_ID = Object.values(GraphicsFanciness).sort(Utils_5.default.sortIteratable);
});
define("settings/HandSide", ["require", "exports", "utils/MathHelper", "utils/Utils"], function (require, exports, MathHelper_7, Utils_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    MathHelper_7 = __importDefault(MathHelper_7);
    Utils_6 = __importDefault(Utils_6);
    class HandSide {
        constructor(id, key) {
            this.id = id;
            this.key = key;
        }
        getId() {
            return this.id;
        }
        getKey() {
            return this.key;
        }
        static byId(id) {
            return HandSide.BY_ID[MathHelper_7.default.normalizeAngle(id, HandSide.BY_ID.length)];
        }
    }
    exports.default = HandSide;
    HandSide.LEFT = new HandSide(0, 'options.mainHand.left');
    HandSide.RIGHT = new HandSide(1, 'options.mainHand.right');
    HandSide.BY_ID = Object.values(HandSide).sort(Utils_6.default.sortIteratable);
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
define("settings/NarratorStatus", ["require", "exports", "utils/MathHelper", "utils/Utils"], function (require, exports, MathHelper_8, Utils_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    MathHelper_8 = __importDefault(MathHelper_8);
    Utils_7 = __importDefault(Utils_7);
    class NarratorStatus {
        constructor(id, key) {
            this.id = id;
            this.key = key;
        }
        getId() {
            return this.id;
        }
        getKey() {
            return this.key;
        }
        static byId(id) {
            return NarratorStatus.BY_ID[MathHelper_8.default.normalizeAngle(id, NarratorStatus.BY_ID.length)];
        }
    }
    exports.default = NarratorStatus;
    NarratorStatus.OFF = new NarratorStatus(0, 'options.narrator.off');
    NarratorStatus.ALL = new NarratorStatus(1, 'options.narrator.all');
    NarratorStatus.CHAT = new NarratorStatus(2, 'options.narrator.chat');
    NarratorStatus.SYSTEM = new NarratorStatus(3, 'options.narrator.system');
    NarratorStatus.BY_ID = Object.values(NarratorStatus).sort(Utils_7.default.sortIteratable);
});
define("settings/ParticleStatus", ["require", "exports", "utils/MathHelper", "utils/Utils"], function (require, exports, MathHelper_9, Utils_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    MathHelper_9 = __importDefault(MathHelper_9);
    Utils_8 = __importDefault(Utils_8);
    class ParticleStatus {
        constructor(id, key) {
            this.id = id;
            this.key = key;
        }
        getId() {
            return this.id;
        }
        getKey() {
            return this.key;
        }
        static byId(id) {
            return ParticleStatus.BY_ID[MathHelper_9.default.normalizeAngle(id, ParticleStatus.BY_ID.length)];
        }
    }
    exports.default = ParticleStatus;
    ParticleStatus.ALL = new ParticleStatus(0, 'options.particles.all');
    ParticleStatus.DESCREASED = new ParticleStatus(1, 'options.particles.decreased');
    ParticleStatus.MINIMAL = new ParticleStatus(2, 'options.particles.minimal');
    ParticleStatus.BY_ID = Object.values(ParticleStatus).sort(Utils_8.default.sortIteratable);
});
define("settings/PointOfView", ["require", "exports", "utils/MathHelper", "utils/Utils"], function (require, exports, MathHelper_10, Utils_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    MathHelper_10 = __importDefault(MathHelper_10);
    Utils_9 = __importDefault(Utils_9);
    class PointOfView {
        constructor(id, key) {
            this.id = id;
            this.key = key;
        }
        getId() {
            return this.id;
        }
        getKey() {
            return this.key;
        }
        static byId(id) {
            return PointOfView.BY_ID[MathHelper_10.default.normalizeAngle(id, PointOfView.BY_ID.length)];
        }
    }
    exports.default = PointOfView;
    PointOfView.FIRST_PERSON = new PointOfView(0, 'FIRST_PERSON');
    PointOfView.THIRD_PERSON_BACK = new PointOfView(1, 'THIRD_PERSON_BACK');
    PointOfView.THIRD_PERSON_FRONT = new PointOfView(2, 'THIRD_PERSON_FRONT');
    PointOfView.BY_ID = Object.values(PointOfView).sort(Utils_9.default.sortIteratable);
});
define("utils/LSStore", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LSStore {
        constructor(lsItem, mode) {
            this.content = new Map();
            this.lsItem = '';
            this.itemData = '';
            if (mode?.toLowerCase() === 'create') {
                this.lsItem = lsItem;
                this.itemData = '';
            }
            else if (mode?.toLowerCase() === 'get') {
                const data = localStorage.getItem(lsItem).split("\n");
                data.forEach((line) => {
                    if (line !== '') {
                        this.content.set(line.split(':')[0], line.split(':')[1]);
                    }
                });
            }
        }
        addLine(text) {
            this.itemData += (this.itemData === '' ? text : '\n' + text);
        }
        saveToLS() {
            localStorage.setItem(this.lsItem, this.itemData);
        }
        keySet() {
            return this.content.keys();
        }
        getString(key) {
            return this.content.get(key);
        }
    }
    exports.default = LSStore;
});
define("GameSettings", ["require", "exports", "GameOption", "settings/AmbientOcclusionStatus", "settings/AttackIndicatorStatus", "settings/ChatVisibility", "settings/CloudOption", "settings/GraphicsFanciness", "settings/HandSide", "settings/KeyBinding", "settings/NarratorStatus", "settings/ParticleStatus", "settings/PlayerModelPart", "settings/PointOfView", "utils/LSStore", "utils/SoundCategory"], function (require, exports, GameOption_js_10, AmbientOcclusionStatus_js_1, AttackIndicatorStatus_js_1, ChatVisibility_js_1, CloudOption_js_1, GraphicsFanciness_js_1, HandSide_js_1, KeyBinding_js_1, NarratorStatus_js_1, ParticleStatus_js_1, PlayerModelPart_js_2, PointOfView_js_1, LSStore_js_1, SoundCategory_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    GameOption_js_10 = __importDefault(GameOption_js_10);
    AmbientOcclusionStatus_js_1 = __importDefault(AmbientOcclusionStatus_js_1);
    AttackIndicatorStatus_js_1 = __importDefault(AttackIndicatorStatus_js_1);
    ChatVisibility_js_1 = __importDefault(ChatVisibility_js_1);
    CloudOption_js_1 = __importDefault(CloudOption_js_1);
    GraphicsFanciness_js_1 = __importDefault(GraphicsFanciness_js_1);
    HandSide_js_1 = __importDefault(HandSide_js_1);
    KeyBinding_js_1 = __importDefault(KeyBinding_js_1);
    NarratorStatus_js_1 = __importDefault(NarratorStatus_js_1);
    ParticleStatus_js_1 = __importDefault(ParticleStatus_js_1);
    PlayerModelPart_js_2 = __importDefault(PlayerModelPart_js_2);
    PointOfView_js_1 = __importDefault(PointOfView_js_1);
    LSStore_js_1 = __importDefault(LSStore_js_1);
    SoundCategory_js_2 = __importDefault(SoundCategory_js_2);
    class GameSettings {
        constructor(mcIn) {
            this.soundLevels = new Map((Object.entries(SoundCategory_js_2.default).slice(0, -1)).map(i => [i[1], 1]));
            this.setModelParts = new Set(Object.values(PlayerModelPart_js_2.default));
            this.graphicFanciness = GraphicsFanciness_js_1.default.FANCY;
            this.cloudOption = CloudOption_js_1.default.FANCY;
            this.ambientOcclusionStatus = AmbientOcclusionStatus_js_1.default.MAX;
            this.attackIndicator = AttackIndicatorStatus_js_1.default.CROSSHAIR;
            this.narrator = NarratorStatus_js_1.default.OFF;
            this.chatVisibility = ChatVisibility_js_1.default.FULL;
            this.mainHand = HandSide_js_1.default.LEFT;
            this.particles = ParticleStatus_js_1.default.ALL;
            this.pointOfView = PointOfView_js_1.default.FIRST_PERSON;
            this.mouseSensitivity = 0.5;
            this.renderDistanceChunks = -1;
            this.chatOpacity = 1.0;
            this.chatLineSpacing = 0.0;
            this.chatScale = 0.7;
            this.entityDistanceScaling = 1;
            this.mipmapLevels = 4;
            this.chatWidth = 1.0;
            this.chatHeightUnfocused = 0.44366196;
            this.chatHeightFocused = 1.0;
            this.chatDelay = 0.0;
            this.accessibilityTextBackgroundOpacity = 0.5;
            this.advancedItemTooltips = false;
            this.heldItemTooltips = true;
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
            this.hideMatchedNames = false;
            this.reducedDebugInfo = false;
            this.snooper = true;
            this.showSubtitles = false;
            this.accessibilityTextBackground = true;
            this.touchscreen = false;
            this.fullscreen = false;
            this.viewBobbing = true;
            this.toggleCrouch = false;
            this.toggleSprint = false;
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
            console.log('Game settings loaded!');
            this.mc.outputLog += 'Game settings loaded!\n';
        }
        loadOptions() {
            if (localStorage.getItem('Options')) {
                const optionsData = new LSStore_js_1.default('Options', 'get');
                for (const s of optionsData.keySet()) {
                    const s1 = optionsData.getString(s);
                    try {
                        if ('showFPS'.equals(s))
                            GameOption_js_10.default.SHOW_FPS.set(this, s1);
                        if ('advancedItemTooltips'.equals(s))
                            GameOption_js_10.default.ADVANCED_TOOLTIPS.set(this, s1);
                        if ('heldItemTooltips'.equals(s))
                            GameOption_js_10.default.HELD_TOOLTIPS.set(this, s1);
                        if ('skipMultiplayerWarning'.equals(s))
                            GameOption_js_10.default.SKIP_MULTIPLAYER_WARNING.set(this, s1);
                        if ('rawMouseInput'.equals(s))
                            GameOption_js_10.default.RAW_MOUSE_INPUT.set(this, s1);
                        if ('autoJump'.equals(s))
                            GameOption_js_10.default.AUTO_JUMP.set(this, s1);
                        if ('autoSuggestCommands'.equals(s))
                            GameOption_js_10.default.AUTO_SUGGEST_COMMANDS.set(this, s1);
                        if ('chatColor'.equals(s))
                            GameOption_js_10.default.CHAT_COLOR.set(this, s1);
                        if ('chatLinks'.equals(s))
                            GameOption_js_10.default.CHAT_LINKS.set(this, s1);
                        if ('chatLinksPrompt'.equals(s))
                            GameOption_js_10.default.CHAT_LINKS.set(this, s1);
                        if ('vsync'.equals(s))
                            GameOption_js_10.default.VSYNC.set(this, s1);
                        if ('entityShadows'.equals(s))
                            GameOption_js_10.default.ENTITY_SHADOWS.set(this, s1);
                        if ('forceUnicodeFont'.equals(s))
                            GameOption_js_10.default.FORCE_UNICODE_FONT.set(this, s1);
                        if ('invertMouse'.equals(s))
                            GameOption_js_10.default.INVERT_MOUSE.set(this, s1);
                        if ('discreteMouseScroll'.equals(s))
                            GameOption_js_10.default.DISCRETE_MOUSE_SCROLL.set(this, s1);
                        if ('realmsNotifications'.equals(s))
                            GameOption_js_10.default.REALMS_NOTIFICATIONS.set(this, s1);
                        if ('hideMatchedNames'.equals(s))
                            GameOption_js_10.default.HIDE_GUI.set(this, s1);
                        if ('reducedDebugInfo'.equals(s))
                            GameOption_js_10.default.REDUCED_DEBUG_INFO.set(this, s1);
                        if ('snooper'.equals(s))
                            GameOption_js_10.default.SNOOPER.set(this, s1);
                        if ('showSubtitles'.equals(s))
                            GameOption_js_10.default.SHOW_SUBTITLES.set(this, s1);
                        if ('backgroundForChatOnly'.equals(s))
                            this.accessibilityTextBackground = 'true'.equals(s1);
                        if ('touchscreen'.equals(s))
                            GameOption_js_10.default.TOUCHSCREEN.set(this, s1);
                        if ('fullscreen'.equals(s))
                            GameOption_js_10.default.FULLSCREEN.set(this, s1);
                        if ('viewBobbing'.equals(s))
                            GameOption_js_10.default.VIEW_BOBBING.set(this, s1);
                        if ('toggleCrouch'.equals(s))
                            this.toggleCrouch = 'true'.equals(s1);
                        if ('toggleSprint'.equals(s))
                            this.toggleSprint = 'true'.equals(s1);
                        if ('hideGUI'.equals(s))
                            GameOption_js_10.default.HIDE_GUI.set(this, s1);
                        if ('showDebugInfo'.equals(s))
                            this.showDebugInfo = 'true'.equals(s1);
                        if ('fov'.equals(s))
                            this.fov = (parseFloat(s1) * 40.0 + 70.0);
                        if ('screenEffectScale'.equals(s))
                            this.screenEffectScale = parseFloat(s1);
                        if ('fovEffectScale'.equals(s))
                            this.fovScaleEffect = parseFloat(s1);
                        if ('biomeBlendRadius'.equals(s))
                            this.biomeBlendRadius = parseInt(s1);
                        if ('mouseWheelSensitivity'.equals(s))
                            this.mouseWheelSensitivity = parseFloat(s1);
                        if ('gamma'.equals(s))
                            this.gamma = parseFloat(s1);
                        if ('guiScale'.equals(s))
                            this.guiScale = parseInt(s1);
                        if ('mouseSensitivity'.equals(s))
                            this.mouseSensitivity = parseFloat(s1);
                        if ('renderDistanceChunks'.equals(s))
                            this.renderDistanceChunks = parseInt(s1);
                        if ('chatOpacity'.equals(s))
                            this.chatOpacity = parseFloat(s1);
                        if ('chatLineSpacing'.equals(s))
                            this.chatLineSpacing = parseFloat(s1);
                        if ('chatScale'.equals(s))
                            this.chatScale = parseFloat(s1);
                        if ('chatWidth'.equals(s))
                            this.chatWidth = parseFloat(s1);
                        if ('chatHeightUnfocused'.equals(s))
                            this.chatHeightUnfocused = parseFloat(s1);
                        if ('chatHeightFocused'.equals(s))
                            this.chatHeightFocused = parseFloat(s1);
                        if ('chatDelay'.equals(s))
                            this.chatDelay = parseFloat(s1);
                        if ('textBackgroundOpacity'.equals(s))
                            this.accessibilityTextBackgroundOpacity = parseFloat(s1);
                        if ('framerateLimit'.equals(s))
                            this.framerateLimit = parseInt(s1);
                        if ('language'.equals(s))
                            this.language = s1;
                        if ('graphicsMode'.equals(s))
                            this.graphicFanciness = GraphicsFanciness_js_1.default.byId(parseInt(s1));
                        if ('renderClouds'.equals(s)) {
                            if ('true'.equals(s1)) {
                                this.cloudOption = CloudOption_js_1.default.FANCY;
                            }
                            else if ('false'.equals(s1)) {
                                this.cloudOption = CloudOption_js_1.default.OFF;
                            }
                            else if ('fast'.equals(s1)) {
                                this.cloudOption = CloudOption_js_1.default.FAST;
                            }
                        }
                        if ('ambientOcclusionStatus'.equals(s))
                            this.ambientOcclusionStatus = AmbientOcclusionStatus_js_1.default.byId(parseInt(s1));
                        if ('attackIndicator'.equals(s))
                            this.attackIndicator = AttackIndicatorStatus_js_1.default.byId(parseInt(s1));
                        if ('narrator'.equals(s))
                            this.narrator = NarratorStatus_js_1.default.byId(parseInt(s1));
                        if ('chatVisibility'.equals(s))
                            this.chatVisibility = ChatVisibility_js_1.default.byId(parseInt(s1));
                        if ('mainHand'.equals(s))
                            this.mainHand = 'left'.equals(s1) ? HandSide_js_1.default.LEFT : HandSide_js_1.default.RIGHT;
                        if ('particles'.equals(s))
                            this.particles = ParticleStatus_js_1.default.byId(parseInt(s1));
                        if ('pointOfView'.equals(s))
                            this.pointOfView = PointOfView_js_1.default.byId(parseInt(s1));
                        for (const soundcategory of Object.values(SoundCategory_js_2.default).slice(0, -1)) {
                            if (s.equals(`soundCategory_${soundcategory.getName()}`)) {
                                this.soundLevels.set(soundcategory, parseFloat(s1));
                            }
                        }
                    }
                    catch (e) {
                        console.warn('Skipping bad option: {}:{}', s, s1);
                    }
                }
            }
        }
        saveOptions() {
            const lsoptions = new LSStore_js_1.default('Options', 'create');
            try {
                lsoptions.addLine('showFPS:' + GameOption_js_10.default.SHOW_FPS.get(this));
                lsoptions.addLine('skipMultiplayerWarning:' + GameOption_js_10.default.SKIP_MULTIPLAYER_WARNING.get(this));
                lsoptions.addLine('language:' + this.language);
                lsoptions.addLine('advancedItemTooltips:' + GameOption_js_10.default.ADVANCED_TOOLTIPS.get(this));
                lsoptions.addLine('heldItemTooltips:' + GameOption_js_10.default.HELD_TOOLTIPS.get(this));
                lsoptions.addLine('rawMouseInput:' + GameOption_js_10.default.RAW_MOUSE_INPUT.get(this));
                lsoptions.addLine('autoJump:' + GameOption_js_10.default.AUTO_JUMP.get(this));
                lsoptions.addLine('vsync:' + GameOption_js_10.default.VSYNC.get(this));
                lsoptions.addLine('forceUnicodeFont:' + GameOption_js_10.default.FORCE_UNICODE_FONT.get(this));
                lsoptions.addLine('showSubtitles:' + GameOption_js_10.default.SHOW_SUBTITLES.get(this));
                lsoptions.addLine('hideGUI:' + GameOption_js_10.default.HIDE_GUI.get(this));
                lsoptions.addLine('toggleCrouch:' + this.toggleCrouch);
                lsoptions.addLine('toggleSprint:' + this.toggleSprint);
                lsoptions.addLine('chatScale:' + this.chatScale);
                lsoptions.addLine('ambientOcclusionStatus:' + this.ambientOcclusionStatus.getId());
                lsoptions.addLine('attackIndicator:' + this.attackIndicator.getId());
                lsoptions.addLine('narrator:' + this.narrator.getId());
                lsoptions.addLine('chatVisibility:' + this.chatVisibility.getId());
                lsoptions.addLine('mainHand:' + (this.mainHand === HandSide_js_1.default.LEFT ? 'left' : 'right'));
                lsoptions.addLine('particles:' + this.particles.getId());
                lsoptions.addLine('pointOfView:' + this.pointOfView.getId());
                lsoptions.addLine('mouseSensitivity:' + this.mouseSensitivity);
                lsoptions.addLine('renderDistanceChunks:' + this.renderDistanceChunks);
                lsoptions.addLine('chatOpacity:' + this.chatOpacity);
                lsoptions.addLine('chatLineSpacing:' + this.chatLineSpacing);
                lsoptions.addLine('chatScale:' + this.chatScale);
                lsoptions.addLine('chatWidth:' + this.chatWidth);
                lsoptions.addLine('chatHeightUnfocused:' + this.chatHeightUnfocused);
                lsoptions.addLine('chatHeightFocused:' + this.chatHeightFocused);
                lsoptions.addLine('chatDelay:' + this.chatDelay);
                lsoptions.addLine('textBackgroundOpacity:' + this.accessibilityTextBackgroundOpacity);
                lsoptions.addLine('framerateLimit:' + this.framerateLimit);
                lsoptions.addLine('biomeBlendRadius:' + this.biomeBlendRadius);
                lsoptions.addLine('mouseWheelSensitivity:' + this.mouseWheelSensitivity);
                lsoptions.addLine('autoSuggestCommands:' + GameOption_js_10.default.AUTO_SUGGEST_COMMANDS.get(this));
                lsoptions.addLine('chatColor:' + GameOption_js_10.default.CHAT_COLOR.get(this));
                lsoptions.addLine('chatLinks:' + GameOption_js_10.default.CHAT_LINKS.get(this));
                lsoptions.addLine('chatLinksPrompt:' + GameOption_js_10.default.CHAT_LINKS_PROMPT.get(this));
                lsoptions.addLine('entityShadows:' + GameOption_js_10.default.ENTITY_SHADOWS.get(this));
                lsoptions.addLine('invertMouse:' + GameOption_js_10.default.INVERT_MOUSE.get(this));
                lsoptions.addLine('discreteMouseScroll:' + GameOption_js_10.default.DISCRETE_MOUSE_SCROLL.get(this));
                lsoptions.addLine('realmsNotifications:' + GameOption_js_10.default.REALMS_NOTIFICATIONS.get(this));
                lsoptions.addLine('hideMatchedNames:' + this.hideMatchedNames);
                lsoptions.addLine('reducedDebugInfo:' + GameOption_js_10.default.REDUCED_DEBUG_INFO.get(this));
                lsoptions.addLine('snooper:' + GameOption_js_10.default.SNOOPER.get(this));
                lsoptions.addLine('backgroundForChatOnly:' + this.accessibilityTextBackground);
                lsoptions.addLine('touchscreen:' + GameOption_js_10.default.TOUCHSCREEN.get(this));
                lsoptions.addLine('fullscreen:' + GameOption_js_10.default.FULLSCREEN.get(this));
                lsoptions.addLine('viewBobbing:' + GameOption_js_10.default.VIEW_BOBBING.get(this));
                lsoptions.addLine('showDebugInfo:' + this.showDebugInfo);
                lsoptions.addLine('fov:' + (this.fov - 70) / 40);
                lsoptions.addLine('screenEffectScale:' + this.screenEffectScale);
                lsoptions.addLine('fovScaleEffect:' + this.fovScaleEffect);
                lsoptions.addLine('gamma:' + this.gamma);
                lsoptions.addLine('guiScale:' + this.guiScale);
                lsoptions.addLine("graphicsMode:" + this.graphicFanciness.getId());
                switch (this.cloudOption) {
                    case CloudOption_js_1.default.FANCY:
                        lsoptions.addLine("renderClouds:true");
                        break;
                    case CloudOption_js_1.default.FAST:
                        lsoptions.addLine("renderClouds:fast");
                        break;
                    case CloudOption_js_1.default.OFF:
                        lsoptions.addLine("renderClouds:false");
                        break;
                }
                for (const soundcategory of Object.values(SoundCategory_js_2.default).slice(0, -1)) {
                    lsoptions.addLine(`soundCategory_${soundcategory.getName()}:` + this.getSoundLevel(soundcategory));
                }
                lsoptions.saveToLS();
            }
            catch (e) {
                console.error('Failed to save options', e);
            }
        }
        getSoundLevel(category) {
            return this.soundLevels.has(category) ? this.soundLevels.get(category) : 1.0;
        }
        setSoundLevel(category, volume) {
            this.soundLevels.set(category, volume);
        }
        getModelParts() {
            const copy = new Set();
            for (const item of this.setModelParts)
                copy.add(item);
            return copy;
        }
        switchModelPartEnabled(modelPart) {
            if (this.getModelParts().has(modelPart)) {
                this.setModelParts.delete(modelPart);
            }
            else {
                this.setModelParts.add(modelPart);
            }
        }
    }
    exports.default = GameSettings;
});
define("settings/BooleanOption", ["require", "exports", "gui/widgets/button/OptionButton", "utils/TranslationText", "settings/AbstractOption"], function (require, exports, OptionButton_js_5, TranslationText_js_15, AbstractOption_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    OptionButton_js_5 = __importDefault(OptionButton_js_5);
    AbstractOption_js_1 = __importDefault(AbstractOption_js_1);
    class BooleanOption extends AbstractOption_js_1.default {
        constructor(translationKeyIn, getter, setter) {
            super(translationKeyIn);
            this.getter = getter;
            this.setter = setter;
        }
        set(options, valueIn) {
            this.setPriv(options, valueIn === 'true');
        }
        nextValue(options) {
            this.setPriv(options, !this.get(options));
            options.saveOptions();
        }
        setPriv(options, valueIn) {
            this.setter(options, valueIn);
        }
        get(options) {
            return this.getter(options);
        }
        createWidget(options, xIn, yIn, widthIn) {
            return new OptionButton_js_5.default(xIn, yIn, widthIn, 20, this, this.getName(options), () => {
                this.nextValue(options);
            });
        }
        getName(options) {
            return TranslationText_js_15.getKeyTranslation(this.getBaseMessageTranslation()) + ': ' + TranslationText_js_15.getKeyTranslation(this.get(options) === true ? 'options.on' : 'options.off');
        }
    }
    exports.default = BooleanOption;
});
define("settings/IteratableOption", ["require", "exports", "gui/widgets/button/OptionButton", "settings/AbstractOption"], function (require, exports, OptionButton_js_6, AbstractOption_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    OptionButton_js_6 = __importDefault(OptionButton_js_6);
    AbstractOption_js_2 = __importDefault(AbstractOption_js_2);
    class NewIteratableOption extends AbstractOption_js_2.default {
        constructor(translationKeyIn, setterIn, getterIn) {
            super(translationKeyIn);
            this.setter = setterIn;
            this.getter = getterIn;
        }
        setValueIndex(options, valueIn) {
            this.setter(options, valueIn);
            options.saveOptions();
        }
        createWidget(options, xIn, yIn, widthIn) {
            return new OptionButton_js_6.default(xIn, yIn, widthIn, 20, this, this.getName(options), () => {
                this.setValueIndex(options, 1);
            });
        }
        getName(settings) {
            return this.getter(settings, this);
        }
    }
    exports.default = NewIteratableOption;
});
define("settings/SliderMultiplierOption", ["require", "exports", "settings/SliderPercentageOption"], function (require, exports, SliderPercentageOption_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    SliderPercentageOption_1 = __importDefault(SliderPercentageOption_1);
    class SliderMultiplierOption extends SliderPercentageOption_1.default {
        constructor(translationKey, minValueIn, maxValueIn, stepSizeIn, getterIn, setterIn, getterDisplayString) {
            super(translationKey, minValueIn, maxValueIn, stepSizeIn, getterIn, setterIn, getterDisplayString);
        }
        normalizeValue(value) {
            return Math.log(value / this.minValue) / Math.log(this.maxValue / this.minValue);
        }
        denormalizeValue(value) {
            return this.minValue * Math.pow(Math.E, Math.log(this.maxValue / this.minValue) * value);
        }
    }
    exports.default = SliderMultiplierOption;
});
define("GameOption", ["require", "exports", "settings/AmbientOcclusionStatus", "settings/AttackIndicatorStatus", "settings/BooleanOption", "settings/ChatVisibility", "settings/CloudOption", "settings/GraphicsFanciness", "settings/HandSide", "settings/NarratorStatus", "settings/IteratableOption", "settings/ParticleStatus", "settings/PointOfView", "utils/TranslationText", "settings/SliderPercentageOption", "utils/MathHelper", "utils/MouseHelper", "settings/SliderMultiplierOption"], function (require, exports, AmbientOcclusionStatus_1, AttackIndicatorStatus_1, BooleanOption_1, ChatVisibility_1, CloudOption_1, GraphicsFanciness_1, HandSide_1, NarratorStatus_1, IteratableOption_js_1, ParticleStatus_1, PointOfView_1, TranslationText_4, SliderPercentageOption_2, MathHelper_11, MouseHelper_3, SliderMultiplierOption_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    AmbientOcclusionStatus_1 = __importDefault(AmbientOcclusionStatus_1);
    AttackIndicatorStatus_1 = __importDefault(AttackIndicatorStatus_1);
    BooleanOption_1 = __importDefault(BooleanOption_1);
    ChatVisibility_1 = __importDefault(ChatVisibility_1);
    CloudOption_1 = __importDefault(CloudOption_1);
    GraphicsFanciness_1 = __importDefault(GraphicsFanciness_1);
    HandSide_1 = __importDefault(HandSide_1);
    NarratorStatus_1 = __importDefault(NarratorStatus_1);
    IteratableOption_js_1 = __importDefault(IteratableOption_js_1);
    ParticleStatus_1 = __importDefault(ParticleStatus_1);
    PointOfView_1 = __importDefault(PointOfView_1);
    SliderPercentageOption_2 = __importDefault(SliderPercentageOption_2);
    MathHelper_11 = __importDefault(MathHelper_11);
    SliderMultiplierOption_1 = __importDefault(SliderMultiplierOption_1);
    class GameOption {
    }
    exports.default = GameOption;
    GameOption.RAW_MOUSE_INPUT = new BooleanOption_1.default('options.rawMouseInput', (settings) => {
        return settings.rawMouseInput;
    }, (settings, optionValues) => {
        settings.rawMouseInput = optionValues;
    });
    GameOption.AUTO_SUGGEST_COMMANDS = new BooleanOption_1.default('options.autoSuggestCommands', (settings) => {
        return settings.autoSuggestCommands;
    }, (settings, optionValues) => {
        settings.autoSuggestCommands = optionValues;
    });
    GameOption.field_244786_G = new BooleanOption_1.default('options.hideMatchedNames', (settings) => {
        return settings.hideMatchedNames;
    }, (settings, optionValues) => {
        settings.hideMatchedNames = optionValues;
    });
    GameOption.CHAT_COLOR = new BooleanOption_1.default('options.chat.color', (settings) => {
        return settings.chatColor;
    }, (settings, optionValues) => {
        settings.chatColor = optionValues;
    });
    GameOption.CHAT_LINKS = new BooleanOption_1.default('options.chat.links', (settings) => {
        return settings.chatLinks;
    }, (settings, optionValues) => {
        settings.chatLinks = optionValues;
    });
    GameOption.CHAT_LINKS_PROMPT = new BooleanOption_1.default('options.chat.links.prompt', (settings) => {
        return settings.chatLinksPrompt;
    }, (settings, optionValues) => {
        settings.chatLinksPrompt = optionValues;
    });
    GameOption.DISCRETE_MOUSE_SCROLL = new BooleanOption_1.default('options.discrete_mouse_scroll', (settings) => {
        return settings.discreteMouseScroll;
    }, (settings, optionValues) => {
        settings.discreteMouseScroll = optionValues;
    });
    GameOption.VSYNC = new BooleanOption_1.default('options.vsync', (settings) => {
        return settings.vsync;
    }, (settings, optionValues) => {
        settings.vsync = optionValues;
    });
    GameOption.ENTITY_SHADOWS = new BooleanOption_1.default('options.entityShadows', (settings) => {
        return settings.entityShadows;
    }, (settings, optionValues) => {
        settings.entityShadows = optionValues;
    });
    GameOption.FORCE_UNICODE_FONT = new BooleanOption_1.default('options.forceUnicodeFont', (settings) => {
        return settings.forceUnicodeFont;
    }, (settings, optionValues) => {
        settings.forceUnicodeFont = optionValues;
    });
    GameOption.INVERT_MOUSE = new BooleanOption_1.default('options.invertMouse', (settings) => {
        return settings.invertMouse;
    }, (settings, optionValues) => {
        settings.invertMouse = optionValues;
    });
    GameOption.REALMS_NOTIFICATIONS = new BooleanOption_1.default('options.realmsNotifications', (settings) => {
        return settings.realmsNotifications;
    }, (settings, optionValues) => {
        settings.realmsNotifications = optionValues;
    });
    GameOption.REDUCED_DEBUG_INFO = new BooleanOption_1.default('options.reducedDebugInfo', (settings) => {
        return settings.reducedDebugInfo;
    }, (settings, optionValues) => {
        settings.reducedDebugInfo = optionValues;
    });
    GameOption.SHOW_SUBTITLES = new BooleanOption_1.default('options.showSubtitles', (settings) => {
        return settings.showSubtitles;
    }, (settings, optionValues) => {
        settings.showSubtitles = optionValues;
    });
    GameOption.SNOOPER = new BooleanOption_1.default('options.snooper', (settings) => {
        return false;
    }, (settings, optionValues) => {
        settings.snooper = optionValues;
    });
    GameOption.TOUCHSCREEN = new BooleanOption_1.default('options.touchscreen', (settings) => {
        return settings.touchscreen;
    }, (settings, optionValues) => {
        settings.touchscreen = optionValues;
    });
    GameOption.FULLSCREEN = new BooleanOption_1.default('options.fullscreen', (settings) => {
        return settings.fullscreen;
    }, (settings, optionValues) => {
        let elem = document.documentElement;
        settings.fullscreen = optionValues;
    });
    GameOption.VIEW_BOBBING = new BooleanOption_1.default('options.viewBobbing', (settings) => {
        return settings.viewBobbing;
    }, (settings, optionValues) => {
        settings.viewBobbing = optionValues;
    });
    GameOption.AUTO_JUMP = new BooleanOption_1.default('options.autoJump', (settings) => {
        return settings.autoJump;
    }, (settings, optionValues) => {
        settings.autoJump = optionValues;
    });
    GameOption.SHOW_FPS = new BooleanOption_1.default('Show FPS', (settings) => {
        return settings.showFPS;
    }, (settings, optionValues) => {
        settings.showFPS = optionValues;
    });
    GameOption.HIDE_GUI = new BooleanOption_1.default('Hide GUI', (settings) => {
        return settings.hideGUI;
    }, (settings, optionValues) => {
        settings.hideGUI = optionValues;
    });
    GameOption.SKIP_MULTIPLAYER_WARNING = new BooleanOption_1.default('Skip Multiplayer Warning', (settings) => {
        return settings.skipMultiplayerWarning;
    }, (settings, optionValues) => {
        settings.skipMultiplayerWarning = optionValues;
    });
    GameOption.ADVANCED_TOOLTIPS = new BooleanOption_1.default('Advanced tooltips', (settings) => {
        return settings.advancedItemTooltips;
    }, (settings, optionValues) => {
        settings.advancedItemTooltips = optionValues;
    });
    GameOption.HELD_TOOLTIPS = new BooleanOption_1.default('Held tooltips', (settings) => {
        return settings.heldItemTooltips;
    }, (settings, optionValues) => {
        settings.heldItemTooltips = optionValues;
    });
    GameOption.HIDE_MATCHED_NAMES = new BooleanOption_1.default('options.hideMatchedNames', (settings) => {
        return settings.hideMatchedNames;
    }, (settings, optionValues) => {
        settings.hideMatchedNames = optionValues;
    });
    GameOption.AO = new IteratableOption_js_1.default('options.ao', (settings, optionValues) => {
        settings.ambientOcclusionStatus = AmbientOcclusionStatus_1.default.byId(settings.ambientOcclusionStatus.getId() + optionValues);
    }, (settings, optionValues) => {
        return optionValues.getGenericValueComponent(TranslationText_4.getKeyTranslation(settings.ambientOcclusionStatus.getKey()));
    });
    GameOption.ATTACK_INDICATOR = new IteratableOption_js_1.default('options.attackIndicator', (settings, optionValues) => {
        settings.attackIndicator = AttackIndicatorStatus_1.default.byId(settings.attackIndicator.getId() + optionValues);
    }, (settings, optionValues) => {
        return optionValues.getGenericValueComponent(TranslationText_4.getKeyTranslation(settings.attackIndicator.getKey()));
    });
    GameOption.CHAT_VISIBILITY = new IteratableOption_js_1.default('options.chat.visibility', (settings, optionValues) => {
        settings.chatVisibility = ChatVisibility_1.default.byId(settings.chatVisibility.getId() + optionValues);
    }, (settings, optionValues) => {
        return optionValues.getGenericValueComponent(settings.chatVisibility.getKey());
    });
    GameOption.MAIN_HAND = new IteratableOption_js_1.default('options.mainHand', (settings, optionValues) => {
        settings.mainHand = HandSide_1.default.byId(settings.narrator.getId() + optionValues);
    }, (settings, optionValues) => {
        return optionValues.getGenericValueComponent(settings.mainHand.getKey());
    });
    GameOption.NARRATOR = new IteratableOption_js_1.default('options.narrator', (settings, optionValues) => {
        settings.narrator = NarratorStatus_1.default.byId(settings.narrator.getId() + optionValues);
    }, (settings, optionValues) => {
        return optionValues.getGenericValueComponent(settings.narrator.getKey());
    });
    GameOption.PARTICLES = new IteratableOption_js_1.default('options.particles', (settings, optionValues) => {
        settings.particles = ParticleStatus_1.default.byId(settings.particles.getId() + optionValues);
    }, (settings, optionValues) => {
        return optionValues.getGenericValueComponent(TranslationText_4.getKeyTranslation(settings.particles.getKey()));
    });
    GameOption.RENDER_CLOUDS = new IteratableOption_js_1.default('options.renderClouds', (settings, optionValues) => {
        settings.cloudOption = CloudOption_1.default.byId(settings.cloudOption.getId() + optionValues);
    }, (settings, optionValues) => {
        return optionValues.getGenericValueComponent(TranslationText_4.getKeyTranslation(settings.cloudOption.getKey()));
    });
    GameOption.ACCESSIBILITY_TEXT_BACKGROUND = new IteratableOption_js_1.default('options.accessibility.text_background', (settings, optionValues) => {
        settings.accessibilityTextBackground = !settings.accessibilityTextBackground;
    }, (settings, optionValues) => {
        return optionValues.getGenericValueComponent(TranslationText_4.getKeyTranslation(settings.accessibilityTextBackground ? 'options.accessibility.text_background.chat' : 'options.accessibility.text_background.everywhere'));
    });
    GameOption.GUI_SCALE = new IteratableOption_js_1.default('options.guiScale', (settings, optionValues) => {
        settings.guiScale = 0;
    }, (settings, optionValues) => {
        return settings.guiScale == 0 ? optionValues.getGenericValueComponent(TranslationText_4.getKeyTranslation('options.guiScale.auto')) : optionValues.getMessageWithValue(settings.guiScale);
    });
    GameOption.SNEAK = new IteratableOption_js_1.default('key.sneak', (settings, optionValues) => {
        settings.toggleCrouch = !settings.toggleCrouch;
    }, (settings, optionValues) => {
        return optionValues.getGenericValueComponent(TranslationText_4.getKeyTranslation(settings.toggleCrouch ? 'options.key.toggle' : 'options.key.hold'));
    });
    GameOption.SPRINT = new IteratableOption_js_1.default('key.sprint', (settings, optionValues) => {
        settings.toggleSprint = !settings.toggleSprint;
    }, (settings, optionValues) => {
        return optionValues.getGenericValueComponent(TranslationText_4.getKeyTranslation(settings.toggleSprint ? 'options.key.toggle' : 'options.key.hold'));
    });
    GameOption.GRAPHICS_FANCINESS = new IteratableOption_js_1.default('options.graphics', (settings, optionValues) => {
        settings.graphicFanciness = GraphicsFanciness_1.default.byId(settings.graphicFanciness.getId() + optionValues);
    }, (settings, optionValues) => {
        return optionValues.getGenericValueComponent(TranslationText_4.getKeyTranslation(settings.graphicFanciness.getKey()));
    });
    GameOption.POINT_OF_VIEW = new IteratableOption_js_1.default('POINT_OF_VIEW', (settings, optionValues) => {
        settings.pointOfView = PointOfView_1.default.byId(settings.pointOfView.getId() + optionValues);
    }, (settings, optionValues) => {
        return optionValues.getGenericValueComponent(TranslationText_4.getKeyTranslation(settings.pointOfView.getKey()));
    });
    GameOption.CHAT_SCALE = new SliderPercentageOption_2.default('options.chat.scale', 0, 1, 0, (settings) => {
        return settings.chatScale;
    }, (settings, optionValues) => {
        settings.chatScale = optionValues;
    }, (settings, optionValues) => {
        let value = optionValues.normalizeValue(optionValues.get(settings));
        return (value == 0 ? (TranslationText_4.getKeyTranslation(optionValues.getBaseMessageTranslation()) + ': ' + TranslationText_4.getKeyTranslation(optionValues.get(settings) === true ? 'options.on' : 'options.off')) : optionValues.getPercentValueComponent(value));
    });
    GameOption.CHAT_OPACITY = new SliderPercentageOption_2.default('options.chat.opacity', 0, 1, 0, (settings) => {
        return settings.chatOpacity;
    }, (settings, optionValues) => {
        settings.chatOpacity = optionValues;
    }, (settings, optionValues) => {
        let value = optionValues.normalizeValue(optionValues.get(settings));
        return optionValues.getPercentValueComponent(value * 0.9 + 0.1);
    });
    GameOption.LINE_SPACING = new SliderPercentageOption_2.default('options.chat.line_spacing', 0, 1, 0, (settings) => {
        return settings.chatLineSpacing;
    }, (settings, optionValues) => {
        settings.chatLineSpacing = optionValues;
    }, (settings, optionValues) => {
        return optionValues.getPercentValueComponent(optionValues.normalizeValue(optionValues.get(settings)));
    });
    GameOption.FOV_EFFECT_SCALE_SLIDER = new SliderPercentageOption_2.default('options.fovEffectScale', 0.0, 1.0, 0.0, (settings) => {
        return Math.pow(settings.fovScaleEffect, 2.0);
    }, (settings, optionValues) => {
        settings.fovScaleEffect = MathHelper_11.default.sqrt(optionValues);
    }, (settings, optionValues) => {
        let value = optionValues.normalizeValue(optionValues.get(settings));
        return value == 0.0 ? optionValues.getGenericValueComponent(TranslationText_4.getKeyTranslation('options.fovEffectScale.off')) : optionValues.getPercentValueComponent(value);
    });
    GameOption.SCREEN_EFFECT_SCALE_SLIDER = new SliderPercentageOption_2.default('options.screenEffectScale', 0.0, 1.0, 0.0, (settings) => {
        return settings.screenEffectScale;
    }, (settings, percentage) => {
        settings.screenEffectScale = percentage;
    }, (percentage, percentage2) => {
        let value = percentage2.normalizeValue(percentage2.get(percentage));
        return value == 0.0 ? percentage2.getGenericValueComponent(TranslationText_4.getKeyTranslation('options.screenEffectScale.off')) : percentage2.getPercentValueComponent(value);
    });
    GameOption.DELAY_INSTANT = new SliderPercentageOption_2.default('options.chat.delay_instant', 0, 6, 0.1, (settings) => {
        return settings.chatDelay;
    }, (settings, optionValues) => {
        settings.chatDelay = optionValues;
    }, (settings, optionValues) => {
        let value = optionValues.get(settings);
        return value <= 0 ? TranslationText_4.getKeyTranslation('options.chat.delay_none') : TranslationText_4.getKeyTranslation('options.chat.delay').replace('%s', value.toFixed(1));
    });
    GameOption.ACCESSIBILITY_TEXT_BACKGROUND_OPACITY = new SliderPercentageOption_2.default('options.accessibility.text_background_opacity', 0, 1, 0, (settings) => {
        return settings.accessibilityTextBackgroundOpacity;
    }, (settings, optionValues) => {
        settings.accessibilityTextBackgroundOpacity = optionValues;
    }, (settings, optionValues) => {
        return optionValues.getPercentValueComponent(optionValues.normalizeValue(optionValues.get(settings)));
    });
    GameOption.CHAT_WIDTH = new SliderPercentageOption_2.default('options.chat.width', 0, 1, 0, (settings) => {
        return settings.chatWidth;
    }, (settings, optionValues) => {
        settings.chatWidth = optionValues;
    }, (settings, optionValues) => {
        const value = optionValues.normalizeValue(optionValues.get(settings));
        return optionValues.getPixelValueComponent(Math.floor(value * 280 + 40));
    });
    GameOption.CHAT_HEIGHT_FOCUSED = new SliderPercentageOption_2.default('options.chat.height.focused', 0, 1, 0, (settings) => {
        return settings.chatHeightFocused;
    }, (settings, optionValues) => {
        settings.chatHeightFocused = optionValues;
    }, (settings, optionValues) => {
        const value = optionValues.normalizeValue(optionValues.get(settings));
        return optionValues.getPixelValueComponent(Math.floor(value * 160 + 20));
    });
    GameOption.CHAT_HEIGHT_UNFOCUSED = new SliderPercentageOption_2.default('options.chat.height.unfocused', 0, 1, 0, (settings) => {
        return settings.chatHeightUnfocused;
    }, (settings, optionValues) => {
        settings.chatHeightUnfocused = optionValues;
    }, (settings, optionValues) => {
        const value = optionValues.normalizeValue(optionValues.get(settings));
        return optionValues.getPixelValueComponent(Math.floor(value * 160 + 20));
    });
    GameOption.RENDER_DISTANCE = new SliderPercentageOption_2.default('options.renderDistance', 2, 64, 1, (settings) => {
        return settings.renderDistanceChunks;
    }, (settings, optionValues) => {
        settings.renderDistanceChunks = optionValues;
    }, (settings, optionValues) => {
        const value = optionValues.get(settings);
        return optionValues.getGenericValueComponent(TranslationText_4.getKeyTranslation('options.chunks').replace('%s', value));
    });
    GameOption.ENTITY_DISTANCE_SCALING = new SliderPercentageOption_2.default('options.entityDistanceScaling', 0.5, 5, 0.25, (settings) => {
        return settings.entityDistanceScaling;
    }, (settings, optionValues) => {
        settings.entityDistanceScaling = optionValues;
    }, (settings, optionValues) => {
        const value = optionValues.get(settings);
        return optionValues.getPercentValueComponent(value);
    });
    GameOption.GAMMA = new SliderPercentageOption_2.default('options.gamma', 0, 1, 0, (settings) => {
        return settings.gamma;
    }, (settings, optionValues) => {
        settings.gamma = optionValues;
    }, (settings, optionValues) => {
        const value = optionValues.normalizeValue(optionValues.get(settings));
        if (value == 0.0)
            return optionValues.getGenericValueComponent(TranslationText_4.getKeyTranslation('options.gamma.min'));
        else
            return value == 1.0 ? optionValues.getGenericValueComponent(TranslationText_4.getKeyTranslation('options.gamma.max')) : optionValues.getPercentageAddMessage((value * 100));
    });
    GameOption.MIPMAP_LEVELS = new SliderPercentageOption_2.default('options.mipmapLevels', 0, 4, 1, (settings) => {
        return settings.mipmapLevels;
    }, (settings, optionValues) => {
        settings.mipmapLevels = optionValues;
    }, (settings, optionValues) => {
        const value = optionValues.get(settings);
        return (value == 0.0 ? `${optionValues.getBaseMessageTranslation()}: ${TranslationText_4.getKeyTranslation('options.off')}` : optionValues.getMessageWithValue(value));
    });
    GameOption.FRAMERATE_LIMIT = new SliderPercentageOption_2.default('options.framerateLimit', 10, 260, 10, (settings) => {
        return settings.framerateLimit;
    }, (settings, percentage) => {
        settings.framerateLimit = percentage;
    }, (settings, percentage) => {
        const value = percentage.get(settings);
        return value == percentage.getMaxValue() ? percentage.getGenericValueComponent(TranslationText_4.getKeyTranslation('options.framerateLimit.max')) : percentage.getGenericValueComponent(TranslationText_4.getKeyTranslation('options.framerate').replace('%s', value));
    });
    GameOption.FOV = new SliderPercentageOption_2.default('options.fov', 30, 110, 1, (settings) => {
        return settings.fov;
    }, (settings, optionValues) => {
        settings.fov = optionValues;
    }, (settings, optionValues) => {
        const value = optionValues.get(settings);
        if (value == 70.0)
            return optionValues.getGenericValueComponent(TranslationText_4.getKeyTranslation('options.fov.min'));
        else
            return value == optionValues.getMaxValue() ? optionValues.getGenericValueComponent(TranslationText_4.getKeyTranslation('options.fov.max')) : optionValues.getMessageWithValue(MouseHelper_3.int(value));
    });
    GameOption.SENSITIVITY = new SliderPercentageOption_2.default('options.sensitivity', 0, 1, 0, (settings) => {
        return settings.mouseSensitivity;
    }, (settings, optionValues) => {
        settings.mouseSensitivity = optionValues;
    }, (settings, optionValues) => {
        const value = optionValues.normalizeValue(optionValues.get(settings));
        if (value == 0)
            return optionValues.getGenericValueComponent(TranslationText_4.getKeyTranslation('options.sensitivity.min'));
        else
            return value == 1 ? optionValues.getGenericValueComponent(TranslationText_4.getKeyTranslation('options.sensitivity.max')) : optionValues.getPercentValueComponent(2 * value);
    });
    GameOption.MOUSE_WHEEL_SENSITIVITY = new SliderMultiplierOption_1.default('options.mouseWheelSensitivity', 0.01, 10, 0.01, (settings) => {
        return settings.mouseWheelSensitivity;
    }, (settings, optionValues) => {
        settings.mouseWheelSensitivity = optionValues;
    }, (settings, optionValues) => {
        const value = optionValues.normalizeValue(optionValues.get(settings));
        return optionValues.getGenericValueComponent(optionValues.denormalizeValue(value).toFixed(2));
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
define("gui/screens/WithNarratorSettingsScreen", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
