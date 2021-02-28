import IKeyCallback from '@mcsrc/interface/IKeyCallback'
import IMouseButtonCallback from '@mcsrc/interface/IMouseButtonCallback'
import IMouseMoveCallback from '@mcsrc/interface/IMouseMoveCallback'
import IScrollCallback from '@mcsrc/interface/IScrollCallback'

export default class InputMappings {
  public static resetKeyBehavior(e: KeyboardEvent, key: string) {
    if(e.key == key) e.preventDefault();
  }

  public static setKeyCallbacks(keyCallback: IKeyCallback): void {
    const handleKeyDown = (e: KeyboardEvent) => {
      InputMappings.resetKeyBehavior(e, 'F3');
      InputMappings.resetKeyBehavior(e, 'F5');
      InputMappings.resetKeyBehavior(e, 'F7');
      InputMappings.resetKeyBehavior(e, 'F8');
      InputMappings.resetKeyBehavior(e, 'F11');
      InputMappings.resetKeyBehavior(e, 'Escape');
      InputMappings.resetKeyBehavior(e, 'Tab');

      keyCallback(e.key, 1, {
        altKeyDown: e.getModifierState('Alt'),
        altGrKeyDown: e.getModifierState('AltGraph'),
        capsLockKeyDown: e.getModifierState('CapsLock'),
        controlKeyDown: e.getModifierState('Control'),
        numLockKeyDown: e.getModifierState('NumLock'),
        shiftKeyDown: e.getModifierState('Shift')
      })
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keyCallback(e.key, 0, {
        altKeyDown: e.getModifierState('Alt'),
        altGrKeyDown: e.getModifierState('AltGraph'),
        capsLockKeyDown: e.getModifierState('CapsLock'),
        controlKeyDown: e.getModifierState('Control'),
        numLockKeyDown: e.getModifierState('NumLock'),
        shiftKeyDown: e.getModifierState('Shift')
      })
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
  }

  public static setMouseCallbacks(mouseMoveCallback: IMouseMoveCallback, mouseButtonCallback: IMouseButtonCallback, scrollCallback: IScrollCallback): void {
    const handleMouseMove = (e: MouseEvent) => {
      mouseMoveCallback(e.clientX, e.clientY);
    }

    const handleMouseUp = (e: MouseEvent) => {
      mouseButtonCallback(e.button, 0, {
        altKeyDown: e.getModifierState('Alt'),
        altGrKeyDown: e.getModifierState('AltGraph'),
        capsLockKeyDown: e.getModifierState('CapsLock'),
        controlKeyDown: e.getModifierState('Control'),
        numLockKeyDown: e.getModifierState('NumLock'),
        shiftKeyDown: e.getModifierState('Shift')
      })
    }

    const handleMouseDown = (e: MouseEvent) => {
      mouseButtonCallback(e.button, 1, {
        altKeyDown: e.getModifierState('Alt'),
        altGrKeyDown: e.getModifierState('AltGraph'),
        capsLockKeyDown: e.getModifierState('CapsLock'),
        controlKeyDown: e.getModifierState('Control'),
        numLockKeyDown: e.getModifierState('NumLock'),
        shiftKeyDown: e.getModifierState('Shift')
      })
    }

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    }

    const handleScroll = (e: WheelEvent) => {
      if(e.getModifierState('Control')) e.preventDefault();
      scrollCallback(e.deltaX, e.deltaY);
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('wheel', handleScroll, { passive: false });
  }
} 