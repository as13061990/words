import Session from "../data/Session";
import Game from "../scenes/Game";

class CurrentWord extends Phaser.GameObjects.Text {
  constructor(scene: Game) {
    const { centerX } = scene.cameras.main
    super(scene, centerX, scene.words[scene.words.length - 1].sprite.getBounds().bottom + 30, '', {})
    this._scene = scene
    this._build()
  }

  private _scene: Game
  private _emptySpriteContainer: Phaser.GameObjects.Sprite
  private _letterSprites: (Phaser.GameObjects.Sprite | Phaser.GameObjects.Text)[] = []

  private _build(): void {
    this._scene.add.existing(this)
    this._emptySpriteContainer = this._scene.add.sprite(this.getBounds().centerX, this.getBounds().centerY, 'word-letter').setOrigin(0.5, 0.5)
    this._emptySpriteContainer.setDisplaySize(this._emptySpriteContainer.width / 1.8, this._emptySpriteContainer.height / 1.8)
    this._emptySpriteContainer.setAlpha(0)
    this.setAlpha(0)
  }

  protected preUpdate(time: number, delta: number): void {

    if (this.text !== Session.getCurrentWord()) {

      const word = Session.getCurrentWord()
      this.setText(Session.getCurrentWord())


      this._letterSprites.forEach((element) => {
        element.destroy()
      })

      this._emptySpriteContainer.setDisplaySize(word.length * 108/1.7, this._emptySpriteContainer.height)

      word.split('').forEach((letter, i) => {
        const sprite = this._scene.add.sprite(this._emptySpriteContainer.getBounds().left + (i * 110 /1.7), this._emptySpriteContainer.getBounds().centerY, 'word-letter').setOrigin(0, 0.5)
        sprite.setDisplaySize(sprite.width / 1.7, sprite.height / 1.7)
        const text = this._scene.add.text(sprite.getBounds().centerX, sprite.getBounds().centerY, (letter).toUpperCase(), {
          color: 'rgb(44,52,75)',
          font: '40px Triomphe',
        }).setOrigin(.5, .5)
        this._scene.add.existing(sprite)
        this._letterSprites.push(sprite, text)
      })
    }
  }
}

export default CurrentWord