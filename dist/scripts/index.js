var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("GameConfiguration", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GameConfiguration {
        constructor() {
        }
    }
    exports.default = GameConfiguration;
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
        '_': { x: 119, y: 40, w: 7, h: 8 },
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
    class CharacterRenderer {
        constructor(char, color) {
            this.char = char;
            this.charWidth = chars[this.char].w;
            this.charHeight = chars[this.char].h;
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
            ctxfont.drawImage(index_js_1.fontImg, chars[this.char].x, chars[this.char].y, this.charWidth, this.charHeight, 0, 0, this.charWidth, this.charHeight);
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
            ctxfont.drawImage(index_js_1.fontImg, chars[this.char].x, chars[this.char].y, this.charWidth, this.charHeight, 0, 0, this.charWidth, this.charHeight);
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
                width += chars[text[j]].w - 1;
            }
            return width;
        }
        static renderCenteredText(text, posX, posY, color) {
            let textChars = text.split('');
            let textwidth = FontRenderer.getTextWidth(text);
            for (var j = 0, k = posX; j < textChars.length; j++) {
                const char = textChars[j];
                if (!(index_js_1.characterRenderers[color] && index_js_1.characterRenderers[color][textChars[j]])) {
                    index_js_1.addCharacterRenderer(color, textChars[j]);
                }
                document.getElementById('root').getContext('2d').drawImage(index_js_1.characterRenderers[color][char]['textShadow'], k - 1 - textwidth / 2 + 1, posY + 1);
                document.getElementById('root').getContext('2d').drawImage(index_js_1.characterRenderers[color][char]['text'], k - 1 - textwidth / 2, posY);
                k += chars[char].w - 1;
            }
        }
        static renderText(context, text, posX, posY, color) {
            let textChars = text.split('');
            let textwidth = FontRenderer.getTextWidth(text);
            for (var j = 0, k = posX; j < textChars.length; j++) {
                const char = textChars[j];
                if (!(index_js_1.characterRenderers[color] && index_js_1.characterRenderers[color][textChars[j]])) {
                    index_js_1.addCharacterRenderer(color, textChars[j]);
                }
                context.drawImage(index_js_1.characterRenderers[color][char]['textShadow'], k - 1 + 1, posY + 1);
                context.drawImage(index_js_1.characterRenderers[color][char]['text'], k - 1, posY);
                k += chars[char].w - 1;
            }
        }
        static drawStringWithShadow(context, text, posX, posY, color) {
            let textChars = text.split('');
            let textwidth = FontRenderer.getTextWidth(text);
            for (var j = 0, k = posX; j < textChars.length; j++) {
                const char = textChars[j];
                if (!(index_js_1.characterRenderers[color] && index_js_1.characterRenderers[color][textChars[j]])) {
                    index_js_1.addCharacterRenderer(color, textChars[j]);
                }
                context.drawImage(index_js_1.characterRenderers[color][char]['textShadow'], k - 1 + 1, posY + 1);
                context.drawImage(index_js_1.characterRenderers[color][char]['text'], k - 1, posY);
                k += chars[char].w - 1;
            }
        }
    }
    exports.default = FontRenderer;
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
    exports.addCharacterRenderer = exports.characterRenderers = exports.clickSound = exports.optionsBackgroundImg = exports.widgetsImg = exports.editionImg = exports.minecraftImg = exports.mojangstudiosImg = exports.fontImg = exports.langNames = exports.ResourcesSplashes = exports.Resources = void 0;
    GameConfiguration_js_1 = __importDefault(GameConfiguration_js_1);
    Minecraft_js_1 = __importDefault(Minecraft_js_1);
    JSONUtils_js_1 = __importDefault(JSONUtils_js_1);
    exports.Resources = {
        languages: [],
        texts: {
            credits: [],
            end: [],
            splashes: []
        }
    };
    exports.ResourcesSplashes = exports.Resources.texts.splashes;
    exports.langNames = ['af_za', 'ar_sa', 'ast_es', 'az_az', 'ba_ru', 'bar', 'be_by', 'bg_bg', 'br_fr', 'brb', 'bs_ba', 'ca_es', 'cs_cz', 'cy_gb', 'da_dk', 'de_at', 'de_ch', 'de_de', 'el_gr', 'en_au', 'en_ca', 'en_gb', 'en_nz', 'en_pt', 'en_ud', 'en_us', 'enp', 'enws', 'eo_uy', 'es_ar', 'es_cl', 'es_ec', 'es_ec', 'es_es', 'es_mx', 'es_uy', 'es_ve', 'esan', 'et_ee', 'eu_es', 'fa_ir', 'fi_fi', 'fil_ph', 'fo_fo', 'fr_ca', 'fr_fr', 'fra_de', 'fy_nl', 'ga_ie', 'gd_gb', 'gl_es', 'got_de', 'gv_im', 'haw_us', 'he_il', 'hi_in', 'hr_hr', 'hu_hu', 'hy_am', 'id_id', 'ig_ng', 'io_en', 'is_is', 'isv', 'it_it', 'ja_jp', 'jbo_en', 'ka_ge', 'kab_kab', 'kk_kz', 'kn_in', 'ko_kr', 'ksh', 'kw_gb', 'la_la', 'lb_lu', 'li_li', 'lol_us', 'lt_lt', 'lv_lv', 'mi_nz', 'mk_mk', 'mn_mn', 'moh_ca', 'ms_my', 'mt_mt', 'nds_de', 'nl_be', 'nl_nl', 'nn_no', 'no_no', 'nuk', 'oc_fr', 'oj_ca', 'ovd', 'pl_pl', 'pt_br', 'pt_pt', 'qya_aa', 'ro_ro', 'ru_ru', 'scn', 'se_no', 'sk_sk', 'sl_si', 'so_so', 'sq_al', 'sr_sp', 'sv_se', 'swg', 'sxu', 'szl', 'ta_in', 'th_th', 'tl_ph', 'tlh_aa', 'tr_tr', 'tt_ru', 'tzl_tzl', 'uk_ua', 'val_es', 'vec_it', 'vi_vn', 'yi_de', 'yo_ng', 'zh_cn', 'zh_tw'];
    exports.fontImg = new Image(256, 256);
    exports.mojangstudiosImg = new Image(256, 256);
    exports.minecraftImg = new Image(256, 256);
    exports.editionImg = new Image(256, 256);
    exports.widgetsImg = new Image(256, 256);
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
    const initialize = async () => {
        document.getElementById('root').getContext('2d').clearRect(0, 0, window.innerWidth, window.innerHeight);
        async function fetchAllData() {
            const rootloc = 'resources/assets/minecraft';
            exports.fontImg.src = `./${rootloc}/textures/font/ascii.png`;
            exports.editionImg.src = `./${rootloc}/textures/gui/title/edition.png`;
            exports.minecraftImg.src = `./${rootloc}/textures/gui/title/minecraft.png`;
            exports.mojangstudiosImg.src = `./${rootloc}/textures/gui/title/mojangstudios.png`;
            exports.widgetsImg.src = `./${rootloc}/textures/gui/widgets.png`;
            exports.optionsBackgroundImg.src = `./${rootloc}/textures/gui/options_background.png`;
            exports.clickSound.src = `./${rootloc}/sounds/click_stereo.ogg`;
            exports.langNames.forEach(async (name) => await JSONUtils_js_1.default.getJSONFile(`./${rootloc}/lang/${name}.json`, (data) => exports.Resources.languages.push({ code: name, data: data })));
            await JSONUtils_js_1.default.getTextFile(`./${rootloc}/texts/credits.txt`, (data) => data.split(/\r?\n/).forEach((line) => exports.Resources.texts.credits.push(line)));
            await JSONUtils_js_1.default.getTextFile(`./${rootloc}/texts/end.txt`, (data) => data.split(/\r?\n/).forEach((line) => exports.Resources.texts.end.push(line)));
            await JSONUtils_js_1.default.getTextFile(`./${rootloc}/texts/splashes.txt`, (data) => data.split(/\r?\n/).forEach((line) => exports.Resources.texts.splashes.push(line)));
            if (!localStorage.getItem('WorldsList'))
                localStorage.setItem('WorldsList', JSON.stringify([]));
            if (!localStorage.getItem('ServersList'))
                localStorage.setItem('ServersList', JSON.stringify([]));
        }
        ;
        await fetchAllData();
        console.log(exports.Resources);
        document.title = 'Minecraft JS';
        Main.main();
    };
    initialize();
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
                const displayLang = index_js_2.Resources.languages.find((id) => id.code === 'en_us');
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
        getYImage(isHovered) {
            let i = 1;
            if (!this.active)
                i = 0;
            else if (isHovered)
                i = 2;
            return i;
        }
        renderScreen(context, mouseX, mouseY) {
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
            let yUV = this.getYImage(this.getHovered());
            this.renderBgG(context, index_js_3.widgetsImg, [0, 46 + 20 * yUV], [this.x, this.y], [this.width / 2, 20]);
            this.renderBgG(context, index_js_3.widgetsImg, [200 - this.width / 2, 46 + 20 * yUV], [this.x + this.width / 2, this.y], [this.width / 2, 20]);
            let textColor = this.active ? 16777215 : 10526880;
            FontRenderer_js_2.default.renderCenteredText(this.message, this.x + this.width / 2, this.y + (this.height - 8) / 2, textColor);
        }
        renderBgG(context, img, uv, offset, uvSize) {
            context.clearRect(offset[0], offset[1], uvSize[0], uvSize[1]);
            context.save();
            context.imageSmoothingEnabled = false;
            context.globalAlpha = this.alpha;
            context.drawImage(img, uv[0], uv[1], uvSize[0], uvSize[1], offset[0], offset[1], uvSize[0], uvSize[1]);
            context.restore();
        }
        getHovered() {
            return this.isHovered || this.focused;
        }
        mouseClicked(mouseX, mouseY, button) {
            if (mouseX > this.x && mouseY > this.y && mouseX < this.x + this.width && mouseY < this.y + this.height) {
                console.log('button clicked');
            }
        }
        mouseReleased(mouseX, mouseY, button) {
            if (mouseX > this.x && mouseY > this.y && mouseX < this.x + this.width && mouseY < this.y + this.height) {
                console.log('button released');
            }
        }
        clicked(clickX, clickY) {
            return this.clicked && this.active && this.visible && clickX >= this.x && clickY >= this.y && clickX < (this.x + this.width) && clickY < (this.y + this.height);
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
            if (mouseX > this.x && mouseY > this.y && mouseX < this.x + this.width && mouseY < this.y + this.height) {
                this.onPress();
                const a = new Audio('resources/assets/minecraft/sounds/click_stereo.ogg');
                a.volume = 0.2;
                a.play();
            }
        }
        mouseReleased() {
        }
    }
    exports.default = Button;
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
define("gui/screens/ScreenP", ["require", "exports", "index", "gui/FocusableGui"], function (require, exports, index_js_4, FocusableGui_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    FocusableGui_js_1 = __importDefault(FocusableGui_js_1);
    class ScreenP extends FocusableGui_js_1.default {
        constructor() {
            super(...arguments);
            this.width = 0;
            this.height = 0;
            this.children = new Array();
            this.buttons = new Array();
        }
        initScreen(minecraft, width, height) {
            this.minecraft = minecraft;
            this.buttons = [];
            this.children = [];
            this.width = width;
            this.height = height;
            this.init();
        }
        init() {
        }
        renderScreen(context, mouseX, mouseY) {
            this.render(context, mouseX, mouseY);
            for (var i = 0; i < this.buttons.length; ++i) {
                this.buttons[i].renderScreen(context, mouseX, mouseY);
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
        keyDown(key, modifiers) {
            if (key === 'F3') {
                const i = this.minecraft.isFpsVisible();
                this.minecraft.setFpsVisibility(i ? false : true);
            }
            if (key == 'Escape' && this.shouldCloseOnEsc()) {
                this.closeScreen();
                return true;
            }
            else if (key == 'Tab') {
                this.changeFocus(true);
                return false;
            }
            else {
            }
        }
        shouldCloseOnEsc() {
            return true;
        }
        closeScreen() {
            this.minecraft.displayGuiScreen(null);
        }
        renderDirtBackground(context) {
            context.save();
            context.scale(3 * 0.65, 3 * 0.65);
            context.fillStyle = context.createPattern(index_js_4.optionsBackgroundImg, 'repeat');
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
            context.fillStyle = 'rgba(0, 0, 0, 0.7)';
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
            context.restore();
        }
        mouseDragged() { }
        mouseMoved() { }
        mouseScrolled() {
            console.log("scrolling");
        }
        changeFocus(focus) {
            let iguieventlistener = this.getListener();
            let list = this.getEventListeners();
            list[0].changeFocus(true);
            return false;
        }
    }
    exports.default = ScreenP;
});
define("gui/screens/Accessibility", ["require", "exports", "utils/TranslationText", "gui/widgets/button/Button", "gui/screens/ScreenP"], function (require, exports, TranslationText_1, Button_1, ScreenP_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    TranslationText_1 = __importDefault(TranslationText_1);
    Button_1 = __importDefault(Button_1);
    ScreenP_1 = __importDefault(ScreenP_1);
    class AccessibilityScreen extends ScreenP_1.default {
        constructor(parentScreen) {
            super();
            this.parentScreen = parentScreen;
        }
        closeScreen() {
            this.minecraft.displayGuiScreen(this.parentScreen);
        }
        init() {
            this.addButton(new Button_1.default(this.width / 2 - 100, this.height / 6 + 168, 200, 20, new TranslationText_1.default("gui.done").get(), () => {
                this.minecraft.displayGuiScreen(this.parentScreen);
            }));
        }
        render(context, mouseX, mouseY) {
            this.renderDirtBackground(context);
        }
    }
    exports.default = AccessibilityScreen;
});
define("gui/screens/OptionsScreen", ["require", "exports", "utils/TranslationText", "gui/widgets/button/Button", "gui/screens/Accessibility", "gui/screens/ScreenP"], function (require, exports, TranslationText_2, Button_2, Accessibility_1, ScreenP_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    TranslationText_2 = __importDefault(TranslationText_2);
    Button_2 = __importDefault(Button_2);
    Accessibility_1 = __importDefault(Accessibility_1);
    ScreenP_2 = __importDefault(ScreenP_2);
    class OptionsScreen extends ScreenP_2.default {
        constructor(parentScreen) {
            super();
            this.parentScreen = parentScreen;
        }
        closeScreen() {
            this.minecraft.displayGuiScreen(this.parentScreen);
        }
        init() {
            this.addButton(new Button_2.default(this.width / 2 - 155, this.height / 6 + 48 - 6, 150, 20, new TranslationText_2.default("options.skinCustomisation").get(), () => {
            }));
            this.addButton(new Button_2.default(this.width / 2 + 5, this.height / 6 + 48 - 6, 150, 20, new TranslationText_2.default("options.sounds").get(), () => {
            }));
            this.addButton(new Button_2.default(this.width / 2 - 155, this.height / 6 + 72 - 6, 150, 20, new TranslationText_2.default("options.video").get(), () => {
            }));
            this.addButton(new Button_2.default(this.width / 2 + 5, this.height / 6 + 72 - 6, 150, 20, new TranslationText_2.default("options.controls").get(), () => {
            }));
            this.addButton(new Button_2.default(this.width / 2 - 155, this.height / 6 + 96 - 6, 150, 20, new TranslationText_2.default("options.language").get(), () => {
            }));
            this.addButton(new Button_2.default(this.width / 2 + 5, this.height / 6 + 96 - 6, 150, 20, new TranslationText_2.default("options.chat.title").get(), () => {
            }));
            this.addButton(new Button_2.default(this.width / 2 + 5, this.height / 6 + 120 - 6, 150, 20, new TranslationText_2.default("options.accessibility.title").get(), () => {
                this.minecraft.displayGuiScreen(new Accessibility_1.default(this));
            }));
            this.addButton(new Button_2.default(this.width / 2 - 100, this.height / 6 + 168, 200, 20, new TranslationText_2.default("gui.done").get(), () => {
                this.minecraft.displayGuiScreen(this.parentScreen);
            }));
        }
        render(context, mouseX, mouseY) {
            this.renderDirtBackground(context);
        }
    }
    exports.default = OptionsScreen;
});
define("gui/screens/MainMenuScreen", ["require", "exports", "index", "utils/TranslationText", "gui/FontRenderer", "gui/widgets/button/Button", "gui/screens/OptionsScreen", "gui/screens/ScreenP"], function (require, exports, index_js_5, TranslationText_js_1, FontRenderer_js_3, Button_js_1, OptionsScreen_js_1, ScreenP_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    TranslationText_js_1 = __importDefault(TranslationText_js_1);
    FontRenderer_js_3 = __importDefault(FontRenderer_js_3);
    Button_js_1 = __importDefault(Button_js_1);
    OptionsScreen_js_1 = __importDefault(OptionsScreen_js_1);
    ScreenP_js_1 = __importDefault(ScreenP_js_1);
    class MainMenuScreen extends ScreenP_js_1.default {
        constructor() {
            super(...arguments);
            this.widthCopyright = 0;
            this.widthCopyrightRest = 0;
            this.MINECRAFT_TITLE_IMG = index_js_5.minecraftImg;
            this.MINECRAFT_EDITION_IMG = index_js_5.editionImg;
            this.showTitleWronglySpelled = (Math.random() < 1.0E-4);
            this.splashText = this.getSplashText();
        }
        getSplashText() {
            const splashes = index_js_5.ResourcesSplashes;
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
        closeScreen() {
        }
        shouldCloseOnEsc() {
            return false;
        }
        init() {
            let i = 24;
            let j = this.height / 4 + 48;
            this.widthCopyright = FontRenderer_js_3.default.getTextWidth("Not affiliated with Mojang Studios!");
            this.widthCopyrightRest = this.width - this.widthCopyright - 2;
            this.addButton(new Button_js_1.default(this.width / 2 - 100, j, 200, 20, new TranslationText_js_1.default('menu.singleplayer').get(), () => { }));
            this.addButton(new Button_js_1.default(this.width / 2 - 100, j + i * 1, 200, 20, new TranslationText_js_1.default('menu.multiplayer').get(), () => { }));
            this.addButton(new Button_js_1.default(this.width / 2 - 100, j + i * 2, 200, 20, new TranslationText_js_1.default('menu.online').get(), () => { }));
            this.addButton(new Button_js_1.default(this.width / 2 - 100, j + 72 + 12, 98, 20, new TranslationText_js_1.default('menu.options').get(), () => {
                this.minecraft.displayGuiScreen(new OptionsScreen_js_1.default(this));
            }));
            this.addButton(new Button_js_1.default(this.width / 2 + 2, j + 72 + 12, 98, 20, new TranslationText_js_1.default('menu.quit').get(), () => {
                this.minecraft.shutdown();
            }));
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
            let s = 'Minecraft JS 1.19.2';
            this.drawString(context, s, 2, this.height - 10, 16777215);
            let f = 'Not affiliated with Mojang Studios';
            if (mouseX > (this.widthCopyrightRest) && mouseX < (this.widthCopyrightRest + this.widthCopyright) && mouseY > (this.height - 10) && mouseY < this.height) {
                this.fill(context, (this.widthCopyrightRest - 1), this.height - 2, this.widthCopyright + 1, 1, 16777215);
            }
            this.drawString(context, 'Not affiliated with Mojang Studios', this.widthCopyrightRest, this.height - 10, 16777215);
        }
    }
    exports.default = MainMenuScreen;
});
define("utils/KeyboardListener", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class KeyboardListener {
        constructor(minecraftIn) {
            this.repeatEventsEnabled = false;
            this.mc = minecraftIn;
        }
        onKeyEvent(key, action, modifiers) {
            const iguieventlistener = this.mc.currentScreen;
            if (action != 1) {
                if (action == 0) {
                    iguieventlistener.keyReleased(key, modifiers);
                }
                else {
                    this.mc.currentScreen.keyDown(key, modifiers);
                }
            }
            else {
                iguieventlistener.keyPressed(key, modifiers);
            }
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
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;
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
define("Minecraft", ["require", "exports", "gui/screens/MainMenuScreen", "index", "utils/KeyboardListener", "utils/MouseHelper"], function (require, exports, MainMenuScreen_js_1, index_js_6, KeyboardListener_js_1, MouseHelper_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    MainMenuScreen_js_1 = __importDefault(MainMenuScreen_js_1);
    KeyboardListener_js_1 = __importDefault(KeyboardListener_js_1);
    MouseHelper_js_1 = __importDefault(MouseHelper_js_1);
    class Minecraft {
        constructor(gameConfig) {
            this.context = document.getElementById('root').getContext('2d');
            this.canvasX = 0;
            this.ResourcesData = index_js_6.Resources;
            this.canvasY = 0;
            this.canvasWidth = window.innerWidth;
            this.canvasHeight = window.innerHeight;
            this.scaleFactor = 3;
            this.fps = 0;
            this.times = [];
            this.running = true;
            this.showFps = false;
            this.currentScreen = null;
            this.gameconfiguration = gameConfig;
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
            this.showFps = state;
        }
        isFpsVisible() {
            return this.showFps;
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
                    if (this.showFps) {
                        this.context.save();
                        this.context.fillStyle = 'red';
                        this.context.font = '8px Arial';
                        this.context.fillText(String(this.getFPS()), 2, 8);
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
            if (guiScreenIn === null) {
                guiScreenIn = new MainMenuScreen_js_1.default();
            }
            this.currentScreen = guiScreenIn;
            if (guiScreenIn !== null) {
                try {
                    const i = this.mouseHelper.getMouseX();
                    const j = this.mouseHelper.getMouseY();
                    guiScreenIn.initScreen(this, this.canvasWidth / this.scaleFactor, this.canvasHeight / this.scaleFactor);
                    this.currentScreen.renderScreen(this.context, i / this.scaleFactor, j / this.scaleFactor);
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
