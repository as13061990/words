import Session from "../data/Session"
import Settings from "../data/Settings"
import Game from "../scenes/Game"

class BoosterSpecificLetter extends Phaser.GameObjects.Sprite {
  constructor(scene: Game, x: number, y: number,) {
    super(scene, x, y, 'boosterCircle')
    this._scene = scene
    this._build()
  }

  private _scene: Game
  private _letter: Phaser.GameObjects.Sprite = null
  private _isActive: boolean = false
  private _text: Phaser.GameObjects.Text
  private _icon: Phaser.GameObjects.Sprite
  private _check: boolean = false

  private _build(): void {
    this._scene.add.existing(this)
    this._icon = this._scene.add.sprite(this.getBounds().centerX, this.getBounds().centerY, 'boosterSpecificLetter')
    this._text = this._scene.add.text(this.getBounds().centerX, this.getBounds().bottom + 20, Session.getBoosterSpecificLetterTimer().toString(), {
      color: 'white',
      font: '30px Triomphe',
      align: 'center'
    }).setDepth(4).setOrigin(0.5, 0.5)
    this._text.setVisible(false)
  }

  private _startAnimation(): void {

    if (this._letter instanceof Phaser.GameObjects.Sprite) {
      const star = this._scene.add.sprite(this.getBounds().centerX, this.getBounds().centerY, 'star').setDepth(6)
      this._scene.tweens.add({
        targets: star,
        x: this._letter.getBounds().centerX,
        y: this._letter.getBounds().centerY,
        duration: this._scene.config.durations.animationBooster,
        ease: 'Power1',
        onComplete: () => star.destroy()
      })
    }
  }

  public getIsActive(): boolean {
    return this._isActive
  }

  public setIsActive(active: boolean): void {
    this._isActive = active
  }

  public setLetter(letter: Phaser.GameObjects.Sprite) {
    this._letter = letter
  }

  protected preUpdate(time: number, delta: number): void {
    if (this._letter?.scene) {
      this._startAnimation()
      this._letter  = null
    }
    
    if (this._check && !this._isActive) {
      this._check = false
      this._icon.setTexture('boosterSpecificLetter')
      this.setTint(this._scene.config.colors.boosterActive_16)
    }

    if (!this._text.visible && Session.getBoosterSpecificLetterTimer() > 0 && Session.getIsActiveBoosterSpecificLetter()) {
      this._text.setVisible(true)
      this._icon.setTexture('boosterSpecificLetterInactive')
      this.setTint(this._scene.config.colors.boosterInactive_16)
    }

    if (!this._check && this._isActive) {
      this._check = true
      this._icon.setTexture('boosterSpecificLetterInactive')
      this.setTint(this._scene.config.colors.boosterInactive_16)
    }


    if (this._text.visible && this._text.text !== Session.getBoosterSpecificLetterTimer().toString()) {
      this._text.setText(Session.getBoosterSpecificLetterTimer().toString())
    }

    if (this._text.visible && Session.getBoosterSpecificLetterTimer() === 0) {
      this._text.setVisible(false)
      this._icon.setTexture('boosterSpecificLetter')
      this.setTint(this._scene.config.colors.boosterActive_16)
      Session.setIsActiveBoosterSpecificLetter(false)
    }

  }
}

export default BoosterSpecificLetter 
