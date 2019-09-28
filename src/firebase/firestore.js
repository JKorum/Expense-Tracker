import * as firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.FIRESTORE_API_KEY,
  authDomain: process.env.FIRESTORE_AUTH_DOMAIN,
  projectId: process.env.FIRESTORE_PROJECT_ID
}
  
firebase.initializeApp(firebaseConfig);

export default firebase.firestore()