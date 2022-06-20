const initialState = {
  song: {
    name: "badtrip :(",
    artist: "Mora",
    src: "/songs/microdosis/badTrip.mp3",
    image: "/albumImages/microdosis.jpg",
  },
  position: 0,
  record: [
    {
      name: "badtrip :(",
      artist: "Mora",
      src: "/songs/microdosis/badTrip.mp3",
      image: "/albumImages/microdosis.jpg",
    },
  ],
};

// eslint-disable-next-line import/no-anonymous-default-export
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

      state.position++;

      if (!exists) {
        state.record.splice(state.position, 0, newSong);
      }

      return {
        ...state,
        song: newSong,
      };

    case "PREVIOUS_SONG":
      const positionPreviusSong = state.position == 0 ? 0 : state.position - 1;
      state.position == 0 ? 0 : state.position--;
      return {
        ...state,
        song: state.record[positionPreviusSong],
      };

    case "NEXT_SONG":
      const positionNextSong =
        state.position == state.record.length - 1
          ? state.position
          : state.position + 1;

      state.position == state.record.length - 1
        ? state.position
        : state.position++;

      console.log(state.position);
      console.log(state.record);
      return {
        ...state,
        song: state.record[positionNextSong],
      };

    default:
      return state;
  }
};
