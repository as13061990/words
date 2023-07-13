import Modal from "../components/Modal";
import Zone from "../components/Zone";
import Api from "../data/Api";
import Settings from "../data/Settings";
import Menu from "../scenes/Menu";

class Ratings {
  constructor(scene: Phaser.Scene, modal: Modal) {
    this._modal = modal
    this._scene = scene
    this._build();
  }


  private _scene: Phaser.Scene;
  private _modal: Modal
  private _elements: (Phaser.GameObjects.Text | Phaser.GameObjects.Sprite | Phaser.GameObjects.Rectangle | Zone | Phaser.GameObjects.Graphics)[] = []
  private _all: Phaser.GameObjects.Text
  private _day: Phaser.GameObjects.Text
  private _friends: Phaser.GameObjects.Text
  private _rectangle: Phaser.GameObjects.Rectangle

  private _data: Iratings
  private _list: IuserRating[]
  private _listElements: (Phaser.GameObjects.Text | Phaser.GameObjects.Sprite)[] = []

  private _build(): void {

    this._data = Api.getRatings()
    this._list = this._data.rating.allLevels
    this._all = this._scene.add.text(this._modal.sprite.getBounds().left + 25, this._modal.btn.getBounds().centerY, 'Все время', {
      color: 'black',
      font: '25px Triomphe',
      align: 'center'
    }).setOrigin(0, 0.5)
    const allZone = new Zone(this._scene, this._all.getBounds().centerX, this._all.getBounds().centerY, this._all.getBounds().width + 20, this._all.getBounds().height + 10).setOrigin(0.5, 0.5)
    allZone.downClickCallback = this._allCallback.bind(this)

    this._day = this._scene.add.text(this._all.getBounds().right + 30, this._modal.btn.getBounds().centerY, 'За день', {
      color: 'black',
      font: '25px Triomphe',
      align: 'center'
    }).setOrigin(0, 0.5)
    const dayZone = new Zone(this._scene, this._day.getBounds().centerX, this._day.getBounds().centerY, this._day.getBounds().width + 20, this._day.getBounds().height + 10).setOrigin(0.5, 0.5)
    dayZone.downClickCallback = this._dayCallback.bind(this)

    this._friends = this._scene.add.text(this._day.getBounds().right + 30, this._modal.btn.getBounds().centerY, 'Друзья', {
      color: 'black',
      font: '25px Triomphe',
      align: 'center'
    }).setOrigin(0, 0.5)
    const friendsZone = new Zone(this._scene, this._friends.getBounds().centerX, this._friends.getBounds().centerY, this._friends.getBounds().width + 20, this._friends.getBounds().height + 10).setOrigin(0.5, 0.5)
    friendsZone.downClickCallback = this._friendsCallback.bind(this)

    this._rectangle = this._scene.add.rectangle(this._all.getBounds().centerX, this._all.getBounds().centerY, this._all.getBounds().width + 20, this._all.getBounds().height + 10, Settings.PINK_16).setOrigin(0.5, 0.5)
    this._createRatingList()
    this._elements.push(this._rectangle, this._all, allZone, this._day, dayZone, this._friends, friendsZone)
  }

  public pushElementsToContainer(): void {
    this._modal.add(this._elements)
  }

  public pushListElementsToContainer(): void {
    this._modal.add(this._listElements)
  }

  public destroy(): void {
    this._elements.forEach(el => {
      el.destroy()
    })
  }

  private _allCallback(): void {
    this._list = this._data.rating.allLevels
    this._createRatingList()
    this._scene.tweens.add({
      targets: this._rectangle,
      x: -210,
      duration: 400,
      width: this._all.getBounds().width + 20,
      ease: 'Power2'
    })
    this.pushListElementsToContainer()
  }

  private _dayCallback(): void {
    this._list = this._data.rating.dayWords
    this._createRatingList(false)
    this._scene.tweens.add({
      targets: this._rectangle,
      x: -210 + this._all.getBounds().width + 30,
      width: this._day.getBounds().width + 20,
      duration: 400,
      ease: 'Power2'
    })
    this.pushListElementsToContainer()
  }

  private _friendsCallback(): void {
    this._list = this._data.rating.allLevels
    this._createRatingList()
    this._scene.tweens.add({
      targets: this._rectangle,
      x: -210 + this._all.getBounds().width + this._day.getBounds().width + 30 * 2,
      width: this._friends.getBounds().width + 20,
      duration: 400,
      ease: 'Power2'
    })
    this.pushListElementsToContainer()
  }

  private _createRatingList(level: boolean = true): void {
    this._destroyList()
    
    this._list.forEach((el, i) => {
      // const maskGraphics = this._scene.add.graphics();
      // maskGraphics.fillStyle(0x333);
      const avatar = this._scene.add.sprite(this._modal.sprite.x - 270, this._modal.btn.y + 40 + (i * 72), 'avatar').setOrigin(0, 0).setDisplaySize(64, 64)

      // maskGraphics.fillCircle(avatar.getBounds().centerX, avatar.getBounds().centerY, 32);

      // const mask = maskGraphics.createGeometryMask();

      // avatar.setMask(mask);

      const nickname = this._scene.add.text(avatar.getBounds().right + 25, avatar.getBounds().top, el.name, {
        color: 'black',
        font: '26px Triomphe',
        align: 'center'
      }).setOrigin(0, 0)
      const place = this._scene.add.text(avatar.getBounds().right + 25, avatar.getBounds().bottom - 5, `${el.place} место`, {
        color: 'black',
        font: '20px Triomphe',
        align: 'center'
      }).setOrigin(0, 1)
      const text = level ? 'уровень' : 'слова'
      const info = this._scene.add.text(this._modal.sprite.x + 270, avatar.getBounds().centerY, `${el.score} ${text}`, {
        color: 'black',
        font: '25px Triomphe',
        align: 'center'
      }).setOrigin(1, 0.5)
      this._listElements.push(nickname, place, info, avatar)
      this._elements.push(nickname, place, info, avatar)
    })
  }

  private _destroyList(): void {
    this._listElements.forEach(el=>{
      if (el?.scene) {
        el.destroy()
      }
    })
    this._listElements = []
  }

}

export default Ratings;