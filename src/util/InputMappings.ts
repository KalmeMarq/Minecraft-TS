import IMouseMoveCallback from "./interfaces/IMouseMoveCallback";
import IMousePressCallback from "./interfaces/IMousePressCallback";
import IScrollCallback from "./interfaces/IScrollCallback";
import CustomMap from "./CustomMap";
import EventHandler, { EventType } from "./EventHandler"

export default class InputMappings {
  private static pointerUpEventHandler: EventHandler<PointerEvent> = new EventHandler(EventType.POINTER_UP);
  private static pointerDownEventHandler: EventHandler<PointerEvent> = new EventHandler(EventType.POINTER_DOWN);
  private static pointerMoveEventHandler: EventHandler<PointerEvent> = new EventHandler(EventType.POINTER_MOVE);
  private static contextMenuEventHandler: EventHandler<MouseEvent> = new EventHandler(EventType.CONTEXT_MENU);
  private static keyDownEventHandler: EventHandler<KeyboardEvent> = new EventHandler(EventType.KEY_DOWN);
  private static keyUpEventHandler: EventHandler<KeyboardEvent> = new EventHandler(EventType.KEY_UP);
  private static wheelEventHandler: EventHandler<WheelEvent> = new EventHandler(EventType.MOUSE_WHEEL);
  public static readonly UNKNOWN: Input;

  private static keys: { [key: string]: number } = {}
  private static keysCounter: { [key: string]: number } = {}

  public static getKey(key: string, code: string): Input {
    return Type.KEY.getOrCreate(key, code);
  }

  public static isKeyDown (keyCode: string) {
    return InputMappings.keys[keyCode] === 1
  }

  public static setupKeyCallbacks (keyPressedCallback: (key: string, keyCode: string, action: number) => void, keyTypedCallback: (char: number) => void) {
    this.keyUpEventHandler.set((e: KeyboardEvent) => {
      InputMappings.keys[e.code] = 0
      if(!InputMappings.keysCounter[e.code]) InputMappings.keysCounter[e.code] = 0;
      InputMappings.keysCounter[e.code]++;

      let type = 0;

      if(InputMappings.keysCounter[e.code] >= 2) {
        type = 2
      }

      setTimeout(() => (InputMappings.keysCounter[e.code] = 0), 200);

      if (e.code === 'F3') e.preventDefault()
      if (e.code === 'F1') e.preventDefault()

      keyPressedCallback(e.key, e.code, type)
    })

    this.keyDownEventHandler.set((e: KeyboardEvent) => {
      InputMappings.keys[e.code] = 1

      keyPressedCallback(e.key, e.code, 1)

      if (e.code === 'F3') e.preventDefault()
      if (e.code === 'F1') e.preventDefault()

      if (e.key === 'Tab') {
        e.preventDefault()
      }

      if (e.code !== 'ControlLeft' && e.code !== 'ShiftLeft' && e.code !== 'Meta' && e.code !== 'ControlRight' && e.code !== 'ShiftRight' && e.code !== 'AltRight'
        && e.code !== 'Backspace' && e.code !== 'Escape' && e.code !== 'AltLeft' && e.code !== 'Enter'
        && e.code !== 'AltGraph' && e.code !== 'Tab' && e.code !== 'CapsLock' && (e.code.startsWith('F') && e.code.length > 1)  /* e.code.startsWith('Key') || e.code.startsWith('Digit') || e.code === 'Period' || e.code === 'Space' */) {
        keyTypedCallback(e.key.codePointAt(0) ?? -1);
      }
      console.log(e.key, e.code, e.keyCode, e.key.codePointAt(0));
    })
  }

  public static setupMouseCallbacks (mouseMoveCallback: IMouseMoveCallback, mousePressCallback: IMousePressCallback, scrollCallback: IScrollCallback): void {
    this.pointerUpEventHandler.set((e: PointerEvent) => { mousePressCallback(e.button || 0, 2) });
    this.pointerDownEventHandler.set((e: PointerEvent) => { mousePressCallback(e.button || 0, 1) });
    this.pointerMoveEventHandler.set((e: PointerEvent) => { mouseMoveCallback(e.clientX, e.clientY) });
    this.contextMenuEventHandler.set((e: MouseEvent) => { e.preventDefault() });
    this.wheelEventHandler.set((e: WheelEvent) => { scrollCallback(e.deltaX, e.deltaY, e.movementX, e.movementY) });
  }

  public static removeKeyCallbacks (): void {
    this.keyUpEventHandler.remove();
    this.keyDownEventHandler.remove();
  }

