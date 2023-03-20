import { Fragment } from 'react'

import { notification } from 'antd'

const UIWatcher = () => {
  const [api, contextHolder] = notification.useNotification()

  // Notification system
  window.notify = ({
    type,
    description,
    onClick = () => {},
  }: CodingCampNotification) => {
    return api[type]({
      message: type.toUpperCase(),
      description,
      onClick,
      style: { cursor: 'pointer' },
    })
  }

  return <Fragment>{contextHolder}</Fragment>
}

export default UIWatcher
