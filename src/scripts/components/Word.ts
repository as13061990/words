class Word extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, word: string, x: number, y: number) {
    super(scene, x, y, 'word-letter')
    this._scene = scene
    this._word = word
    this._x = x
    this._y = y
    this._build()
  }

  private _scene: Phaser.Scene
  private _word: string
  private _x: number
  private _y: number

  private _solved: boolean = false
  private _empty: boolean = true

  private _sprites: Phaser.GameObjects.Sprite[] = []

  private _build(): void {
    this._scene.add.existing(this)
    this.setOrigin(0.5, 0.5)
    this.setDisplaySize(this._word.length * 108, this.height)
    this.setAlpha(0)

    this._word.split('').forEach((letter, i) => {
      const sprite = this._scene.add.sprite(this.getBounds().left + (i * 110), this._y, 'word-letter').setOrigin(0, 0.5)
      this._scene.add.existing(sprite)
      this._sprites.push(sprite)
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
      this._sprites.forEach((word, i)=>{
        this._scene.add.text(word.getBounds().centerX, word.getBounds().centerY, (this._word[i]).toUpperCase(), {
          color: 'rgb(44,52,75)',
          font: '60px Triomphe',
        }).setOrigin(.5, .5).setDepth(3)
      })
    }
  }
}

export default Word