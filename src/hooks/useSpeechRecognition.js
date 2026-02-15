import { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition as useSpeechRecognitionHook,
} from "react-speech-recognition";
import "regenerator-runtime/runtime";

export const useSpeechRecognition = () => {
  const [isRecording, setIsRecording] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognitionHook();

  const startRecording = () => {
    SpeechRecognition.startListening({ continuous: true });
    setIsRecording(true);
  };

  const stopRecording = () => {
    SpeechRecognition.stopListening();
    setIsRecording(false);
  };

  const clearTranscript = () => {
    resetTranscript();
  };

  return {
    transcript,
    listening,
    isRecording,
    browserSupportsSpeechRecognition,
    startRecording,
    stopRecording,
    clearTranscript,
  };
};
