import GameActions from "../actions/GameActions";
import Word from "../components/Word";



class Game extends Phaser.Scene {
  constructor() {
    super('Game')
  }

  public actions: GameActions = new GameActions(this);
  public title: Phaser.GameObjects.Text
  public words: Word[] = []


  public init(): void {

  }

  public preload(): void {

  }


  public create(): void {
    this.actions.build();
  }


}

export default Game;