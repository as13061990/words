import { wordDirection } from "../actions/GameActions";
import GameUtils from "../actions/GameUtils";
import Session from "../data/Session";
import Utils from "../data/Utils";
import Game from "../scenes/Game";



class CurrentWord extends Phaser.GameObjects.Container {
  constructor(scene: Game) {
    const { centerX } = scene.cameras.main
    super(scene, centerX, scene.lettersCircle.getPosition().y - 200)
    this._scene = scene
    this._build()
  }

  private _scene: Game
  private _text: string = ''
  private _animations: Phaser.Tweens.Tween[] = []
  private _copyContainer: Phaser.GameObjects.Container = null

  private _build(): void {
    this._scene.add.existing(this)
  }

  public destroyAll(): void {
    if (this._animations.length > 0) {
      this._animations.forEach((animation) => {
        animation.stop()
      })
    }
    this._animations = []
    this.removeAll(true)
    this.resetPosition()
  }

  public wrongAnimation(): void {
    this._startShakingAnimation()
    this._animations.push(GameUtils.createChangeColorAnimation(
      this._scene,
      this.list as (Phaser.GameObjects.Sprite | Phaser.GameObjects.Text)[],
      this._scene.config.durations.animationCurrentWordColorChange,
      this._scene.config.colors.defaultWord, this._scene.config.colors.wrongWord,
      this._scene.config.colors.defaultWordText, this._scene.config.colors.wrongWordText,
    ))
  }

  public repeatAnimation(): void {
    this._animations.push(GameUtils.createChangeColorAnimation(
      this._scene,
      this.list as (Phaser.GameObjects.Sprite | Phaser.GameObjects.Text)[],
      this._scene.config.durations.animationCurrentWordColorChange,
      this._scene.config.colors.defaultWord, this._scene.config.colors.repeatWord,
      this._scene.config.colors.defaultWordText, this._scene.config.colors.repeatWordText,
      this._destroyCurrentWordWithDelay.bind(this)
    ))
  }

  public solvedAnimation(x: number, y: number, type: wordDirection): void {
    this._startToWordAnimation(x, y, type)
    this.destroyAll()
    this._animations.push(GameUtils.createChangeColorAnimation(
      this._scene,
      this._copyContainer.list as (Phaser.GameObjects.Sprite | Phaser.GameObjects.Text)[],
      this._scene.config.durations.animationCurrentWordColorChange,
      this._scene.config.colors.defaultWord, this._scene.config.colors.solveWord,
      this._scene.config.colors.defaultWordText, this._scene.config.colors.solveWordText,
    ))
  }

  public resetPosition(): void {
    const { centerX } = this._scene.cameras.main
    this.setPosition(centerX, this._scene.words[this._scene.words.length - 1].getBounds().bottom + 50)
  }

  private _startShakingAnimation = () => {
    const { centerX } = this._scene.cameras.main
    const x = centerX - (this._scene.config.sizes.wordStep * this._scene.config.sizes.reduceScale * (this.list.length / 4) - this._scene.config.sizes.wordStep * this._scene.config.sizes.reduceScale / 2)
    this._animations.push(this._scene.add.tween({
      targets: this,
      duration: this._scene.config.durations.animationCurrentWordWrongStep,
      x: x + 12,
      onComplete: () => {
        this._animations.push(this._scene.add.tween({
          targets: this,
          duration: this._scene.config.durations.animationCurrentWordWrongStep,
          x: x - 12,
          onComplete: () => {
            this._animations.push(this._scene.add.tween({
              targets: this,
              duration: this._scene.config.durations.animationCurrentWordWrongStep,
              x: x,
              onComplete: this._destroyCurrentWordWithDelay.bind(this)
            }))
          }
        }))
      }
    }))
  }

