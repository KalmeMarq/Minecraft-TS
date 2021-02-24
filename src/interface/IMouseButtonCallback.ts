export default interface IMouseMoveCallback {
  (button: number, action: number, modifiers: any): void;
}