export class ClipboardHelper {
  public async getClipboardString(): Promise<string> {
    const promise = navigator.clipboard.readText()
    .then((text: any) => text.toString())
    .catch(err => {
      console.log('Something went wrong', err);
    });
    return await promise;
  }

  private static copyToClipboard(clipboardContent: string) {
    navigator.clipboard.writeText(clipboardContent);
  }

  public setClipboardString(string: string): void {
    if(navigator.clipboard) {
      ClipboardHelper.copyToClipboard(string);
    } else {
      console.log('Clipboard is not supported!') 
    }
  }
}