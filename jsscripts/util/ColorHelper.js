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
    static packColor(alpha, red, green, blue) {
        return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    }
    static getColor(color) {
        return this.packColor(1, this.getRed(color), this.getGreen(color), this.getBlue(color));
    }
}
