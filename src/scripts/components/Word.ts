class Word {
  constructor(scene: Phaser.Scene, word: string, x: number, y: number) {
    this._scene = scene
    this._word = word.toLowerCase()
    this._x = x
    this._y = y
    this._build()
  }

  private _scene: Phaser.Scene
  private _word: string
  private _x: number
  private _y: number
  public sprite: Phaser.GameObjects.Sprite

  private _build(): void {
    this.sprite = this._scene.add.sprite(this._x, this._y, 'word-letter').setOrigin(0.5, 0.5)
    this.sprite.setDisplaySize(this._word.length * 108, this.sprite.height)
    this.sprite.setAlpha(0)

    this._word.split('').forEach((letter, i) => {
      const sprite = this._scene.add.sprite(this.sprite.getBounds().left + (i * 110), this._y, 'word-letter').setOrigin(0, 0.5)
      this._scene.add.existing(sprite)
    })
  }

  public getWord(): string {
    return this._word
  }
}

export default Word