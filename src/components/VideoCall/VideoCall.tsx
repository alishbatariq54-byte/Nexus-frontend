import { useRef, useState } from "react";

export default function VideoCall() {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [videoOn, setVideoOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);

  // 🎥 Start Camera (FIXED)
  const startCall = async () => {
    try {
      const media = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = media;
      }

      setStream(media);
    } catch (error) {
      alert("Camera/Microphone permission denied ❌");
      console.error(error);
    }
  };

  // ❌ End Call (IMPROVED)
  const endCall = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setStream(null);
  };

  // 🎤 Toggle Audio (SAFE)
  const toggleAudio = () => {
    if (!stream) return;

    const audioTrack = stream.getAudioTracks()[0];
    if (!audioTrack) return;

    audioTrack.enabled = !audioOn;
    setAudioOn(!audioOn);
  };

  // 📹 Toggle Video (SAFE)
  const toggleVideo = () => {
    if (!stream) return;

    const videoTrack = stream.getVideoTracks()[0];
    if (!videoTrack) return;

    videoTrack.enabled = !videoOn;
    setVideoOn(!videoOn);
  };

  // 🖥 Screen Share (SAFE)
  const shareScreen = async () => {
    try {
      const screen = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = screen;
      }
    } catch (error) {
      console.error("Screen share error:", error);
    }
  };

  return (
    <div className="p-5 border rounded-xl">
      <h2 className="text-xl font-bold mb-3">Video Call</h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-60 bg-black rounded"
      />

      <div className="flex gap-2 mt-3 flex-wrap">
        <button
          onClick={startCall}
          className="bg-green-500 text-white px-3 py-1"
        >
          Start
        </button>

        <button
          onClick={endCall}
          className="bg-red-500 text-white px-3 py-1"
        >
          End
        </button>

        <button
          onClick={toggleAudio}
          disabled={!stream}
          className="bg-blue-500 text-white px-3 py-1 disabled:opacity-50"
        >
          {audioOn ? "Mute" : "Unmute"}
        </button>

        <button
          onClick={toggleVideo}
          disabled={!stream}
          className="bg-purple-500 text-white px-3 py-1 disabled:opacity-50"
        >
          {videoOn ? "Hide Video" : "Show Video"}
        </button>

        <button
          onClick={shareScreen}
          className="bg-yellow-500 px-3 py-1"
        >
          Share Screen
        </button>
      </div>
    </div>
  );
}
