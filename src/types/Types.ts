//FileDisplay
export interface IFileDisplayPropType {
  handleAudioReset: () => void;
  handleFormSubmission: () => void;
  file: File | null;
  audioStream: Blob | null;
}

//homepage
export type IHomepagePropType = {
  // setAudioStream: (audioStream:  null | Blob) => void;

  // setFile: (file: File | null) => void
  setAudioStream: React.Dispatch<React.SetStateAction<Blob | null>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
};

export interface IOutputItem {
  end: number;
  index: number;
  start: number;
  text: string;
}

export interface IInformationType {
  output: IOutputItem[];
}

export interface ITranscribingType {
  downloading: boolean;
}
export interface ITranscriptionType {
  textElement: string;
}

export interface ITranslationType {
  textElement: string;
  translating: boolean;
  toLanguage: string;
  setToLanguage: React.Dispatch<React.SetStateAction<string>>;
  generateTranslation: () => void;
}
