// import React, { useEffect, useRef, useState } from "react";
// import { FilesetResolver, FaceLandmarker, DrawingUtils } from "@mediapipe/tasks-vision";
// // import * as mediapipeUtils from '@mediapipe/drawing_utils';
// import face_landmarker_task from "../models/face_landmarker.task"; // Path to your face landmarker model
// // import { FaceMesh, FACEMESH_TESSELATION, FACEMESH_RIGHT_EYE, FACEMESH_LEFT_EYE, FACEMESH_FACE_OVAL } from '@mediapipe/face_mesh';

// const FaceAnalysis = ({distracted, setDistracted}) => {
//     const videoRef = useRef(null);
//     const canvasRef = useRef(null);
//     const [facePresence, setFacePresence] = useState(null);
//     const [faceBlendShapes, setFaceBlendShapes] = useState(null);

//     useEffect(() => {
//         let faceLandmarker;
//         let animationFrameId;

//         const initializeCanvas = () => {
//             const canvas = canvasRef.current;
//             const ctx = canvas.getContext("2d");
//             const video = videoRef.current;
        
//             // Get the device pixel ratio (for high-DPI displays)
//             const devicePixelRatio = window.devicePixelRatio || 1;
        
//             // Set canvas internal resolution (with DPI scaling)
//             canvas.width = video.videoWidth * devicePixelRatio;
//             canvas.height = video.videoHeight * devicePixelRatio;
        
//             // Set the CSS size to match the video size (without DPI scaling)
//             canvas.style.width = `${video.videoWidth}px`;
//             canvas.style.height = `${video.videoHeight}px`;
        
//             // Scale the drawing context to account for high DPI
//             // ctx.scale(devicePixelRatio, devicePixelRatio);
//         };        

//         const initializeFaceDetection = async () => {
//             try {
//                 const vision = await FilesetResolver.forVisionTasks(
//                     "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
//                 );
//                 faceLandmarker = await FaceLandmarker.createFromOptions(
//                     vision, {
//                     baseOptions: {
//                         modelAssetPath: face_landmarker_task,
//                         delegate: "GPU"
//                     }, // Path to your model
//                     outputFaceBlendshapes: true,
//                     runningMode: "VIDEO",
//                     numFaces: 1
//                 }
//                 );
//                 initializeCanvas();
//                 detectFaces();
//             } catch (error) {
//                 console.error("Error initializing face detection:", error);
//             }
//         };

//         const drawLandmarks = (detections) => {
//             const canvas = canvasRef.current;
//             const ctx = canvas.getContext("2d");
//             ctx.clearRect(0, 0, canvas.width, canvas.height);
//             ctx.fillStyle = "white";

//             // landmarksArray.forEach((landmarks) => {
//             //     landmarks.forEach((landmark) => {
//             //         const x = landmark.x * canvas.width;
//             //         const y = landmark.y * canvas.height;

//             //         ctx.beginPath();
//             //         ctx.arc(x, y, 3, 0, 2 * Math.PI); // Draw smaller circles for facial landmarks
//             //         ctx.fill();
//             //     });
//             // });

//             const drawingUtils = new DrawingUtils(ctx);
//             for (const landmarks of detections.faceLandmarks) {
//                 drawingUtils.drawConnectors(
//                     landmarks,
//                     FaceLandmarker.FACE_LANDMARKS_TESSELATION,
//                     { color: "#C0C0C070", lineWidth: 1 }
//                 );
//                 drawingUtils.drawConnectors(
//                     landmarks,
//                     FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE,
//                     { color: "#FF3030" }
//                 );
//                 drawingUtils.drawConnectors(
//                     landmarks,
//                     FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW,
//                     { color: "#FF3030" }
//                 );
//                 drawingUtils.drawConnectors(
//                     landmarks,
//                     FaceLandmarker.FACE_LANDMARKS_LEFT_EYE,
//                     { color: "#30FF30" }
//                 );
//                 drawingUtils.drawConnectors(
//                     landmarks,
//                     FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW,
//                     { color: "#30FF30" }
//                 );
//                 drawingUtils.drawConnectors(
//                     landmarks,
//                     FaceLandmarker.FACE_LANDMARKS_FACE_OVAL,
//                     { color: "#E0E0E0" }
//                 );
//                 drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LIPS, {
//                     color: "#E0E0E0"
//                 });
//                 drawingUtils.drawConnectors(
//                     landmarks,
//                     FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS,
//                     { color: "#FF3030" }
//                 );
//                 drawingUtils.drawConnectors(
//                     landmarks,
//                     FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS,
//                     { color: "#30FF30" }
//                 );
//             }
//             // console.log("blendShapes", detections.faceBlendshapes);
//             setFaceBlendShapes(detections.faceBlendshapes);
//         };

