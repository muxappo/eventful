import { useEffect, useState } from "react";
import { getEvents } from "../firebase/fb_requests";
import EventCard from "./EventCard";

export default function EventList() {
  const [isLoading, setIsLoading] = useState(true);
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    getEvents().then((result) => {
      setEventList(result);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>Fetching listed events...</p>;

  return (
    <ul
      className={
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      }
    >
      {eventList.map((event) => {
        return (
          <EventCard
            key={event.id}
            eventId={event.id}
            title={event.title}
            startTime={event.startTime}
            endTime={event.endTime}
            description={event.description}
          />
        );
      })}
    </ul>
  );
}
