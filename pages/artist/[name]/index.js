import SongPreview from "../../../components/Molecules/SongPreview";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Artist() {
  const router = useRouter();
  const { name } = router.query;

  const jsonUrl = "../../data.json";
  const [showArtist, setShowArtist] = useState();
  const [showSongs, setShowSongs] = useState();

  async function pullJson() {
    let songs = [];

    const response = await fetch(jsonUrl);
    const responseData = await response.json();

    const singerData = responseData.artists.find((el) => el.name == name);
    const newImage = "/artistImages/" + singerData.image;

    const singer = (
      <div className="w-full h-auto relative ">
        <img src={newImage} className="w-full h-auto "></img>
        <div className="w-full h-full top-0 left-0 absolute gradiente"></div>
        <h1 className="text-3xl md:text-4xl font-bold absolute md:bottom-14 bottom-10 md:left-10 left-4 drop-shadow-lg">
          {name}
        </h1>
      </div>
    );

    responseData.songs.map(function (song) {
      if (song.artist === singerData.id) {
        const image = responseData.albums.find(
          (el) => el.id == song.album
        ).image;

        songs.push(
          <SongPreview
            key={song.id}
            img={image}
            name={song.title}
            artist={name}
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
    if (router.isReady) pullJson();
  }, [router.isReady]);

  return (
    <>
      {showArtist}
      <div className="md:p-8 p-3">
        <h1 className="text-xl md:text-2xl font-semibold mb-6">
          Top songs of {name}
        </h1>
        <div className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-2  gap-6">
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
