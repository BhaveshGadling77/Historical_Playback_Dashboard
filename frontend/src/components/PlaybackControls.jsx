import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

const PlaybackControls = ({
  isPlaying,
  togglePlay,
  reset,
  skipEnd,
  speed,
  setSpeed,
  index,
  setIndex,
  maxIndex,
}) => (
  <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
    <div className="flex justify-center gap-4 mb-4">
      <button onClick={reset} className="bg-gray-700 p-3 hover:cursor-pointer rounded-lg">
        <SkipBack />
      </button>

      <button onClick={togglePlay} className="bg-blue-600 hover:cursor-pointer p-4 rounded-lg">
        {isPlaying ? <Pause /> : <Play />}
      </button>

      <button onClick={skipEnd} className="bg-gray-700 hover:cursor-pointer p-3 rounded-lg">
        <SkipForward />
      </button>
    </div>

    <label className="block text-sm text-gray-400 mb-2">
      Playback Speed: {speed}ms
    </label>
    <input
      type="range"
      min="100"
      max="2000"
      step="100"
      value={speed}
      onChange={(e) => setSpeed(+e.target.value)}
      className="w-full mb-4"
    />

    <label className="block text-sm text-gray-400 mb-2">Timeline</label>
    <input
      type="range"
      min="0"
      max={maxIndex}
      value={index}
      onChange={(e) => setIndex(+e.target.value)}
      className="w-full"
    />
  </div>
);

export default PlaybackControls;
