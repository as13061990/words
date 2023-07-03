enum screen {
  MAIN
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
  screen
}