import { initializeApp } from '@firebase/app'
import { getAuth, connectAuthEmulator } from '@firebase/auth'
import { getFirestore, connectFirestoreEmulator } from '@firebase/firestore'

const firebaseConfig = {
  'projectId': 'exam-1a016',
  'appId': '1:237336417684:web:d3259548a0e933172deb81',
  'databaseURL': 'https://exam-1a016-default-rtdb.asia-southeast1.firebasedatabase.app',
  'storageBucket': 'exam-1a016.appspot.com',
  'locationId': 'asia-southeast1',
  'apiKey': 'AIzaSyChbhK6bJVbQfbvjUY0CnUZclk_-NSWtFw',
  'authDomain': 'exam-1a016.firebaseapp.com',
  'messagingSenderId': '237336417684'
}

initializeApp(firebaseConfig)

// eslint-disable-next-line no-constant-condition
if (process.env.NODE_ENV !== 'production') {
  connectAuthEmulator(getAuth(), 'http://localhost:19099', { disableWarnings: true })
  connectFirestoreEmulator(getFirestore(), 'localhost', '18080')
}
