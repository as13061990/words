import Modal from "../components/Modal";
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
  private _elements: (Phaser.GameObjects.Text | Phaser.GameObjects.Sprite | Phaser.GameObjects.Graphics)[] = []
  private _category: 'all' | 'day' | 'friends' = 'all'


  private _build(): void {

    
    const all = this._scene.add.text(this._modal.sprite.getBounds().left + 25,  this._modal.btn.getBounds().centerY, 'Все время', {
      color: 'black',
      font: '25px Triomphe',
      align: 'center'
    }).setOrigin(0, 0.5)

    
    const day = this._scene.add.text(all.getBounds().right + 30,  this._modal.btn.getBounds().centerY, 'За день', {
      color: 'black',
      font: '25px Triomphe',
      align: 'center'
    }).setOrigin(0, 0.5)

    
    const friends = this._scene.add.text(day.getBounds().right + 30,  this._modal.btn.getBounds().centerY, 'Друзья', {
      color: 'black',
      font: '25px Triomphe',
      align: 'center'
    }).setOrigin(0, 0.5)

    const rectangle = this._scene.add.graphics()

    rectangle.fillStyle(Settings.PINK_16, 1);
    rectangle.fillRoundedRect(all.getBounds().left - 10, all.getBounds().top - 5, all.getBounds().width + 20, all.getBounds().height + 10, 16);

    console.log(rectangle)
    this._elements.push(rectangle, all, day, friends)
    
  }

  public pushElementsToContainer():void {
    this._modal.add(this._elements)
  }

}

export default Ratings;