//         const detectFaces = () => {
//             if (videoRef.current && videoRef.current.readyState >= 2) {
//                 const detections = faceLandmarker.detectForVideo(videoRef.current, performance.now());
//                 setFacePresence(detections.faceLandmarks.length > 0);

//                 if (detections.faceLandmarks) {
//                     // console.log("Face landmarks detected:", detections.faceLandmarks);
//                     // drawLandmarks(detections.faceLandmarks);

//                     // mesh stuff yay
//                     drawLandmarks(detections);
//                 }

//                 // console.log("blendshapes", detections.faceBlendShapes);

//                 animationFrameId = requestAnimationFrame(detectFaces);
//             }
//         };

//         const startWebcam = async () => {
//             try {
//                 const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//                 videoRef.current.srcObject = stream;
//                 await initializeFaceDetection();
//             } catch (error) {
//                 console.error("Error accessing webcam:", error);
//             }
//         };

//         startWebcam();

//         return () => {
//             if (videoRef.current && videoRef.current.srcObject) {
//                 videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
//             }
//             if (faceLandmarker) {
//                 faceLandmarker.close();
//             }

//             if (animationFrameId) {
//                 cancelAnimationFrame(animationFrameId);
//             }
//         };
//     }, []);

//     // check for distraction
//     useEffect(() => {
//         if (faceBlendShapes) {
//             try {
//                 const categories = faceBlendShapes[0].categories;

//                 // Extract blend shape scores
//                 const eyeBlinkLeft = categories.find(c => c.categoryName === 'eyeBlinkLeft')?.score;
//                 const eyeBlinkRight = categories.find(c => c.categoryName === 'eyeBlinkRight')?.score;
//                 const eyeSquintLeft = categories.find(c => c.categoryName === 'eyeSquintLeft')?.score;
//                 const eyeSquintRight = categories.find(c => c.categoryName === 'eyeSquintRight')?.score;
                
//                 const eyeLookOutLeft = categories.find(c => c.categoryName === 'eyeLookOutLeft')?.score;
//                 const eyeLookOutRight = categories.find(c => c.categoryName === 'eyeLookOutRight')?.score;
//                 const eyeLookInLeft = categories.find(c => c.categoryName === 'eyeLookInLeft')?.score;
//                 const eyeLookInRight = categories.find(c => c.categoryName === 'eyeLookInRight')?.score;
//                 const eyeLookUpLeft = categories.find(c => c.categoryName === 'eyeLookUpLeft')?.score;
//                 const eyeLookUpRight = categories.find(c => c.categoryName === 'eyeLookUpRight')?.score;
//                 const eyeLookDownLeft = categories.find(c => c.categoryName === 'eyeLookDownLeft')?.score;
//                 const eyeLookDownRight = categories.find(c => c.categoryName === 'eyeLookDownRight')?.score;
                
//                 const mouthOpen = categories.find(c => c.categoryName === 'jawOpen')?.score;
//                 const mouthSmileLeft = categories.find(c => c.categoryName === 'mouthSmileLeft')?.score;
//                 const mouthSmileRight = categories.find(c => c.categoryName === 'mouthSmileRight')?.score;
//                 const mouthFrownLeft = categories.find(c => c.categoryName === 'mouthFrownLeft')?.score;
//                 const mouthFrownRight = categories.find(c => c.categoryName === 'mouthFrownRight')?.score;

//                 // Define threshold values (can be adjusted based on experimentation)
//                 const blinkThreshold = 0.5;
//                 const squintThreshold = 0.5;
//                 const eyeLookThreshold = 0.7;  // Looking away from center
//                 const mouthOpenThreshold = 0.3;
//                 const mouthExpressionThreshold = 0.2;

