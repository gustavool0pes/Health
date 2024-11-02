import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: true,
apiKey: "AIzaSyDUPVCHGQs9GQ_xe2XWPuzCtzOV9TW6cJU",
authDomain: "health-5119d.firebaseapp.com",
projectId: "health-5119d",
storageBucket: "health-5119d.firebasestorage.app",
messagingSenderId: "596283301543",
appId: "1:596283301543:web:220a7166e0793a8f848582",
measurementId: "G-TD7NG8WCXQ"
};

const app = initializeApp(environment);
const analytics = getAnalytics(app);