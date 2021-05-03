export default class EventHandler<T> {
  private type: EventType = EventType.UNKNOWN;
  private func: (e: any) => void = () => {
  };

  private newtype: EventHandlerType = EventHandlerType.UNKNOWN;
 
  public constructor(type: EventType | EventHandlerType) {
    if(type instanceof EventHandlerType) {

    } else {
      this.type = type;
    }
  }

  set(callback: (e: T) => void) {
    this.func = (e) => {
      callback(e)
    };
    if(this.type !== EventType.UNKNOWN) {
      window.addEventListener(this.type, this.func);
    } else {
      window.addEventListener(this.newtype.getName(), this.func);
    }
  }

  remove() {
    if(this.type !== EventType.UNKNOWN) {
      window.removeEventListener(this.type, this.func)
    } else {
      window.removeEventListener(this.newtype.getName(), this.func)
    }
  }
}
export enum EventType {
  UNKNOWN = '',
  KEY_DOWN = 'keydown',
  KEY_UP = 'keyup',
  POINTER_UP = 'pointerup',
  POINTER_DOWN = 'pointerup',
  POINTER_MOVE = 'pointermove',
  MOUSE_UP = 'mouseup',
  MOUSE_DOWN = 'mousedown',
  MOUSE_MOVE = 'mousemove',
  MOUSE_WHEEL = 'wheel',
  CONTEXT_MENU = 'contextmenu'
}
export class EventHandlerType {
  public static UNKNOWN = new EventHandlerType('', undefined);
  public static KEY_DOWN = new EventHandlerType('keydown', window.KeyboardEvent);
  public static KEY_UP = new EventHandlerType('keyup', window.KeyboardEvent);
  public static POINTER_UP = new EventHandlerType('pointerup', window.PointerEvent);
  public static POINTER_DOWN = new EventHandlerType('pointerup', window.PointerEvent);
  public static POINTER_MOVE = new EventHandlerType('pointermove', window.PointerEvent);
  public static MOUSE_UP = new EventHandlerType('mouseup', window.MouseEvent);
  public static MOUSE_DOWN = new EventHandlerType('mousedown', window.MouseEvent);
  public static MOUSE_MOVE = new EventHandlerType('mousemove', window.MouseEvent);
  public static MOUSE_WHEEL = new EventHandlerType('wheel', window.WheelEvent);
  public static CONTEXT_MENU = new EventHandlerType('contextmenu', window.MouseEvent);

  private name: string;
  private event: any;

  private constructor(name: string, event: any) {
    this.name = name;
    this.event = event;
  }

  getName() {
    return this.name;
  }

  getEvent() {
    return this.event;
  }
}