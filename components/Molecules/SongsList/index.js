import { connect } from "react-redux";
import Song from "../../Atoms/Song";
import { useState } from "react";

const maspStateToProps = (state) => {
  return {
    record: state.musicReducer.record,
  };
};

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
    setShowSongs(songs.reverse());
  }

  function closeList() {
    var list = document.getElementById("songsList");
    list.classList.remove("active");
  }

  function openList() {
    pullSongs();
    var list = document.getElementById("songsList");
    list.classList.add("active");
  }

  return (
    <>
      <div
        className="fixed bottom-5 md:bottom-8 z-30 right-3 md:right-5"
        onClick={() => openList()}
      >
        <span
          className="icon-list2 text-xl md:text-3xl text-zinc-600 cursor-pointer hover:text-white"
          onClick={() => openList()}
        ></span>
      </div>

      <div
        className="songsListDiv fixed bg-black z-10 overflow-y-scroll text-white lg:p-12 p-4"
        id="songsList"
      >
        <p
          onClick={() => closeList()}
          className="text-3xl mb-5 text-right cursor-pointer text-zinc-400 hover:text-white"
        >
          <span className="icon-cancel-circle"></span>
        </p>
        <h1 className="text-2xl md:text-4xl mb-5 font-bold">Songs on hold</h1>
        {showSongs}
      </div>

      <style jsx>{`
        .songsListDiv {
          height: calc(100vh - 96px);
          right: 0;
          bottom: -100vh;
          width: calc(100vw - 18rem);
          transition: 1s;
        }

        .songsListDiv.active {
          bottom: 96px;
          transition: 1s;
        }

        @media (max-width: 768px) {
          .songsListDiv.active {
            bottom: 64px;
            transition: 1s;
          }
          .songsListDiv {
            height: calc(100% - 64px);
            width: calc(100%);
          }
        }
      `}</style>
    </>
  );
}

export default connect(maspStateToProps, {})(SongsLists);
