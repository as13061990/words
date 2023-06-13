import GameActions from "../actions/GameActions";
import CurrentWord from "../components/CurrentWord";
import Word from "../components/Word";



class Game extends Phaser.Scene {
  constructor() {
    super('Game')
  }

  public actions: GameActions = new GameActions(this);
  public title: Phaser.GameObjects.Text
  public words: Word[] = []
  public currentWord: CurrentWord


  public init(): void {

  }

  public preload(): void {

  }


  public create(): void {
    this.actions.build();
  }


}

export default Game;