import Exception from "./Exception";

export default class ResourceLocationException extends Exception {
  public constructor(message: string) {
    super(message, 'ResourceLocationException', ResourceLocationException);
  }
} 