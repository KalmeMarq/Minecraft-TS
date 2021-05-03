export default class FolderPackFinder {
  private readonly folder: string;

  public constructor(path: string) {
    this.folder = path;
  }

  public async loadPacks(): Promise<void> {

  }

  private createSupplier(path: string) {
    return !path.endsWith('.zip') ? () => {
      //  return new FolderPack(p_195733_1_);
    } : () => {
      //  return new FilePack(p_195733_1_);
    };
 }
}