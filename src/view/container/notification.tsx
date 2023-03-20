import { useCallback, useEffect, useState } from 'react'
import moment from 'moment'

import { Button, Card, Col, Image, Row, Space, Typography } from 'antd'
import SelectTopic from '../../components/selectTopic'

import { notifyError, notifySuccess, shortenAddress } from '../../utils'
import { NotificationData } from '../../lib/types'
import configs from '../../config'

const {
  sdk: { notificationSDK },
} = configs

const ListNotification = () => {
  const [result, setResult] = useState<NotificationData[]>([])
  const [token, setToken] = useState('')
  const [topic, setTopic] = useState('')

  const getRegisToken = useCallback(async () => {
    const token = await notificationSDK.getDeviceToken()
    return setToken(token)
  }, [])

  const onSubscribeTopic = async () => {
    try {
      const { data } = await notificationSDK.onSubscribeTopic(token, topic)
      notifySuccess(data.message)
    } catch (error) {
      notifyError(error)
    }
  }

  const setData = useCallback(
    (data: NotificationData) => {
      const nextResult = [...result]
      nextResult.unshift(data)
      return setResult(nextResult)
    },
    [result],
  )

  const fetchDataByTopic = useCallback(async () => {
    const notifications = await notificationSDK.getListMessageOnTopic(topic)
    return setResult(notifications)
  }, [topic])

  useEffect(() => {
    notificationSDK.onListenTopicMessage(setData)
  }, [setData])

  useEffect(() => {
    fetchDataByTopic()
  }, [fetchDataByTopic])

  useEffect(() => {
    getRegisToken()
  }, [getRegisToken])

  return (
    <Card>
      <Row gutter={[12, 24]} style={{ maxHeight: 500 }} className="scrollbar">
        <Col span={24}>
          <Space align="baseline">
            <Typography.Title level={4}>List Notification</Typography.Title>
            <Typography.Text>
              Device token: {shortenAddress(token)}
            </Typography.Text>
          </Space>
        </Col>
        <Col span={24}>
          <Space>
            <SelectTopic setTopic={setTopic} />
            <Button onClick={onSubscribeTopic}>Subscribe</Button>
          </Space>
        </Col>
        {[...result].map((data) => (
          <Col span={24} key={data.createdAt}>
            <Row gutter={[12, 12]} align="bottom">
              <Col flex="auto">
                <Typography.Title level={5}>{data.title}</Typography.Title>
              </Col>
              <Col>
                {moment(data.createdAt).format('YYYY/MM/DD - HH:mm:ss')}
              </Col>
              <Col span={24}>
                <Typography.Text>{data.description}</Typography.Text>
              </Col>

              <Col span={24}>
                <Image src={data.thumbnail} height={100} width={100} />
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
    </Card>
  )
}

export default ListNotification
