import { useRef, useEffect, useState } from "react";
import * as cam from '@mediapipe/camera_utils';
import Webcam from 'react-webcam';
import * as mediapipeUtils from '@mediapipe/drawing_utils';
import { FaceMesh, FACEMESH_TESSELATION, FACEMESH_RIGHT_EYE, FACEMESH_LEFT_EYE, FACEMESH_FACE_OVAL } from '@mediapipe/face_mesh';


export default function FaceAnalysis() {
    const [blendShapes, setBlendShapes] = useState(null);
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    let camera = null;

    function onFaceMeshResults(results) {
        // Set the canvas size to match the video
        canvasRef.current.width = webcamRef.current.video.videoWidth;
        canvasRef.current.height = webcamRef.current.video.videoHeight;
        const canvasElement = canvasRef.current;
        const canvasCtx = canvasElement.getContext("2d");

        // Clear the previous drawings
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

        // Draw the image from the video feed
        canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

        // Check if face landmarks are available
        if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
            for (const landmarks of results.multiFaceLandmarks) {
                // Draw tessellation (connection lines between points)
                mediapipeUtils.drawConnectors(
                    canvasCtx,
                    landmarks,
                    FACEMESH_TESSELATION,  // Now this is properly defined
                    { color: '#FFFFFF', lineWidth: 0.5 } // Adjust line width to make the lines thinner
                );

                // Draw landmarks (points) on top of tessellation
                mediapipeUtils.drawLandmarks(
                    canvasCtx,
                    landmarks,
                    { color: '#000000', lineWidth: 0.5, radius: 0.5 } // Adjust radius for smaller points
                );

                // Optionally, draw specific connectors for eyes, lips, etc.
                mediapipeUtils.drawConnectors(
                    canvasCtx,
                    landmarks,
                    FACEMESH_RIGHT_EYE,  // Right eye
                    { color: '#FF3030', lineWidth: 1 }
                );
                mediapipeUtils.drawConnectors(
                    canvasCtx,
                    landmarks,
                    FACEMESH_LEFT_EYE,  // Left eye
                    { color: '#30FF30', lineWidth: 1 }
                );
                mediapipeUtils.drawConnectors(
                    canvasCtx,
                    landmarks,
                    FACEMESH_FACE_OVAL,  // Face oval
                    { color: '#E0E0E0', lineWidth: 1 }
                );
            }
        }
    }

    useEffect(() => {
        // Initialize the FaceMesh model
        const faceMesh = new FaceMesh({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
            },
        });
        faceMesh.setOptions({
            maxNumFaces: 1,
            refineLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
            outputFaceBlendshapes: true,
        });
        faceMesh.onResults(onFaceMeshResults);

        // Create the webcam instance and start streaming
        if (webcamRef.current) {
            camera = new cam.Camera(webcamRef.current.video, {
                onFrame: async () => {
                    await faceMesh.send({ image: webcamRef.current.video });
                },
                width: 320,
                height: 240
            });
            camera.start();
        }
    }, []); // Empty dependency array to run only once on component mount


    // print blend shapes displayName or category name
    useEffect(() => {
        if (blendShapes) {
            console.log("Blend Shapes: ", blendShapes);
        }
    }, [blendShapes]);

    return (
        <div>
            <Webcam
                ref={webcamRef}
                style={{
                    position: "absolute",
                    marginLeft: "0px",
                    marginRight: "0px",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zIndex: 9,
                    width: 320,
                    height: 240,
                }} />
            <canvas
                ref={canvasRef}
                style={{
                    position: "absolute",
                    marginLeft: "0px",
                    marginRight: "0px",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zIndex: 9,
                    width: 320,
                    height: 240,
                }}>
            </canvas>

            {/* debug blend shapes */}
            {blendShapes && blendShapes[0] && (
                <ul className="blend-shapes-list">
                    {blendShapes[0].categories.map((shape, index) => (
                        <li key={index} className="blend-shapes-item">
                            <span className="blend-shapes-label">
                                {shape.displayName || shape.categoryName}
                            </span>
                            <span
                                className="blend-shapes-value"
                                style={{
                                    width: `calc(${shape.score * 100}% - 120px)`
                                }}
                            >
                                {shape.score.toFixed(4)}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
