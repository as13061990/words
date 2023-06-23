const WORD_STEP = 110
const SOLVED_ANIMATION_DURATION = 700

class Word extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, word: string, x: number, y: number) {
    super(scene, x, y)
    this._scene = scene
    this._word = word
    this._build()
  }

  private _scene: Phaser.Scene
  private _word: string
  private _solved: boolean = false
  private _empty: boolean = true


  private _build(): void {
    this._scene.add.existing(this)
    this._word.split('').forEach((letter, i) => {
      const sprite = this._scene.add.sprite(0 + (i * WORD_STEP), 0, 'word-letter')
      this.add(sprite)
    })
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

  protected preUpdate(time: number, delta: number): void {
    if (this._solved && this._empty) {
      this._empty = false
      this._scene.time.addEvent({ delay: SOLVED_ANIMATION_DURATION, callback: (): void => {
        this.list.forEach((word: Phaser.GameObjects.Sprite, i)=>{
          word.setTint(0x6ebe68)
          const text = this._scene.add.text(0 + (i * WORD_STEP), 0, (this._word[i]).toUpperCase(), {
            color: 'rgb(255, 255, 255)',
            font: '60px Triomphe',
          }).setOrigin(.5, .5).setDepth(3)
          this.add(text)
        })
      }, loop: false });
    }
  }
}

export default Word