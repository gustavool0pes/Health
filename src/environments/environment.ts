import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: true,
apiKey: "Suas-Credências",
authDomain: "Suas-Credências",
projectId: "Suas-Credências",
storageBucket: "Suas-Credências",
messagingSenderId: "Suas-Credências",
appId: "Suas-Credências",
measurementId: "Suas-Credências"
};

const app = initializeApp(environment);
const analytics = getAnalytics(app);