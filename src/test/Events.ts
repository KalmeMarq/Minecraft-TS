import EventHandler, { EventType } from "../util/EventHandler";
import InputMappings from "../util/InputMappings";

let keyDown = new EventHandler<KeyboardEvent>(EventType.KEY_DOWN);
keyDown.set((e: KeyboardEvent) => {
  keyDown.remove()
});

// @ts-ignore
window.clo = () => {
  InputMappings.removeKeyCallbacks();
}

console.log(InputMappings.getKey('e', 'KeyE'));