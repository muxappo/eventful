import { google } from "googleapis";
import { db } from "@/app/firebase/firebaseAuth";
import { doc, setDoc } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  try {
    const { title, startTime, endTime, token, description } = req.body;

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: token });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const event = {
      summary: title,
      start: {
        dateTime: startTime,
        timeZone: "Europe/London",
      },
      end: {
        dateTime: endTime,
        timeZone: "Europe/London",
      },
      description: description || "None",
    };

    const calendarResponse = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });

    const eventData = {
      title: event.summary,
      startTime: event.start.dateTime,
      endTime: event.end.dateTime,
      description: event.description,
      calendarEventId: calendarResponse.data.id,
    };

    res.status(200).json({ message: "Event added successfully", eventData });
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({ error: "Error adding event" });
  }
}
