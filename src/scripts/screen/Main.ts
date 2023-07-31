import Button from "../components/Button";
import Session from "../data/Session";
import Settings from "../data/Settings";
import Menu from "../scenes/Menu";
import { screen } from "../types/enums";




class Main {
  constructor(scene: Menu) {
    this._scene = scene
    this._build();
  }

  private _scene: Menu;
  private _currentLevelIndex: number = 0
  private _currentLevelText: Phaser.GameObjects.Text
  private _btn: Button

  private _build(): void {
    const { centerX, centerY } = this._scene.cameras.main;
    const title = this._scene.add.text(centerX, centerY - 400, 'Words', { color: 'white', fontSize: '80px', fontFamily: 'Triomphe' }).setOrigin(0.5, 0.5)
    this._currentLevelIndex = Settings.getLevels().findIndex(el => el.id === Settings.getCurrentLevel().id ) 

    const btnUp = new Button(this._scene, centerX, title.getBounds().bottom + 70, 'buttonGreen')
    btnUp.text = this._scene.add.text(btnUp.x, btnUp.y, '↑', {
      color: 'white',
      font: '50px Triomphe',
    }).setOrigin(.5, .6).setDepth(11);
    btnUp.setDisplaySize(btnUp.text.width + 15, btnUp.text.height + 15)
    btnUp.callback = this._lvlUp.bind(this)

    this._btn = new Button(this._scene, centerX, btnUp.getBounds().bottom + 70, 'buttonGreen')
    const text = (Settings.getCurrentLevel().data.level + ' уровень').toUpperCase()
    this._btn.text = this._scene.add.text(this._btn.x, this._btn.y, text, {
      color: 'white',
      font: '40px Triomphe',
    }).setOrigin(.5, .6).setDepth(11);
    this._btn.callback = this._play.bind(this)

    this._currentLevelText = this._scene.add.text(this._btn.getBounds().centerX, this._btn.getBounds().bottom + 30, `${this._currentLevelIndex + 1} из ${Settings.getLevels().length}`, {
      color: 'white',
      font: '28px Triomphe',
    }).setOrigin(.5, .6).setDepth(11);

    const btnDown = new Button(this._scene, centerX, this._currentLevelText.getBounds().bottom + 70, 'buttonGreen')
    btnDown.text = this._scene.add.text(btnDown.x, btnDown.y, '↓', {
      color: 'white',
      font: '50px Triomphe',
    }).setOrigin(.5, .6).setDepth(11);
    btnDown.setDisplaySize(btnDown.text.width + 15, btnDown.text.height + 15)
    btnDown.callback = this._lvlDown.bind(this)

  }

  private _lvlUp(): void {
    if (0 === this._currentLevelIndex) return

    const levels = Settings.getLevels()
    this._currentLevelIndex--
    Settings.setCurrentLevel(levels[this._currentLevelIndex])
    
    this._currentLevelText.setText(`${this._currentLevelIndex + 1} из ${Settings.getLevels().length}`)
    const text = (Settings.getCurrentLevel().data.level + ' уровень').toUpperCase()
    this._btn.text.setText(text)
  }

  private _lvlDown(): void {
    const levels = Settings.getLevels()
    if (levels.length === this._currentLevelIndex + 1) return

    this._currentLevelIndex++
    Settings.setCurrentLevel(levels[this._currentLevelIndex])

    this._currentLevelText.setText(`${this._currentLevelIndex + 1} из ${Settings.getLevels().length}`)
    const text = (Settings.getCurrentLevel().data.level + ' уровень').toUpperCase()
    this._btn.text.setText(text)
  }

  private _play(): void {
    this._scene.scene.start('Game');
    Session.setLevel(Settings.getCurrentLevel().data.level)
  }

}

export default Main;