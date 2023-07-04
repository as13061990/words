import Settings from "../data/Settings"
import Game from "../scenes/Game"
import Word from "./Word"

class BoosterRandomWord extends Phaser.GameObjects.Sprite {
  constructor(scene: Game, x: number, y: number,) {
    super(scene, x, y, 'booster-circle')
    this._scene = scene
    this._build()
  }

  private _scene: Game
  private _word: Word = null

  private _build(): void {
    this._scene.add.existing(this)
    const lamp = this._scene.add.sprite(this.getBounds().centerX, this.getBounds().centerY, 'lamp')
  }

  private _startAnimation(): void {
    this._word.list.forEach((el: Phaser.GameObjects.Sprite) => {
      const star = this._scene.add.sprite(this.getBounds().centerX, this.getBounds().centerY, 'star').setDepth(6)
      this._scene.tweens.add({
        targets: star,
        x: el.getBounds().centerX,
        y: el.getBounds().centerY,
        duration: Settings.DURATION_ANIMATION_BOOSTER_RANDOM_WORD,
        ease: 'Power1',
        onComplete: () => star.destroy()
      })
    })
  }

  public setWord(word: Word) {
    this._word = word
  }

  protected preUpdate(time: number, delta: number): void {
    if (this._word?.scene) {
      console.log('lel')
      this._startAnimation()
      this._word = null
    }
  }
}

export default BoosterRandomWord 
