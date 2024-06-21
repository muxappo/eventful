import moment from "moment";

export function formatDate(ISODateString) {
  return moment(ISODateString).format("Do MMM YYYY, h:mm a");
}

export function createSampleData() {
  const sampleEventList = [];
  const sampleEvent = {
    title: "Event Title",
    startTime: "12:00 pm",
    endTime: "1:00 pm",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  };

  for (let i = 0; i <= 12; i++) {
    sampleEventList.push(sampleEvent);
  }

  return sampleEventList;
}

export async function addEventToUserCalendar(
  title,
  startTime,
  endTime,
  desc,
  accessToken
) {
  return await fetch("/api/add_event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      description: desc,
      token: accessToken,
    }),
  });
}
