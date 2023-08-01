import Session from "../data/Session"
import Settings from "../data/Settings"
import Game from "../scenes/Game"
import Word from "./Word"

class BoosterRandomWord extends Phaser.GameObjects.Sprite {
  constructor(scene: Game, x: number, y: number,) {
    super(scene, x, y, 'boosterCircle')
    this._scene = scene
    this._build()
  }

  private _scene: Game
  private _word: Word = null
  private _text: Phaser.GameObjects.Text
  private _icon: Phaser.GameObjects.Sprite

  private _build(): void {
    this._scene.add.existing(this)
    this._icon = this._scene.add.sprite(this.getBounds().centerX, this.getBounds().centerY, 'boosterRandomWord')
    this._text = this._scene.add.text(this.getBounds().centerX, this.getBounds().bottom + 20, Session.getBoosterRandomWordTimer().toString(), {
      color: 'white',
      font: '30px Triomphe',
      align: 'center'
    }).setDepth(4).setOrigin(0.5, 0.5)
    this._text.setVisible(false)
  }

  private _startAnimation(): void {
    this._word.list.forEach((el: Phaser.GameObjects.Sprite) => {
      if (el instanceof Phaser.GameObjects.Sprite) {
        const star = this._scene.add.sprite(this.getBounds().centerX, this.getBounds().centerY, 'star').setDepth(6)
        this._scene.tweens.add({
          targets: star,
          x: el.getBounds().centerX,
          y: el.getBounds().centerY,
          duration: this._scene.config.durations.animationBooster,
          ease: 'Power1',
          onComplete: () => star.destroy()
        })
      }
    })
  }

  public setWord(word: Word) {
    this._word = word
  }

  protected preUpdate(time: number, delta: number): void {
    if (this._word?.scene) {
      this._startAnimation()
      this._word = null
    }

    if (!this._text.visible && Session.getBoosterRandomWordTimer() > 0 && Session.getIsActiveBoosterRandomWord()) {
      this._text.setVisible(true)
      this._icon.setTexture('boosterRandomWordInactive')
      this.setTint(this._scene.config.colors.boosterInactive_16)
    }

    if (this._text.visible && this._text.text !== Session.getBoosterRandomWordTimer().toString()) {
      this._text.setText(Session.getBoosterRandomWordTimer().toString())
    }

    if (this._text.visible && Session.getBoosterRandomWordTimer() === 0) {
      this._text.setVisible(false)
      this._icon.setTexture('boosterRandomWord')
      this.setTint(this._scene.config.colors.boosterActive_16)
      Session.setIsActiveBoosterRandomWord(false)
    }
  }
}

export default BoosterRandomWord 
