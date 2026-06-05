import { useState, useRef, useEffect } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, Music, Plus, Trash2 } from 'lucide-react'
import './App.css'

interface Song {
  id: string
  title: string
  artist: string
  duration: number
  url: string
}

function App() {
  const [songs, setSongs] = useState<Song[]>([])
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(70)
  const audioRef = useRef<HTMLAudioElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const currentSong = songs[currentSongIndex]

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('audio/')) {
        const url = URL.createObjectURL(file)
        const newSong: Song = {
          id: Date.now().toString(),
          title: file.name.replace('.mp3', '').replace('.wav', '').replace('.m4a', ''),
          artist: 'Unknown Artist',
          duration: 0,
          url: url,
        }
        setSongs((prevSongs) => [...prevSongs, newSong])
      }
    })

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Remove song from playlist
  const removeSong = (id: string) => {
    setSongs((prevSongs) => prevSongs.filter((song) => song.id !== id))
    if (currentSongIndex >= songs.length - 1 && currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1)
    }
  }

  useEffect(() => {
    if (!currentSong) return

    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => {
      if (currentSongIndex < songs.length - 1) {
        setCurrentSongIndex(currentSongIndex + 1)
      } else {
        setIsPlaying(false)
        setCurrentTime(0)
      }
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [currentSongIndex, songs])

  useEffect(() => {
    if (isPlaying && currentSong) {
      audioRef.current?.play()
    } else {
      audioRef.current?.pause()
    }
  }, [isPlaying, currentSong])

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handlePrevious = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1)
      setCurrentTime(0)
    }
  }

  const handleNext = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1)
      setCurrentTime(0)
    }
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }
  }

  return (
    <div className="app">
      <audio ref={audioRef} src={currentSong?.url} />

      {/* Header with Logo */}
      <div className="header">
        <div className="logo-container">
          <div className="app-logo">🎵</div>
          <h1 className="app-title">Music Forever</h1>
        </div>
      </div>

      <div className="player-container">
        {/* Player Card */}
        <div className="player-card">
          {/* Album Art */}
          <div className="album-art">
            <div className="album-image">
              {currentSong ? (
                <div className="music-note-animate">♫</div>
              ) : (
                <Music size={80} />
              )}
            </div>
          </div>

          {/* Song Info */}
          <div className="song-info">
            {currentSong ? (
              <>
                <h2 className="song-title">{currentSong.title}</h2>
                <p className="artist-name">{currentSong.artist}</p>
              </>
            ) : (
              <>
                <h2 className="song-title">No Song Selected</h2>
                <p className="artist-name">Add MP3 files to get started</p>
              </>
            )}
          </div>

          {/* Progress Bar */}
          {currentSong && (
            <div className="progress-container">
              <span className="time">{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleProgressChange}
                className="progress-bar"
              />
              <span className="time">{formatTime(duration)}</span>
            </div>
          )}

          {/* Controls */}
          <div className="controls">
            <button
              className="control-btn"
              onClick={handlePrevious}
              disabled={!currentSong || currentSongIndex === 0}
            >
              <SkipBack size={24} />
            </button>

            <button
              className="control-btn play-btn"
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={!currentSong}
            >
              {isPlaying ? <Pause size={32} /> : <Play size={32} />}
            </button>

            <button
              className="control-btn"
              onClick={handleNext}
              disabled={!currentSong || currentSongIndex === songs.length - 1}
            >
              <SkipForward size={24} />
            </button>
          </div>

          {/* Volume Control */}
          {currentSong && (
            <div className="volume-container">
              <Volume2 size={20} />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider"
              />
              <span className="volume-value">{volume}%</span>
            </div>
          )}
        </div>

        {/* Add Music Button */}
        <div className="add-music-section">
          <button
            className="add-music-btn"
            onClick={() => fileInputRef.current?.click()}
          >
            <Plus size={24} />
            <span>Add MP3 Files</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="audio/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </div>

        {/* Playlist */}
        {songs.length > 0 && (
          <div className="playlist">
            <h2>My Playlist ({songs.length})</h2>
            <div className="playlist-items">
              {songs.map((song, index) => (
                <div
                  key={song.id}
                  className={`playlist-item ${
                    index === currentSongIndex ? 'active' : ''
                  }`}
                >
                  <div
                    className="playlist-content"
                    onClick={() => {
                      setCurrentSongIndex(index)
                      setCurrentTime(0)
                      setIsPlaying(true)
                    }}
                  >
                    <div className="playlist-number">{index + 1}</div>
                    <div className="playlist-info">
                      <p className="playlist-title">{song.title}</p>
                      <p className="playlist-artist">{song.artist}</p>
                    </div>
                    <span className="playlist-duration">
                      {formatTime(duration && index === currentSongIndex ? duration : 0)}
                    </span>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeSong(song.id)
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {songs.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🎵</div>
            <h3>Your playlist is empty</h3>
            <p>Click "Add MP3 Files" to start building your music collection</p>
          </div>
        )}
      </div>

      {/* Decorative Flowers */}
      <div className="flower flower-1">🌸</div>
      <div className="flower flower-2">🌼</div>
      <div className="flower flower-3">🌺</div>
      <div className="flower flower-4">🌸</div>
    </div>
  )
}

export default App
