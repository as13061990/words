import Session from "../data/Session";
import Game from "../scenes/Game";
import { currentWordType } from "../types/enums";

class CurrentWord extends Phaser.GameObjects.Text {
  constructor(scene: Game) {
    const { centerX } = scene.cameras.main
    super(scene, centerX, scene.words[scene.words.length - 1].getBounds().bottom + 30, '', {})
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

  public destroyAll(): void {
    this._letterSprites.forEach((element) => {
      element.destroy()
    })
  }

  public wrongAnimation(): void {
    // const startPhaserColor = new Phaser.Display.Color(255, 255, 255)
    // const startTextColor = new Phaser.Display.Color(45,52,75)
    // const endTextColor = new Phaser.Display.Color(255,255,255)
    // const endPhaserColor = new Phaser.Display.Color(240, 85, 87)
    // this._scene.add.tween({
    //   targets: [...this._letterSprites, this],
    //   x: this.x - 10,
    //   duration: 1100,
    //   ease: 'Power2',
    //   onUpdate: (tweeen) => {
    //     const interpolationValue = tweeen.progress;

    //     const interpolatedColorText = Phaser.Display.Color.Interpolate.ColorWithColor(startTextColor, endTextColor, 100, interpolationValue * 100);
    //     const interpolatedColorSprite = Phaser.Display.Color.Interpolate.ColorWithColor(startPhaserColor, endPhaserColor, 100, interpolationValue * 100);
        
        
    //     const colorObjectText = new Phaser.Display.Color(Math.round(interpolatedColorText.r), Math.round(interpolatedColorText.g), Math.round(interpolatedColorText.b));
    //     const colorObjectSprite = new Phaser.Display.Color(Math.round(interpolatedColorSprite.r), Math.round(interpolatedColorSprite.g), Math.round(interpolatedColorSprite.b));

    //     const colorText = `#${colorObjectText.color.toString(16)}`
    //     const colorSprite = Number(`0x${colorObjectSprite.color.toString(16)}`)
        
    //     this._letterSprites.forEach((el)=>{
    //       if (el instanceof Phaser.GameObjects.Sprite) {
    //         el.setTint(colorSprite);
    //       } else {
    //         el.setColor(colorText)
    //       }
    //     });
    //   },
    // })
  }

  protected preUpdate(time: number, delta: number): void {

    if (this.text !== Session.getCurrentWord()) {

      const word = Session.getCurrentWord()
      this.setText(Session.getCurrentWord())

      this._emptySpriteContainer.setDisplaySize(word.length * 108 / 1.7, this._emptySpriteContainer.height)

      word.split('').forEach((letter, i) => {
        const sprite = this._scene.add.sprite(this._emptySpriteContainer.getBounds().left + (i * 110 / 1.7), this._emptySpriteContainer.getBounds().centerY, 'word-letter').setOrigin(0, 0.5)
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