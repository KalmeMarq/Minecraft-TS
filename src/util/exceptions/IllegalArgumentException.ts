import Exception from "./Exception";

export default class IllegalArgumentException extends Exception {
  public constructor(message: string) {
    super(message, 'IllegalArgumentException', IllegalArgumentException);
  }
} 