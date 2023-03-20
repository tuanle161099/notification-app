export type NotificationData = {
  title: string
  thumbnail: string
  description: string
  createdAt: string
  clickAction?: string
}

export type NotificationPayload = {
  title: string
  thumbnail: string
  description: string
  topic_name: string
  clickAction?: string
}
