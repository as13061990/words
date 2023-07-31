import Settings from "../data/Settings"
import Utils from "../data/Utils"
import { solvedWord, wordDirection } from "../types/enums"

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
  private _boosterWord: boolean = false
  private _solvedLetters: number[] = [] // показывает какие буквы у слова отгаданы, если 0 то нет, если 1, то да
  private _boosterLetters: boolean = false


  private _build(): void {
    this._scene.add.existing(this)
    if (this._type === wordDirection.VERTICAL) {
      this._word.split('').forEach((letter, i) => {
        const sprite = this._scene.add.sprite(0, 0 + (i * Settings.WORD_STEP), 'wordLetter')
        this.add(sprite)
      })
    } else {
      this._word.split('').forEach((letter, i) => {
        const sprite = this._scene.add.sprite(0 + (i * Settings.WORD_STEP), 0, 'wordLetter')
        this.add(sprite)
      })
    }

    this._solvedLetters = Array(this._word.length).fill(0)
  }

  public getType(): wordDirection {
    return this._type
  }

  public getWord(): string {
    return this._word
  }

  public setSolved(solved: solvedWord): void {
    if (solvedWord.STANDART === solved) {
      this._solvedLetters = Array(this._word.length).fill(1)
      this._solved = true
    } else if (solvedWord.BOOSTER_WORD === solved) {
      this._solvedLetters = Array(this._word.length).fill(1)
      this._solved = true
      this._boosterWord = true
    } else if (solvedWord.BOOSTER_LETTER === solved) {
      this._solved = true
      this._boosterLetters = true
    }
  }

  public getSolved(): boolean {
    return this._solved
  }

  public repeatAnimation(): void {
    this._repeatAnimatioStepForward()
  }

  public getSolvedLetters(): number[] {
    return this._solvedLetters
  }

  public setSolvedLetters(letters: number[]) {
    this._solvedLetters = letters
  }

  public solveLetterAnimation(index: number): void {
    this._startBoosterLetterSolvedAnimation(index)
  }


  private _repeatAnimatioStepForward(): void {
    this.setDepth(5)
    this._scene.add.tween({
      targets: this.list,
      duration: Settings.DURATION_ANIMATION_WORD_REPEAT_STEP,
      scale: 1.09,
      ease: 'Power2',
      onComplete: this._repeatAnimatioStepBack.bind(this)
    })

    Utils.createChangeSpriteColorAnimation(
      this._scene,
      this.list as (Phaser.GameObjects.Sprite)[],
      Settings.DURATION_ANIMATION_WORD_REPEAT_STEP,
      Settings.GREEN, Settings.ORANGE,
      this._repeatAnimatioStepBack.bind(this)
    )
  }

  private _repeatAnimatioStepBack(): void {
    this._scene.add.tween({
      targets: this.list,
      duration: Settings.DURATION_ANIMATION_WORD_REPEAT_STEP,
      scale: 1,
      ease: 'Power2',
      onComplete: () => {
        this.setDepth(2)
      }
    })

    Utils.createChangeSpriteColorAnimation(
      this._scene,
      this.list as (Phaser.GameObjects.Sprite)[],
      Settings.DURATION_ANIMATION_WORD_REPEAT_STEP,
      Settings.ORANGE, Settings.GREEN,
    )
  }

  private _standartSolvedAnimation(): void {
    this._scene.time.addEvent({
      delay: Settings.DELAY_ANIMATION_WORD_STANDART_SOLVED, callback: (): void => {
        this.setDepth(2)
        this.list.forEach((element: Phaser.GameObjects.Sprite | Phaser.GameObjects.Text, index) => {
          if (element instanceof Phaser.GameObjects.Sprite) {
            element.setTint(0x6ebe68)
            const x = this._type === 'horizontal' ? (index * Settings.WORD_STEP) : 0
            const y = this._type === 'horizontal' ? 0 : (index * Settings.WORD_STEP)
            this._createLetter(x, y, index)
          }
        })
      }, loop: false
    });
  }

  private _boosterWordSolvedAnimation(): void {
    this._scene.time.addEvent({
      delay: Settings.DURATION_ANIMATION_BOOSTER, callback: (): void => {
        this.list.forEach((element: Phaser.GameObjects.Sprite | Phaser.GameObjects.Text, index) => {
          if (element instanceof Phaser.GameObjects.Sprite) {
            this._startBoosterWordSolvedAnimation()
            const x = this._type === 'horizontal' ? (index * Settings.WORD_STEP) : 0
            const y = this._type === 'horizontal' ? 0 : (index * Settings.WORD_STEP)
            this._createLetter(x, y, index)
          }
        })
      }, loop: false
    });
  }

  private _boosterLettersSolvedAnimation(): void {
    this.setDepth(5)
    this._scene.add.tween({
      delay: Settings.DURATION_ANIMATION_WORD_REPEAT_STEP,
      targets: this.list,
      duration: Settings.DURATION_ANIMATION_WORD_BOOSTER_SOLVED_STEP,
      scale: 1.09,
      ease: 'Power2',
      onStart: () => {
        this.list.forEach((element: Phaser.GameObjects.Sprite | Phaser.GameObjects.Text, index) => {
          if (element instanceof Phaser.GameObjects.Sprite) {
            this._startBoosterWordSolvedAnimation()
            const x = this._type === 'horizontal' ? (index * Settings.WORD_STEP) : 0
            const y = this._type === 'horizontal' ? 0 : (index * Settings.WORD_STEP)
            this._createLetter(x, y, index)
          }
        })
        Utils.createChangeSpriteColorAnimation(
          this._scene,
          this.list as (Phaser.GameObjects.Sprite)[],
          Settings.DURATION_ANIMATION_WORD_BOOSTER_SOLVED_STEP,
          Settings.ORANGE, Settings.GREEN,
        )
      },
      onComplete: () => {
        this._scene.add.tween({
          targets: this.list,
          duration: Settings.DURATION_ANIMATION_WORD_BOOSTER_SOLVED_STEP,
          scale: 1,
          ease: 'Power2',
        })
        this.setDepth(2)
      }
    })
  }

  private _startBoosterWordSolvedAnimation(): void {
    this.setDepth(5)

    Utils.createChangeSpriteColorAnimation(
      this._scene,
      this.list as (Phaser.GameObjects.Sprite)[],
      Settings.DURATION_ANIMATION_WORD_BOOSTER_SOLVED_STEP,
      Settings.WHITE, Settings.GREEN,
    )

    this._scene.add.tween({
      targets: this.list,
      duration: Settings.DURATION_ANIMATION_WORD_BOOSTER_SOLVED_STEP,
      scale: 1.09,
      ease: 'Power2',
      onComplete: () => {
        this._scene.add.tween({
          targets: this.list,
          duration: Settings.DURATION_ANIMATION_WORD_BOOSTER_SOLVED_STEP,
          scale: 1,
          ease: 'Power2',
        })
        this.setDepth(2)
      }
    })
  }

  private _startBoosterLetterSolvedAnimation(index: number): void {
    const arrWithOnlySprites = this.list.map(el => {
      if (el instanceof Phaser.GameObjects.Sprite) {
        return el
      }
    })
    arrWithOnlySprites[index].setDepth(5)
    this._scene.time.addEvent({
      delay: Settings.DURATION_ANIMATION_BOOSTER, callback: (): void => {
        this._scene.add.tween({
          targets: arrWithOnlySprites[index],
          duration: Settings.DURATION_ANIMATION_WORD_REPEAT_STEP,
          scale: 1.09,
          ease: 'Power2',
          onStart: () => {
            Utils.createChangeSpriteColorAnimation(
              this._scene,
              [arrWithOnlySprites[index]],
              Settings.DURATION_ANIMATION_WORD_BOOSTER_SOLVED_STEP,
              Settings.WHITE, Settings.ORANGE,
            )
          },
          onComplete: () => {
            this._scene.add.tween({
              targets: arrWithOnlySprites[index],
              duration: Settings.DURATION_ANIMATION_WORD_BOOSTER_SOLVED_STEP,
              scale: 1,
              ease: 'Power2',
            })
            arrWithOnlySprites[index].setDepth(2)
            if (this.getSolvedLetters().filter(el => el === 0).length === 0) {
              this.setSolved(solvedWord.BOOSTER_LETTER)
            }
          }
        })

        const x = this._type === 'horizontal' ? (index * Settings.WORD_STEP) : 0
        const y = this._type === 'horizontal' ? 0 : (index * Settings.WORD_STEP)

        this._createLetter(x, y, index)
      }, loop: false
    })
  }

  private _createLetter(x: number, y: number, index: number): void {
    const text = this._scene.add.text(x, y, (this._word[index]).toUpperCase(), {
      color: 'rgb(255, 255, 255)',
      font: '60px Triomphe',
    }).setOrigin(.5, .5).setDepth(4)
    this.add(text)
  }

  protected preUpdate(time: number, delta: number): void {
    if (this._solved && this._empty) {
      this._empty = false
      if (this._boosterWord) {
        this._boosterWordSolvedAnimation()
        return
      } else if (this._boosterLetters) {
        this._boosterLettersSolvedAnimation()
      } else {
        this._standartSolvedAnimation()
      }

    }
  }
}

export default Word