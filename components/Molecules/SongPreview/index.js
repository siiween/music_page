import { setSong } from "../../../store/music/action";
import { connect } from "react-redux";

function reloadPlayer() {
  var audio = document.getElementById("musicPlayer");
  audio.load(); //call this to just preload the audio without playing
  audio.play(); //call this to play the song right away
}

function SongPreview({ img, name, artist, duration, songUrl, setSong }) {
  // duration of the song in minutes and seconds
  const min = Math.trunc(duration / 60);
  let sec = duration % 60;
  if (sec <= 9) sec = "0" + sec;
  // url os the image
  const imageSrc = "/albumImages/" + img;

  return (
    <div
      className="w-full md:p-4 p-2 hover:bg-zinc-900 rounded-lg cursor-pointer "
      onClick={() => {
        setSong({ name: name, artist: artist, url: songUrl, image: img }),
          reloadPlayer();
      }}
    >
      <img src={imageSrc} alt={name} className="rounded mb-2 md:mb-3"></img>

      <h2 className="text-white xl:text-xl lg:text-md text-base">{name}</h2>
      <h3 className="text-zinc-400 md:text-xl text-sm">
        {artist}
        <span className="md:text-base text-xs">
          {" "}
          - {min}:{sec}
        </span>
      </h3>
    </div>
  );
}

export default connect(null, { setSong })(SongPreview);
