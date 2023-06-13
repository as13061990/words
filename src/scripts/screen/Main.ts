import Button from "../components/Button";
import Session from "../data/Session";
import Menu from "../scenes/Menu";


const buttons = [{text: '1 уровень', level: 1}, {text: '2 уровень', level: 2}, {text: '3 уровень', level: 3},]

class Main {
  constructor(scene: Menu) {
    this._scene = scene
    this._build();
  }

  private _scene: Menu;

  private _build(): void {
    const { centerX, centerY } = this._scene.cameras.main;
    const title = this._scene.add.text(centerX, centerY - 400, 'Words', {color: 'white', fontSize: '80px', fontFamily: 'Triomphe'}).setOrigin(0.5, 0.5)

    buttons.forEach((button, i)=>{
    
      const btn = new Button(this._scene, centerX, title.getBounds().bottom + 70 + (i * 120), 'button-green')
      btn.text = this._scene.add.text(btn.x, btn.y, (button.text).toUpperCase(), {
        color: 'white',
        font: '40px Triomphe',
      }).setOrigin(.5, .6).setDepth(11);
      btn.callback = this._play.bind(this, button.level)
    })
    
  }

  private _play(level: number): void {
    this._scene.scene.start('Game');
    Session.setLevel(level)
  }
}

export default Main;