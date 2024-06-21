import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { db, auth, provider } from "./firebaseAuth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { createSampleData } from "../utils";

//Firebase requests
async function handleSignIn() {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    return accessToken;
  } catch (error) {
    console.error(`Error during sign-in: ${error}`);
  }
}

async function getEvents() {
  try {
    const eventList = [];
    const querySnapshot = await getDocs(collection(db, "Events"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      eventList.push({
        id: data.calendarEventId,
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        description: data.description,
      });
    });
    return eventList;
  } catch {
    return createSampleData();
  }
}

async function addEventToDb(data) {
  await setDoc(
    doc(db, "Events", data.eventData.calendarEventId),
    data.eventData
  );
}

export { addEventToDb, getEvents, handleSignIn };
