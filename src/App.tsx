import { useEffect, useRef, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import FileDisplay from "./components/FileDisplay";
import Information from "./components/Information";
import Transcribing from "./components/Transcribing";
import { MessageTypes } from "./utils/presets";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [audioStream, setAudioStream] = useState<Blob | null>(null);
  const [output, setOutput] = useState<Blob | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);

  const isAudioAvailable = file || audioStream;

  const worker = useRef<Worker | null>(null);

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(
        new URL("./utils/whisper.worker.ts", import.meta.url),
        { type: "module" }
      );
    }

    const onMessageReceived = async (e: any) => {
      switch (e.data.type) {
        case "DOWNLOADING":
          setDownloading(true);
          console.log("downloading");
          break;

        case "LOADING":
          setIsLoading(true);
          console.log("loading");
          break;

        case "RESULT":
          setOutput(e.data.results);
          break;

        case "INFERENCE_DONE":
          setFinished(true);
          console.log("done");

          break;
      }
    };
    worker.current.addEventListener("message", onMessageReceived);
    return () =>
      worker.current?.removeEventListener("message", onMessageReceived);
  }, []);

  async function readAudioFrom(file) {
    const sampling_rate = 1600;
    const audioCTX = new AudioContext({ sampleRate: sampling_rate });
    const response = await file.arrayBuffer();
    const decoded = await audioCTX.decodeAudioData(response);
    const audio = decoded.getChannelData(0);
    return audio;
  }

  async function handleFormSubmission() {
    if (!file && !audioStream) return;

    let audio = await readAudioFrom(file ? file : audioStream);
    const modal_name = "openai / whisper - tiny.en";

    if (worker.current) {
      worker.current.postMessage({
        type: MessageTypes.INFERENCE_REQUEST,
        audio,
        modal_name,
      });
    }
  }

  function handleAudioReset() {
    setFile(null);
    setAudioStream(null);
  }

  return (
    <>
      <div className="flex flex-col mx-auto w-full max-w-[1000px]">
        <section className="min-h-screen flex flex-col ">
          <Header />
          {output ? (
            <Information />
          ) : isLoading ? (
            <Transcribing />
          ) : isAudioAvailable ? (
            <FileDisplay
              handleAudioReset={handleAudioReset}
              file={file}
              audioStream={audioStream}
            />
          ) : (
            <Homepage setFile={setFile} setAudioStream={setAudioStream} />
          )}
          {}
        </section>
        <Footer />
      </div>
    </>
  );
}

export default App;
