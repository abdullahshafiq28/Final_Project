import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth'
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {

    apiKey: "AIzaSyCw39Uur88U_y7iRkxC8O9c2JnnVoNUe40",
  
    authDomain: "final-project-82390.firebaseapp.com",
  
    projectId: "final-project-82390",
  
    storageBucket: "final-project-82390.appspot.com",
  
    messagingSenderId: "993264779206",
  
    appId: "1:993264779206:web:629082994a9e996f24bcc7",
  
    measurementId: "G-S3M1B9BQYG"
  
  };

  const app =initializeApp(firebaseConfig)
  
  const firebaseDatabase = getFirestore(app);

  const auth = getAuth(app)

  export { auth, firebaseDatabase}
