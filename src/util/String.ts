declare global {
  interface String {
    equals(equalsto: string): boolean;
    isEmpty(): boolean;
  }
}

String.prototype.equals = function(equalsto: string): boolean {
  return String(this) === equalsto;
}

String.prototype.isEmpty = function(): boolean {
  return String(this) === '';
}

export {}