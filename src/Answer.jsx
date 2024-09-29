import "regenerator-runtime/runtime.js";
import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import FaceAnalysis from "./utils/FaceAnalysis";
import Navbar from "./components/Navbar";
export default function Answer({ setStatus, question, setResponse, setDistractedTimes }) {
    const [timeLeft, setTimeLeft] = useState(30);
    const [distracted, setDistracted] = useState(false);

    const commands = [
        {
            command: 'stop recording',
            callback: () => {
                console.log("Voice command recognized: stop recording");
                handleStopRecording();
            }
        },
        {
            command: 'start recording',
            callback: () => {
                console.log("Voice command recognized: start recording");
                handleStartRecording();
            }
        },
        {
            command: 'finish interview',
            callback: () => {
                console.log("Voice command recognized: finish interview");
                setStatus("results");
            }
        }
    ];

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition({ commands });

    // useEffect(() => {
    //     console.log("Component mounted or updated");
    //     console.log("Browser supports speech recognition:", browserSupportsSpeechRecognition);
        
    //     let timer = null;
    //     if (listening) {
    //         console.log("Starting timer");
    //         timer = setInterval(() => {
    //             setTimeLeft((prevTime) => {
    //                 console.log("Time left:", prevTime - 1);
    //                 if (prevTime <= 1) {
    //                     console.log("Time's up, stopping recording");
    //                     handleStopRecording();
    //                     return 0;
    //                 }
    //                 return prevTime - 1;
    //             });
    //         }, 1000);
    //     }

    //     return () => {
    //         if (timer) {
    //             console.log("Clearing timer");
    //             clearInterval(timer);
    //         }
    //     };
    // }, [listening, transcript]);

    useEffect(() => {
        // if distracted, save the distracted state and the time
        const currentTime = new Date().toLocaleTimeString();
        setDistractedTimes((prevTimes) => `${prevTimes}(Time: ${currentTime} -> Was tistracted: ${distracted}), `);
    }, [distracted]);

    const handleStartRecording = () => {
        console.log("Starting recording");
        SpeechRecognition.startListening({ continuous: true })
            .then(() => console.log("Speech recognition started successfully"))
            .catch((error) => console.error("Error starting speech recognition:", error));
        setTimeLeft(30);
        resetTranscript();
    };

    const handleStopRecording = () => {
        console.log("Stopping recording");
        SpeechRecognition.stopListening()
            .then(() => console.log("Speech recognition stopped successfully"))
            .catch((error) => console.error("Error stopping speech recognition:", error));
    };

    if (!browserSupportsSpeechRecognition) {
        console.log("Browser doesn't support speech recognition");
        return <span>Browser doesn't support speech recognition.</span>;
    }

    console.log("Rendering component");
    console.log("Listening status:", listening);
    console.log("Current transcript:", transcript);

    return (
        <>
            <Navbar></Navbar> 
            <div className="flex flex-row items-center justify-center h-screen bg-gray-100">
            <div className="p-4 bg-white shadow-lg rounded-lg w-full max-w-xl">
                        <h1 className="text-lg font-semibold text-left mb-4">{question}</h1>
                        {/* <p className="text-center mb-4">Time left: {timeLeft} seconds</p> */}
                        <div className="text-center mb-4">
                            {listening ? (
                                <button
                                    onClick={() => {
                                        console.log("Stop button clicked");
                                        handleStopRecording();
                                    }}
                                    className="px-4 py-2 text-white bg-red-500 rounded-lg mr-2"
                                >
                                    Stop Recording
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        console.log("Start button clicked");
                                        handleStartRecording();
                                    }}
                                    className="px-4 py-2 text-white bg-green-500 rounded-lg mr-2"
                                >
                                    Start Recording
                                </button>
                            )}
                        </div>
                        <div className="border p-2 h-32 overflow-y-auto mb-4">
                            <p>{transcript}</p>
                        </div>
                    </div>
                <div className="flex flex-col">
                    
                    <div className>
                        <div className="w-[30vw] h-[30vw] mt-[-28vw]"></div>
                        <FaceAnalysis distracted={distracted} setDistracted={setDistracted} />
                    </div>


                    {/* <p className="text-sm text-gray-600 mt-2">
                        Voice commands: "Start recording", "Stop recording", "Finish interview"
                    </p> */}
                </div>
                <div className="flex justify-center items-center">
                    <button                     onClick={() => {
                        console.log("Finish button clicked");
                        setResponse(transcript);
                        setStatus("results");
                    }} className="absolute bottom-10 left-[47%] p-3 rounded-[15px] shadow-xl font-bold bg-gradient-to-r from-[#7CFF7C] to-gray-400 text-transparent bg-clip-text">Analyze</button>
                </div>
            </div>
        </>
    );
}