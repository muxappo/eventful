import moment from "moment";
import { addEventToUserCalendar } from "../utils";
import { handleSignIn } from "../firebase/fb_requests";
import Image from "next/image";
import { useState } from "react";

export default function EventCard({
  eventId,
  title,
  description,
  startTime,
  endTime,
}) {
  const [imgSrc, setImgSrc] = useState(`/event_images/${title}.png`);

  return (
    <li
      className={"border-white flex flex-col items-center p-4"}
      key={eventId ? eventId : Math.random()}
    >
      <h2 className="border-white border-b-2 text-xl mb-2">{title}</h2>
      <Image
        src={imgSrc}
        alt={`${title} image`}
        width={400}
        height={300}
        onError={() => {
          setImgSrc("/event_images/default.png");
        }}
      />
      <p className="text-center my-2 py-2 border-y-2 border-white">
        {description}
      </p>
      <p>
        Date:{" "}
        {moment(startTime).isValid()
          ? moment(startTime).local().format("Do MMM")
          : "15th Jul"}
      </p>
      <div className={"flex mx-5"}>
        <p id="date-details">
          {`${
            moment(startTime).isValid()
              ? moment(startTime).local().format("h:mm a")
              : "12:00 pm"
          } - ${
            moment(endTime).isValid()
              ? moment(endTime).local().format("h:mm a")
              : "1:00 pm"
          }`}
        </p>
      </div>
      <button
        className="border-white border-2 mt-2 py-2 px-3 hover:bg-white hover:text-black active:bg-transparent active:text-white transition duration-300"
        onClick={async () => {
          const accessToken = await handleSignIn();
          addEventToUserCalendar(
            title,
            startTime,
            endTime,
            description,
            accessToken
          );
        }}
      >
        Add to Calendar
      </button>
    </li>
  );
}
