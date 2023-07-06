import GameActions from "../actions/GameActions";
import BoosterRandomLetter from "../components/BoosterRandomLetter";
import BoosterRandomWord from "../components/BoosterRandomWord";
import BoosterSpecificLetter from "../components/BoosterSpecificLetter";
import CurrentWord from "../components/CurrentWord";
import EndLevelRectangle from "../components/EndLevelRectangle";
import LetterButton from "../components/LetterButton";
import LettersCircle from "../components/LettersCircle";
import Word from "../components/Word";
import Session from "../data/Session";
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
  public letterButtonsLine: IbuttonsLine = {
    graphicCircleStart: null,
    graphicCircleEnd: null,
    graphicCircleMid: null,
    line: null,
    points: [],
    pointsMouse: [],
  }
  public endLevelRectangle: EndLevelRectangle;
  public boosterRandomWord: BoosterRandomWord
  public boosterRandomLetter: BoosterRandomLetter
  public boosterSpecificLetter: BoosterSpecificLetter

  public init(): void {
    Session.clear()
    this.words = []
    this.letterButtons = []
    this.activeLetterButtons = []
  }

  public preload(): void {

  }


  public create(): void {
    this.actions.build();
  }

  public update(): void {
  }


}

export default Game;