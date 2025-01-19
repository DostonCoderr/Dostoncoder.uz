"use client";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Music } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// Modal component for selecting music
const Modal = ({ isOpen, onClose, onSelectTrack, tracks }) => {
  if (!isOpen) return null;

  return createPortal(
    <div  className="fixed inset-0 bg-gradient-to-br from-black/80 via-gray-900/70 to-gray-800/60 backdrop-blur-lg flex items-center justify-center z-50">
     <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6 rounded-2xl shadow-2xl text-center space-y-4 w-80 border border-gray-700/60">
       <h2 className="text-2xl font-bold text-indigo-600 uppercase tracking-tight">Choose Music</h2>

        <ul className="space-y-2">
          {tracks.map((track, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  onSelectTrack(track);
                  onClose();
                }}
                className="w-full py-2 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-md transition-all duration-300"
              >
                {track.replace("/audio/", "").replace(".mp3", "")}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="py-2 px-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-lg hover:shadow-md transition-all duration-300"
        >
          Close
        </button>
      </div>
    </div>,
    document.getElementById("my-modal")
  );
};

// Main Sound component
const Sound = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState("/audio/Fe!n.mp3"); // Default track

  const handleFirstUserInteraction = () => {
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    }

    ["click", "keydown", "touchstart"].forEach((event) =>
      document.removeEventListener(event, handleFirstUserInteraction)
    );
  };

  useEffect(() => {
    // Start playing default music on first interaction
    ["click", "keydown", "touchstart"].forEach((event) =>
      document.addEventListener(event, handleFirstUserInteraction)
    );

    return () => {
      ["click", "keydown", "touchstart"].forEach((event) =>
        document.removeEventListener(event, handleFirstUserInteraction)
      );
    };
  }, []);

  const togglePlayback = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const changeTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    audioRef.current.src = track;
    audioRef.current.play();
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex space-x-4">
      {/* Music Toggle Button */}
      <motion.button
        onClick={togglePlayback}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        className="w-10 h-10 xs:w-14 xs:h-14 text-foreground rounded-full flex items-center justify-center cursor-pointer z-50 p-2.5 xs:p-4 bg-gray-800 hover:bg-gray-700"
        aria-label={"Sound control button"}
        name={"Sound control button"}
      >
        {isPlaying ? (
          <Volume2 className="w-full h-full text-white" strokeWidth={1.1} />
        ) : (
          <VolumeX className="w-full h-full text-white" strokeWidth={1.1} />
        )}
      </motion.button>

      {/* Open Modal Button */}
      <motion.button
        onClick={() => setIsModalOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        className="w-10 h-10 xs:w-14 xs:h-14 text-foreground rounded-full flex items-center justify-center cursor-pointer z-50 p-2.5 xs:p-4 bg-gray-800 hover:bg-gray-700"
        aria-label={"Open music selection modal"}
        name={"Open music selection modal"}
      >
        <Music className="w-full h-full text-white" strokeWidth={1.1} />
      </motion.button>

      {/* Modal for track selection */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectTrack={changeTrack}
        tracks={[
          "/audio/Fe!n.mp3",
          "/audio/Nejno.mp3",
          "/audio/Патрон.mp3",
          "/audio/Колизей.mp3"
        ]}
      />

      {/* Audio Element */}
      <audio ref={audioRef} loop>
        <source src={currentTrack} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Sound;
