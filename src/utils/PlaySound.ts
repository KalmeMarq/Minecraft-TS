import { getResourceLocation } from "./Resources.js";

export function playSound(src: string, volume: number) {
  let sound = getResourceLocation('sounds', src);
  sound.volume = volume;
  sound.play();
}