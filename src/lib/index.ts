import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { AxiosInstance } from 'axios'

import { firebaseConfig, VIPID_KEY } from './constants'
import { NotificationData, NotificationPayload } from './types'
import { api } from './api'

class SenNotificationSDK {
  private app = initializeApp(firebaseConfig)
  private messaging = getMessaging(this.app)
  private _api: AxiosInstance

  constructor(token: string) {
    this._api = api
    this._api.defaults.headers['Authorization'] = `Bearer ${token}`
  }

  getDeviceToken = async () => {
    const permission = await Notification.requestPermission()
    if (permission !== 'granted') return "You don't have permission!"
    const token = await getToken(this.messaging, {
      vapidKey: VIPID_KEY,
    })
    return token
  }

  onSubscribeTopic = async (token: string, topic_name: string) => {
    const { data } = await this._api.post('topic/subscribe', {
      topic_name,
      token,
    })
    return data
  }

  onListenTopicMessage = (observer: (data: NotificationData) => void) => {
    onMessage(this.messaging, (payload) => {
      const noti: NotificationData = {
        createdAt: payload.data?.createdAt || '',
        thumbnail: payload.notification?.icon || '',
        title: payload.notification?.title || '',
        description: payload.notification?.body || '',
      }
      observer(noti)
    })
  }

  initNewTopic = async (topic_name: string): Promise<NotificationData[]> => {
    const { data } = await this._api.post('topic', { name: topic_name })
    return data
  }

  onPublicNotification = async (content: NotificationPayload) => {
    const { data } = await this._api.post('notification', content)
    return data
  }

  getListTopic = async (): Promise<string[]> => {
    const { data } = await this._api.get('topic')
    const listTopicName: string[] = []
    for (const { name } of data) listTopicName.push(name)
    return listTopicName
  }

  getListMessageOnTopic = async (
    topic_name: string,
  ): Promise<NotificationData[]> => {
    const { data } = await this._api.get('notification', {
      params: { topic_name },
    })
    return data
  }
}

export default SenNotificationSDK
