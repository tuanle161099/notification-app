import { initializeApp } from 'firebase/app'
import { getMessaging } from 'firebase/messaging'
import { useMemo } from 'react'

export const useMessaging = () => {
  // Initialize Firebase
  const messaging = useMemo(() => {
    const firebaseConfig = {
      apiKey: 'AIzaSyCbEmjMxjNkiKo-miMGVHOsdDpKNIDnH3k',
      authDomain: 'sentre-noti.firebaseapp.com',
      projectId: 'sentre-noti',
      storageBucket: 'sentre-noti.appspot.com',
      messagingSenderId: '230315790302',
      appId: '1:230315790302:web:a1d3b91fdd76f91752d74f',
      measurementId: 'G-HYWJCC281Z',
    }
    const app = initializeApp(firebaseConfig)
    return getMessaging(app)
  }, [])
  return messaging
}
