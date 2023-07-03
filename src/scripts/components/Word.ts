import { wordDirection } from "../types/enums"

const WORD_STEP = 110
const SOLVED_ANIMATION_DURATION = 650
const REPEAT_ANIMATION_DURATION_STEP = 310

class Word extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, word: string, x: number, y: number, type?: wordDirection,) {
    super(scene, x, y)
    this._scene = scene
    this._word = word
    this._type = type

    this._build()
  }

  private _scene: Phaser.Scene
  private _word: string
  private _solved: boolean = false
  private _empty: boolean = true
  private _type: wordDirection


  private _build(): void {
    this._scene.add.existing(this)
    if (this._type === wordDirection.VERTICAL) {
      this._word.split('').forEach((letter, i) => {
        const sprite = this._scene.add.sprite(0, 0 + (i * WORD_STEP), 'word-letter')
        this.add(sprite)
      })
    } else {
      this._word.split('').forEach((letter, i) => {
        const sprite = this._scene.add.sprite(0 + (i * WORD_STEP), 0, 'word-letter')
        this.add(sprite)
      })
    }
  }

  public getType(): wordDirection {
    return this._type
  }

  public getWord(): string {
    return this._word
  }

  public setSolved(solved: boolean): void {
    this._solved = solved
  }

  public getSolved(): boolean {
    return this._solved
  }

  public repeatAnimation(): void {
    this._repeatAnimatioStepForward()
  }

  private _repeatAnimatioStepForward(): void {
    this.setDepth(5)
    const startPhaserColor = new Phaser.Display.Color(110, 190, 104)
    const endPhaserColor = new Phaser.Display.Color(222, 153, 85)
    this._scene.add.tween({
      targets: this.list,
      duration: REPEAT_ANIMATION_DURATION_STEP,
      scale: 1.09,
      ease: 'Power2',
      onUpdate: (tweeen) => {
        const interpolationValue = tweeen.progress + 0.1
        const interpolatedColorSprite = Phaser.Display.Color.Interpolate.ColorWithColor(startPhaserColor, endPhaserColor, 100, interpolationValue * 100);
        const colorObjectSprite = new Phaser.Display.Color(Math.round(interpolatedColorSprite.r), Math.round(interpolatedColorSprite.g), Math.round(interpolatedColorSprite.b));
        const colorSprite = Number(`0x${colorObjectSprite.color.toString(16)}`)
        this.list.forEach((el) => {
          if (el instanceof Phaser.GameObjects.Sprite) {
            el.setTint(colorSprite);
          }
        });
      },
      onComplete: this._repeatAnimatioStepBack.bind(this)
    })
  }

  private _repeatAnimatioStepBack(): void {
    const endPhaserColor = new Phaser.Display.Color(110, 190, 104)
    const startPhaserColor = new Phaser.Display.Color(222, 153, 85)
    this._scene.add.tween({
      targets: this.list,
      duration: REPEAT_ANIMATION_DURATION_STEP,
      scale: 1,
      ease: 'Power2',
      onUpdate: (tweeen) => {
        const interpolationValue = tweeen.progress + 0.1
        const interpolatedColorSprite = Phaser.Display.Color.Interpolate.ColorWithColor(startPhaserColor, endPhaserColor, 100, interpolationValue * 100);
        const colorObjectSprite = new Phaser.Display.Color(Math.round(interpolatedColorSprite.r), Math.round(interpolatedColorSprite.g), Math.round(interpolatedColorSprite.b));
        const colorSprite = Number(`0x${colorObjectSprite.color.toString(16)}`)
        this.list.forEach((el) => {
          if (el instanceof Phaser.GameObjects.Sprite) {
            el.setTint(colorSprite);
          }
        });
      },
      onComplete: () => {
        this.setDepth(2)
      }
    })
  }

  protected preUpdate(time: number, delta: number): void {
    if (this._solved && this._empty) {
      this._empty = false
      this._scene.time.addEvent({
        delay: SOLVED_ANIMATION_DURATION, callback: (): void => {
          this.setDepth(2)
          this.list.forEach((word: Phaser.GameObjects.Sprite, i) => {
            word.setTint(0x6ebe68)
            if (this._type === 'horizontal') {
              const text = this._scene.add.text(0 + (i * WORD_STEP), 0, (this._word[i]).toUpperCase(), {
                color: 'rgb(255, 255, 255)',
                font: '60px Triomphe',
              }).setOrigin(.5, .5).setDepth(3)
              this.add(text)
            } else {
              const text = this._scene.add.text(0, 0 + (i * WORD_STEP), (this._word[i]).toUpperCase(), {
                color: 'rgb(255, 255, 255)',
                font: '60px Triomphe',
              }).setOrigin(.5, .5).setDepth(3)
              this.add(text)
            }
          })
        }, loop: false
      });
    }
  }
}

export default Word