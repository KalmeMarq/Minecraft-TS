declare global {
  interface String {
    equals(equalsto: string): boolean;
  }
}

String.prototype.equals = function(equalsto: string): boolean {
  return String(this) === equalsto;
}

export {}