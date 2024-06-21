"use client";
import { useState } from "react";
import { handleSignIn, addEventToDb } from "../firebase/fb_requests";
import { addEventToUserCalendar } from "../utils";
import Link from "next/link";

export default function EventForm() {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [desc, setDesc] = useState("");

  function clearFields() {
    setTitle("");
    setStartTime("");
    setEndTime("");
  }

  async function handleSignInAndAddEvent() {
    try {
      const accessToken = await handleSignIn();
      const response = await addEventToUserCalendar(
        title,
        startTime,
        endTime,
        desc,
        accessToken
      );
      const data = await response.json();

      if (response.ok) {
        await addEventToDb(data);
        console.log("Event added to calendar and Firestore successfully");
      } else {
        console.error("Failed to add event to calendar or Firestore");
      }
    } catch (error) {
      console.error("Error signing in or adding event:", error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await handleSignInAndAddEvent();

    clearFields();
  }

  return (
    <div className="flex justify-center w-full">
      <main
        className={
          "flex flex-col items-center justify-center bg-zinc-800 border-white border-b-2 py-6 m-4 xl:w-1/3"
        }
      >
        <header className="flex border-t-2 border-white w-full justify-center pt-4 px-4">
          <h1 className="text-6xl">Event Details</h1>
        </header>
        <form
          className={
            "flex flex-col items-start justify-center w-full mt-5 space-y-1.5 px-4 pt-4 border-t-2 border-white"
          }
          onSubmit={handleSubmit}
        >
          <label id="input">
            Title:
            <input
              className={"text-black"}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label id="input">
            Start Time:
            <input
              className={"text-black"}
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </label>
          <label id="input">
            End Time:
            <input
              className={"text-black"}
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </label>
          <label id="input" className="w-full">
            Description:
            <textarea
              rows={6}
              className={"text-black w-3/4 mb-2"}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </label>
          <nav className="flex justify-between w-full">
            <button
              className={
                "border-white border-2 py-2 px-3 hover:bg-white hover:text-black active:bg-transparent active:text-white transition duration-300"
              }
              type="submit"
            >
              Add Event
            </button>
            <Link href={"/"}>
              <button
                className={
                  "border-white border-2 py-2 px-3 hover:bg-white hover:text-black active:bg-transparent active:text-white transition duration-300"
                }
                type="submit"
              >
                Go Back
              </button>
            </Link>
          </nav>
        </form>
      </main>
    </div>
  );
}
