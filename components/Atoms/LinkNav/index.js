import { useRouter } from "next/router";

export default function LinkNav({ name, href, icon }) {
  const router = useRouter();
  const style = {
    color: router.asPath === href ? "#fff" : "rgb(113 113 122)",
  };

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  const classes = (icon += " mr-3 text-xl md:text-3xl");

  return (
    <li
      className="text-zinc-500 md:mb-6 cursor-pointer hover:text-white"
      style={style}
    >
      <a href={href} onClick={handleClick}>
        <span className={classes}></span>
        <span className="md:inline hidden">{name}</span>
      </a>
    </li>
  );
}
