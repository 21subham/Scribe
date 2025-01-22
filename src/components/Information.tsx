import { useState } from "react";
import Transcription from "./Transcription";
import Translation from "./Translation";

export default function Information(props) {
  const { output } = props;
  const [tab, setTab] = useState("transcription");

  function handleCopy() {
    navigator.clipboard.writeText();
  }

  function handleDownload() {
    const element = document.createElement("a");
    const file = new Blob([], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `AudioScribe_${new Date().toDateString()}.txt`; //TODO
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  return (
    <main className="flex-1 flex flex-col justify-center p-4 gap-3 sm:gap-4 text-center pb-20  max-w-prose w-full mx-auto">
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl whitespace-nowrap">
        Your <span className="text-blue-400 bold">Transcription</span>
      </h1>
      <div className="grid grid-cols-2 mx-auto bg-white shadow-md rounded-full overflow-hidden items-center">
        <button
          className={`px-4 py-1 duration-200 ${
            tab === "transcription"
              ? " bg-blue-300 text-white"
              : "text-blue-400 hover:text-blue-600"
          }`}
          onClick={() => setTab("transcription")}
        >
          Transcription
        </button>
        <button
          className={
            "px-4 py-1 duration-200 " +
            (tab === "translation"
              ? " bg-blue-300 text-white"
              : "text-blue-400 hover:text-blue-600")
          }
          onClick={() => setTab("translation")}
        >
          Translation
        </button>
      </div>
      <div className="my-3 flex flex-col">
        {tab === "transcription" ? (
          <Transcription {...props} />
        ) : (
          <Translation {...props} />
        )}
      </div>
      <div className="flex items-center gap-4 mx-auto ">
        <button
          title="Copy"
          className=" bg-white text-blue-300 px-2 aspect-square grid place-items-center rounded hover:text-blue-500 duration-200"
        >
          <i className="fa-solid fa-copy"></i>
        </button>

        <button
          title="Download"
          className=" bg-white text-blue-300 px-2 aspect-square grid place-items-center rounded  hover:text-blue-500 duration-200"
        >
          <i className="fa-solid fa-download"></i>
        </button>
      </div>
    </main>
  );
}
