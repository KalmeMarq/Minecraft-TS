export default class PointOfView {
  protected static AllValues: { [id: number]: PointOfView } = {};

  static readonly FIRST_PERSON = new PointOfView(0, 'FIRST_PERSON');
  static readonly THIRD_PERSON_BACK = new PointOfView(1, 'THIRD_PERSON_BACK');
  static readonly THIRD_PERSON_FRONT = new PointOfView(2, 'THIRD_PERSON_FRONT');

  protected constructor(public readonly id: number, public readonly key: string) {
    PointOfView.AllValues[id] = this;
  }

  public static byId(id: number): PointOfView {
    let ids: number[] = [];
    Object.keys(this.AllValues).forEach((id: any) => ids.push(Number(id)));
    if(id == ids.length) id = 0;
    return this.AllValues[id];
  }
}