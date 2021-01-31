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
define("utils/GetResources", ["require", "exports", "gui/FontRenderer", "utils/JSONUtils"], function (require, exports, FontRenderer_1, JSONUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getResources = exports.clickSound = exports.optionsBackgroundImg = exports.accessibilityImg = exports.checkboxImg = exports.widgetsImg = exports.editionImg = exports.minecraftImg = exports.mojangstudiosImg = exports.fontImg = exports.langNames = exports.getFontChars = exports.addCharacterRenderer = exports.characterRenderers = exports.Resources = void 0;
    JSONUtils_1 = __importDefault(JSONUtils_1);
    exports.Resources = {
        languages: [],
        texts: {
            credits: [],
            end: [],
            splashes: []
        },
        font: {}
    };
    exports.characterRenderers = {};
    let addCharacterRenderer = (color, char) => {
        if (!exports.characterRenderers[color]) {
            exports.characterRenderers[color] = {};
        }
        exports.characterRenderers[color][char] = {
            text: new FontRenderer_1.CharacterRenderer(char, color).create(),
            textShadow: new FontRenderer_1.CharacterRenderer(char, color).createShadow()
        };
    };
    exports.addCharacterRenderer = addCharacterRenderer;
    exports.getFontChars = {};
    exports.langNames = ['af_za', 'ar_sa', 'ast_es', 'az_az', 'ba_ru', 'bar', 'be_by', 'bg_bg', 'br_fr', 'brb', 'bs_ba', 'ca_es', 'cs_cz', 'cy_gb', 'da_dk', 'de_at', 'de_ch', 'de_de', 'el_gr', 'en_au', 'en_ca', 'en_gb', 'en_nz', 'en_pt', 'en_ud', 'en_us', 'enp', 'enws', 'eo_uy', 'es_ar', 'es_cl', 'es_ec', 'es_ec', 'es_es', 'es_mx', 'es_uy', 'es_ve', 'esan', 'et_ee', 'eu_es', 'fa_ir', 'fi_fi', 'fil_ph', 'fo_fo', 'fr_ca', 'fr_fr', 'fra_de', 'fy_nl', 'ga_ie', 'gd_gb', 'gl_es', 'got_de', 'gv_im', 'haw_us', 'he_il', 'hi_in', 'hr_hr', 'hu_hu', 'hy_am', 'id_id', 'ig_ng', 'io_en', 'is_is', 'isv', 'it_it', 'ja_jp', 'jbo_en', 'ka_ge', 'kab_kab', 'kk_kz', 'kn_in', 'ko_kr', 'ksh', 'kw_gb', 'la_la', 'lb_lu', 'li_li', 'lol_us', 'lt_lt', 'lv_lv', 'mi_nz', 'mk_mk', 'mn_mn', 'moh_ca', 'ms_my', 'mt_mt', 'nds_de', 'nl_be', 'nl_nl', 'nn_no', 'no_no', 'nuk', 'oc_fr', 'oj_ca', 'ovd', 'pl_pl', 'pt_br', 'pt_pt', 'qya_aa', 'ro_ro', 'ru_ru', 'scn', 'se_no', 'sk_sk', 'sl_si', 'so_so', 'sq_al', 'sr_sp', 'sv_se', 'swg', 'sxu', 'szl', 'ta_in', 'th_th', 'tl_ph', 'tlh_aa', 'tr_tr', 'tt_ru', 'tzl_tzl', 'uk_ua', 'val_es', 'vec_it', 'vi_vn', 'yi_de', 'yo_ng', 'zh_cn', 'zh_tw'];
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
        exports.widgetsImg.src = `./${rootloc}/textures/gui/widgets.png`;
        exports.checkboxImg.src = `./${rootloc}/textures/gui/checkbox.png`;
        exports.accessibilityImg.src = `./${rootloc}/textures/gui/accessibility.png`;
        exports.optionsBackgroundImg.src = `./${rootloc}/textures/gui/options_background.png`;
        exports.clickSound.src = `https://raw.githubusercontent.com/KalmeMarq/Minecraft-JS-Assets/main/assets/sounds/click_stereo.ogg`;
        ['credits', 'end', 'splashes'].forEach(async (name) => {
            const s = name;
            await JSONUtils_1.default.getTextFile(`https://raw.githubusercontent.com/KalmeMarq/Minecraft-JS-Assets/main/assets/texts/${name}.txt`, (data) => data.split(/\r?\n/).forEach((line) => exports.Resources.texts[s].push(line)));
        });
        await JSONUtils_1.default.getJSONFile(`./${rootloc}/lang/en_us.json`, (data) => exports.Resources.languages.push({ code: 'en_us', data: data }));
        exports.langNames.forEach(async (name) => { if (name !== 'en_us')
            await JSONUtils_1.default.getJSONFile(`https://raw.githubusercontent.com/KalmeMarq/Minecraft-JS-Assets/main/assets/lang/${name}.json`, (data) => exports.Resources.languages.push({ code: name, data: data })); });
        await JSONUtils_1.default.getJSONFile(`./${rootloc}/font/font.json`, (data) => exports.Resources.font = data);
        exports.getFontChars = exports.Resources.font;
        if (exports.Resources.font !== {} && exports.Resources.languages !== [] && exports.Resources.texts.credits !== [] && exports.Resources.texts.splashes !== [])
            return exports.Resources;
    }
    exports.getResources = getResources;
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
define("gui/FontRenderer", ["require", "exports", "utils/GetResources", "utils/ColorHelper"], function (require, exports, GetResources_js_1, ColorHelper_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CharacterRenderer = void 0;
    ColorHelper_js_1 = __importDefault(ColorHelper_js_1);
    class CharacterRenderer {
        constructor(char, color) {
            this.char = char;
            this.charWidth = GetResources_js_1.getFontChars[this.char].w;
            this.charHeight = GetResources_js_1.getFontChars[this.char].h;
            this.r = ColorHelper_js_1.default.getRed(color);
            this.g = ColorHelper_js_1.default.getGreen(color);
            this.b = ColorHelper_js_1.default.getBlue(color);
        }
        create() {
            const ctxfont = document.createElement('canvas').getContext('2d');
            ctxfont.canvas.width = this.charWidth;
            ctxfont.canvas.height = this.charHeight;
            ctxfont.drawImage(GetResources_js_1.fontImg, GetResources_js_1.getFontChars[this.char].x, GetResources_js_1.getFontChars[this.char].y, this.charWidth, this.charHeight, 0, 0, this.charWidth, this.charHeight);
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
            ctxfont.drawImage(GetResources_js_1.fontImg, GetResources_js_1.getFontChars[this.char].x, GetResources_js_1.getFontChars[this.char].y, this.charWidth, this.charHeight, 0, 0, this.charWidth, this.charHeight);
            ctxfont.save();
            let myImg = ctxfont.getImageData(0, 0, this.charWidth * 3, this.charHeight * 3);
            ctxfont.clearRect(0, 0, this.charWidth, this.charHeight);
            for (var p = 0; p < myImg.data.length; p += 4)
                myImg.data[p] = this.r - (42.5 * 5.4), myImg.data[p + 1] = this.g - (42.5 * 5.4), myImg.data[p + 2] = this.b - (42.5 * 5.4);
            ctxfont.restore();
            ctxfont.putImageData(myImg, 0, 0);
            return ctxfont.canvas;
        }
    }
    exports.CharacterRenderer = CharacterRenderer;
    class FontRenderer {
        static getTextWidth(text) {
            let width = 0;
            text.split('').forEach((char, idx) => width += GetResources_js_1.getFontChars[text[idx]].w - 1);
            return width;
        }
        static drawStringWithShadow(context, text, posX, posY, color, _formatting) {
            for (var j = 0, k = posX; j < text.length; j++) {
                const char = text[j];
                if (!(GetResources_js_1.characterRenderers[color] && GetResources_js_1.characterRenderers[color][char]))
                    GetResources_js_1.addCharacterRenderer(color, char);
                context.drawImage(GetResources_js_1.characterRenderers[color][char]['textShadow'], k - 1 + 1, posY + 1);
                context.drawImage(GetResources_js_1.characterRenderers[color][char]['text'], k - 1, posY);
                k += GetResources_js_1.getFontChars[char].w - 1;
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
define("utils/PlaySound", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.playSound = void 0;
    function playSound(src, volume) {
        let sound = new Audio(src);
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
define("index", ["require", "exports", "GameConfiguration", "Minecraft", "utils/GetResources"], function (require, exports, GameConfiguration_js_1, Minecraft_js_1, GetResources_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Resources = void 0;
    GameConfiguration_js_1 = __importDefault(GameConfiguration_js_1);
    Minecraft_js_1 = __importDefault(Minecraft_js_1);
    class Main {
        static async main() {
            document.getElementById('root').getContext('2d').clearRect(0, 0, window.innerWidth, window.innerHeight);
            exports.Resources = await GetResources_js_2.getResources();
            console.log(exports.Resources);
            const gameconfigs = new GameConfiguration_js_1.default(new GameConfiguration_js_1.default.UserInformation('KalmeMarq'), new GameConfiguration_js_1.default.GameInformation(false, '1.42.0', 'release', 'vanilla'));
            let minecraft;
            try {
                minecraft = new Minecraft_js_1.default(gameconfigs);
                console.log('Minecraft Initialized!');
            }
            catch (e) {
                console.log('Couldn\'t Initialize Minecraft! What a pain..');
                console.log(e);
            }
        }
    }
    Main.main();
});
define("utils/TranslationText", ["require", "exports", "index"], function (require, exports, index_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getKeyTranslation = void 0;
    class TranslationTextComponent {
        constructor(translateKey) {
            this.translateKey = translateKey;
        }
        get() {
            try {
                const s = 'en_us';
                const displayLang = index_js_1.Resources.languages.find((id) => id.code === s);
                if (!displayLang.data[this.translateKey] || displayLang.data[this.translateKey] === '')
                    return String(this.translateKey);
                return displayLang.data[this.translateKey];
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
            const displayLang = index_js_1.Resources.languages.find((id) => id.code === lang);
            if (!displayLang.data[key] || displayLang.data[key] === '')
                return String(key);
            return displayLang.data[key];
        }
        catch (err) {
            console.error(err);
            return '';
        }
    }
    exports.getKeyTranslation = getKeyTranslation;
});
define("interfaces/IGuiEventListener", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("interfaces/IRenderable", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("gui/AbstractGui", ["require", "exports", "utils/ColorHelper", "gui/FontRenderer"], function (require, exports, ColorHelper_1, FontRenderer_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ColorHelper_1 = __importDefault(ColorHelper_1);
    FontRenderer_2 = __importDefault(FontRenderer_2);
    class AbstractGui {
        testConsole(text) {
            console.log(text);
        }
        drawString(context, text, posX, posY, color, ..._formatting) {
            FontRenderer_2.default.drawStringWithShadow(context, text, posX, posY, color, _formatting);
        }
        drawCenteredString(context, text, posX, posY, color, ..._formatting) {
            FontRenderer_2.default.drawStringWithShadow(context, text, posX - (FontRenderer_2.default.getTextWidth(text) / 2), posY, color, _formatting);
        }
        drawImg(context, img, offsetX, offsetY, uvX, uvY, width, height) {
            context.drawImage(img, uvX, uvY, width, height, offsetX, offsetY, width, height);
        }
        fill(context, minX, minY, maxX, maxY, color) {
            context.save();
            context.beginPath();
            context.fillStyle = ColorHelper_1.default.getColor(color);
            context.fillRect(minX, minY, maxX, maxY);
            context.stroke();
        }
        blit(context, img, x, y, uvX, uvY, width, height) {
            context.drawImage(img, uvX, uvY, width, height, x, y, width, height);
        }
    }
    exports.default = AbstractGui;
});
define("gui/widgets/Widget", ["require", "exports", "utils/GetResources", "utils/PlaySound", "gui/AbstractGui"], function (require, exports, GetResources_js_3, PlaySound_js_1, AbstractGui_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    AbstractGui_js_1 = __importDefault(AbstractGui_js_1);
    class Widgets extends AbstractGui_js_1.default {
        constructor(x, y, width, height, title) {
            super();
            this.wasHovered = false;
            this.isHovered = false;
            this.active = true;
            this.visible = true;
            this.alpha = 1.0;
            this.focused = false;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
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
            let yUV = this.getYImage(this.getHovered());
            context.save();
            context.globalAlpha = this.alpha;
            this.blit(context, GetResources_js_3.widgetsImg, this.x, this.y, 0, 46 + yUV * 20, this.width / 2, this.height);
            this.blit(context, GetResources_js_3.widgetsImg, this.x + this.width / 2, this.y, 200 - this.width / 2, 46 + yUV * 20, this.width / 2, this.height);
            let color = this.active ? 16777215 : 10526880;
            this.drawCenteredString(context, this.message, this.x + this.width / 2, this.y + (this.height - 8) / 2, color);
            context.restore();
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
                        PlaySound_js_1.playSound('resources/assets/minecraft/sounds/click_stereo.ogg', 0.2);
                        this.onClick(mouseX, mouseY);
                        return true;
                    }
                }
                return false;
            }
            else
                return false;
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
            if (this.isValidClickButton(button)) {
                this.onDrag(mouseX, mouseY, dragX, dragY);
                return true;
            }
            else {
                return false;
            }
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
define("gui/widgets/button/AbstractButton", ["require", "exports", "utils/PlaySound", "gui/widgets/Widget"], function (require, exports, PlaySound_1, Widget_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Widget_1 = __importDefault(Widget_1);
    class AbstractButton extends Widget_1.default {
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
                    PlaySound_1.playSound('resources/assets/minecraft/sounds/click_stereo.ogg', 0.2);
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
define("gui/FocusableGui", ["require", "exports", "gui/AbstractGui"], function (require, exports, AbstractGui_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    AbstractGui_js_2 = __importDefault(AbstractGui_js_2);
    class FocusableGui extends AbstractGui_js_2.default {
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
define("gui/widgets/button/OptionButton", ["require", "exports", "gui/widgets/button/Button"], function (require, exports, Button_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Button_1 = __importDefault(Button_1);
    class OptionButton extends Button_1.default {
        constructor(x, y, width, height, enumOptions, title, PressFunc) {
            super(x, y, width, height, title, PressFunc);
            this.enumOptions = enumOptions;
        }
    }
    exports.default = OptionButton;
});
define("gui/screens/Screen", ["require", "exports", "utils/GetResources", "gui/AbstractGui", "gui/widgets/button/OptionButton"], function (require, exports, GetResources_js_4, AbstractGui_js_3, OptionButton_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    AbstractGui_js_3 = __importDefault(AbstractGui_js_3);
    OptionButton_js_1 = __importDefault(OptionButton_js_1);
    class Screen extends AbstractGui_js_3.default {
        constructor(...args) {
            super();
            this.minecraft = null;
            this.width = 0;
            this.height = 0;
            this.children = new Array();
            this.buttons = new Array();
            this.focusedWidget = -1;
            if (args.length === 1)
                this.title = args[0];
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
        }
        mouseReleased(mouseX, mouseY, button) {
            for (const iguieventlistener of this.getEventListeners()) {
                iguieventlistener.mouseReleased(mouseX, mouseY, button);
            }
            this.focusedWidget = -1;
        }
        mouseDragged(mouseX, mouseY, button, dragX, dragY) {
            return false;
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
                context.fillStyle = context.createPattern(GetResources_js_4.optionsBackgroundImg, 'repeat');
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
define("gui/screens/AccessibilityScreen", ["require", "exports", "GameOption", "utils/TranslationText", "gui/widgets/button/Button", "gui/screens/SettingsScreen"], function (require, exports, GameOption_js_1, TranslationText_js_1, Button_js_2, SettingsScreen_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    GameOption_js_1 = __importDefault(GameOption_js_1);
    Button_js_2 = __importDefault(Button_js_2);
    SettingsScreen_js_1 = __importDefault(SettingsScreen_js_1);
    class AccessibilityScreen extends SettingsScreen_js_1.default {
        constructor(parentScreen, gameSettingsObj) {
            super(parentScreen, gameSettingsObj, TranslationText_js_1.getKeyTranslation("options.accessibility.title"));
            this.SCREEN_OPTIONS = [GameOption_js_1.default.ShowSubtitlesOption, GameOption_js_1.default.AutoJumpOption];
        }
        init() {
            let index = 0;
            for (const iterator of this.SCREEN_OPTIONS) {
                let x = this.width / 2 - 155 + (index % 2) * 160;
                let y = this.height / 6 - 12 + 24 * (index >> 1);
                this.addButton(iterator.createWidget(this.minecraft.gameSettings, x, y, 150));
                index++;
            }
            this.addButton(new Button_js_2.default(this.width / 2 - 100, this.height - 27, 200, 20, TranslationText_js_1.getKeyTranslation("gui.done"), () => {
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
define("gui/screens/MultiplayerScreen", ["require", "exports", "utils/TranslationText", "gui/widgets/button/Button", "gui/screens/Screen"], function (require, exports, TranslationText_js_2, Button_js_3, Screen_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Button_js_3 = __importDefault(Button_js_3);
    Screen_js_2 = __importDefault(Screen_js_2);
    class MultiplayerScreen extends Screen_js_2.default {
        constructor(parentScreen) {
            super(TranslationText_js_2.getKeyTranslation('multiplayer.title'));
            this.parentScreen = parentScreen;
            this.flag = false;
        }
        init() {
            this.btnSelectServer = this.addButton(new Button_js_3.default(this.width / 2 - 154, this.height - 52, 100, 20, TranslationText_js_2.getKeyTranslation("selectServer.select"), () => {
            }));
            this.addButton(new Button_js_3.default(this.width / 2 - 50, this.height - 52, 100, 20, TranslationText_js_2.getKeyTranslation("selectServer.direct"), () => {
            }));
            this.addButton(new Button_js_3.default(this.width / 2 + (4 + 50), this.height - 52, 100, 20, TranslationText_js_2.getKeyTranslation("selectServer.add"), () => {
                this.flag = !this.flag;
            }));
            this.btnEditServer = this.addButton(new Button_js_3.default(this.width / 2 - 154, this.height - 28, 70, 20, TranslationText_js_2.getKeyTranslation("selectServer.edit"), () => {
            }));
            this.btnDeleteServer = this.addButton(new Button_js_3.default(this.width / 2 - 74, this.height - 28, 70, 20, TranslationText_js_2.getKeyTranslation("selectServer.delete"), () => {
            }));
            this.addButton(new Button_js_3.default(this.width / 2 + 4, this.height - 28, 70, 20, TranslationText_js_2.getKeyTranslation("selectServer.refresh"), () => {
                this.flag = false;
                this.refreshServerList();
            }));
            this.addButton(new Button_js_3.default(this.width / 2 + (4 + 76), this.height - 28, 75, 20, TranslationText_js_2.getKeyTranslation("gui.cancel"), () => {
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
define("gui/widgets/button/CheckboxButton", ["require", "exports", "utils/GetResources", "gui/widgets/button/AbstractButton"], function (require, exports, GetResources_js_5, AbstractButton_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CheckboxButton = void 0;
    AbstractButton_1 = __importDefault(AbstractButton_1);
    class CheckboxButton extends AbstractButton_1.default {
        constructor(x, y, width, height, title, stored) {
            super(x, y, width, height, title);
            this.TEXTURE = GetResources_js_5.checkboxImg;
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
define("gui/screens/MultiplayerWarningScreen", ["require", "exports", "utils/TranslationText", "gui/screens/Screen", "gui/widgets/button/Button", "gui/widgets/button/CheckboxButton", "gui/screens/MultiplayerScreen"], function (require, exports, TranslationText_js_3, Screen_js_3, Button_js_4, CheckboxButton_js_1, MultiplayerScreen_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Screen_js_3 = __importDefault(Screen_js_3);
    Button_js_4 = __importDefault(Button_js_4);
    MultiplayerScreen_js_1 = __importDefault(MultiplayerScreen_js_1);
    class MultiplayerWarningScreen extends Screen_js_3.default {
        constructor(prevScreen) {
            super();
            this.header = TranslationText_js_3.getKeyTranslation("multiplayerWarning.header");
            this.message = TranslationText_js_3.getKeyTranslation("multiplayerWarning.message");
            this.checkboxText = TranslationText_js_3.getKeyTranslation("multiplayerWarning.check");
            this.prevScreen = prevScreen;
        }
        init() {
            this.addButton(new Button_js_4.default(this.width / 2 - 155, 100 + 180, 150, 20, TranslationText_js_3.getKeyTranslation('gui.proceed'), () => {
                if (this.cautionCheckbox.isChecked()) {
                    this.minecraft.gameSettings.skipMultiplayerWarning = true;
                    this.minecraft.gameSettings.saveOptions();
                }
                this.minecraft.displayGuiScreen(new MultiplayerScreen_js_1.default(this.prevScreen));
            }));
            this.addButton(new Button_js_4.default(this.width / 2 - 155 + 160, 100 + 180, 150, 20, TranslationText_js_3.getKeyTranslation('gui.back'), () => {
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
define("gui/screens/ChatOptionsScreen", ["require", "exports", "utils/TranslationText", "gui/widgets/button/Button", "gui/screens/SettingsScreen"], function (require, exports, TranslationText_js_4, Button_js_5, SettingsScreen_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    TranslationText_js_4 = __importDefault(TranslationText_js_4);
    Button_js_5 = __importDefault(Button_js_5);
    SettingsScreen_js_2 = __importDefault(SettingsScreen_js_2);
    class ChatOptionsScreen extends SettingsScreen_js_2.default {
        constructor(parentScreen, gameSettingsObj) {
            super(parentScreen, gameSettingsObj, new TranslationText_js_4.default("options.chat.title").get());
        }
        init() {
            this.addButton(new Button_js_5.default(this.width / 2 - 100, this.height - 27, 200, 20, new TranslationText_js_4.default("gui.done").get(), () => {
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
define("gui/screens/ControlsScreen", ["require", "exports", "utils/TranslationText", "gui/widgets/button/Button", "gui/screens/SettingsScreen"], function (require, exports, TranslationText_js_5, Button_js_6, SettingsScreen_js_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Button_js_6 = __importDefault(Button_js_6);
    SettingsScreen_js_3 = __importDefault(SettingsScreen_js_3);
    class ControlsScreen extends SettingsScreen_js_3.default {
        constructor(parentScreen, gameSettingsObj) {
            super(parentScreen, gameSettingsObj, TranslationText_js_5.getKeyTranslation("controls.title"));
        }
        init() {
            this.addButton(new Button_js_6.default(this.width / 2 + 5, this.height - 27, 150, 20, TranslationText_js_5.getKeyTranslation("gui.done"), () => {
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
define("gui/screens/CustomizeSkinScreen", ["require", "exports", "utils/TranslationText", "gui/widgets/button/Button", "gui/screens/SettingsScreen"], function (require, exports, TranslationText_js_6, Button_js_7, SettingsScreen_js_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Button_js_7 = __importDefault(Button_js_7);
    SettingsScreen_js_4 = __importDefault(SettingsScreen_js_4);
    class CustomizeSkinScreen extends SettingsScreen_js_4.default {
        constructor(parentScreen, gameSettingsObj) {
            super(parentScreen, gameSettingsObj, TranslationText_js_6.getKeyTranslation("options.skinCustomisation.title"));
        }
        init() {
            this.addButton(new Button_js_7.default(this.width / 2 - 100, this.height - 27, 200, 20, TranslationText_js_6.getKeyTranslation("gui.done"), () => {
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
define("gui/screens/LanguageScreen", ["require", "exports", "utils/TranslationText", "gui/widgets/button/Button", "gui/screens/SettingsScreen"], function (require, exports, TranslationText_js_7, Button_js_8, SettingsScreen_js_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    TranslationText_js_7 = __importDefault(TranslationText_js_7);
    Button_js_8 = __importDefault(Button_js_8);
    SettingsScreen_js_5 = __importDefault(SettingsScreen_js_5);
    class LanguageScreen extends SettingsScreen_js_5.default {
        constructor(parentScreen, gameSettingsObj) {
            super(parentScreen, gameSettingsObj, new TranslationText_js_7.default("options.language").get());
        }
        init() {
            this.addButton(new Button_js_8.default(this.width / 2 - 100, this.height - 27, 200, 20, new TranslationText_js_7.default("gui.done").get(), () => {
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
define("gui/screens/OptionsSoundsScreen", ["require", "exports", "GameOption", "utils/TranslationText", "gui/widgets/button/Button", "gui/widgets/button/OptionButton", "gui/screens/SettingsScreen"], function (require, exports, GameOption_js_2, TranslationText_js_8, Button_js_9, OptionButton_js_2, SettingsScreen_js_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    GameOption_js_2 = __importDefault(GameOption_js_2);
    Button_js_9 = __importDefault(Button_js_9);
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
            this.addButton(new OptionButton_js_2.default(basePosX, basePosY + 24 * (index >> 1), 150, 20, GameOption_js_2.default.ShowSubtitlesOption, GameOption_js_2.default.ShowSubtitlesOption.func_238152_c_(this.gameSettings), () => {
                GameOption_js_2.default.ShowSubtitlesOption.nextValue(this.minecraft.gameSettings);
                this.minecraft.gameSettings.saveOptions();
            }));
            this.addButton(new Button_js_9.default(basePosX - 25, basePosY + 180, 200, 20, TranslationText_js_8.getKeyTranslation("gui.done"), () => {
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
define("gui/screens/VideoSettingsScreen", ["require", "exports", "GameOption", "utils/TranslationText", "gui/widgets/button/Button", "gui/screens/SettingsScreen"], function (require, exports, GameOption_js_3, TranslationText_js_9, Button_js_10, SettingsScreen_js_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    GameOption_js_3 = __importDefault(GameOption_js_3);
    Button_js_10 = __importDefault(Button_js_10);
    SettingsScreen_js_7 = __importDefault(SettingsScreen_js_7);
    class VideoSettingsScreen extends SettingsScreen_js_7.default {
        constructor(parentScreen, gameSettingsObj) {
            super(parentScreen, gameSettingsObj, TranslationText_js_9.getKeyTranslation("options.videoTitle"));
            this.SCREEN_OPTIONS = [GameOption_js_3.default.AdvancedItemTooltipsOption, GameOption_js_3.default.AutoJumpOption, GameOption_js_3.default.ForceUnicodeFont, GameOption_js_3.default.HeldItemTooltipsOption, GameOption_js_3.default.HideGUIOption, GameOption_js_3.default.RawMouseInputOption, GameOption_js_3.default.ShowFPSOption, GameOption_js_3.default.SkipMultiplayerWarningOption, GameOption_js_3.default.VsyncOption, GameOption_js_3.default.CLOUDS_OPTION, GameOption_js_3.default.GRAPHICS_FANCINESS];
        }
        init() {
            let index = 0;
            for (const iterator of this.SCREEN_OPTIONS) {
                let x = this.width / 2 - 155 + (index % 2) * 160;
                let y = this.height / 6 - 12 + (index >> 1) * 24;
                this.addButton(iterator.createWidget(this.minecraft.gameSettings, x, y, 150));
                index++;
            }
            this.addButton(new Button_js_10.default(this.width / 2 - 100, this.height - 27, 200, 20, TranslationText_js_9.getKeyTranslation("gui.done"), () => {
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
define("gui/screens/OptionsScreen", ["require", "exports", "GameOption", "utils/TranslationText", "gui/widgets/button/Button", "gui/screens/AccessibilityScreen", "gui/screens/ChatOptionsScreen", "gui/screens/ControlsScreen", "gui/screens/CustomizeSkinScreen", "gui/screens/LanguageScreen", "gui/screens/OptionsSoundsScreen", "gui/screens/Screen", "gui/screens/VideoSettingsScreen"], function (require, exports, GameOption_js_4, TranslationText_js_10, Button_js_11, AccessibilityScreen_js_1, ChatOptionsScreen_js_1, ControlsScreen_js_1, CustomizeSkinScreen_js_1, LanguageScreen_js_1, OptionsSoundsScreen_js_1, Screen_js_4, VideoSettingsScreen_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    GameOption_js_4 = __importDefault(GameOption_js_4);
    Button_js_11 = __importDefault(Button_js_11);
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
            this.SCREEN_OPTIONS = [GameOption_js_4.default.TestOption, GameOption_js_4.default.ShowFPSOption, GameOption_js_4.default.GRAPHICS_FANCINESS];
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
            this.addButton(new Button_js_11.default(baseX0, baseY + 48, 150, 20, TranslationText_js_10.getKeyTranslation('options.skinCustomisation'), () => {
                this.minecraft.displayGuiScreen(new CustomizeSkinScreen_js_1.default(this, this.settings));
            }));
            this.addButton(new Button_js_11.default(baseX1, baseY + 48, 150, 20, TranslationText_js_10.getKeyTranslation('options.sounds'), () => {
                this.minecraft.displayGuiScreen(new OptionsSoundsScreen_js_1.default(this, this.settings));
            }));
            this.addButton(new Button_js_11.default(baseX0, baseY + 72, 150, 20, TranslationText_js_10.getKeyTranslation('options.video'), () => {
                this.minecraft.displayGuiScreen(new VideoSettingsScreen_js_1.default(this, this.settings));
            }));
            this.addButton(new Button_js_11.default(baseX1, baseY + 72, 150, 20, TranslationText_js_10.getKeyTranslation('options.controls'), () => {
                this.minecraft.displayGuiScreen(new ControlsScreen_js_1.default(this, this.settings));
            }));
            this.addButton(new Button_js_11.default(baseX0, baseY + 96, 150, 20, TranslationText_js_10.getKeyTranslation('options.language'), () => {
                this.minecraft.displayGuiScreen(new LanguageScreen_js_1.default(this, this.settings));
            }));
            this.addButton(new Button_js_11.default(baseX1, baseY + 96, 150, 20, TranslationText_js_10.getKeyTranslation('options.chat.title'), () => {
                this.minecraft.displayGuiScreen(new ChatOptionsScreen_js_1.default(this, this.settings));
            }));
            this.addButton(new Button_js_11.default(baseX0, baseY + 120, 150, 20, TranslationText_js_10.getKeyTranslation('options.resourcepack'), () => { }));
            this.addButton(new Button_js_11.default(baseX1, baseY + 120, 150, 20, TranslationText_js_10.getKeyTranslation('options.accessibility.title'), () => {
                this.minecraft.displayGuiScreen(new AccessibilityScreen_js_1.default(this, this.settings));
            }));
            this.addButton(new Button_js_11.default(this.width / 2 - 100, baseY + 174, 200, 20, TranslationText_js_10.getKeyTranslation('gui.done'), () => {
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
define("gui/screens/CreateWorldScreen", ["require", "exports", "utils/TranslationText", "gui/widgets/button/Button", "gui/screens/Screen"], function (require, exports, TranslationText_js_11, Button_js_12, Screen_js_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Button_js_12 = __importDefault(Button_js_12);
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
            this.addButton(new Button_js_12.default(posX1, this.height - 28, 150, 20, TranslationText_js_11.getKeyTranslation('gui.cancel'), () => {
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
define("gui/screens/WorldSelectionScreen", ["require", "exports", "utils/TranslationText", "gui/widgets/button/Button", "gui/screens/CreateWorldScreen", "gui/screens/Screen"], function (require, exports, TranslationText_js_12, Button_js_13, CreateWorldScreen_js_1, Screen_js_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Button_js_13 = __importDefault(Button_js_13);
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
        init() {
            this.addButton(new Button_js_13.default(this.width / 2 - 75, this.height / 2 - 20, 150, 20, TranslationText_js_12.getKeyTranslation("Simulate Select/Deselect"), () => this.flag = !this.flag));
            this.selectButton = this.addButton(new Button_js_13.default(this.width / 2 - 154, this.height - 52, 150, 20, TranslationText_js_12.getKeyTranslation("selectWorld.select"), () => { }));
            this.addButton(new Button_js_13.default(this.width / 2 + 4, this.height - 52, 150, 20, TranslationText_js_12.getKeyTranslation("selectWorld.create"), () => {
                this.minecraft.displayGuiScreen(new CreateWorldScreen_js_1.default(this));
            }));
            this.renameButton = this.addButton(new Button_js_13.default(this.width / 2 - 154, this.height - 28, 72, 20, TranslationText_js_12.getKeyTranslation("selectWorld.edit"), () => { }));
            this.deleteButton = this.addButton(new Button_js_13.default(this.width / 2 - 76, this.height - 28, 72, 20, TranslationText_js_12.getKeyTranslation("selectWorld.delete"), () => { }));
            this.copyButton = this.addButton(new Button_js_13.default(this.width / 2 + 4, this.height - 28, 72, 20, TranslationText_js_12.getKeyTranslation("selectWorld.recreate"), () => { }));
            this.addButton(new Button_js_13.default(this.width / 2 + 82, this.height - 28, 72, 20, TranslationText_js_12.getKeyTranslation("gui.cancel"), () => {
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
        }
    }
    exports.default = WorldSelectionScreen;
});
define("gui/screens/MainMenuScreen", ["require", "exports", "utils/GetResources", "utils/PlaySound", "utils/Test", "utils/TranslationText", "gui/FontRenderer", "gui/widgets/button/Button", "gui/widgets/button/ImageButton", "gui/screens/AccessibilityScreen", "gui/screens/MultiplayerScreen", "gui/screens/MultiplayerWarningScreen", "gui/screens/OptionsScreen", "gui/screens/Screen", "gui/screens/WorldSelectionScreen"], function (require, exports, GetResources_js_6, PlaySound_js_2, Test_js_1, TranslationText_js_13, FontRenderer_js_1, Button_js_14, ImageButton_js_1, AccessibilityScreen_js_2, MultiplayerScreen_js_2, MultiplayerWarningScreen_js_1, OptionsScreen_js_1, Screen_js_7, WorldSelectionScreen_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    FontRenderer_js_1 = __importDefault(FontRenderer_js_1);
    Button_js_14 = __importDefault(Button_js_14);
    ImageButton_js_1 = __importDefault(ImageButton_js_1);
    AccessibilityScreen_js_2 = __importDefault(AccessibilityScreen_js_2);
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
            this.MINECRAFT_TITLE_IMG = GetResources_js_6.minecraftImg;
            this.MINECRAFT_EDITION_IMG = GetResources_js_6.editionImg;
            this.WIDGETS_LOCATION = GetResources_js_6.widgetsImg;
            this.ACCESSIBILITY_TEXTURES = GetResources_js_6.accessibilityImg;
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
            this.widthCopyright = FontRenderer_js_1.default.getTextWidth("Not affiliated with Mojang Studios!");
            this.widthCopyrightRest = this.width - this.widthCopyright - 2;
            const rowGapHeight = 24;
            const basePosY = this.height / 4 + 48;
            if (this.minecraft.isDemo())
                this.addDemoButtons(basePosY, rowGapHeight);
            else
                this.addSingleplayerMultiplayerButtons(basePosY, rowGapHeight);
            this.addButton(new ImageButton_js_1.default(this.width / 2 - 124, basePosY + 72 + 12, 20, 20, 0, 106, 20, this.WIDGETS_LOCATION, 256, 256, () => {
                this.minecraft.displayGuiScreen(new OptionsScreen_js_1.default(this, this.minecraft.gameSettings));
            }, ''));
            this.addButton(new Button_js_14.default(this.width / 2 - 100, basePosY + 72 + 12, 98, 20, TranslationText_js_13.getKeyTranslation('menu.options'), () => {
                this.minecraft.displayGuiScreen(new OptionsScreen_js_1.default(this, this.minecraft.gameSettings));
            }));
            this.addButton(new Button_js_14.default(this.width / 2 + 2, basePosY + 72 + 12, 98, 20, TranslationText_js_13.getKeyTranslation('menu.quit'), () => {
                this.minecraft.shutdown();
            }));
            this.addButton(new ImageButton_js_1.default(this.width / 2 + 104, basePosY + 72 + 12, 20, 20, 0, 0, 20, this.ACCESSIBILITY_TEXTURES, 32, 64, () => {
                this.minecraft.displayGuiScreen(new AccessibilityScreen_js_2.default(this, this.minecraft.gameSettings));
            }, ''));
        }
        addSingleplayerMultiplayerButtons(yIn, rowHeightIn) {
            this.addButton(new Button_js_14.default(this.width / 2 - 100, yIn, 200, 20, TranslationText_js_13.getKeyTranslation("menu.singleplayer"), () => {
                this.minecraft.displayGuiScreen(new WorldSelectionScreen_js_1.default(this));
            }));
            (this.addButton(new Button_js_14.default(this.width / 2 - 100, yIn + rowHeightIn * 1, 200, 20, TranslationText_js_13.getKeyTranslation("menu.multiplayer"), () => {
                let screen = (this.minecraft.gameSettings.skipMultiplayerWarning ? new MultiplayerScreen_js_2.default(this) : new MultiplayerWarningScreen_js_1.default(this));
                this.minecraft.displayGuiScreen(screen);
            })));
            (this.addButton(new Button_js_14.default(this.width / 2 - 100, yIn + rowHeightIn * 2, 200, 20, TranslationText_js_13.getKeyTranslation("menu.online"), () => {
                Test_js_1.consoleOutput('error', 'No action');
            })));
        }
        addDemoButtons(yIn, rowHeightIn) {
            this.addButton(new Button_js_14.default(this.width / 2 - 100, yIn, 200, 20, TranslationText_js_13.getKeyTranslation("menu.playdemo"), () => {
                Test_js_1.consoleOutput('log', 'No action');
            }));
            this.buttonResetDemo = this.addButton(new Button_js_14.default(this.width / 2 - 100, yIn + rowHeightIn * 1, 200, 20, TranslationText_js_13.getKeyTranslation("menu.resetdemo"), () => {
                Test_js_1.consoleOutput('log', 'No action');
            }));
            this.buttonResetDemo.active = false;
        }
        mouseClicked(mouseX, mouseY, button) {
            super.mouseClicked(mouseX, mouseY, button);
            Test_js_1.isInside(mouseX, mouseY, this.widthCopyrightRest, this.widthCopyright, (this.height - 10), 10, () => {
                PlaySound_js_2.playSound('resources/assets/minecraft/sounds/click_stereo.ogg', 0.2);
                console.log('No credits sry :(');
            });
        }
        render(context, mouseX, mouseY) {
            this.fill(context, 0, 0, this.width, this.height, 3355443);
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
            const miliT = new Date().getMilliseconds();
            let f2 = 1.8 - Math.abs(Math.sin((miliT % 1000) / 1000.0 * (Math.PI * 2)) * 0.1);
            try {
                f2 = f2 * 100.0 / (FontRenderer_js_1.default.getTextWidth('ddddddddddddddddddddddd') + 32);
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
            let gameInfo = "Minecraft JS " + this.minecraft.getVersion();
            if (this.minecraft.isDemo())
                gameInfo += " Demo";
            else
                gameInfo += (this.minecraft.getVersionType() === "release" ? '' : '/' + this.minecraft.getVersionType());
            gameInfo += `/${this.minecraft.getUsername()}`;
            if (this.minecraft.isModdedClient())
                gameInfo += TranslationText_js_13.getKeyTranslation("menu.modded");
            this.drawString(context, gameInfo, 2, this.height - 10, 16777215);
            Test_js_1.isInside(mouseX, mouseY, this.widthCopyrightRest, this.widthCopyright, (this.height - 10), 10, () => {
                this.fill(context, (this.widthCopyrightRest - 1), this.height - 2, this.widthCopyright + 1, 1, 16777215);
            });
            this.drawString(context, 'Not affiliated with Mojang Studios!', this.widthCopyrightRest, this.height - 10, 16777215);
        }
    }
    exports.default = MainMenuScreen;
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
define("utils/MouseHelper", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
                this.minecraft.currentScreen.mouseClicked(x, y, btn);
            }
            else {
                this.minecraft.currentScreen.mouseReleased(x, y, btn);
            }
        }
        cursorPosCallback(xpos, ypos) {
            if (this.ignoreFirstMove) {
                this.mouseX = xpos;
                this.mouseY = ypos;
                this.ignoreFirstMove = false;
            }
            let iguieventlistener = this.minecraft.currentScreen;
            if (iguieventlistener != null && this.minecraft.loadingGui == null) {
                let d0 = xpos * this.minecraft.getScaleFactor();
                let d1 = ypos * this.minecraft.getScaleFactor();
                iguieventlistener.mouseMoved(d0, d1);
                if (this.activeButton != -1 && this.eventTime > 0.0) {
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
                this.minecraft.currentScreen.mouseScrolled(d1, d2, d0);
            }
        }
        registerCallbacks() {
            this.context.canvas.addEventListener('mousemove', (e) => {
                this.mouseX = e.clientX - this.minecraft.canvasX;
                this.mouseY = e.clientY - this.minecraft.canvasY;
            });
            this.context.canvas.addEventListener('mousedown', (e) => {
                this.mouseButtonCallback(e.button, 1);
                this.cursorPosCallback(e.clientX, e.clientY);
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
});
define("Minecraft", ["require", "exports", "GameSettings", "gui/FontRenderer", "gui/screens/MainMenuScreen", "index", "utils/KeyboardListener", "utils/MouseHelper"], function (require, exports, GameSettings_js_1, FontRenderer_js_2, MainMenuScreen_js_1, index_js_2, KeyboardListener_js_1, MouseHelper_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    GameSettings_js_1 = __importDefault(GameSettings_js_1);
    FontRenderer_js_2 = __importDefault(FontRenderer_js_2);
    MainMenuScreen_js_1 = __importDefault(MainMenuScreen_js_1);
    KeyboardListener_js_1 = __importDefault(KeyboardListener_js_1);
    MouseHelper_js_1 = __importDefault(MouseHelper_js_1);
    class Minecraft {
        constructor(gameConfig) {
            this.context = document.getElementById('root').getContext('2d');
            this.canvasX = 0;
            this.canvasY = 0;
            this.ResourcesData = index_js_2.Resources;
            this.canvasWidth = window.innerWidth;
            this.canvasHeight = window.innerHeight;
            this.scaleFactor = 3;
            this.fps = 0;
            this.times = [];
            this.running = true;
            this.currentScreen = null;
            this.outputLog = '';
            this.gameconfiguration = gameConfig;
            this.gameSettings = new GameSettings_js_1.default(this);
            this.mouseHelper = new MouseHelper_js_1.default(this, this.context);
            this.keyboardListener = new KeyboardListener_js_1.default(this);
            this.mouseHelper.registerCallbacks();
            this.keyboardListener.setupCallbacks();
            this.updateCanvasSize();
            this.run();
            this.outputLog = '';
        }
        shutdown() {
            this.running = false;
            console.log(this.outputLog);
            window.close();
        }
        setFpsVisibility(state) {
            this.gameSettings.showFPS = state;
        }
        isFpsVisible() {
            return this.gameSettings.showFPS;
        }
        getSplashText() {
            function getRandSplash() {
                const splashes = index_js_2.Resources.texts.splashes, date = new Date(), month = date.getMonth(), day = date.getDate();
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
                    if (this.gameSettings.showFPS) {
                        this.context.save();
                        this.context.scale(0.666, 0.666);
                        let fps = this.gameSettings.vsync ? (this.getFPS() > this.gameSettings.framerateLimit ? this.gameSettings.framerateLimit : this.getFPS()) : this.getFPS();
                        FontRenderer_js_2.default.drawStringWithShadow(this.context, `${String(fps)}/${this.gameSettings.framerateLimit}`, 2, 2, 16777215, []);
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
define("settings/CloudOption", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const CloudOption = [
        {
            id: 0,
            key: 'options.off'
        },
        {
            id: 1,
            key: 'options.clouds.fast'
        },
        {
            id: 2,
            key: 'options.clouds.fancy'
        }
    ];
    exports.default = CloudOption;
});
define("settings/GraphicsFanciness", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const GraphicsFanciness = [
        {
            id: 0,
            key: 'options.graphics.fast'
        },
        {
            id: 1,
            key: 'options.graphics.fancy'
        },
        {
            id: 2,
            key: 'options.graphics.fabulous'
        }
    ];
    exports.default = GraphicsFanciness;
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
define("GameSettings", ["require", "exports", "settings/CloudOption", "settings/GraphicsFanciness", "settings/KeyBinding"], function (require, exports, CloudOption_js_1, GraphicsFanciness_js_1, KeyBinding_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    CloudOption_js_1 = __importDefault(CloudOption_js_1);
    GraphicsFanciness_js_1 = __importDefault(GraphicsFanciness_js_1);
    KeyBinding_js_1 = __importDefault(KeyBinding_js_1);
    class GameSettings {
        constructor(mcIn) {
            this.optionsLS = 'GameSettings';
            this.graphicFanciness = GraphicsFanciness_js_1.default[0];
            this.cloudsOption = CloudOption_js_1.default[0];
            this.mouseSensitivity = 0.5;
            this.renderDistanceChunks = -1;
            this.chatOpacity = 1.0;
            this.chatLineSpacing = 0.0;
            this.chatScale = 1.0;
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
                cloudsOption: this.cloudsOption
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
    TranslationText_js_14 = __importDefault(TranslationText_js_14);
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
            return `${new TranslationText_js_14.default(this.text).get()}: ${this.get(p_238152_1_) == false ? new TranslationText_js_14.default('options.off').get() : new TranslationText_js_14.default('options.on').get()}`;
        }
    }
    exports.default = BooleanOption;
});
define("settings/IteratableOption", ["require", "exports", "AbstractOption", "gui/widgets/button/OptionButton", "utils/TranslationText"], function (require, exports, AbstractOption_1, OptionButton_1, TranslationText_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    AbstractOption_1 = __importDefault(AbstractOption_1);
    OptionButton_1 = __importDefault(OptionButton_1);
    TranslationText_1 = __importDefault(TranslationText_1);
    class IteratableOption extends AbstractOption_1.default {
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
            return new OptionButton_1.default(xIn, yIn, widthIn, 20, this, this.getName(options), () => {
                this.setValueIndex(options, 1);
            });
        }
        get(options) {
            return (this.getter(options));
        }
        getName(settings) {
            return new TranslationText_1.default(this.text).get() + ': ' + new TranslationText_1.default(this.getter(settings).key).get();
        }
    }
    exports.default = IteratableOption;
});
define("GameOption", ["require", "exports", "settings/BooleanOption", "settings/CloudOption", "settings/GraphicsFanciness", "settings/IteratableOption"], function (require, exports, BooleanOption_1, CloudOption_1, GraphicsFanciness_1, IteratableOption_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    BooleanOption_1 = __importDefault(BooleanOption_1);
    CloudOption_1 = __importDefault(CloudOption_1);
    GraphicsFanciness_1 = __importDefault(GraphicsFanciness_1);
    IteratableOption_js_1 = __importDefault(IteratableOption_js_1);
    class GameOption {
    }
    exports.default = GameOption;
    GameOption.ShowFPSOption = new BooleanOption_1.default('Show FPS', (settings) => {
        return settings.showFPS;
    }, (settings, optionValues) => {
        settings.showFPS = optionValues;
    });
    GameOption.AdvancedItemTooltipsOption = new BooleanOption_1.default('Advanced tooltips', (settings) => {
        return settings.advancedItemTooltips;
    }, (settings, optionValues) => {
        settings.advancedItemTooltips = optionValues;
    });
    GameOption.HeldItemTooltipsOption = new BooleanOption_1.default('Held tooltips', (settings) => {
        return settings.heldItemTooltips;
    }, (settings, optionValues) => {
        settings.heldItemTooltips = optionValues;
    });
    GameOption.RawMouseInputOption = new BooleanOption_1.default('options.rawMouseInput', (settings) => {
        return settings.rawMouseInput;
    }, (settings, optionValues) => {
        settings.rawMouseInput = optionValues;
    });
    GameOption.SkipMultiplayerWarningOption = new BooleanOption_1.default('Skip Multiplayer Warning', (settings) => {
        return settings.skipMultiplayerWarning;
    }, (settings, optionValues) => {
        settings.skipMultiplayerWarning = optionValues;
    });
    GameOption.AutoJumpOption = new BooleanOption_1.default('options.autoJump', (settings) => {
        return settings.autoJump;
    }, (settings, optionValues) => {
        settings.autoJump = optionValues;
    });
    GameOption.VsyncOption = new BooleanOption_1.default('options.vsync', (settings) => {
        return settings.vsync;
    }, (settings, optionValues) => {
        settings.vsync = optionValues;
    });
    GameOption.ForceUnicodeFont = new BooleanOption_1.default('options.forceUnicodeFont', (settings) => {
        return settings.forceUnicodeFont;
    }, (settings, optionValues) => {
        settings.forceUnicodeFont = optionValues;
    });
    GameOption.ShowSubtitlesOption = new BooleanOption_1.default('options.showSubtitles', (settings) => {
        return settings.showSubtitles;
    }, (settings, optionValues) => {
        settings.showSubtitles = optionValues;
    });
    GameOption.HideGUIOption = new BooleanOption_1.default('Hide GUI', (settings) => {
        return settings.hideGUI;
    }, (settings, optionValues) => {
        settings.hideGUI = optionValues;
    });
    GameOption.TestOption = new BooleanOption_1.default('Test', (settings) => {
        return settings.testthing;
    }, (settings, optionValues) => {
        settings.testthing = optionValues;
    });
    GameOption.GRAPHICS_FANCINESS = new IteratableOption_js_1.default('options.graphics', (settings) => {
        return settings.graphicFanciness;
    }, (settings) => {
        let i = settings.graphicFanciness.id;
        if (i + 1 == GraphicsFanciness_1.default.length)
            i = 0;
        else
            i++;
        settings.graphicFanciness = GraphicsFanciness_1.default[i];
    });
    GameOption.CLOUDS_OPTION = new IteratableOption_js_1.default('options.renderClouds', (settings) => {
        return settings.cloudsOption;
    }, (settings) => {
        let i = settings.cloudsOption.id;
        if (i + 1 == CloudOption_1.default.length)
            i = 0;
        else
            i++;
        settings.cloudsOption = CloudOption_1.default[i];
    });
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
    }
    exports.default = MathHelper;
});
