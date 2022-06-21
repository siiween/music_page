const initialState = {
  song: {
    name: "badtrip :(",
    artist: "Mora",
    src: "/songs/microdosis/badTrip.mp3",
    image: "/albumImages/microdosis.jpg",
  },
  record: [
    {
      name: "badtrip :(",
      artist: "Mora",
      src: "/songs/microdosis/badTrip.mp3",
      image: "/albumImages/microdosis.jpg",
    },
  ],
  position: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_SONG":
      const newImage = action.song.image.includes("/albumImages/")
        ? action.song.image
        : "/albumImages/" + action.song.image;
      const newSrc = action.song.url.includes("/songs/")
        ? action.song.url
        : "/songs/" + action.song.url;

      const newSong = {
        name: action.song.name,
        artist: action.song.artist,
        image: newImage,
        src: newSrc,
      };

      let exists = false;

      state.record.find((object) => {
        if (object.name === newSong.name) {
          exists = true;
        }
      });

      if (!exists) {
        state.position++;
        state.record.splice(state.position, 0, newSong);
      }

      return {
        ...state,
        song: newSong,
        record: state.record,
      };

    case "PREVIOUS_SONG":
      const positionPreviusSong = state.position == 0 ? 0 : state.position - 1;
      state.position == 0 ? 0 : state.position--;
      return {
        ...state,
        song: state.record[positionPreviusSong],
      };

    case "NEXT_SONG":
      if (state.position != state.record.length - 1) {
        state.position++;
      }

      return {
        ...state,
        song: state.record[state.position],
      };

    default:
      return state;
  }
};
