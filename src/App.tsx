import { useState } from "react";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import FileDisplay from "./components/FileDisplay";

function App() {
  const [file, SetFile] = useState<File | null>(null);
  const [audioStream, SetAudioStream] = useState<Blob | null>(null);
  const isAudioAvailable = file || audioStream;

  function handleAudioReset() {
    SetFile(null);
    SetAudioStream(null);
  }

  return (
    <div className="flex flex-col p-4 max-w-[1000px] mx-auto w-full">
      <section className="min-h-screen flex flex-col">
        <Header />
        {isAudioAvailable ? (
          <FileDisplay
            handleAudioReset={handleAudioReset}
            file={file}
            audioStream={audioStream}
          />
        ) : (
          <Homepage setFile={SetFile} setAudioStream={SetAudioStream} />
        )}
      </section>
      <h1>Chai</h1>
      <footer></footer>
    </div>
  );
}

export default App;
