export function playSound(src: string, volume: number) {
  let sound = new Audio(src);
  sound.volume = volume;
  sound.play();
}