import { useState, useRef, useEffect } from "react";
import { createPost, uploadImage, uploadAudio } from "../api/post.api";
import { Send, Image, Mic, Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import WaveSurfer from "wavesurfer.js";
import "./chat.css";

const PostForm = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [audioBlob, setAudioBlob] = useState(null);
  const [recording, setRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [cancelled, setCancelled] = useState(false);

  const mediaRecorderRef = useRef(null);
  const wavesurferRef = useRef(null);
  const waveformContainerRef = useRef(null);
  const startXRef = useRef(0);
  const timerRef = useRef(null);

  /* ================= IMAGE ================= */
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  /* ================= AUDIO RECORDING ================= */
  const startRecording = async (e) => {
    startXRef.current = e.touches?.[0].clientX || e.clientX;
    setCancelled(false);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      const chunks = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);

      recorder.onstop = () => {
        clearInterval(timerRef.current);
        timerRef.current = null;

        if (cancelled) return;

        const blob = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);

        // Initialize WaveSurfer
        initWaveform(url);
      };

      recorder.start();
      setRecording(true);
      setDuration(0);

      timerRef.current = setInterval(() => setDuration((d) => d + 1), 1000);
    } catch {
      toast.error("Microphone permission denied");
    }
  };

  const stopRecording = () => {
    if (!mediaRecorderRef.current) return;

    mediaRecorderRef.current.stop();
    setRecording(false);

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  /* ================= SLIDE TO CANCEL ================= */
  const handleMove = (e) => {
    if (!recording) return;
    const currentX = e.touches?.[0].clientX || e.clientX;
    if (startXRef.current - currentX > 80) {
      setCancelled(true);
      stopRecording();
      toast("Recording canceled", { icon: "⚠️" });
    }
  };

  /* ================= WAVEFORM ================= */
  const initWaveform = (audioURL) => {
    if (!waveformContainerRef.current) return;
    if (wavesurferRef.current) wavesurferRef.current.destroy();

    wavesurferRef.current = WaveSurfer.create({
      container: waveformContainerRef.current,
      waveColor: "#4f46e5",
      progressColor: "#6366f1",
      cursorWidth: 0,
      height: 50,
      responsive: true,
    });

    wavesurferRef.current.load(audioURL);
  };

  /* ================= DISCARD AUDIO ================= */
  const discardAudio = () => {
    setAudioBlob(null);
    if (wavesurferRef.current) wavesurferRef.current.destroy();
    setDuration(0);
  };

  /* ================= SUBMIT ================= */
  const submit = async (e) => {
    e.preventDefault();
    if (!text.trim() && !file && !audioBlob) return;

    try {
      let imageUrl = "";
      let audioUrl = "";

      if (file) {
        const imgRes = await uploadImage(file);
        imageUrl = imgRes.data.imageUrl;
      }

      if (audioBlob) {
        const formData = new FormData();
        formData.append("audio", audioBlob);
        const audioRes = await uploadAudio(formData);
        audioUrl = audioRes.data.audioUrl;
      }

      await createPost({ text, image: imageUrl, audio: audioUrl });

      // Reset
      setText("");
      setFile(null);
      setPreview("");
      discardAudio();
      toast.success("Post sent!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send post");
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <form className="chat-input-container" onSubmit={submit}>
        {/* IMAGE PREVIEW */}
        {preview && (
          <div className="image-preview">
            <img src={preview} className="preview-img" />
            <button
              className="remove-btn"
              type="button"
              onClick={() => {
                setFile(null);
                setPreview("");
              }}
            >
              ✕
            </button>
          </div>
        )}

        {/* AUDIO PREVIEW / WAVEFORM */}
        {audioBlob && (
          <div className="audio-row">
            <div ref={waveformContainerRef} id="waveform" />
            <button onClick={discardAudio} type="button">
              <Trash2 size={16} />
            </button>
          </div>
        )}

        <div className="chat-input-inner">
          {/* HOLD TO RECORD */}
          <button
            type="button"
            className={`voice-btn ${recording ? "recording" : ""}`}
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onMouseMove={handleMove}
            onTouchStart={startRecording}
            onTouchEnd={stopRecording}
            onTouchMove={handleMove}
          >
            <Mic size={20} />
          </button>

          {/* TIMER */}
          {recording && (
            <span className="timer">
              {Math.floor(duration / 60)}:{String(duration % 60).padStart(2, "0")}
            </span>
          )}

          {/* IMAGE UPLOAD */}
          <label className="image-upload">
            <Image size={20} />
            <input hidden type="file" accept="image/*" onChange={handleFileChange} />
          </label>

          {/* TEXT */}
          <textarea
            className="chat-textarea"
            placeholder="Type a message…"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* SEND */}
          <button className="send-btn">
            <Send size={20} />
          </button>
        </div>
      </form>
    </>
  );
};

export default PostForm;
