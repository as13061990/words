import Session from "../data/Session";
import Game from "../scenes/Game";
import { currentWordType } from "../types/enums";

const REDUCE_SCALE = 0.7
const WORD_STEP = 110 * REDUCE_SCALE

class CurrentWord extends Phaser.GameObjects.Container {
  constructor(scene: Game) {
    const { centerX } = scene.cameras.main
    super(scene, centerX, scene.words[scene.words.length - 1].getBounds().bottom + 50)
    this._scene = scene
    this._build()
  }

  private _scene: Game
  private _text: string = ''


  private _build(): void {
    this._scene.add.existing(this)
  }

  public destroyAll(): void {
    this.removeAll(true)
    this._resetPosition()
  }

  private _resetPosition(): void {
    const { centerX } = this._scene.cameras.main
    this.setPosition(centerX, this._scene.words[this._scene.words.length - 1].getBounds().bottom + 50)
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

    if (this._text !== Session.getCurrentWord()) {

      const word = Session.getCurrentWord()
      this._text = word


      word.split('').forEach((letter, i) => {

        const sprite = this._scene.add.sprite(0 + (i * WORD_STEP), 0, 'word-letter')
        sprite.setScale(REDUCE_SCALE)

        const text = this._scene.add.text(0 + (i * WORD_STEP), 0, (letter).toUpperCase(), {
          color: 'rgb(44,52,75)',
          font: '40px Triomphe',
        }).setOrigin(0.5, 0.5)

        this.add([sprite, text])
        const { centerX } = this._scene.cameras.main
        this.setPosition(centerX - (WORD_STEP * (word.length/2) - WORD_STEP/2), this.y)
      })
    }
  }
}

export default CurrentWord