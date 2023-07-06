enum screen {
  MAIN,
  COMPLETE,
}

enum solvedWord {
  STANDART,
  BOOSTER_WORD,
  BOOSTER_LETTER
}


enum currentWordType {
  DEFAULT = 'default',
  WRONG = 'wrong',
  SOLVED = 'solved',
  REPEAT = 'repeat'
}

enum wordDirection {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical'
}

export {
  currentWordType,
  wordDirection,
  solvedWord,
  screen
}