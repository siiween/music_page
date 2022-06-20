import SongPreview from "../../../components/Molecules/SongPreview";
import ArtistPreview from "../../../components/Molecules/ArtistPreview";
import CategoryPreview from "../../../components/Atoms/CategoryPreview";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Artist() {
  const router = useRouter();
  const { name } = router.query;

  const jsonUrl = "../../data.json";
  const [showArtist, setShowArtist] = useState();
  const [showSongs, setShowSongs] = useState();

  let songs = [];

  async function pullJson() {
    const response = await fetch(jsonUrl);
    const responseData = await response.json();

    let singer, newImage, singerId;

    responseData.artists.map(function (artist) {
      if (artist.name.includes(name)) {
        newImage = "/artistImages/" + artist.image;
        singerId = artist.id;
        singer = (
          <div className="w-full h-auto relative ">
            <img src={newImage} className="w-full h-auto "></img>
            <div className="w-full h-full top-0 left-0 absolute gradiente"></div>
            <h1 className="text-2xl md:text-4xl font-bold absolute bottom-14 left-10 drop-shadow-lg">
              {name}
            </h1>
          </div>
        );
      }
    });

    songs = responseData.songs.map(function (song) {
      if (song.artist === singerId) {
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

    setShowArtist(singer);
    setShowSongs(songs);
  }

  useEffect(() => {
    pullJson();
  }, []);

  return (
    <>
      {showArtist}
      <div className="md:p-8 p-3">
        <h1 className="text-xl md:text-2xl font-semibold">
          Top songs of {name}
        </h1>
        <div className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-2 lg:gap-5 gap-4">
          {showSongs}
        </div>
      </div>

      <style jsx global>{`
        .gradiente {
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0),
            rgba(0, 0, 0, 1)
          );
        }
      `}</style>
    </>
  );
}
