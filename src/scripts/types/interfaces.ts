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