/// <reference types="react-scripts" />
interface Window {
  // Utility
  notify: ({ type, description, onClick }: CodingCampNotification) => void
}

type CodingCampNotification = {
  type: 'error' | 'warning' | 'success' | 'info'
  description: string
  onClick?: () => void
}
