import { useRouter } from "next/router";

export default function LinkNav({ name, href, icon }) {
  const router = useRouter();
  const style = {
    color: router.asPath === href ? "#fff" : "rgb(113 113 122)",
  };

  function closeList() {
    var list = document.getElementById("songsList");
    list.classList.remove("active");
  }

  const handleClick = (e) => {
    e.preventDefault();
    closeList();
    router.push(href);
  };

  const classes = (icon += " md:mr-3 text-xl md:text-3xl");

  return (
    <li
      className="text-zinc-500 md:mb-6 cursor-pointer hover:text-white md:mr-0 mr-4"
      style={style}
    >
      <a href={href} onClick={handleClick}>
        <span className={classes}></span>
        <span className="md:inline hidden">{name}</span>
      </a>
    </li>
  );
}
