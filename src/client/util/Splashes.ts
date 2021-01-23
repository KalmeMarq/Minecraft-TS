import { splashes } from '../../index.js';

export default class Splashes {
  public static getSplashText(matrix: HTMLElement, width: number, height: number) {
    const splashText = document.createElement('span');

    const getRandomSplashText = () => {
      return splashes[~~(Math.random() * (splashes.length - 1))]
    }

    const randSplash = String(getRandomSplashText());
    const splashLength: number = randSplash.split('').length;

    splashText.innerText = randSplash;
    const initFontSize = splashLength < 2522 ? (9.8 / splashLength) * 1.5 + 9.8 : 9.8 / splashLength;
    const endFontSize = splashLength < 2522 ? (10 / splashLength) * 1.5 + 10 : 10 / splashLength + 0.2;
    splashText.className = 'splash-texts';
    splashText.style.top = 40 * 2.55 + 'px'
    splashText.style.left = width / 2 + 40 * 2.55 + 'px'

    splashText.style.setProperty('--init', initFontSize + "px");
    splashText.style.setProperty('--end', endFontSize + "px");

    matrix.appendChild(splashText)
  }
}