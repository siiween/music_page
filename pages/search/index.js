import SongPreview from "../../components/Molecules/SongPreview";
import ArtistPreview from "../../components/Molecules/ArtistPreview";
import CategoryPreview from "../../components/Atoms/CategoryPreview";
import { useEffect, useState } from "react";

export default function Search() {
  const jsonUrl = "../data.json";
  const [showCategories, setShowCategories] = useState();
  const [showArtists, setShowArtists] = useState();
  const [showSongs, setShowSongs] = useState();

  let categories = [],
    artists = [],
    songs = [],
    query = "";

  async function pullJson() {
    if (query != "") {
      const response = await fetch(jsonUrl);
      const responseData = await response.json();

      categories = responseData.categories.map(function (category) {
        if (category.name.toLowerCase().includes(query.toLowerCase()))
          return (
            <CategoryPreview
              key={category.id}
              name={category.name}
            ></CategoryPreview>
          );
      });

      artists = responseData.artists.map(function (artist) {
        if (artist.name.toLowerCase().includes(query.toLowerCase()))
          return (
            <ArtistPreview
              key={artist.id}
              idArtist={artist.id}
              img={artist.image}
              name={artist.name}
            ></ArtistPreview>
          );
      });

      songs = responseData.songs.map(function (song) {
        if (song.title.toLowerCase().includes(query.toLowerCase())) {
          const image = responseData.albums.find(
            (el) => el.id == song.album
          ).image;

          const artist = responseData.artists.find(
            (el) => el.id == song.artist
          ).name;

          return (
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
    } else {
      categories = [];
      artists = [];
      songs = [];
    }

    setShowCategories(categories);
    setShowArtists(artists);
    setShowSongs(songs);
  }

  const handleChange = (e) => {
    query = e.target.value;
    pullJson();
  };
  useEffect(() => {});

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

      <div className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-2 lg:gap-5 gap-4 mb-5">
        {showCategories}
      </div>
      <div className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-2 lg:gap-5 gap-4 mb-5">
        {showArtists}
      </div>
      <div className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-2  gap-6">
        {showSongs}
      </div>
    </div>
  );
}
