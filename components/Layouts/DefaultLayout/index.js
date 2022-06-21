import Link from "next/link";
import Head from "next/head";
import SideBar from "../../Molecules/SideBar";
import MusicPlayer from "../../Organisms/MusicPlayer";
export default function DefaultLayout({ children }) {
  return (
    <>
      <Head>
        <title>Music Page</title>
      </Head>

      <main className="mainContainer md:flex md:justify-center text-gray-50 ">
        <SideBar></SideBar>
        <div className="h-full w-full bg-black overflow-y-scroll  mb-8">
          {children}
        </div>
        <MusicPlayer></MusicPlayer>
      </main>

      <style jsx>{`
        .mainContainer {
          height: calc(100vh - 96px);
        }

        @media (max-width: 768px) {
          .mainContainer {
            height: auto;
            padding-bottom: 64px;
          }
        }
      `}</style>
    </>
  );
}
