import GameActions from "../actions/GameActions";



class Game extends Phaser.Scene {
  constructor() {
    super('Game')
  }

  public actions: GameActions = new GameActions(this);

  public init(): void {

  }

  public preload(): void {

  }


  public create(): void {
    this.actions.build();
    this.scene.launch('UI');
  }


}

export default Game;