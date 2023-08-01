type rgbArr = [number, number, number]

interface IgameConfig {
  // размеры
  sizes: {
    wordStep: number; // ширина и высота одной клетки с отступом
    reduceScale: number  // уменьшение у текущего слова
  },

  //цвета
  colors: {
    defaultWord: rgbArr; // начальный цвет спрайта слова
    repeatWord: rgbArr; // цвет спрайта повторения слова
    wrongWord: rgbArr; // цвет спрайта ошибочного слова
    solveWord: rgbArr; // цвет спрайта решенного слова

    solveLetter: rgbArr, // цвет спрайта решенной буквы
    solveLetterText: rgbArr, // цвет текста решенной буквы

    defaultWordText: rgbArr; // начальный цвет текста слова
    repeatWordText: rgbArr; // цвет текста повторения слова
    wrongWordText: rgbArr; // цвет текста ошибочного  слова
    solveWordText: rgbArr; // цвет текста решенного слова

    letterButtonActive: rgbArr;  // цвет активной кнопки буквы
    letterButtonActiveText: rgbArr;  // цвет текста активной кнопки буквы
    letterButtonInactive: rgbArr; // цвет неактивной кнопки буквы
    letterButtonInactiveText: rgbArr;  // цвет текста неактивной кнопки буквы

    boosterActive_16: number; // цвет активного бустера в 16ричном формате
    boosterInactive_16: number; // цвет неактивного бустера в 16ричном формат

    endLevelRectangle_16: number; // цвет прямуогольника который появляется в конце уровня в 16ричном формат
  },

  //перезарядки
  cooldowns: {
    boosterRandomLetter: number; // перезарядка бустера рандомной буквы
    boosterRandomWord: number; // перезарядка бустера рандомного слова
    boosterSpecificLetter: number; // перезарядка бустера конкретной буквы
  },

  //длительности анимаций
  durations: {
    animationWordStandartSolved: number; // анимация решенного слова 
    animationBooster: number; // анимация от бустера к слову
    animationWordBoosterSolvedStep: number; // 1 шаг (их 2) анимации решенного слова от бустера
    animationShuffleStep: number; // 1 шаг (их 2) анимации перемешиванния слов
    animationLetterButton: number; // анимация кнопки с буквой
    animationShuffleButton: number; // анимация кнопки перемешки
    animationWordRepeatStep: number; // 1 шаг(их2) анимации повторения у слова
    animationEndLevelRectangle: number; // анимация завршения уровня
    animationCurrentWordWrongStep: number; // 1 шаг(их3) анимации неправильного слова у текущего слова
    animationCurrentWordColorChange: number; //  анимация изменения цвета у текущего слова
    animationCurrentWordSolvedDestroy: number; //  анимация разрушения решенного у текущего слова
    animationModalStepFirst: number; // 1 шаг(их2) анимации модалки
    animationModalStepSecond: number; // 2 шаг(их2) анимации модалки
  }
  //задержки
  delays: {
    animationCurrentWordDestroy: number // анимация разрушения у текущего слова
    animationWordStandartSolved: number // задержка анимации решенного слова 
    animationEndLevelRectangle: number // задержка анимации завершения уровня
  }
}

const WHITE: rgbArr = [255, 255, 255]
const GREEN: rgbArr = [110, 190, 104]
const ORANGE: rgbArr = [222, 153, 85]
const PINK: rgbArr = [227, 109, 162]
const DARK_BLUE: rgbArr = [45, 52, 75]
const RED: rgbArr = [240, 85, 87]

const BOOSTER_ACTIVE = 0x688ec4
const BOOSTER_INACTIVE: number = 0x898989
const END_LEVEL_RECTANGLE: number = 0x2d344b




class GameConfig {

  private _data: IgameConfig = {
    
    sizes: {
      wordStep: 110,
      reduceScale: 0.4,
    },
    
    colors: {
      defaultWord: WHITE,
      repeatWord: ORANGE,
      wrongWord: RED,
      solveWord: GREEN,
      
      solveLetter: ORANGE,
      solveLetterText: WHITE,

      defaultWordText: DARK_BLUE,
      repeatWordText: WHITE,
      wrongWordText: WHITE,
      solveWordText: WHITE,
      
      letterButtonActive: PINK,
      letterButtonActiveText: WHITE,
      letterButtonInactive: WHITE,
      letterButtonInactiveText: DARK_BLUE,

      boosterActive_16: BOOSTER_ACTIVE,
      boosterInactive_16: BOOSTER_INACTIVE,
      endLevelRectangle_16: END_LEVEL_RECTANGLE,
    },

    cooldowns: {
      boosterRandomLetter: 5,
      boosterRandomWord: 5,
      boosterSpecificLetter: 5,
    },
    
    durations: {
      animationWordStandartSolved: 600,
      animationBooster: 1000, 
      animationWordBoosterSolvedStep: 310, 
      animationShuffleStep: 200, 
      animationLetterButton: 280,
      animationShuffleButton: 100, 
      animationWordRepeatStep: 310, 
      animationEndLevelRectangle: 800, 
      animationCurrentWordWrongStep: 60,
      animationCurrentWordColorChange: 130,
      animationCurrentWordSolvedDestroy: 100, 
      animationModalStepFirst: 400, 
      animationModalStepSecond: 100, 
    },

    delays: {
      animationCurrentWordDestroy: 500,
      animationWordStandartSolved: 650,
      animationEndLevelRectangle: 1200,
    }
  }

  public get(): IgameConfig {
    return this._data;
  }
}

export default new GameConfig;
export { IgameConfig }
