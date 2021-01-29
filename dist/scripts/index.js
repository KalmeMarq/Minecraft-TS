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
        constructor() {
        }
    }
    exports.default = GameConfiguration;
});
define("utils/JSONUtils", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class JSONUtils {
        static async getJSONFile(url, callback) {
            const req = await fetch(url);
            const data = await req.json();
            callback(data);
        }
        static async getTextFile(url, callback) {
            const req = await fetch(url);
            const data = await req.text();
            callback(data);
        }
    }
    exports.default = JSONUtils;
});
define("index", ["require", "exports", "GameConfiguration", "gui/FontRenderer", "Minecraft", "utils/JSONUtils"], function (require, exports, GameConfiguration_js_1, FontRenderer_js_1, Minecraft_js_1, JSONUtils_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getFontChars = exports.addCharacterRenderer = exports.characterRenderers = exports.clickSound = exports.optionsBackgroundImg = exports.accessibilityImg = exports.widgetsImg = exports.editionImg = exports.minecraftImg = exports.mojangstudiosImg = exports.fontImg = exports.langNames = exports.ResourcesSplashes = exports.Resources = void 0;
    GameConfiguration_js_1 = __importDefault(GameConfiguration_js_1);
    Minecraft_js_1 = __importDefault(Minecraft_js_1);
    JSONUtils_js_1 = __importDefault(JSONUtils_js_1);
    exports.Resources = {
        languages: [],
        texts: {
            credits: [],
            end: [],
            splashes: []
        },
        font: {}
    };
    exports.ResourcesSplashes = exports.Resources.texts.splashes;
    exports.langNames = ['af_za', 'ar_sa', 'ast_es', 'az_az', 'ba_ru', 'bar', 'be_by', 'bg_bg', 'br_fr', 'brb', 'bs_ba', 'ca_es', 'cs_cz', 'cy_gb', 'da_dk', 'de_at', 'de_ch', 'de_de', 'el_gr', 'en_au', 'en_ca', 'en_gb', 'en_nz', 'en_pt', 'en_ud', 'en_us', 'enp', 'enws', 'eo_uy', 'es_ar', 'es_cl', 'es_ec', 'es_ec', 'es_es', 'es_mx', 'es_uy', 'es_ve', 'esan', 'et_ee', 'eu_es', 'fa_ir', 'fi_fi', 'fil_ph', 'fo_fo', 'fr_ca', 'fr_fr', 'fra_de', 'fy_nl', 'ga_ie', 'gd_gb', 'gl_es', 'got_de', 'gv_im', 'haw_us', 'he_il', 'hi_in', 'hr_hr', 'hu_hu', 'hy_am', 'id_id', 'ig_ng', 'io_en', 'is_is', 'isv', 'it_it', 'ja_jp', 'jbo_en', 'ka_ge', 'kab_kab', 'kk_kz', 'kn_in', 'ko_kr', 'ksh', 'kw_gb', 'la_la', 'lb_lu', 'li_li', 'lol_us', 'lt_lt', 'lv_lv', 'mi_nz', 'mk_mk', 'mn_mn', 'moh_ca', 'ms_my', 'mt_mt', 'nds_de', 'nl_be', 'nl_nl', 'nn_no', 'no_no', 'nuk', 'oc_fr', 'oj_ca', 'ovd', 'pl_pl', 'pt_br', 'pt_pt', 'qya_aa', 'ro_ro', 'ru_ru', 'scn', 'se_no', 'sk_sk', 'sl_si', 'so_so', 'sq_al', 'sr_sp', 'sv_se', 'swg', 'sxu', 'szl', 'ta_in', 'th_th', 'tl_ph', 'tlh_aa', 'tr_tr', 'tt_ru', 'tzl_tzl', 'uk_ua', 'val_es', 'vec_it', 'vi_vn', 'yi_de', 'yo_ng', 'zh_cn', 'zh_tw'];
    exports.fontImg = new Image(256, 256);
    exports.mojangstudiosImg = new Image(256, 256);
    exports.minecraftImg = new Image(256, 256);
    exports.editionImg = new Image(256, 256);
    exports.widgetsImg = new Image(256, 256);
    exports.accessibilityImg = new Image(256, 256);
    exports.optionsBackgroundImg = new Image(256, 256);
    exports.clickSound = new Audio();
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
    class Main {
        static main() {
            const gameconfigs = new GameConfiguration_js_1.default();
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
    exports.getFontChars = {};
    const initialize = async () => {
        document.getElementById('root').getContext('2d').clearRect(0, 0, window.innerWidth, window.innerHeight);
        async function fetchAllData() {
            const rootloc = 'resources/assets/minecraft';
            exports.fontImg.src = `./${rootloc}/textures/font/ascii.png`;
            exports.editionImg.src = `./${rootloc}/textures/gui/title/edition.png`;
            exports.minecraftImg.src = `./${rootloc}/textures/gui/title/minecraft.png`;
            exports.mojangstudiosImg.src = `./${rootloc}/textures/gui/title/mojangstudios.png`;
            exports.widgetsImg.src = `./${rootloc}/textures/gui/widgets.png`;
            exports.accessibilityImg.src = `./${rootloc}/textures/gui/accessibility.png`;
            exports.optionsBackgroundImg.src = `./${rootloc}/textures/gui/options_background.png`;
            exports.clickSound.src = `https://raw.githubusercontent.com/KalmeMarq/Minecraft-JS-Assets/main/assets/sounds/click_stereo.ogg`;
            ['credits', 'end', 'splashes'].forEach(async (name) => {
                const s = name;
                await JSONUtils_js_1.default.getTextFile(`https://raw.githubusercontent.com/KalmeMarq/Minecraft-JS-Assets/main/assets/texts/${name}.txt`, (data) => data.split(/\r?\n/).forEach((line) => exports.Resources.texts[s].push(line)));
            });
            exports.langNames.forEach(async (name) => name === 'en_us'
                ? await JSONUtils_js_1.default.getJSONFile(`./${rootloc}/lang/${name}.json`, (data) => exports.Resources.languages.push({ code: name, data: data }))
                : await JSONUtils_js_1.default.getJSONFile(`https://raw.githubusercontent.com/KalmeMarq/Minecraft-JS-Assets/main/assets/lang/${name}.json`, (data) => exports.Resources.languages.push({ code: name, data: data })));
            await JSONUtils_js_1.default.getJSONFile(`./${rootloc}/font/font.json`, (data) => exports.Resources.font = data);
        }
        ;
        await fetchAllData();
        console.log(exports.Resources);
        exports.getFontChars = exports.Resources.font;
        Main.main();
    };
    initialize();
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
define("gui/FontRenderer", ["require", "exports", "index", "utils/ColorHelper"], function (require, exports, index_js_1, ColorHelper_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CharacterRenderer = void 0;
    ColorHelper_js_1 = __importDefault(ColorHelper_js_1);
    class CharacterRenderer {
        constructor(char, color) {
            this.char = char;
            this.charWidth = index_js_1.getFontChars[this.char].w;
            this.charHeight = index_js_1.getFontChars[this.char].h;
            this.r = ColorHelper_js_1.default.getRed(color);
            this.g = ColorHelper_js_1.default.getGreen(color);
            this.b = ColorHelper_js_1.default.getBlue(color);
        }
        create() {
            const fontcanvas = document.createElement('canvas');
            const ctxfont = fontcanvas.getContext('2d');
            fontcanvas.width = this.charWidth;
            fontcanvas.height = this.charHeight;
            ctxfont.save();
            ctxfont.imageSmoothingEnabled = false;
            ctxfont.drawImage(index_js_1.fontImg, index_js_1.getFontChars[this.char].x, index_js_1.getFontChars[this.char].y, this.charWidth, this.charHeight, 0, 0, this.charWidth, this.charHeight);
            ctxfont.restore();
            ctxfont.scale(3, 3);
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
            ctxfont.drawImage(index_js_1.fontImg, index_js_1.getFontChars[this.char].x, index_js_1.getFontChars[this.char].y, this.charWidth, this.charHeight, 0, 0, this.charWidth, this.charHeight);
            ctxfont.scale(3, 3);
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
    exports.CharacterRenderer = CharacterRenderer;
    class FontRenderer {
        static getTextWidth(text) {
            let width = 0;
            for (let j = 0; j < text.length; j++) {
                width += index_js_1.getFontChars[text[j]].w - 1;
            }
            return width;
        }
        static renderCenteredText(text, posX, posY, color) {
            let textgetFontChars = text.split('');
            let textwidth = FontRenderer.getTextWidth(text);
            for (var j = 0, k = posX; j < textgetFontChars.length; j++) {
                const char = textgetFontChars[j];
                if (!(index_js_1.characterRenderers[color] && index_js_1.characterRenderers[color][textgetFontChars[j]])) {
                    index_js_1.addCharacterRenderer(color, textgetFontChars[j]);
                }
                document.getElementById('root').getContext('2d').drawImage(index_js_1.characterRenderers[color][char]['textShadow'], k - 1 - textwidth / 2 + 1, posY + 1);
                document.getElementById('root').getContext('2d').drawImage(index_js_1.characterRenderers[color][char]['text'], k - 1 - textwidth / 2, posY);
                k += index_js_1.getFontChars[char].w - 1;
            }
        }
        static renderText(context, text, posX, posY, color) {
            let textgetFontChars = text.split('');
            let textwidth = FontRenderer.getTextWidth(text);
            for (var j = 0, k = posX; j < textgetFontChars.length; j++) {
                const char = textgetFontChars[j];
                if (!(index_js_1.characterRenderers[color] && index_js_1.characterRenderers[color][textgetFontChars[j]])) {
                    index_js_1.addCharacterRenderer(color, textgetFontChars[j]);
                }
                context.drawImage(index_js_1.characterRenderers[color][char]['textShadow'], k - 1 + 1, posY + 1);
                context.drawImage(index_js_1.characterRenderers[color][char]['text'], k - 1, posY);
                k += index_js_1.getFontChars[char].w - 1;
            }
        }
        static drawStringWithShadow(context, text, posX, posY, color) {
            let textgetFontChars = text.split('');
            let textwidth = FontRenderer.getTextWidth(text);
            for (var j = 0, k = posX; j < textgetFontChars.length; j++) {
                const char = textgetFontChars[j];
                if (!(index_js_1.characterRenderers[color] && index_js_1.characterRenderers[color][textgetFontChars[j]])) {
                    index_js_1.addCharacterRenderer(color, textgetFontChars[j]);
                }
                context.drawImage(index_js_1.characterRenderers[color][char]['textShadow'], k - 1 + 1, posY + 1);
                context.drawImage(index_js_1.characterRenderers[color][char]['text'], k - 1, posY);
                k += index_js_1.getFontChars[char].w - 1;
            }
        }
    }
    exports.default = FontRenderer;
});
define("utils/TranslationText", ["require", "exports", "index"], function (require, exports, index_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TranslationTextComponent {
        constructor(translateKey) {
            this.translateKey = translateKey;
        }
        get() {
            try {
                const s = JSON.parse(localStorage.getItem('GameSettings')).language ? JSON.parse(localStorage.getItem('GameSettings')).language : 'en_us';
                const displayLang = index_js_2.Resources.languages.find((id) => id.code === s);
                if (!displayLang.data[this.translateKey])
                    return this.translateKey;
                return displayLang.data[this.translateKey];
            }
            catch (err) {
                console.error(err);
            }
        }
    }
    exports.default = TranslationTextComponent;
});
define("interfaces/IGuiEventListener", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("interfaces/IRenderable", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("gui/AbstractGui", ["require", "exports", "utils/ColorHelper", "gui/FontRenderer"], function (require, exports, ColorHelper_1, FontRenderer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ColorHelper_1 = __importDefault(ColorHelper_1);
    FontRenderer_1 = __importDefault(FontRenderer_1);
    class AbstractGui {
        testConsole(text) {
            console.log(text);
        }
        drawString(context, text, posX, posY, color) {
            FontRenderer_1.default.drawStringWithShadow(context, text, posX, posY, color);
        }
        drawCenteredString(context, text, posX, posY, color) {
            FontRenderer_1.default.drawStringWithShadow(context, text, posX - (FontRenderer_1.default.getTextWidth(text) / 2), posY, color);
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
    }
    exports.default = AbstractGui;
});
define("gui/widgets/Widget", ["require", "exports", "index", "gui/AbstractGui", "gui/FontRenderer"], function (require, exports, index_js_3, AbstractGui_js_1, FontRenderer_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    AbstractGui_js_1 = __importDefault(AbstractGui_js_1);
    FontRenderer_js_2 = __importDefault(FontRenderer_js_2);
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
        keyDown(key, modifiers) {
            throw new Error("Method not implemented.");
        }
        getYImage(isHovered) {
            let i = 1;
            if (!this.active)
                i = 0;
            else if (isHovered)
                i = 2;
            return i;
        }
        renderObject(context, mouseX, mouseY) {
            if (this.visible) {
                this.isHovered = mouseX >= this.x && mouseY >= this.y && mouseX < this.x + this.width && mouseY < this.y + this.height;
                if (this.visible) {
                    this.renderButton(context, mouseX, mouseY);
                }
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
            context.save();
            let yUV = this.getYImage(this.getHovered());
            context.globalAlpha = this.alpha;
            this.renderBgG(context, index_js_3.widgetsImg, [0, 46 + 20 * yUV], [this.x, this.y], [this.width / 2, 20]);
            this.renderBgG(context, index_js_3.widgetsImg, [200 - this.width / 2, 46 + 20 * yUV], [this.x + this.width / 2, this.y], [this.width / 2, 20]);
            let textColor = this.active ? 16777215 : 10526880;
            FontRenderer_js_2.default.renderCenteredText(this.message, this.x + this.width / 2, this.y + (this.height - 8) / 2, textColor);
            context.restore();
        }
        renderBgG(context, img, uv, offset, uvSize) {
            context.save();
            context.imageSmoothingEnabled = false;
            context.drawImage(img, uv[0], uv[1], uvSize[0], uvSize[1], offset[0], offset[1], uvSize[0], uvSize[1]);
            context.restore();
        }
        getHovered() {
            return this.isHovered || this.focused;
        }
        mouseClicked(mouseX, mouseY, button) {
            if (this.clicked(mouseX, mouseY)) {
                console.log('button clicked');
            }
        }
        mouseReleased(mouseX, mouseY, button) {
            if (this.clicked(mouseX, mouseY)) {
                console.log('button released');
            }
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
        }
        mouseScrolled(mouseX, mouseY, delta) {
        }
        keyPressed(key, modifiers) {
        }
        keyReleased(key, modifiers) {
        }
    }
    exports.default = Widgets;
});
define("gui/widgets/button/Button", ["require", "exports", "gui/widgets/Widget"], function (require, exports, Widget_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Widget_js_1 = __importDefault(Widget_js_1);
    class Button extends Widget_js_1.default {
        constructor(x, y, width, height, title, onPress) {
            super(x, y, width, height, title);
            this.onPress = onPress;
        }
        mouseClicked(mouseX, mouseY, button) {
            if (this.clicked(mouseX, mouseY)) {
                this.onPress();
                const a = new Audio('resources/assets/minecraft/sounds/click_stereo.ogg');
                a.volume = 0.2;
                a.play();
            }
        }
        mouseReleased() {
        }
        keyDown(key, modifiers) {
            if (this.focused && key === 'Enter') {
                this.focused = false;
                this.onPress();
                const a = new Audio('resources/assets/minecraft/sounds/click_stereo.ogg');
                a.volume = 0.2;
                a.play();
            }
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
            let i = this.yTexStart;
            if (this.getHovered()) {
                i += this.yDiffText;
            }
            context.save();
            context.imageSmoothingEnabled = false;
            context.globalAlpha = this.alpha;
            context.drawImage(this.resourceLocation, this.xTexStart, i, this.width, this.height, this.x, this.y, this.width, this.height);
            context.restore();
        }
    }
    exports.default = ImageButton;
});
define("gui/widgets/button/OptionButton", ["require", "exports", "gui/widgets/button/Button"], function (require, exports, Button_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Button_1 = __importDefault(Button_1);
    class OptionButton extends Button_1.default {
        constructor(x, y, width, height, enumOptions, title, onPress) {
            super(x, y, width, height, title, onPress);
            this.enumOptions = enumOptions;
        }
    }
    exports.default = OptionButton;
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
define("gui/screens/ScreenP", ["require", "exports", "index", "gui/AbstractGui", "gui/widgets/button/OptionButton"], function (require, exports, index_js_4, AbstractGui_js_3, OptionButton_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    AbstractGui_js_3 = __importDefault(AbstractGui_js_3);
    OptionButton_js_1 = __importDefault(OptionButton_js_1);
    class ScreenP extends AbstractGui_js_3.default {
        constructor() {
            super(...arguments);
            this.minecraft = null;
            this.width = 0;
            this.height = 0;
            this.children = new Array();
            this.buttons = new Array();
            this.focusedWidget = -1;
            this.listener = null;
        }
        getListener() {
            return this.listener;
        }
        setListener(listener) {
            this.listener = listener;
        }
        initScreen(minecraft, width, height) {
            this.minecraft = minecraft;
            this.buttons = [];
            this.children = [];
            this.width = width;
            this.height = height;
            this.init();
            (this.focusedWidget !== -1 || this.focusedWidget !== null || this.focusedWidget !== undefined) && this.children[this.focusedWidget] ? this.children[this.focusedWidget].changeFocus(true) : null;
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
            for (let i = 0; i < this.getEventListeners().length; i++) {
                const j = this.getEventListeners()[i];
                j.mouseClicked(mouseX, mouseY, button);
            }
            this.focusedWidget = -1;
        }
        mouseReleased(mouseX, mouseY, button) {
            for (let i = 0; i < this.getEventListeners().length; i++) {
                const j = this.getEventListeners()[i];
                j.mouseReleased(mouseX, mouseY, button);
            }
        }
        isMouseOver(mouseX, mouseY) {
        }
        keyPressed(key, modifiers) {
            for (let i = 0; i < this.getEventListeners().length; i++) {
                const j = this.getEventListeners()[i];
                j.keyPressed(key, modifiers);
            }
        }
        keyReleased(key, modifiers) {
            for (let i = 0; i < this.getEventListeners().length; i++) {
                const j = this.getEventListeners()[i];
                j.keyReleased(key, modifiers);
            }
        }
        onClose() {
        }
        keyDown(key, modifiers) {
            let a = true;
            for (let i = 0; i < this.getEventListeners().length; i++) {
                const j = this.getEventListeners()[i];
                j.keyDown(key, modifiers);
                if (j instanceof OptionButton_js_1.default) {
                    a = false;
                }
            }
            if (key === 'F3')
                this.minecraft.gameSettings.showFPS = !this.minecraft.gameSettings.showFPS;
            if (key == 'Escape' && this.shouldCloseOnEsc()) {
                this.closeScreen();
                return true;
            }
            else if (key == 'Tab') {
                this.changeFocus(true);
                return false;
            }
            else if (key == 'Enter' && this.focusedWidget !== -1) {
                if (a)
                    this.focusedWidget = -1;
            }
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
                context.fillStyle = context.createPattern(index_js_4.optionsBackgroundImg, 'repeat');
                context.fillRect(0, 0, context.canvas.width, context.canvas.height);
                context.fillStyle = 'rgba(0, 0, 0, 0.7)';
                context.fillRect(0, 0, context.canvas.width, context.canvas.height);
                context.restore();
            }
        }
        mouseDragged() { }
        mouseMoved() { }
        mouseScrolled() {
            console.log("scrolling");
        }
        changeFocus(focus) {
            if (this.focusedWidget + 2 > this.children.length) {
                this.focusedWidget = -1;
            }
            this.focusedWidget++;
            return false;
        }
    }
    exports.default = ScreenP;
});
define("gui/screens/SettingsScreen", ["require", "exports", "gui/screens/ScreenP"], function (require, exports, ScreenP_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ScreenP_js_1 = __importDefault(ScreenP_js_1);
    class SettingsScreen extends ScreenP_js_1.default {
        constructor(previousScreen, gameSettingsObj) {
            super();
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
define("gui/screens/AccessibilityScreen", ["require", "exports", "GameOption", "utils/TranslationText", "gui/widgets/button/Button", "gui/widgets/button/OptionButton", "gui/screens/SettingsScreen"], function (require, exports, GameOption_js_1, TranslationText_js_1, Button_js_2, OptionButton_js_2, SettingsScreen_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    GameOption_js_1 = __importDefault(GameOption_js_1);
    TranslationText_js_1 = __importDefault(TranslationText_js_1);
    Button_js_2 = __importDefault(Button_js_2);
    OptionButton_js_2 = __importDefault(OptionButton_js_2);
    SettingsScreen_js_1 = __importDefault(SettingsScreen_js_1);
    class AccessibilityScreen extends SettingsScreen_js_1.default {
        constructor(parentScreenIn, gameSettingsIn) {
            super(parentScreenIn, gameSettingsIn);
        }
        closeScreen() {
            this.minecraft.displayGuiScreen(this.parentScreen);
        }
        init() {
            this.addButton(new OptionButton_js_2.default(this.width / 2 + 5, this.height / 6 - 12 - 6, 150, 20, 0, GameOption_js_1.default.ShowFPSOption.func_238152_c_(this.gameSettings), () => {
                GameOption_js_1.default.ShowFPSOption.nextValue(this.gameSettings);
            }));
            this.addButton(new Button_js_2.default(this.width / 2 - 100, this.height / 6 + 168, 200, 20, new TranslationText_js_1.default("gui.done").get(), () => {
                this.minecraft.displayGuiScreen(this.parentScreen);
            }));
        }
    }
    exports.default = AccessibilityScreen;
});
define("gui/screens/ChatOptionsScreen", ["require", "exports", "utils/TranslationText", "gui/widgets/button/Button", "gui/screens/SettingsScreen"], function (require, exports, TranslationText_js_2, Button_js_3, SettingsScreen_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    TranslationText_js_2 = __importDefault(TranslationText_js_2);
    Button_js_3 = __importDefault(Button_js_3);
    SettingsScreen_js_2 = __importDefault(SettingsScreen_js_2);
    class ChatOptionsScreen extends SettingsScreen_js_2.default {
        constructor(parentScreenIn, gameSettingsIn) {
            super(parentScreenIn, gameSettingsIn);
        }
        closeScreen() {
            this.minecraft.displayGuiScreen(this.parentScreen);
        }
        init() {
            this.addButton(new Button_js_3.default(this.width / 2 - 100, this.height / 6 + 168, 200, 20, new TranslationText_js_2.default("gui.done").get(), () => {
                this.minecraft.displayGuiScreen(this.parentScreen);
            }));
        }
    }
    exports.default = ChatOptionsScreen;
});
define("gui/screens/OptionsSoundsScreen", ["require", "exports", "utils/TranslationText", "gui/widgets/button/Button", "gui/screens/SettingsScreen"], function (require, exports, TranslationText_js_3, Button_js_4, SettingsScreen_js_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    TranslationText_js_3 = __importDefault(TranslationText_js_3);
    Button_js_4 = __importDefault(Button_js_4);
    SettingsScreen_js_3 = __importDefault(SettingsScreen_js_3);
    class OptionsSoundsScreen extends SettingsScreen_js_3.default {
        constructor(parentScreenIn, gameSettingsIn) {
            super(parentScreenIn, gameSettingsIn);
        }
        closeScreen() {
            this.minecraft.displayGuiScreen(this.parentScreen);
        }
        init() {
            this.addButton(new Button_js_4.default(this.width / 2 - 100, this.height / 6 + 168, 200, 20, new TranslationText_js_3.default("gui.done").get(), () => {
                this.minecraft.displayGuiScreen(this.parentScreen);
            }));
        }
    }
    exports.default = OptionsSoundsScreen;
});
define("gui/screens/OptionsScreen", ["require", "exports", "GameOption", "utils/TranslationText", "gui/widgets/button/Button", "gui/widgets/button/OptionButton", "gui/screens/AccessibilityScreen", "gui/screens/ChatOptionsScreen", "gui/screens/OptionsSoundsScreen", "gui/screens/ScreenP"], function (require, exports, GameOption_js_2, TranslationText_js_4, Button_js_5, OptionButton_js_3, AccessibilityScreen_js_1, ChatOptionsScreen_js_1, OptionsSoundsScreen_js_1, ScreenP_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    GameOption_js_2 = __importDefault(GameOption_js_2);
    TranslationText_js_4 = __importDefault(TranslationText_js_4);
    Button_js_5 = __importDefault(Button_js_5);
    OptionButton_js_3 = __importDefault(OptionButton_js_3);
    AccessibilityScreen_js_1 = __importDefault(AccessibilityScreen_js_1);
    ChatOptionsScreen_js_1 = __importDefault(ChatOptionsScreen_js_1);
    OptionsSoundsScreen_js_1 = __importDefault(OptionsSoundsScreen_js_1);
    ScreenP_js_2 = __importDefault(ScreenP_js_2);
    class OptionsScreen extends ScreenP_js_2.default {
        constructor(parentScreen, gameSettingsObj) {
            super();
            this.SCREEN_OPTIONS = new Array();
            this.parentScreen = parentScreen;
            this.settings = gameSettingsObj;
        }
        closeScreen() {
            this.minecraft.displayGuiScreen(this.parentScreen);
        }
        init() {
            let i = 0;
            this.addButton(new OptionButton_js_3.default(this.width / 2 - 155, this.height / 6 - 12 - 6, 150, 20, 0, GameOption_js_2.default.TestOption.func_238152_c_(this.settings), () => {
                GameOption_js_2.default.TestOption.nextValue(this.settings);
                this.settings.saveOptions();
            }));
            this.addButton(new OptionButton_js_3.default(this.width / 2 + 5, this.height / 6 - 12 - 6, 150, 20, 0, GameOption_js_2.default.ShowFPSOption.func_238152_c_(this.settings), () => {
                GameOption_js_2.default.ShowFPSOption.nextValue(this.settings);
                this.settings.saveOptions();
            }));
            this.addButton(new Button_js_5.default(this.width / 2 - 155, this.height / 6 + 48 - 6, 150, 20, new TranslationText_js_4.default("options.skinCustomisation").get(), () => {
            }));
            this.addButton(new Button_js_5.default(this.width / 2 + 5, this.height / 6 + 48 - 6, 150, 20, new TranslationText_js_4.default("options.sounds").get(), () => {
                this.minecraft.displayGuiScreen(new OptionsSoundsScreen_js_1.default(this, this.settings));
            }));
            this.addButton(new Button_js_5.default(this.width / 2 - 155, this.height / 6 + 72 - 6, 150, 20, new TranslationText_js_4.default("options.video").get(), () => {
            }));
            this.addButton(new Button_js_5.default(this.width / 2 + 5, this.height / 6 + 72 - 6, 150, 20, new TranslationText_js_4.default("options.controls").get(), () => {
            }));
            this.addButton(new Button_js_5.default(this.width / 2 - 155, this.height / 6 + 96 - 6, 150, 20, new TranslationText_js_4.default("options.language").get(), () => {
            }));
            this.addButton(new Button_js_5.default(this.width / 2 + 5, this.height / 6 + 96 - 6, 150, 20, new TranslationText_js_4.default("options.chat.title").get(), () => {
                this.minecraft.displayGuiScreen(new ChatOptionsScreen_js_1.default(this, this.settings));
            }));
            this.addButton(new Button_js_5.default(this.width / 2 - 155, this.height / 6 + 120 - 6, 150, 20, new TranslationText_js_4.default("options.resourcepack").get(), () => {
            }));
            this.addButton(new Button_js_5.default(this.width / 2 + 5, this.height / 6 + 120 - 6, 150, 20, new TranslationText_js_4.default("options.accessibility.title").get(), () => {
                this.minecraft.displayGuiScreen(new AccessibilityScreen_js_1.default(this, this.settings));
            }));
            this.addButton(new Button_js_5.default(this.width / 2 - 100, this.height / 6 + 168, 200, 20, new TranslationText_js_4.default("gui.done").get(), () => {
                this.minecraft.displayGuiScreen(this.parentScreen);
            }));
        }
        render(context, mouseX, mouseY) {
            this.renderDirtBackground(context);
        }
    }
    exports.default = OptionsScreen;
});
define("gui/screens/MainMenuScreen", ["require", "exports", "index", "utils/TranslationText", "gui/FontRenderer", "gui/widgets/button/Button", "gui/widgets/button/ImageButton", "gui/screens/AccessibilityScreen", "gui/screens/OptionsScreen", "gui/screens/ScreenP"], function (require, exports, index_js_5, TranslationText_js_5, FontRenderer_js_3, Button_js_6, ImageButton_js_1, AccessibilityScreen_js_2, OptionsScreen_js_1, ScreenP_js_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    TranslationText_js_5 = __importDefault(TranslationText_js_5);
    FontRenderer_js_3 = __importDefault(FontRenderer_js_3);
    Button_js_6 = __importDefault(Button_js_6);
    ImageButton_js_1 = __importDefault(ImageButton_js_1);
    AccessibilityScreen_js_2 = __importDefault(AccessibilityScreen_js_2);
    OptionsScreen_js_1 = __importDefault(OptionsScreen_js_1);
    ScreenP_js_3 = __importDefault(ScreenP_js_3);
    class MainMenuScreen extends ScreenP_js_3.default {
        constructor() {
            super(...arguments);
            this.widthCopyright = 0;
            this.widthCopyrightRest = 0;
            this.MINECRAFT_TITLE_IMG = index_js_5.minecraftImg;
            this.MINECRAFT_EDITION_IMG = index_js_5.editionImg;
            this.WIDGETS_LOCATION = index_js_5.widgetsImg;
            this.ACCESSIBILITY_TEXTURES = index_js_5.accessibilityImg;
            this.showTitleWronglySpelled = (Math.random() < 1.0E-4);
            this.splashText = '';
            this.buttonResetDemo = null;
        }
        closeScreen() { }
        shouldCloseOnEsc() {
            return false;
        }
        init() {
            this.splashText = this.splashText !== '' ? this.splashText : this.minecraft.getSplashText();
            this.widthCopyright = FontRenderer_js_3.default.getTextWidth("Not affiliated with Mojang Studios!");
            this.widthCopyrightRest = this.width - this.widthCopyright - 2;
            let i = 24;
            let j = this.height / 4 + 48;
            let isDemo = false;
            if (isDemo) {
                this.addDemoButtons(j, 24);
            }
            else {
                this.addSingleplayerMultiplayerButtons(j, 24);
            }
            this.addButton(new ImageButton_js_1.default(this.width / 2 - 124, j + 72 + 12, 20, 20, 0, 106, 20, this.WIDGETS_LOCATION, 256, 256, () => {
                this.minecraft.displayGuiScreen(new OptionsScreen_js_1.default(this, this.minecraft.gameSettings));
            }, ''));
            this.addButton(new Button_js_6.default(this.width / 2 - 100, j + 72 + 12, 98, 20, new TranslationText_js_5.default('menu.options').get(), () => {
                this.minecraft.displayGuiScreen(new OptionsScreen_js_1.default(this, this.minecraft.gameSettings));
            }));
            this.addButton(new Button_js_6.default(this.width / 2 + 2, j + 72 + 12, 98, 20, new TranslationText_js_5.default('menu.quit').get(), () => {
                this.minecraft.shutdown();
            }));
            this.addButton(new ImageButton_js_1.default(this.width / 2 + 104, j + 72 + 12, 20, 20, 0, 0, 20, this.ACCESSIBILITY_TEXTURES, 32, 64, () => {
                this.minecraft.displayGuiScreen(new AccessibilityScreen_js_2.default(this, this.minecraft.gameSettings));
            }, ''));
        }
        addSingleplayerMultiplayerButtons(yIn, rowHeightIn) {
            this.addButton(new Button_js_6.default(this.width / 2 - 100, yIn, 200, 20, new TranslationText_js_5.default("menu.singleplayer").get(), () => {
            }));
            (this.addButton(new Button_js_6.default(this.width / 2 - 100, yIn + rowHeightIn * 1, 200, 20, new TranslationText_js_5.default("menu.multiplayer").get(), () => {
                let screen = (this.minecraft.gameSettings.skipMultiplayerWarning ? null : null);
            })));
            (this.addButton(new Button_js_6.default(this.width / 2 - 100, yIn + rowHeightIn * 2, 200, 20, new TranslationText_js_5.default("menu.online").get(), () => {
            })));
        }
        addDemoButtons(yIn, rowHeightIn) {
            this.addButton(new Button_js_6.default(this.width / 2 - 100, yIn, 200, 20, new TranslationText_js_5.default("menu.playdemo").get(), () => {
            }));
            this.buttonResetDemo = this.addButton(new Button_js_6.default(this.width / 2 - 100, yIn + rowHeightIn * 1, 200, 20, new TranslationText_js_5.default("menu.resetdemo").get(), () => {
            }));
            this.buttonResetDemo.active = false;
        }
        render(context, mouseX, mouseY) {
            context.save();
            context.fillStyle = '#333';
            context.fillRect(0, 0, this.width, this.height);
            context.restore();
            context.save();
            let j = this.width / 2 - 137;
            if (this.showTitleWronglySpelled) {
                this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 0, 30, 0, 0, 99, 44);
                this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 99, 30, 129, 0, 27, 44);
                this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 99 + 26, 30, 126, 0, 3, 44);
                this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 99 + 26 + 3, 30, 99, 0, 26, 44);
                this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 155, 30, 0, 45, 155, 44);
            }
            else {
                this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 0, 30, 0, 0, 155, 44);
                this.drawImg(context, this.MINECRAFT_TITLE_IMG, j + 155, 30, 0, 45, 155, 44);
            }
            this.drawImg(context, this.MINECRAFT_EDITION_IMG, j + 88, 67, 0, 0, 98, 14);
            context.restore();
            context.save();
            const miliT = new Date().getMilliseconds();
            let f2 = 2.0 - Math.abs(Math.sin((miliT % 1000) / 1000.0 * (Math.PI * 2)) * 0.03);
            try {
                f2 = f2 * 100.0 / (FontRenderer_js_3.default.getTextWidth('sssssssssssssssssssssss') + 32);
            }
            catch {
                f2 = f2 * 100.0 / (context.measureText('Error').width + 32);
            }
            context.scale(f2, f2);
            context.rotate(-20 * Math.PI / 180);
            try {
                this.drawCenteredString(context, this.splashText, j + 88 + 70, 67 + 100 - 20, 16776960);
            }
            catch {
                this.drawCenteredString(context, 'Error', j + 88 + 70, 67 + 100, 16776960);
            }
            context.restore();
            let s = 'Minecraft JS 1.20.2';
            this.drawString(context, s, 2, this.height - 10, 16777215);
            let f = 'Not affiliated with Mojang Studios!';
            if (mouseX > (this.widthCopyrightRest) && mouseX < (this.widthCopyrightRest + this.widthCopyright) && mouseY > (this.height - 10) && mouseY < this.height) {
                this.fill(context, (this.widthCopyrightRest - 1), this.height - 2, this.widthCopyright + 1, 1, 16777215);
            }
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
            window.addEventListener('keypress', (e) => {
                this.onKeyEvent(e.key, 1, {
                    altKeyDown: e.getModifierState('Alt'),
                    altGrKeyDown: e.getModifierState('AltGraph'),
                    capsLockKeyDown: e.getModifierState('CapsLock'),
                    controlKeyDown: e.getModifierState('Control'),
                    numLockKeyDown: e.getModifierState('NumLock'),
                    shiftKeyDown: e.getModifierState('Shift')
                });
            });
            window.addEventListener('keyup', (e) => {
                this.onKeyEvent(e.key, 0, {
                    altKeyDown: e.getModifierState('Alt'),
                    altGrKeyDown: e.getModifierState('AltGraph'),
                    capsLockKeyDown: e.getModifierState('CapsLock'),
                    controlKeyDown: e.getModifierState('Control'),
                    numLockKeyDown: e.getModifierState('NumLock'),
                    shiftKeyDown: e.getModifierState('Shift')
                });
            });
            window.addEventListener('keydown', (e) => {
                if (!(e.key == 'F11' || e.key == 'F12'))
                    e.preventDefault();
                this.onKeyEvent(e.key, 2, {
                    altKeyDown: e.getModifierState('Alt'),
                    altGrKeyDown: e.getModifierState('AltGraph'),
                    capsLockKeyDown: e.getModifierState('CapsLock'),
                    controlKeyDown: e.getModifierState('CapsLoControlck'),
                    numLockKeyDown: e.getModifierState('NumLock'),
                    shiftKeyDown: e.getModifierState('Shift')
                });
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
            this.leftDown = false;
            this.middleDown = false;
            this.rightDown = false;
            this.mouseX = 0;
            this.mouseY = 0;
            this.ignoreFirstMove = true;
            this.xVelocity = 0;
            this.yVelocity = 0;
            this.eventTime = 0;
            this.accumulatedScrollDelta = 0;
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
            let d0 = (true ? Math.sign(yoffset) : yoffset) * 1;
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
    MouseHelper;
});
define("Minecraft", ["require", "exports", "GameSettings", "gui/FontRenderer", "gui/screens/MainMenuScreen", "index", "utils/KeyboardListener", "utils/MouseHelper"], function (require, exports, GameSettings_js_1, FontRenderer_js_4, MainMenuScreen_js_1, index_js_6, KeyboardListener_js_1, MouseHelper_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    GameSettings_js_1 = __importDefault(GameSettings_js_1);
    FontRenderer_js_4 = __importDefault(FontRenderer_js_4);
    MainMenuScreen_js_1 = __importDefault(MainMenuScreen_js_1);
    KeyboardListener_js_1 = __importDefault(KeyboardListener_js_1);
    MouseHelper_js_1 = __importDefault(MouseHelper_js_1);
    class Minecraft {
        constructor(gameConfig) {
            this.context = document.getElementById('root').getContext('2d');
            this.canvasX = 0;
            this.canvasY = 0;
            this.ResourcesData = index_js_6.Resources;
            this.canvasWidth = window.innerWidth;
            this.canvasHeight = window.innerHeight;
            this.scaleFactor = 3;
            this.fps = 0;
            this.times = [];
            this.running = true;
            this.currentScreen = null;
            this.gameconfiguration = gameConfig;
            this.gameSettings = new GameSettings_js_1.default(this);
            this.mouseHelper = new MouseHelper_js_1.default(this, this.context);
            this.keyboardListener = new KeyboardListener_js_1.default(this);
            this.mouseHelper.registerCallbacks();
            this.keyboardListener.setupCallbacks();
            this.updateCanvasSize();
            this.run();
        }
        shutdown() {
            this.running = false;
            window.close();
        }
        setFpsVisibility(state) {
            this.gameSettings.showFPS = state;
        }
        isFpsVisible() {
            return this.gameSettings.showFPS;
        }
        getSplashText() {
            function aaa() {
                const splashes = index_js_6.ResourcesSplashes;
                const date = new Date(), month = date.getMonth(), day = date.getDate();
                const getRandomSplashText = () => {
                    return splashes[~~(Math.random() * (splashes.length - 1))];
                };
                let randSplash = String(getRandomSplashText());
                if (month + 1 === 12 && day === 24) {
                    randSplash = 'Merry X-mas!';
                }
                else if (month + 1 === 1 && day === 1) {
                    randSplash = 'Happy new year!';
                }
                else if (month + 1 === 10 && day === 31) {
                    randSplash = 'OOoooOOOoooo! Spooky!';
                }
                return randSplash;
            }
            return aaa();
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
                        FontRenderer_js_4.default.drawStringWithShadow(this.context, `${String(this.getFPS())}/${this.gameSettings.framerateLimit}`, 2, 2, 16777215);
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
            return this.fps > this.gameSettings.framerateLimit ? this.gameSettings.framerateLimit : this.fps;
        }
        displayGuiScreen(guiScreenIn) {
            if (this.currentScreen != null)
                this.currentScreen.onClose();
            if (guiScreenIn === null)
                guiScreenIn = new MainMenuScreen_js_1.default();
            this.currentScreen = guiScreenIn;
            if (guiScreenIn !== null) {
                try {
                    const i = this.mouseHelper.getMouseX();
                    const j = this.mouseHelper.getMouseY();
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
    }
    exports.default = Minecraft;
});
define("GameSettings", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GameSettings {
        constructor(mcIn) {
            this.mouseSensitivity = 0.5;
            this.testthing = false;
            this.framerateLimit = 60;
            this.showFPS = true;
            this.skipMultiplayerWarning = false;
            this.language = 'en_us';
            this.mc = mcIn;
            this.loadOptions();
        }
        loadOptions() {
            localStorage.getItem('GameSettings') ? () => {
                const Options = JSON.parse(localStorage.getItem('GameSettings'));
                this.testthing = Options.testthing;
                this.framerateLimit = Options.framerateLimit;
                this.showFPS = Options.showFPS;
                this.skipMultiplayerWarning = Options.skipMultiplayerWarning;
                this.language = Options.language;
            } : null;
        }
        saveOptions() {
            localStorage.setItem('GameSettings', JSON.stringify({
                testthing: this.testthing,
                framerateLimit: this.framerateLimit,
                showFPS: this.showFPS,
                skipMultiplayerWarning: this.skipMultiplayerWarning,
                language: this.language
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
define("settings/BooleanOption", ["require", "exports", "AbstractOption", "gui/widgets/button/OptionButton", "utils/TranslationText"], function (require, exports, AbstractOption_js_1, OptionButton_js_4, TranslationText_js_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    AbstractOption_js_1 = __importDefault(AbstractOption_js_1);
    OptionButton_js_4 = __importDefault(OptionButton_js_4);
    TranslationText_js_6 = __importDefault(TranslationText_js_6);
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
            return new OptionButton_js_4.default(xIn, yIn, widthIn, 20, this, this.func_238152_c_(options), () => {
                this.nextValue(options);
            });
        }
        func_238152_c_(p_238152_1_) {
            return `${new TranslationText_js_6.default(this.text).get()}: ${this.get(p_238152_1_) == false ? new TranslationText_js_6.default('options.off').get() : new TranslationText_js_6.default('options.on').get()}`;
        }
    }
    exports.default = BooleanOption;
});
define("GameOption", ["require", "exports", "settings/BooleanOption"], function (require, exports, BooleanOption_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    BooleanOption_1 = __importDefault(BooleanOption_1);
    class GameOption {
    }
    exports.default = GameOption;
    GameOption.ShowFPSOption = new BooleanOption_1.default('Show FPS', (settings) => {
        return settings.showFPS;
    }, (settings, optionValues) => {
        settings.showFPS = optionValues;
    });
    GameOption.TestOption = new BooleanOption_1.default('Test', (settings) => {
        return settings.testthing;
    }, (settings, optionValues) => {
        settings.testthing = optionValues;
    });
});
define("utils/MathHelper", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MathHelper {
        static floor(mouseX) {
            throw new Error("Method not implemented.");
        }
        static clamp(num, min, max) {
            if (num < min)
                return min;
            else
                return num > max ? max : num;
        }
    }
    exports.default = MathHelper;
});
