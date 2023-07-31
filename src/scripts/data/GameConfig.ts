type rgbArr = [number, number, number]

interface IgameConfig {
  colors: {
    defaultWord: rgbArr;
    repeatWord: rgbArr;
    wrongWord: rgbArr;
    solveWord: rgbArr;

    solveLetter: rgbArr,
    solveLetterText: rgbArr, 

    defaultWordText: rgbArr;
    repeatWordText: rgbArr;
    wrongWordText: rgbArr;
    solveWordText: rgbArr;

    letterButtonActive: rgbArr;
    letterButtonActiveText: rgbArr;
    letterButtonInactive: rgbArr;
    letterButtonInactiveText: rgbArr;

    boosterActive_16: number;
    boosterInactive_16: number;
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
    }
  }

  public get(): IgameConfig {
    return this._data;
  }
}

export default new GameConfig;
export { IgameConfig }
