const setSong = (song) => {
  return {
    type: "SET_SONG",
    song: song,
  };
};

const previousSong = () => {
  return {
    type: "PREVIOUS_SONG",
  };
};

const nextSong = () => {
  return {
    type: "NEXT_SONG",
  };
};

const addFav = (song) => {
  return {
    type: "ADD_FAVORITE",
    song: song,
  };
};

export { setSong, previousSong, nextSong, addFav };