  public static removeMouseCallbacks (): void {
    this.pointerUpEventHandler.remove();
    this.pointerMoveEventHandler.remove();
    this.pointerDownEventHandler.remove();
    this.contextMenuEventHandler.remove();
    this.wheelEventHandler.remove();
  }
}
export class Input {
  private readonly name: string;
  private readonly type: Type;
  private readonly value: string;

  public constructor(name: string, type: Type, value: string) {
     this.name = name;
     this.type = type;
     this.value = value;
  }

  public getValue(): string {
     return this.value;
  }

  public getName(): string {
     return this.name;
  }

  public toString(): string {
    return this.name;
  }
}
export class Type {
  public static KEY = new Type('key.keyboard');
  public static MOUSE = new Type('key.mouse');

  private readonly defaultPrefix: string;
  private readonly displayTextSupplier;
  private readonly map: CustomMap<string, Input> = new CustomMap();

  private static addKey(type: Type, name: string, keyCode: string): void {
    let inputmappings$input = new Input(name, type, keyCode);
    type.map.set(keyCode, inputmappings$input);
  }

  private constructor(prefix: string) {
    this.defaultPrefix = prefix;
    this.displayTextSupplier = '';
  }

  public getOrCreate(key: string, keyCode: string): Input {
    return this.map.computeIfAbsent(keyCode, (code: string) => {
      let i = key.toLowerCase();

      let s = this.defaultPrefix + "." + i;
      return new Input(s, this, code);
    });
  }

  static addKeys() {
    Type.addKey(Type.KEY, "key.keyboard.0", 'Digit0');
    Type.addKey(Type.KEY, "key.keyboard.1", 'Digit1');
    Type.addKey(Type.KEY, "key.keyboard.2", 'Digit2');
    Type.addKey(Type.KEY, "key.keyboard.3", 'Digit3');
    Type.addKey(Type.KEY, "key.keyboard.4", 'Digit4');
    Type.addKey(Type.KEY, "key.keyboard.5", 'Digit5');
    Type.addKey(Type.KEY, "key.keyboard.6", 'Digit6');
    Type.addKey(Type.KEY, "key.keyboard.7", 'Digit7');
    Type.addKey(Type.KEY, "key.keyboard.8", 'Digit8');
    Type.addKey(Type.KEY, "key.keyboard.9", 'Digit9');
    Type.addKey(Type.KEY, "key.keyboard.a", 'KeyA');
    Type.addKey(Type.KEY, "key.keyboard.b", 'KeyB');
    Type.addKey(Type.KEY, "key.keyboard.c", 'KeyC');
    Type.addKey(Type.KEY, "key.keyboard.d", 'KeyD');
    Type.addKey(Type.KEY, "key.keyboard.e", 'KeyE');
    Type.addKey(Type.KEY, "key.keyboard.f", 'KeyF');
    Type.addKey(Type.KEY, "key.keyboard.g", 'KeyG');
    Type.addKey(Type.KEY, "key.keyboard.h", 'KeyH');
    Type.addKey(Type.KEY, "key.keyboard.i", 'KeyI');
    Type.addKey(Type.KEY, "key.keyboard.j", 'KeyJ');
    Type.addKey(Type.KEY, "key.keyboard.k", 'KeyK');
    Type.addKey(Type.KEY, "key.keyboard.l", 'KeyL');
    Type.addKey(Type.KEY, "key.keyboard.m", 'KeyM');
    Type.addKey(Type.KEY, "key.keyboard.n", 'KeyN');
    Type.addKey(Type.KEY, "key.keyboard.o", 'KeyO');
    Type.addKey(Type.KEY, "key.keyboard.p", 'KeyP');
    Type.addKey(Type.KEY, "key.keyboard.q", 'KeyQ');
    Type.addKey(Type.KEY, "key.keyboard.r", 'KeyR');
    Type.addKey(Type.KEY, "key.keyboard.s", 'KeyS');
    Type.addKey(Type.KEY, "key.keyboard.t", 'KeyT');
    Type.addKey(Type.KEY, "key.keyboard.u", 'KeyU');
    Type.addKey(Type.KEY, "key.keyboard.v", 'KeyV');
    Type.addKey(Type.KEY, "key.keyboard.w", 'KeyW');
    Type.addKey(Type.KEY, "key.keyboard.x", 'KeyX');
    Type.addKey(Type.KEY, "key.keyboard.y", 'KeyY');
    Type.addKey(Type.KEY, "key.keyboard.z", 'KeyZ');
  }
}