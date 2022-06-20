import { connect } from "react-redux";
import Song from "../../Atoms/Song";
import { useEffect, useState } from "react";

const maspStateToProps = (state) => {
  return {
    record: state.musicReducer.record,
  };
};

function closeList() {
  var list = document.getElementById("songsList");
  list.style.display = "none";
}

function SongsLists({ record }) {
  const [showSongs, setShowSongs] = useState([]);
  let songs;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function pullSongs() {
    songs = record.map(function (song) {
      return (
        <Song
          key={song.name}
          img={song.image}
          name={song.name}
          artist={song.artist}
          songUrl={song.src}
        ></Song>
      );
    });
    setShowSongs(songs);
  }
  useEffect(() => {
    console.log(record);
    pullSongs();
  }, [record]);

  return (
    <>
      <div
        className="w-full fixed bg-neutral-900 z-10 h-3/5 md:bottom-24 bottom-16 left-0 overflow-y-scroll text-white lg:p-12 p-4  hidden"
        id="songsList"
      >
        <p
          onClick={() => closeList()}
          className="text-2xl mb-5 text-right cursor-pointer text-zinc-400 hover:text-white"
        >
          <span className="icon-cancel-circle"></span>
        </p>
        <h1 className="text-2xl md:text-4xl mb-5 font-bold">Songs on hold</h1>
        {showSongs}
      </div>
    </>
  );
}

export default connect(maspStateToProps, {})(SongsLists);
