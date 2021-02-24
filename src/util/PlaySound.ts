import { getResourceLocation } from "./Resources";

export default function playSound(src: string, volume: number) {
  let sound = getResourceLocation('sounds', src);
  sound.volume = volume;
  sound.play();
}