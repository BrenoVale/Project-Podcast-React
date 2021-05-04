import { createContext, useState, ReactNode, useContext } from 'react'

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}
type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    playNext: () => void;
    playPrevious: () => void;
    togglePlay: () => void;
    toogleLoop: () => void;
    toogleShuffle: () => void;
    setPlayingState: (state: boolean) => void;
    clearPlayerState: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
}


export const PlayerContext = createContext({} as PlayerContextData)

type PlayerContextProviderProps = {
    children: ReactNode
}

export function PlayerContextProvider({children}: PlayerContextProviderProps) {

  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffiling] = useState(false);

  function play (episode: Episode) {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true);
  };

  function playList(list: Episode[], index: number) {
      setEpisodeList(list);
      setCurrentEpisodeIndex(index);
      setIsPlaying(true);
  }
  
  function togglePlay() {
    setIsPlaying(!isPlaying)
  }

  function toogleLoop() {
      setIsLooping(!isLooping)
  }

  function toogleShuffle() {
      setIsShuffiling(!isShuffling)
  }
  function setPlayingState(state: boolean) {
    setIsPlaying(state)
  }

  function clearPlayerState () {
    setEpisodeList([])
    setCurrentEpisodeIndex(0)
  }
  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = isShuffling || (currentEpisodeIndex+1) < episodeList.length;

  function playNext() {
   if (isShuffling) {
       const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
       setCurrentEpisodeIndex(nextRandomEpisodeIndex);
   } else if (hasNext) {
       setCurrentEpisodeIndex(currentEpisodeIndex + 1);
   }
  }
  
  function playPrevious () {
      if (hasPrevious) {
          setCurrentEpisodeIndex(currentEpisodeIndex -1)
      }
  }
  return (
      <PlayerContext.Provider value= {{ episodeList,
       currentEpisodeIndex, play, playNext, playPrevious, 
       isPlaying, isLooping, isShuffling, togglePlay, toogleLoop, toogleShuffle, 
       hasNext, hasPrevious,setPlayingState, playList, clearPlayerState}}>
          {children} 
      </PlayerContext.Provider> 
  )
}

export const usePlayer = () => {
    return useContext(PlayerContext);
}