export default interface IKeyCallback {
  (key: string, action: number, modifiers: any): void;
}