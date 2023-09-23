import { getFirestore } from "firebase/firestore";

import { firebase } from "@/services/firebase";

export const db = getFirestore(firebase);