  private _destroyCurrentWordWithDelay(): void {
    this._animations.push(this._scene.add.tween({
      targets: this,
      duration: this._scene.config.delays.animationCurrentWordDestroy,
      alpha: 1,
      onComplete: this.destroyAll.bind(this)
    }))
  }

  private _startToWordAnimation(x: number, y: number, type: wordDirection): void {
    this._copyContainer = this._scene.add.container(this.x, this.y).setDepth(2)
    this.list.forEach((el) => {
      if (el instanceof Phaser.GameObjects.Text) {
        const text = this._scene.add.text(el.x, el.y, el.text, el.style).setOrigin(el.originX, el.originY).setScale(el.scale)
        this._copyContainer.add(text)
      } else if (el instanceof Phaser.GameObjects.Sprite) {
        const sprite = this._scene.add.sprite(el.x, el.y, el.texture.key).setScale(el.scale)
        this._copyContainer.add(sprite)
      }
    })

    this._scene.add.tween({
      targets: this._copyContainer,
      x: x,
      y: y,
      ease: 'Power2',
      duration: this._scene.config.durations.animationWordStandartSolved,
      onComplete: () => {
        this._animations.push(this._scene.add.tween({
          targets: this,
          duration: this._scene.config.durations.animationCurrentWordSolvedDestroy,
          scale: this.scale,
          onComplete: () => {
            this._copyContainer.removeAll(true)
            this._copyContainer.destroy()
            this._copyContainer = null
          }
        }))
      }
    })

    const texts = this._copyContainer.list.filter((el) => el instanceof Phaser.GameObjects.Text)
    const sprites = this._copyContainer.list.filter((el) => el instanceof Phaser.GameObjects.Sprite)
    if (type === wordDirection.HORIZONTAL) {
      sprites.forEach((el, i) => {
        this._scene.add.tween({
          targets: [el, texts[i]],
          scale: this._scene.words[0].scale,
          ease: 'Power2',
          x: 0 + (i * this._scene.config.sizes.wordStep * this._scene.words[0].scale),
          duration: this._scene.config.durations.animationWordStandartSolved,
        })
      })
    } else {
      sprites.forEach((el, i) => {
        this._scene.add.tween({
          targets: [el, texts[i]],
          scale: this._scene.words[0].scale,
          ease: 'Power2',
          y: 0 + (i * this._scene.config.sizes.wordStep * this._scene.words[0].scale),
          x: 0,
          duration: this._scene.config.durations.animationWordStandartSolved,
        })
      })
    }
  }

  private _createWord(): void {
    const word = Session.getCurrentWord()
    word.split('').forEach((letter, i) => {
      const sprite = this._scene.add.sprite(0 + (i * this._scene.config.sizes.wordStep * this._scene.config.sizes.reduceScale), 0, 'wordLetter')
      sprite.setScale(this._scene.config.sizes.reduceScale)

      const text = this._scene.add.text(0 + (i * this._scene.config.sizes.wordStep * this._scene.config.sizes.reduceScale), 0, (letter).toUpperCase(), {
        color: 'rgb(44,52,75)',
        font: '60px Triomphe',
      }).setOrigin(0.5, 0.5)
      text.setScale(this._scene.config.sizes.reduceScale)

      this.add([sprite, text])
      const { centerX } = this._scene.cameras.main

      this.setPosition(centerX - (this._scene.config.sizes.wordStep * this._scene.config.sizes.reduceScale * (word.length / 2) - this._scene.config.sizes.wordStep * this._scene.config.sizes.reduceScale / 2), this._scene.lettersCircle.getPosition().y - 230)
    })
  }


  protected preUpdate(time: number, delta: number): void {

    if (this._text !== Session.getCurrentWord()) {
      const word = Session.getCurrentWord()
      if (word > this._text) {
        this.destroyAll()
        this._text = word
        this._createWord()
      } else {
        this._text = word
        if (this._text.length === 0) return
        this.removeAll(true)
        this._createWord()
      }
    }
  }
}

export default CurrentWord