export default class ColorHelper {
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
