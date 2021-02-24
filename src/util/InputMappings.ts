import IKeyCallback from '@km.mcts/interface/IKeyCallback'
import IMouseButtonCallback from '@km.mcts/interface/IMouseButtonCallback'
import IMouseMoveCallback from '@km.mcts/interface/IMouseMoveCallback'
import IScrollCallback from '@km.mcts/interface/IScrollCallback'

export default class InputMappings {
  public static setKeyCallbacks(keyCallback: IKeyCallback): void {
    const handleKeyDown = (e: KeyboardEvent) => {
      if(e.key === 'F5' || e.key === 'Tab') e.preventDefault();

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
      scrollCallback(e.deltaX, e.deltaY);
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('wheel', handleScroll);
  }
} 