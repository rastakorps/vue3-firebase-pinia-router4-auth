import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyASjfwleDr3LjarUYpQnWcWDhtXxJ3pCq4",
  authDomain: "vue3-2024.firebaseapp.com",
  projectId: "vue3-2024",
  storageBucket: "vue3-2024.appspot.com",
  messagingSenderId: "576678872838",
  appId: "1:576678872838:web:0f0481d9dde161b496c087"
};

initializeApp(firebaseConfig);
const auth = getAuth()

export { auth }