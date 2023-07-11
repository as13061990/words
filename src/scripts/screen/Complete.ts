import Button from "../components/Button";
import Session from "../data/Session";
import Settings from "../data/Settings";
import Menu from "../scenes/Menu";




class Complete {
  constructor(scene: Menu) {
    this._scene = scene
    this._build();
  }

  private _scene: Menu;
  private _btn: Button
  private _nextLevelIndex: number
  private _nextLevel: number

  private _build(): void {
    const { centerX, centerY } = this._scene.cameras.main;
    const title = this._scene.add.text(centerX, centerY - 400, 'Поздравляем!', { color: 'white', fontSize: '80px', fontFamily: 'Triomphe' }).setOrigin(0.5, 0.5)

    this._btn = new Button(this._scene, centerX, title.getBounds().bottom + 70, 'button-green')


    const index = Settings.getLevels().findIndex(el => el.id === Settings.getCurrentLevel().id)

    if (index === Settings.getLevels().length - 1) {
      this._nextLevelIndex = 0
      this._nextLevel = Settings.getLevels()[0].data.level
    } else {
      this._nextLevelIndex = index + 1
      this._nextLevel = Settings.getLevels()[index + 1].data.level
    }


    const text = (this._nextLevel + ' уровень').toUpperCase()
    this._btn.text = this._scene.add.text(this._btn.x, this._btn.y, text, {
      color: 'white',
      font: '40px Triomphe',
    }).setOrigin(.5, .6).setDepth(11);
    this._btn.callback = this._next.bind(this)

    //
    const lvlProgress = Math.floor((index + 1) / 5)
    const progress = this._scene.add.text(centerX, this._btn.getBounds().bottom + 70, `Новый цвет фона \n\n${(index + 1) % 5}/5`,
      {
        color: 'white',
        fontSize: '30px',
        fontFamily: 'Triomphe',
        align: 'center'
      }
    ).setOrigin(0.5, 0.5)
    switch (lvlProgress) {
      case 0:
        break;
      case 1:
        this._scene.cameras.main.setBackgroundColor('#543964')
        break;
      case 2:
        this._scene.cameras.main.setBackgroundColor('#320a18')
        break;
      case 3:
        this._scene.cameras.main.setBackgroundColor('#320a18')
        break;
    }
    //

  }

  private _next(): void {
    this._scene.scene.start('Game');
    Settings.setCurrentLevel(Settings.getLevels()[this._nextLevelIndex])
    Session.setLevel(Settings.getCurrentLevel().data.level)
  }
}

export default Complete;