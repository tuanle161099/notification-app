import { useCallback, useEffect, useMemo, useState } from 'react'

import { Select } from 'antd'

import configs from '../config'

const {
  sdk: { notificationSDK },
} = configs
type SelectTopicProps = {
  setTopic: (val: string) => void
}

const SelectTopic = ({ setTopic }: SelectTopicProps) => {
  const [topics, setTopics] = useState<string[]>([])

  const options = useMemo(() => {
    const result: { value: string; label: string }[] = []
    for (const name of topics) result.push({ value: name, label: name })
    return result
  }, [topics])

  const fetchAllTopic = useCallback(async () => {
    try {
      const listTopicName = await notificationSDK.getListTopic()
      setTopics(listTopicName)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    fetchAllTopic()
  }, [fetchAllTopic])

  return (
    <Select
      style={{ width: 300 }}
      onChange={(val) => setTopic(val)}
      options={options}
      placeholder="Please select topic to push notification"
    />
  )
}

export default SelectTopic
