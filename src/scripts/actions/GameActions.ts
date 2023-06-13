import Button from "../components/Button";
import Settings from "../data/Settings";
import Game from "../scenes/Game";

class GameActions {
  constructor(scene: Game) {
    this._scene = scene;
  }


  
  private _scene: Game;
  private _level: number

  public build(): void {
    const {centerX, centerY} = this._scene.cameras.main
    this._level = Settings.getLevel()
    const btn = new Button(this._scene, centerX, centerY - 500, 'button-green')
    btn.text = this._scene.add.text(btn.x, btn.y, ('назад').toUpperCase(), {
      color: 'white',
      font: '40px Triomphe',
    }).setOrigin(.5, .6).setDepth(11);
    btn.callback = this._back.bind(this)

    this._scene.add.text(centerX, centerY - 400, `Уровень ${this._level}`, {color: 'white', fontSize: '80px', fontFamily: 'Triomphe'}).setOrigin(0.5, 0.5)
    console.log('build')
  }

  private _back(): void {
    this._scene.scene.start('UI')
  }
}

export default GameActions