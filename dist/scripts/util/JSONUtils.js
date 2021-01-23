export default class JSONUtils {
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
