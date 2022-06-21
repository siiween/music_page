import Link from "next/link";
export default function ArtistPreview({ img, name, idArtist }) {
  // url of the image
  const imageSrc = "artistImages/" + img;

  return (
    <Link href="/artist/[name]" as={`/artist/${name}`}>
      <a>
        <div className="w-full md:p-4 p-2 hover:bg-zinc-900 rounded-lg cursor-pointer">
          <img src={imageSrc} alt={name} className="rounded mb-2 md:mb-3"></img>
          <h2 className="text-white text-lg md:text-xl">{name}</h2>
        </div>
      </a>
    </Link>
  );
}
