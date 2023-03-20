import { useState } from 'react'

import { Avatar, Button, Card, Col, Drawer, Row, Space, Typography } from 'antd'

import storage from '../utils/storage'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const access_token = storage.get('access_key')

  const onSignOut = () => {
    storage.clear('access_key')
    navigate('/auth')
  }
  return (
    <Card
      style={{ borderRadius: '0 0 8px 8px', background: 'white' }}
      bodyStyle={{ padding: 12 }}
      bordered={false}
    >
      <Row align="middle">
        <Col flex="auto">
          <Typography.Title level={4}>
            Welcome to Sentre' Notification 🚀🚀🚀
          </Typography.Title>
        </Col>
        <Col>
          <Space style={{ cursor: 'pointer' }} onClick={() => setOpen(true)}>
            <Typography.Text>Tuanle-qn</Typography.Text>
            <Avatar>🦁</Avatar>
          </Space>
        </Col>
      </Row>
      {/* ====== User Profile ====== */}
      <Drawer
        onClose={() => setOpen(false)}
        headerStyle={{ display: 'none' }}
        open={open}
      >
        <Row gutter={[24, 24]} justify="center">
          <Col>
            <Typography.Title level={5}>User Profile</Typography.Title>
          </Col>
          <Col span={24}>
            <Space size={4} direction="vertical" style={{ width: '100%' }}>
              <Typography.Text type="secondary">Username:</Typography.Text>
              <Typography.Text>tuanle-qn</Typography.Text>
            </Space>
          </Col>
          <Col span={24}>
            <Space size={4} direction="vertical" style={{ width: '100%' }}>
              <Typography.Text type="secondary">Email:</Typography.Text>
              <Typography.Text>tuanle@descartes.network</Typography.Text>
            </Space>
          </Col>
          <Col span={24}>
            <Space size={4} direction="vertical" style={{ width: '100%' }}>
              <Typography.Text type="secondary">Phone:</Typography.Text>
              <Typography.Text>09039457830</Typography.Text>
            </Space>
          </Col>
          <Col span={24}>
            <Space size={4} direction="vertical" style={{ width: '100%' }}>
              <Typography.Text type="secondary">Access token:</Typography.Text>
              <Typography.Text>{access_token}</Typography.Text>
            </Space>
          </Col>
          <Col span={24}>
            <Button onClick={onSignOut} block>
              Sign out
            </Button>
          </Col>
        </Row>
      </Drawer>
    </Card>
  )
}

export default Header
