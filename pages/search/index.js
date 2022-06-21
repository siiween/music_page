import SongPreview from "../../components/Molecules/SongPreview";
import ArtistPreview from "../../components/Atoms/artistPreview";
import CategoryPreview from "../../components/Atoms/CategoryPreview";
import { useEffect, useState } from "react";

export default function Search() {
  const jsonUrl = "../data.json";
  const [showCategories, setShowCategories] = useState();
  const [showArtists, setShowArtists] = useState();
  const [showSongs, setShowSongs] = useState();
  const [noResults, setNoResults] = useState();

  let categories = [],
    artists = [],
    songs = [],
    query = "",
    result = [];

  async function pullJson() {
    if (query != "") {
      const response = await fetch(jsonUrl);
      const responseData = await response.json();

      responseData.categories.map(function (category) {
        if (category.name.toLowerCase().includes(query.toLowerCase())) {
          categories.push(
            <CategoryPreview
              key={category.id}
              name={category.name}
            ></CategoryPreview>
          );
        }
      });

      responseData.artists.map(function (artist) {
        if (artist.name.toLowerCase().includes(query.toLowerCase()))
          artists.push(
            <ArtistPreview
              key={artist.id}
              idArtist={artist.id}
              img={artist.image}
              name={artist.name}
            ></ArtistPreview>
          );
      });

      responseData.songs.map(function (song) {
        if (song.title.toLowerCase().includes(query.toLowerCase())) {
          const image = responseData.albums.find(
            (el) => el.id == song.album
          ).image;

          const artist = responseData.artists.find(
            (el) => el.id == song.artist
          ).name;

          songs.push(
            <SongPreview
              key={song.id}
              img={image}
              name={song.title}
              artist={artist}
              duration={song.duration}
              songUrl={song.src}
            ></SongPreview>
          );
        }
      });

      if (categories == "" && artists == "" && songs == "") {
        result = (
          <div className="lg:w-2/5 w-3/5 mx-auto py-6">
            <h1 className="text-2xl md:text-3xl mb-2 font-bold text-center">
              No results found
            </h1>
            <h2 className="text-zinc-500 text-xl text-center lg:mb-12 mb-6">
              Try other keywords
            </h2>
            <img
              src="img/noResults2.svg"
              className="w-full"
              alt="No results"
            ></img>
          </div>
        );
      }
    } else {
      categories = [];
      artists = [];
      songs = [];
      result = (
        <div className="lg:w-2/5 w-3/5 mx-auto py-6">
          <h1 className="text-2xl md:text-3xl mb-2 font-bold text-center">
            You haven't written anything yet
          </h1>
          <h2 className="text-zinc-500 text-xl text-center lg:mb-12 mb-6">
            what are you waiting for?
          </h2>
          <img
            src="img/noResults.svg"
            className="w-full"
            alt="No results"
          ></img>
        </div>
      );
    }

    setShowCategories(categories);
    setShowArtists(artists);
    setShowSongs(songs);
    setNoResults(result);
  }

  const handleChange = (e) => {
    query = e.target.value;
    pullJson();
  };

  useEffect(() => {
    pullJson();
  }, []);

  return (
    <div className="md:p-8 p-3">
      <div className="flex justify-center mb-12">
        <input
          type="text"
          className="w-full px-4 py-6 bg-neutral-900 text-xl focus:outline-hidden"
          placeholder="Search music"
          onChange={handleChange}
        ></input>
        <div className="bg-neutral-900 text-3xl text-zinc-500 px-4 py-6 text-center">
          <span className="icon-search"></span>
        </div>
      </div>

      {noResults}

      {showCategories != "" ? (
        <>
          <h1 className="text-2xl md:text-4xl mb-5  mt-12 font-bold">
            Categories
          </h1>
          <div className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-2 lg:gap-5 gap-4 mb-5">
            {showCategories}
          </div>
        </>
      ) : (
        ""
      )}

      {showArtists != "" ? (
        <>
          <h1 className="text-2xl md:text-4xl mb-5  mt-12 font-bold">
            Artists
          </h1>
          <div className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-2 lg:gap-5 gap-4 mb-5">
            {showArtists}
          </div>
        </>
      ) : (
        ""
      )}

      {showSongs != "" ? (
        <>
          <h1 className="text-2xl md:text-4xl mb-5  mt-12 font-bold">Songs</h1>
          <div className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-2  gap-6">
            {showSongs}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
