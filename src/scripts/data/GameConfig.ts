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
  },

  //перезарядки
  cooldowns: {
    boosterRandomLetter: number; // перезарядка бустера рандомной буквы
    boosterRandomWord: number; // перезарядка бустера рандомного слова
    boosterSpecificLetter: number; // перезарядка бустера конкретной буквы
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
    },

    cooldowns: {
      boosterRandomLetter: 5,
      boosterRandomWord: 5,
      boosterSpecificLetter: 5,
    },
  }

  public get(): IgameConfig {
    return this._data;
  }
}

export default new GameConfig;
export { IgameConfig }
