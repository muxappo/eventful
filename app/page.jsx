"use client";
import Link from "next/link";
import EventList from "./components/EventList";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-zinc-800 text-zinc-300">
      <header>
        <h1 className="text-6xl justify-center">Eventful.</h1>
      </header>
      <nav className="flex flex-col items-center justify-center mb-10 mt-5">
        <Link href={"/postevent"}>
          <button className="text-white border-white border-2 p-2 mb-1 hover:bg-white hover:text-black transition duration-300 active:bg-transparent active:text-white">
            Post Event
          </button>
        </Link>
        <p className="">{"(requires Google Sign-in)"}</p>
      </nav>
      <h2 className="mb-5 text-xl">Here's what's on:</h2>
      <div>
        <EventList />
      </div>
    </main>
  );
}
