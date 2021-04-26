import { TextComponent } from '../../util/text/TextComponent'
import Button from '../widgets/Button'
import Screen from './Screen'

export default class MainMenuScreen extends Screen {
  private readonly splash: string = ''
  private readonly resetDemoButton!: Button
  private readonly copyrightWidth: number = 0
  private readonly copyrightX: number = 0
  private readonly fading: boolean
  private readonly fadeInStart: number = 0
  private readonly titleEasterEgg: boolean

  public constructor (fade = false) {
    super(new TextComponent(''))
    this.fading = fade
    this.titleEasterEgg = ~~(Math.random()) < 1.0E-4
  }

  public shouldCloseOnEsc (): boolean {
    return false
  }

  protected init (): void {
    // const y = 0;

    this.addButton(new Button(this.width / 2 - 100, this.height / 4 + 48, 200, 20, new TextComponent('test'), (button) => {
    }))
  }

  public render (mouseX: number, mouseY: number, partialTicks: number): void {
    super.render(mouseX, mouseY, partialTicks)
  }
}
