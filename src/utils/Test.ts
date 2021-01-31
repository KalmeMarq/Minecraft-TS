export const isInside = (a: number, b: number, c: number, d: number, e: number, f: number, callback: Function) => 
  a > c && a < c + d && b > e && b < e + f ? callback() : false;

export function consoleOutput(type: string, content: any, style = '') {
  switch(type) {
    case 'log':
      console.log('%c'+ content, style)
      break;
    case 'error':
      console.error('%c'+ content, style)
      break;
    default:
      console.log(content)
      break;
  }
}