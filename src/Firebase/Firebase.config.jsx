
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDQ6zyTfwydOkZ6smFdfTI6L0J9YA6T-cE",
  authDomain: "bistro-boss-1111.firebaseapp.com",
  projectId: "bistro-boss-1111",
  storageBucket: "bistro-boss-1111.appspot.com",
  messagingSenderId: "126247422210",
  appId: "1:126247422210:web:ba262ec4155e8fc22ada1b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);