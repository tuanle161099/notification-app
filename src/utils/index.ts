export const shortenAddress = (address: string) => {
  const length = address.length
  return address.slice(0, 4) + '...' + address.slice(length - 4, length)
}

export const notifySuccess = (content: string) => {
  return window.notify({
    type: 'success',
    description: content,
  })
}

export const notifyError = (er: any) => {
  let shortMessage = er.message.split('(')
  shortMessage = shortMessage[0] ? shortMessage[0] : er.message
  return window.notify({
    type: 'error',
    description: er.response?.data.message || shortMessage,
  })
}
