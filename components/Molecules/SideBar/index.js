import LinkNav from "../../Atoms/LinkNav";
import Link from "next/link";

export default function SideBar() {
  return (
    <nav className="h-fit md:h-full w-full md:w-96 bg-black md:p-8 px-2 py-6 float-left md:float-none">
      <Link href="/">
        <a className="flex justify-start float-left md:float-none">
          <img src="/img/logo.png" className="md:w-8 md:h-8 w-6 h-6 mr-3"></img>
          <h1 className="text-xl md:text-2xl w-fit font-bold">Music Page</h1>
        </a>
      </Link>

      <ul className="md:mt-16 flex md:block float-right md:float-none text-xl">
        <LinkNav href="/" name="Home" icon="icon-home3"></LinkNav>
        <LinkNav href="/search" name="Search" icon="icon-search"></LinkNav>
        <LinkNav href="/favorites" name="Favorites" icon="icon-heart"></LinkNav>
      </ul>
    </nav>
  );
}
