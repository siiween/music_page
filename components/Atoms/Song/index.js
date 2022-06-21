import { setSong } from "../../../store/music/action";
import { connect } from "react-redux";

const maspStateToProps = (state) => {
  return {
    song: state.musicReducer.song,
    favorites: state.musicReducer.favorites,
  };
};

function Song({ img, name, artist, songUrl, setSong, song, favorites }) {
  function reloadPlayer() {
    var audio = document.getElementById("musicPlayer");
    audio.load(); //call this to play the song right away
  }

  const style = {
    border:
      name === song.name
        ? "2px solid rgb(157 23 77)"
        : "2px solid rgb(39 39 42)",
  };

  let isIn = favorites.find((el) => el.name == name) ? true : false;

  const favoriteColor = {
    color: isIn === true ? "rgb(220 38 38)" : "rgb(82 82 91)",
  };

  return (
    <>
      <div
        className="bg-neutral-800 rounded px-6 py-4 mb-5 flex justify-start hover:bg-zinc-800 cursor-pointer "
        style={style}
        onClick={() => {
          setSong({ name: name, artist: artist, url: songUrl, image: img }),
            reloadPlayer();
        }}
      >
        <img src={img} className="h-16 w-16"></img>
        <div className="w-full ml-3">
          <p className="text-base w-max  md:text-2xl ">
            {name} <br />
          </p>
          <p className="md:text-base text-sm w-max text-zinc-400 ">{artist}</p>
        </div>
        <p></p>
        <p
          className="my-auto ml-6 text-2xl  cursor-pointer hover:text-red-600"
          style={favoriteColor}
        >
          <span className="icon-heart "></span>
        </p>
      </div>
    </>
  );
}

export default connect(maspStateToProps, { setSong })(Song);
