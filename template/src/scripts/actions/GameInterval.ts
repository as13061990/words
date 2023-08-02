import Session from '../data/Session';
import Game from '../scenes/Game';

class GameInteval {
  constructor(scene: Game) {
    this._scene = scene;
    this.init();
  }

  private _scene: Game;
  private _loop: Phaser.Time.TimerEvent;

  private init(): void {
    this._loop = this._scene.time.addEvent({ delay: 1000, callback: (): void => {
      this._game()
    }, loop: true });
  }

  private _game(): void {
    if (!this._scene.scene.isActive('Game')) return
    const game = this._scene.game.scene.getScene('Game') as Game;
    if (Session.getIsActiveBoosterRandomWord()) Session.minusBoosterRandomWordTimer()
    if (Session.getIsActiveBoosterRandomLetter()) Session.minusBoosterRandomLetterTimer() 
    if (Session.getIsActiveBoosterSpecificLetter()) Session.minusBoosterSpecificLetterTimer()
  }
}

export default GameInteval;