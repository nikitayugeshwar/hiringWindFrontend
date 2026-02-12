"use client";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { IoMdMic } from "react-icons/io";

const Mic = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does not support speech recognition.</span>;
  }

  return (
    <div>
      <p> MIcrophone : {listening ? "on" : "off"}</p>
      <button onClick={SpeechRecognition.startListening}>
        <IoMdMic />
      </button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <p>{transcript}</p>
    </div>
  );
};
export default Mic;
