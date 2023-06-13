import Game from "../scenes/Game";

class GameActions {
  constructor(scene: Game) {
    this._scene = scene;
  }



  private _scene: Game;

  public build(): void {
    const {centerX, centerY} = this._scene.cameras.main
    this._scene.add.text(centerX, centerY, 'game', {color: 'white', fontSize: '80px', fontFamily: 'Triomphe'}).setOrigin(0.5, 0.5)
    console.log('build')
  }
}

export default GameActions