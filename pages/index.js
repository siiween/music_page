import SongPreview from "../components/Molecules/SongPreview";
import ArtistPreview from "../components/Atoms/ArtistPreview";
import CategoryPreview from "../components/Atoms/CategoryPreview";
import { useEffect, useState } from "react";
let numberOfSongs = 15;
let categories, artists, songs;
let showButton = {
  display: "inline",
};

export default function Home() {
  const jsonUrl = "/data.json";
  const [showCategories, setShowCategories] = useState([]);
  const [showArtists, setShowArtists] = useState([]);
  const [showSongs, setShowSongs] = useState([]);

  function shuffle(arr) {
    var i, j, temp;
    for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  async function moreSongs() {
    numberOfSongs += 15;
    pullJson();
  }

  async function pullJson() {
    const response = await fetch(jsonUrl);
    const responseData = await response.json();

    categories = responseData.categories.map(function (category) {
      return (
        <CategoryPreview
          key={category.id}
          name={category.name}
        ></CategoryPreview>
      );
    });

    artists = responseData.artists.map(function (artist) {
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
      const image = responseData.albums.find((el) => el.id == song.album).image;

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
    });

    showButton = {
      display: numberOfSongs >= songs.length ? "none" : "inline",
    };

    setShowCategories(categories);
    setShowArtists(artists);
    setShowSongs(songs.slice(0, numberOfSongs));
  }

  useEffect(() => {
    pullJson();
  }, []);

  return (
    <div className="md:p-8 p-3">
      <h1 className="text-2xl md:text-4xl mb-5 font-bold">Categories</h1>
      <div className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-2 lg:gap-5 gap-4 mb-12">
        {showCategories}
      </div>
      <h1 className="text-2xl md:text-4xl mb-5  mt-12 font-bold">
        Top Artists
      </h1>
      <div className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-2 lg:gap-5 gap-3 mb-12">
        {showArtists}
      </div>
      <h1 className="text-2xl md:text-4xl mb-5 mt-12 font-bold">Top Songs</h1>
      <div className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-6">
        {showSongs}
      </div>

      <div className="w-full text-center mt-12">
        <button
          style={showButton}
          className="px-5 py-3 bg-pink-700 hover:bg-pink-800"
          onClick={() => moreSongs()}
        >
          More Songs
        </button>
      </div>
    </div>
  );
}
