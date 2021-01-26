import { scaleFactor, ctx, minecraftImg, editionImg, mouseXM, mouseYM, clickXM, clickYM, resetClickXY } from "../../../index.js";
import TranslationTextComponent from "../../../util/TranslationText.js";
import FontRenderer from "../FontRenderer.js";
import Button from "../widgets/button/Button.js";
import TextFieldWidget from "../widgets/TextFieldWidget.js";
import MultiplayerScreen from "./MultiplayerScreen.js";
import OptionsScreen from "./OptionsScreen.js";
import RealmsScreen from "./RealmsScreen.js";
import ScreenP from "./ScreenP.js";
import WorldSelectionScreen from "./WorldSelectionScreen.js";
export default class MainMenuScreen extends ScreenP {
    constructor() {
        super(...arguments);
        this.MINECRAFT_TITLE_IMG = minecraftImg;
        this.MINECRAFT_EDITION_IMG = editionImg;
        this.showTitleWronglySpelled = (Math.random() < 1.0E-4);
        this.splashText = this.minecraft.getSplashText();
    }
    init() {
        let i = 24;
        let j = this.height / 4 + 48;
        this.searchField = new TextFieldWidget(this.width / 2 - 100, 100, 200, 20, this.searchField, 'Placeholder here');
        this.addButton(new Button(this.width / 2 - 100, j, 200, 20, new TranslationTextComponent('menu.singleplayer').get(), () => {
            this.minecraft.displayGuiScreen(new WorldSelectionScreen(this));
        }));
        this.addButton(new Button(this.width / 2 - 100, j + i * 1, 200, 20, new TranslationTextComponent('menu.multiplayer').get(), () => {
            this.minecraft.displayGuiScreen(new MultiplayerScreen(this));
        }));
        this.addButton(new Button(this.width / 2 - 100, j + i * 2, 200, 20, new TranslationTextComponent('menu.online').get(), () => {
            this.minecraft.displayGuiScreen(new RealmsScreen(this));
        }));
        this.addButton(new Button(this.width / 2 - 100, j + 72 + 12, 98, 20, new TranslationTextComponent('menu.options').get(), () => {
            this.minecraft.displayGuiScreen(new OptionsScreen(this));
        }));
        this.addButton(new Button(this.width / 2 + 2, j + 72 + 12, 98, 20, new TranslationTextComponent('menu.quit').get(), () => {
            this.minecraft.crashGame();
        }));
    }
    render() {
        let s = "Minecraft JS " + this.minecraft.getVersion();
        if (this.minecraft.isDemo())
            s += " Demo";
        else
            s += ("release" === this.minecraft.getVersionType().toLocaleLowerCase() ? "" : "/" + this.minecraft.getVersionType());
        if (this.minecraft.isModdedClient())
            s += new TranslationTextComponent("menu.modded").get();
        FontRenderer.renderText(s, 2, this.height - 10, 16777215);
        ctx.save();
        let j = this.width / 2 - 137;
        if (this.showTitleWronglySpelled) {
            ScreenP.drawImg(this.MINECRAFT_TITLE_IMG, j + 0, 30, 0, 0, 99, 44);
            ScreenP.drawImg(this.MINECRAFT_TITLE_IMG, j + 99, 30, 129, 0, 27, 44);
            ScreenP.drawImg(this.MINECRAFT_TITLE_IMG, j + 99 + 26, 30, 126, 0, 3, 44);
            ScreenP.drawImg(this.MINECRAFT_TITLE_IMG, j + 99 + 26 + 3, 30, 99, 0, 26, 44);
            ScreenP.drawImg(this.MINECRAFT_TITLE_IMG, j + 155, 30, 0, 45, 155, 44);
        }
        else {
            ScreenP.drawImg(this.MINECRAFT_TITLE_IMG, j + 0, 30, 0, 0, 155, 44);
            ScreenP.drawImg(this.MINECRAFT_TITLE_IMG, j + 155, 30, 0, 45, 155, 44);
        }
        ScreenP.drawImg(this.MINECRAFT_EDITION_IMG, j + 88, 67, 0, 0, 98, 14);
        ctx.restore();
        ctx.save();
        ctx.rotate(-20 * Math.PI / 180);
        let a = this.splashText;
        let splashWidth = ctx.measureText('Not affiliated with Mojang Studios').width;
        const miliT = new Date().getMilliseconds();
        let f2 = 2.0 - Math.abs(Math.sin((miliT % 1000) / 1000.0 * (Math.PI * 2)) * 0.1);
        f2 = f2 * 100.0 / (splashWidth + 32);
        ctx.scale(f2, f2);
        try {
            FontRenderer.renderText(this.splashText, j + 88 + 70, 67 + 100, 16776960);
        }
        catch {
            FontRenderer.renderText('Error', j + 88 + 70, 67 + 100, 16776960);
        }
        ctx.restore();
        let f = 'Not affiliated with Mojang Studios';
        let textWidth = FontRenderer.getTextWidth(f.split(''));
        if (mouseXM > (this.width - textWidth - 1) * scaleFactor && mouseXM < (this.width - textWidth - 1 + textWidth) * scaleFactor && mouseYM > (this.height - 10) * scaleFactor && mouseYM < this.height * scaleFactor) {
            if (clickXM > (this.width - textWidth - 1) * scaleFactor && clickXM < (this.width - textWidth - 1 + textWidth) * scaleFactor && clickYM > (this.height - 10) * scaleFactor && clickYM < this.height * scaleFactor) {
                resetClickXY();
                console.log("No credits");
            }
            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.fillRect((this.width - textWidth - 2), this.height - 2, textWidth + 1, 1);
            ctx.stroke();
        }
        FontRenderer.renderText(f, this.width - FontRenderer.getTextWidth(f.split('')) - 1, this.height - 10, 16777215);
        this.searchField.renderButton(mouseXM, mouseYM);
    }
}
