interface Iposition {
  x: number;
  y: number;
}
interface Isounds {
  resumeMusic: () => void;
  pauseMusic: () => void;
  playMusic: (sound: string) => void;
  stopMusic: () => void;
  play: (sound: string) => void;
  mute: () => void;
  unmute: () => void;
  getVolume: () => number;
}


interface Ilevel {
  id: string
  data: {
    level: number;
    words: string[];
    letters: string[];
    config?: ((string | number)[])[];
  }
}

interface IlevelResponse {
  id: string
  data: string
}

interface IbuttonsLine {
  graphicCircleStart: Phaser.GameObjects.Graphics
  graphicCircleEnd: Phaser.GameObjects.Graphics
  graphicCircleMid: Phaser.GameObjects.Graphics
  line: Phaser.GameObjects.Graphics
  points: Phaser.Math.Vector2[]
  pointsMouse: Phaser.Math.Vector2[]
}

interface IwordFromConfig {
  word: string;
  positionX: number;
  positionY: number;
}

interface IwordsFromConfig {
  horizontal: IwordFromConfig[];
  vertical: IwordFromConfig[];
}

interface IuserRating {
  place: number,
  name: string,
  score: number,
  self: boolean,
  platform?: null
}

interface Iratings {
  rating: {
    dayLevels: IuserRating[],
    allLevels: IuserRating[],
    dayWords: IuserRating[],
    allWords: IuserRating[]
  }
}

interface IpreloadConfig {
  scene: string;
  images: { [key: string]: string };
  sounds: { [key: string]: string };
}