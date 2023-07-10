import Modal from "../components/Modal";
import Zone from "../components/Zone";
import Settings from "../data/Settings";
import Menu from "../scenes/Menu";

const data = [{ name: 'Шрек шрекович', lvl: 1000 }, { name: 'Шрек шрекович', lvl: 900 }, { name: 'Шрек шрекович', lvl: 850 }, { name: 'Шрек шрекович', lvl: 600 }, { name: 'Шрек шрекович', lvl: 400 }, { name: 'Шрек шрекович', lvl: 110 }, { name: 'Шрек шрекович', lvl: 10 }, { name: 'Шрек шрекович', lvl: 7 }, { name: 'Шрек шрекович', lvl: 5 }]

class Ratings {
  constructor(scene: Phaser.Scene, modal: Modal) {
    this._modal = modal
    this._scene = scene
    this._build();
  }

  private _scene: Phaser.Scene;
  private _modal: Modal
  private _elements: (Phaser.GameObjects.Text | Phaser.GameObjects.Sprite | Phaser.GameObjects.Rectangle | Zone)[] = []
  private _all: Phaser.GameObjects.Text
  private _day: Phaser.GameObjects.Text
  private _friends: Phaser.GameObjects.Text
  private _rectangle: Phaser.GameObjects.Rectangle

  private _build(): void {


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

  public destroy(): void {
    this._elements.forEach(el => {
      el.destroy()
    })
  }

  private _allCallback(): void {
    this._scene.tweens.add({
      targets: this._rectangle,
      x: -210,
      duration: 400,
      width: this._all.getBounds().width + 20,
      ease: 'Power2'
    })
  }

  private _dayCallback(): void {
    this._scene.tweens.add({
      targets: this._rectangle,
      x: -210 + this._all.getBounds().width + 30,
      width: this._day.getBounds().width + 20,
      duration: 400,
      ease: 'Power2'
    })
  }

  private _friendsCallback(): void {
    this._scene.tweens.add({
      targets: this._rectangle,
      x: -210 + this._all.getBounds().width + this._day.getBounds().width + 30 * 2,
      width: this._friends.getBounds().width + 20,
      duration: 400,
      ease: 'Power2'
    })
  }

  private _createRatingList(): void {
    data.forEach((el, i) => {

      const avatar = this._scene.add.sprite(this._modal.sprite.getBounds().left + 25, this._modal.btn.getBounds().centerY + 40 + (i * 72), 'avatar').setOrigin(0, 0).setDisplaySize(64, 64)
      const nickname = this._scene.add.text(avatar.getBounds().right + 25, avatar.getBounds().top, el.name, {
        color: 'black',
        font: '26px Triomphe',
        align: 'center'
      }).setOrigin(0, 0)
      const place = this._scene.add.text(avatar.getBounds().right + 25, avatar.getBounds().bottom - 5, `${i+1} место`, {
        color: 'black',
        font: '20px Triomphe',
        align: 'center'
      }).setOrigin(0, 1)
      const info = this._scene.add.text(this._modal.sprite.getBounds().right - 60, avatar.getBounds().centerY, `${el.lvl} уровень`, {
        color: 'black',
        font: '25px Triomphe',
        align: 'center'
      }).setOrigin(1, 0.5)
      this._elements.push(avatar, nickname, place, info)
    })
  }

}

export default Ratings;