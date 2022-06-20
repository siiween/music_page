export default function CategoryPreview({ name }) {
  // url of the image
  return (
    <div className="w-full md:p-4 p-2 hover:bg-zinc-800 bg-zinc-900 cursor-pointer border-l-8 border-pink-800 ">
      <h2 className="text-white text-lg md:text-xl text-ellipsis overflow-hidden">
        {name}
      </h2>
    </div>
  );
}
