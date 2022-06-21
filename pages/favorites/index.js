import SongPreview from "../../components/Molecules/SongPreview";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";

const maspStateToProps = (state) => {
  return {
    favorites: state.musicReducer.favorites,
  };
};

function Favorites({ favorites }) {
  const [showSongs, setShowSongs] = useState([]);
  let songs;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function pullSongs() {
    songs = favorites.map(function (song) {
      return (
        <SongPreview
          key={song.name}
          img={song.image}
          name={song.name}
          artist={song.artist}
          songUrl={song.src}
        ></SongPreview>
      );
    });
    setShowSongs(songs);
  }

  useEffect(() => {
    pullSongs();
  }, []);

  return (
    <>
      <div className=" w-full md:p-8 p-3 h-screen md:flex md:justify-end">
        <div className="md:w-1/4 md:fixed md:top-0 md:left-64 md:p-12  w-full ">
          <div className="w-full xl:h-56 lg:h-48 mg:h-36 h-24 gradiente relative">
            <div className="iconFavs absolute">
              <span className="icon-heart "></span>
            </div>
          </div>
          <h1 className="text-2xl lg:text-3xl xl:text-5xl font-bold drop-shadow-lg mt-5 mb-5">
            Your Favorites Songs
          </h1>
        </div>

        <div className="md:w-3/4 w-full">
          <div className="grid xl:grid-cols-3 grid-cols-2  gap-6">
            {showSongs}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .gradiente {
          background: linear-gradient(
            to bottom,
            rgba(220, 38, 38, 1),
            rgba(0, 0, 0, 0.1)
          );
        }
        .iconFavs {
          font-size: 60px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </>
  );
}

export default connect(maspStateToProps, {})(Favorites);
