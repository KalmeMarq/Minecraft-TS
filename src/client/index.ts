import Minecraft from './Minecraft'
import FPSCounter from './FPSCounter'
import CustomMap from '../util/CustomMap';
import BetterMap from '../util/BetterMap';

class Main {
  public static main (): void {
    const fpsCounter = new FPSCounter();
    fpsCounter.changeVisiblity(false);
    // @ts-ignore
    window.showFPS = (value: boolean) => {
      fpsCounter.changeVisiblity(value)
    }
    // @ts-ignore

    window.removeFPS = (value: boolean) => {
      fpsCounter.remove()
    }
    // @ts-ignore
    window.addFPS = (value: boolean) => {
      fpsCounter.readd();
    }

    const mc = new Minecraft()
    mc.run()
  }
}
export class Client {
  public static user: string = '';
  public static uuid: string = '';
  private static joined: boolean = false;
  private static async tryLogin() {
    let user = prompt('Username');
    if(user === null || user === '') Client.tryLogin();
    let password = prompt('Password');

    if(password === '' || password === null) Client.tryLogin();
    else {

      fetch('/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: user,
          password: password
        })
      }).then(value => {
        value.json().then(data => {
          if(data.accepted) {
            this.joined = true;
            this.user = user as string;
            this.uuid = data.uuid as string;
            sessionStorage.setItem('user_id', JSON.stringify({
              user: this.user,
              uuid: this.uuid
            }))

            console.log(this.uuid);

            Main.main();
          } else {
            Client.tryLogin();
          }
        })
      })
    }
  }

  public static main(): void {
    if(this.joined) return;

    if(sessionStorage.getItem('user_id')) {
      let user_id = JSON.parse(sessionStorage.getItem('user_id') as string);
      this.joined = true;
      Client.user = user_id['user'];
      Client.uuid = user_id['uuid'];
      Main.main();
    } else {
      Client.tryLogin();
    }
  }
}

Client.main()
