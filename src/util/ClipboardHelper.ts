export default class ClipboardHelper {
  public async getClipboardString (): Promise<string> {
    const promise = navigator.clipboard.readText()
      .then((text: any) => text.toString())
      .catch(err => {
        console.log('Something went wrong', err)
      })
    return await promise
  }

  private static copyToClipboard (clipboardContent: string): void {
    navigator.clipboard.writeText(clipboardContent).catch(e => console.log(e))
  }

  public setClipboardString (string: string): void {
    if (navigator.clipboard !== undefined) {
      ClipboardHelper.copyToClipboard(string)
    } else {
      console.log('Clipboard is not supported!')
    }
  }
}
