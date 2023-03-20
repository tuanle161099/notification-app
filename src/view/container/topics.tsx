import { useState } from 'react'

import { Button, Card, Col, Input, Row, Space, Typography } from 'antd'
import configs from '../../config'
import { notifyError, notifySuccess } from '../../utils'

const {
  sdk: { notificationSDK },
} = configs

const Topics = () => {
  const [topicName, setTopicName] = useState('')
  const [loading, setLoading] = useState(false)

  const onAddTopic = async () => {
    try {
      setLoading(true)
      await notificationSDK.initNewTopic(topicName)
      notifySuccess('Subscribe topic successfully')
    } catch (error: any) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Card>
      <Row gutter={[0, 12]}>
        <Col span={24}>
          <Typography.Title level={3}>Initialize new Topic</Typography.Title>
        </Col>
        <Col span={24}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Typography.Text>Topic name</Typography.Text>
            <Input
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
              placeholder="Input topic name"
            />
          </Space>
        </Col>
        <Col span={24} />
        <Col span={24}>
          <Button
            onClick={onAddTopic}
            disabled={!topicName}
            type="primary"
            block
            loading={loading}
          >
            Add new
          </Button>
        </Col>
      </Row>
    </Card>
  )
}
export default Topics
