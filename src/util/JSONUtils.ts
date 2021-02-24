export default class JSONUtils {
  public static async getJSONFile(url: string, callback: Function) {
    const data = await (await fetch(url)).json();
    callback(data);
  }

  public static async getTextFile(url: string, callback: Function) {
    const data = await (await fetch(url)).text();
    callback(data);
  } 
}