//                 // Distraction logic
//                 const isBlinking = eyeBlinkLeft > blinkThreshold || eyeBlinkRight > blinkThreshold;
//                 const isSquinting = eyeSquintLeft > squintThreshold || eyeSquintRight > squintThreshold;
//                 const isLookingAway = (eyeLookOutLeft > eyeLookThreshold || eyeLookOutRight > eyeLookThreshold ||
//                                     eyeLookInLeft > eyeLookThreshold || eyeLookInRight > eyeLookThreshold ||
//                                     eyeLookUpLeft > eyeLookThreshold || eyeLookUpRight > eyeLookThreshold ||
//                                     eyeLookDownLeft > eyeLookThreshold || eyeLookDownRight > eyeLookThreshold);
//                 const isMouthMoving = mouthOpen > mouthOpenThreshold ||
//                                     mouthSmileLeft > mouthExpressionThreshold || mouthSmileRight > mouthExpressionThreshold ||
//                                     mouthFrownLeft > mouthExpressionThreshold || mouthFrownRight > mouthExpressionThreshold;

//                 // If the user is looking away, they are likely distracted
//                 const isDistracted = isLookingAway;

//                 // console.log("Blinking:", isBlinking); console.log("Squinting:", isSquinting); console.log("Looking Away:", isLookingAway); console.log("Mouth Moving:", isMouthMoving);console.log("Blinking:", isBlinking); console.log("Squinting:", isSquinting); console.log("Looking Away:", isLookingAway); console.log("Mouth Moving:", isMouthMoving);

//                 // return isDistracted;
//                 // console.log("Distracted", isDistracted);
//                 setDistracted(isDistracted);
//                 console.log("Distracted", distracted);
//             } catch (error) {
//                 console.error("Error checking for distraction:", error);
//             }
//         }
//     }, [faceBlendShapes]);

//     const vWidth = 640;
//     const vHeight = vWidth * (3 / 4); // 4:3 aspect ratio

//     const canvasWidth = vWidth;
//     const canvasHeight = vHeight;

//     return (
//         <>
//             {/* <h1>Is there a Face? {facePresence ? "Yes" : "No"}</h1>
//             <div>{`Distracted: ${distracted}`}</div> */}
//             <div style={{ position: "relative" }}>
//                 {/* Ensure the video is displayed and sized correctly */}
//                 <div className="flex w-1/2" style={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     width: `${vWidth}px`,
//                     height: `${vHeight}px`,
//                 }}>
//                     <video
//                         ref={videoRef}
//                         autoPlay
//                         playsInline
//                         style={{
//                             top: 0,
//                             left: 0,
//                             width: `${vWidth}px`,
//                             height: `${vHeight}px`,
//                             objectFit: "cover",
//                             transform: "scaleX(-1)",
//                             zIndex: 1 // Place the video behind the canvas
//                         }}
//                     ></video>
//                 </div>

//                 {/* Canvas for drawing face landmarks */}
//                 <canvas
//                     ref={canvasRef}
//                     style={{
//                         position: "absolute",
//                         top: 0,
//                         left: 0,
//                         backgroundColor: "transparent", // Transparent to see the video below
//                         width: `${canvasWidth}px`,
//                         height: `${canvasHeight}px`,
//                         transform: "scaleX(-1)",
//                         zIndex: 2 // Place canvas above the video for landmarks
//                     }}
//                 ></canvas>
//             </div>

//             {/* put blend shapes detections */}
//             {/* <div>
//                 {faceBlendShapes && (
//                     <div>
//                         <h2>Blend Shapes</h2>
//                         <pre>{JSON.stringify(faceBlendShapes, null, 2)}</pre>
//                     </div>
//                 )}
//             </div> */}
//         </>
//     );

// };

// export default FaceAnalysis;

import React, { useEffect, useRef, useState } from "react";
import { FilesetResolver, FaceLandmarker, DrawingUtils } from "@mediapipe/tasks-vision";
import face_landmarker_task from "../models/face_landmarker.task"; // Path to your face landmarker model

