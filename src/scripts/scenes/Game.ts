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
  // public line;
  // public graphics;
  // тест
  public init(): void {
    this.words = []
    this.letterButtons = []
    this.activeLetterButtons = []
  }

  public preload(): void {

  }


  public create(): void {
    this.actions.build();
    // this.graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x00ff00 } });

    // const { centerX, centerY } = this.cameras.main
    // this.line = new Phaser.Geom.Line(centerX, centerY, this.input.mousePointer.x, this.input.mousePointer.y);
    // this.graphics.strokeLineShape(this.line);
  }

  public update(): void {
    // this.line.x2 = this.input.mousePointer.x;
    // this.line.y2 = this.input.mousePointer.y;
    // this.graphics.clear();
    // this.graphics.strokeLineShape(this.line);
  }


}

export default Game;