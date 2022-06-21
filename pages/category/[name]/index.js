import SongPreview from "../../../components/Molecules/SongPreview";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Category() {
  const router = useRouter();
  const { name } = router.query;

  const jsonUrl = "../../data.json";
  const [showSongs, setShowSongs] = useState();

  async function pullJson() {
    let songs = [];

    const response = await fetch(jsonUrl);
    const responseData = await response.json();

    const category = responseData.categories.find((el) => el.name == name);

    responseData.songs.map(function (song) {
      if (song.category === category.id) {
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
    setShowSongs(songs);
  }

  useEffect(() => {
    if (router.isReady) pullJson();
  }, [router.isReady]);

  return (
    <>
      <div className="md:p-8 p-3">
        <h1 className=" font-semibold mb-6 titleCat">{name} music</h1>
        <div className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-2  gap-6">
          {showSongs}
        </div>
      </div>

      <style jsx global>{`
        .titleCat {
          font-size: 60px;
        }

        @media (max-width: 768px) {
          .titleCat {
            font-size: 40px;
          }
        }
      `}</style>
    </>
  );
}