const FaceAnalysis = ({ distracted, setDistracted }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [facePresence, setFacePresence] = useState(null);
    const [faceBlendShapes, setFaceBlendShapes] = useState(null);
    const [debug, setDebug] = useState(true);

    useEffect(() => {
        let faceLandmarker;
        let animationFrameId;

        const resizeCanvas = () => {
            const canvas = canvasRef.current;
            const video = videoRef.current;
            if (!canvas || !video) return;

            const container = containerRef.current;
            const containerWidth = container.clientWidth;

            const scaleFactor = containerWidth / video.videoWidth; // Scale based on container width

            // Adjust canvas size to match the video size, while maintaining aspect ratio
            const canvasWidth = video.videoWidth * scaleFactor;
            const canvasHeight = video.videoHeight * scaleFactor;

            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            canvas.style.width = `${canvasWidth}px`;
            canvas.style.height = `${canvasHeight}px`;

            video.style.width = `${canvasWidth}px`;
            video.style.height = `${canvasHeight}px`;
        };

        const initializeFaceDetection = async () => {
            try {
                const vision = await FilesetResolver.forVisionTasks(
                    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
                );
                faceLandmarker = await FaceLandmarker.createFromOptions(
                    vision, {
                    baseOptions: {
                        modelAssetPath: face_landmarker_task,
                        delegate: "GPU"
                    },
                    outputFaceBlendshapes: true,
                    runningMode: "VIDEO",
                    numFaces: 1
                }
                );
                resizeCanvas();
                detectFaces();
            } catch (error) {
                console.error("Error initializing face detection:", error);
            }
        };

        const drawLandmarks = (detections) => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "white";

            const drawingUtils = new DrawingUtils(ctx);
            for (const landmarks of detections.faceLandmarks) {
                drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_TESSELATION,
                    { color: "#C0C0C070", lineWidth: 1 }
                );
                drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE,
                    { color: "#FF3030" }
                );
                drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW,
                    { color: "#FF3030" }
                );
                drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_LEFT_EYE,
                    { color: "#30FF30" }
                );
                drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW,
                    { color: "#30FF30" }
                );
                drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_FACE_OVAL,
                    { color: "#E0E0E0" }
                );
                drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LIPS, {
                    color: "#E0E0E0"
                });
                drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS,
                    { color: "#FF3030" }
                );
                drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS,
                    { color: "#30FF30" }
                );
            }
            setFaceBlendShapes(detections.faceBlendshapes);
        };

        const detectFaces = () => {
            if (videoRef.current && videoRef.current.readyState >= 2) {
                const detections = faceLandmarker.detectForVideo(videoRef.current, performance.now());
                setFacePresence(detections.faceLandmarks.length > 0);

                if (detections.faceLandmarks) {
                    drawLandmarks(detections);
                }

                animationFrameId = requestAnimationFrame(detectFaces);
            }
        };

        const startWebcam = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = () => {
                    resizeCanvas();
                    initializeFaceDetection();
                };
            } catch (error) {
                console.error("Error accessing webcam:", error);
            }
        };

        startWebcam();

        window.addEventListener("resize", resizeCanvas);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
            }
            if (faceLandmarker) {
                faceLandmarker.close();
            }

            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, []);

    // Detect distractions based on blend shapes
    useEffect(() => {
        if (faceBlendShapes) {
            try {
                const categories = faceBlendShapes[0].categories;

                const eyeBlinkLeft = categories.find(c => c.categoryName === 'eyeBlinkLeft')?.score;
                const eyeBlinkRight = categories.find(c => c.categoryName === 'eyeBlinkRight')?.score;
                const eyeLookOutLeft = categories.find(c => c.categoryName === 'eyeLookOutLeft')?.score;
                const eyeLookOutRight = categories.find(c => c.categoryName === 'eyeLookOutRight')?.score;

                const eyeLookThreshold = 0.7;
                const isLookingAway = (eyeLookOutLeft > eyeLookThreshold || eyeLookOutRight > eyeLookThreshold);

                setDistracted(isLookingAway);
                console.log("Distracted", distracted);
            } catch (error) {
                console.error("Error checking for distraction:", error);
            }
        }
    }, [faceBlendShapes]);

    return (
        // FIXME: 312px + 5 is a hardcoded value, consider making it dynamic later!
        <div className={`flex w-2/3 min-h-[280px]`}>
            <div ref={containerRef} className="relative w-full h-auto">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="absolute w-full h-full object-cover transform scale-x-[-1] z-10"
                ></video>
                <canvas
                    ref={canvasRef}
                    className={`absolute ${debug ? "" : "invisible"} w-full h-full bg-transparent transform scale-x-[-1] z-20`}
                ></canvas>
                <div
                    className="absolute top-0 p-2 bg-white bg-opacity-50 rounded-br-lg z-30"
                >
                    <input type="checkbox" checked={debug} onChange={() => {setDebug(!debug); console.log(debug)}} />
                    { debug ? " Hide Debug" : " Show Debug" }
                    <div>{ debug ? " Distracted: " + distracted : ""}</div>
                </div>
            </div>
        </div>
    );    
};

export default FaceAnalysis;