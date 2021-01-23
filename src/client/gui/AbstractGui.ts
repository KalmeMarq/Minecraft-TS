import ColorHelper from '../../util/ColorHelper.js';

export default abstract class AbstractGui {
  // public BACKGROUND_LOCATION = "textures/gui/options_background.png";
  // public STATS_ICON_LOCATION = "textures/gui/container/stats_icons.png";
  // public GUI_ICONS_LOCATION = "textures/gui/icons.png";

  public root = document.getElementById('root')!;

  public static drawCenteredString(matrix: HTMLElement, text: string, posX: number, posY: number, color: number) {
    const span = document.createElement('span');
    span.innerText = text;
    span.style.color = ColorHelper.getColor(color) || 'white';
  
    span.style.position = 'absolute';
    span.style.top = posY + 'px';
    span.style.left = posX + 'px';
    span.style.transform = 'translate(-50%)';
    span.classList.add('text');
  
    matrix.appendChild(span);
  }

  public static drawString(matrix: HTMLElement, text: string, posX: number, posY: number, color: number) {
    const span = document.createElement('span');
    span.innerText = text;
    span.style.color = ColorHelper.getColor(color) || 'white';
  
    span.style.position = 'absolute';
    span.style.top = posY + 'px';
    span.style.left = posX + 'px';
    span.classList.add('text');
  
    matrix.appendChild(span);
  }
}