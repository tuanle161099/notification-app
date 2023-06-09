import { useState } from 'react'

import { Button, Card, Col, Input, Row, Space, Typography } from 'antd'
import SelectTopic from '../components/selectTopic'

import configs from '../config'
import { notifyError, notifySuccess } from '../utils'
import { NotificationPayload } from '../lib/types'

const {
  sdk: { notificationSDK },
} = configs

const Admin = () => {
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState<NotificationPayload>({
    title: '',
    description: '',
    thumbnail: '',
    topic_name: '',
    clickAction: '',
  })
  const onChange = (e: any) => {
    const target = e.target
    setContent({ ...content, [target.name]: target.value })
  }

  const onTopicChange = (val: string) => {
    setContent({ ...content, topic_name: val })
  }

  const onSubmit = async () => {
    try {
      setLoading(true)
      await notificationSDK.onPublicNotification(content)
      notifySuccess('Public notification successfully')
    } catch (error) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <Row gutter={[0, 24]}>
        <Col span={24}>
          <Typography.Title level={4}>
            Initialize new Notification
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Typography.Text type="secondary">Title</Typography.Text>
            <Input name="title" value={content.title} onChange={onChange} />
          </Space>
        </Col>
        <Col span={24}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Typography.Text type="secondary">Description</Typography.Text>
            <Input.TextArea
              name="description"
              value={content.description}
              onChange={onChange}
            />
          </Space>
        </Col>
        <Col span={24}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Typography.Text type="secondary">Thumbnail</Typography.Text>
            <Input
              name="thumbnail"
              value={content.thumbnail}
              onChange={onChange}
            />
          </Space>
        </Col>
        <Col span={24}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Typography.Text type="secondary">
              Click Action (Optional)
            </Typography.Text>
            <Input
              name="clickAction"
              value={content.clickAction}
              onChange={onChange}
            />
          </Space>
        </Col>
        <Col span={24}>
          <SelectTopic setTopic={onTopicChange} />
        </Col>
        <Col>
          <Button
            onClick={onSubmit}
            loading={loading}
            disabled={!content.title || !content.description}
          >
            Public Notification
          </Button>
        </Col>
      </Row>
    </Card>
  )
}

export default Admin
