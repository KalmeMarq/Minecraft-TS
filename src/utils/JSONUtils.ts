export default class JSONUtils {
  public static async getJSONFile(url: string, callback: Function) {
    const req = await fetch(url);
    const data = await req.json();
    callback(data);
  }

  public static async getTextFile(url: string, callback: Function) {
    const req = await fetch(url);
    const data = await req.text();
    callback(data);
  } 
}