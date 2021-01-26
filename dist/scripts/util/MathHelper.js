export default class MathHelper {
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
