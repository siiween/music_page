/* eslint-disable @next/next/no-img-element */
import { previousSong, nextSong } from "../../../store/music/action";
import SongsLists from "../../Molecules/SongsList";
import { connect } from "react-redux";
const maspStateToProps = (state) => {
  return {
    song: state.musicReducer.song,
  };
};

function MusicPlayer({ song, previousSong, nextSong }) {
  function reloadPlayer() {
    var audio = document.getElementById("musicPlayer");
    audio.load(); //call this to just preload the audio without playing
  }

  return (
    <>
      <SongsLists></SongsLists>
      <div className="w-full z-20 md:h-24 h-16 bg-neutral-900 fixed bottom-0 left-0 flex justify-center md:p-5 p-3">
        <img
          src={song.image}
          alt={song.name}
          className="h-full w-auto md:inline hidden"
        />
        <div className="w-auto ml-3 md:inline hidden">
          <p className="text-sm w-max  md:text-base ">
            {song.name} <br />
          </p>
          <p className="md:text-sm text-xs w-max text-zinc-400 ">
            {song.artist}
          </p>
        </div>

        <p className="my-auto ml-6 text-2xl text-zinc-600 cursor-pointer hover:text-red-600 md:inline hidden">
          <span className="icon-heart "></span>
        </p>

        <audio
          controls
          autoPlay
          loop
          className="md:mx-6 mx-0 w-full h-full my-auto"
          id="musicPlayer"
        >
          <source src={song.src} type="audio/mp3"></source>
          Your browser does not support the audio element.
        </audio>

        <p className="text-2xl md:text-3xl my-auto ml-3 mr-12">
          <span
            className="icon-previous mr-4 text-zinc-600 cursor-pointer hover:text-white"
            onClick={() => {
              previousSong(), reloadPlayer();
            }}
          ></span>
          <span
            className="icon-next text-zinc-600 cursor-pointer hover:text-white"
            onClick={() => {
              nextSong(), reloadPlayer();
            }}
          ></span>
        </p>
      </div>
    </>
  );
}

export default connect(maspStateToProps, { nextSong, previousSong })(
  MusicPlayer
);
