// import { Resources } from "../../index.js";

// export default class Splashes {
//   public static getSplashText(matrix: HTMLElement, width: number, height: number) {
//     const splashes = Resources.texts.splashes;
//     const splashText = document.createElement('span');

//     const date = new Date(),
//           month = date.getMonth(),
//           day = date.getDate();    

//     const getRandomSplashText = () => {
//       return splashes[~~(Math.random() * (splashes.length - 1))]
//     }

//     let randSplash = String(getRandomSplashText());
//     if(month + 1 === 12 && day === 24) {
//       randSplash = 'Merry X-mas!';
//     } else if (month + 1 === 1 && day === 1) {
//       randSplash = 'Happy new year!';
//     } else if(month + 1 === 10 && day === 31) {
//       randSplash = 'OOoooOOOoooo! Spooky!';
//     }

//   }
// }