import Settings from "../data/Settings"
import Game from "../scenes/Game"
import Word from "./Word"

class BoosterRandomLetter extends Phaser.GameObjects.Sprite {
  constructor(scene: Game, x: number, y: number,) {
    super(scene, x, y, 'booster-circle')
    this._scene = scene
    this._build()
  }

  private _scene: Game
  private _letter: Phaser.GameObjects.Sprite = null

  private _build(): void {
    this._scene.add.existing(this)
    const finger = this._scene.add.sprite(this.getBounds().centerX, this.getBounds().centerY, 'finger')
  }

  private _startAnimation(): void {

    if (this._letter instanceof Phaser.GameObjects.Sprite) {
      console.log('lol')
      const star = this._scene.add.sprite(this.getBounds().centerX, this.getBounds().centerY, 'star').setDepth(6)
      this._scene.tweens.add({
        targets: star,
        x: this._letter.getBounds().centerX,
        y: this._letter.getBounds().centerY,
        duration: Settings.DURATION_ANIMATION_BOOSTER,
        ease: 'Power1',
        onComplete: () => star.destroy()
      })
    }
  }

  public setLetter(letter: Phaser.GameObjects.Sprite) {
    this._letter = letter
  }

  protected preUpdate(time: number, delta: number): void {
    if (this._letter?.scene) {
      this._startAnimation()
      this._letter  = null
    }
  }
}

export default BoosterRandomLetter 
