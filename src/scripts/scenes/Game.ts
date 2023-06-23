import GameActions from "../actions/GameActions";
import CurrentWord from "../components/CurrentWord";
import LetterButton from "../components/LetterButton";
import LettersCircle from "../components/LettersCircle";
import Word from "../components/Word";
import Settings from "../data/Settings";



class Game extends Phaser.Scene {
  constructor() {
    super('Game')
  }

  public actions: GameActions = new GameActions(this);
  public title: Phaser.GameObjects.Text
  public words: Word[] = []
  public lettersCircle: LettersCircle
  public letterButtons: LetterButton[] = []
  public activeLetterButtons: LetterButton[] = []
  public currentWord: CurrentWord

  public init(): void {
    this.words = []
    this.letterButtons = []
    this.activeLetterButtons = []
  }

  public preload(): void {

  }


  public create(): void {
    this.actions.build();
  }


}

export default Game;