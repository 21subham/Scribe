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
