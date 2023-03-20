import { Button, Col, Input, Row, Space, Typography, Image } from 'antd'
import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../axios'

import SignInImg from '../../static/images/sign-in.png'
import { notifyError } from '../../utils'
import storage from '../../utils/storage'

const SignIn = () => {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ username: '', password: '' })
  const navigate = useNavigate()

  const onLogin = async () => {
    try {
      setLoading(true)
      const { data } = await api.post('auth/login', form)
      storage.set('access_key', data.access_token)
      return navigate('/home')
    } catch (error: any) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targe = e.target
    setForm({ ...form, [targe.name]: targe.value })
  }

  return (
    <Row gutter={[24, 24]} justify="center">
      <Col>
        <Space align="center" direction="vertical" style={{ width: '100%' }}>
          <Typography.Title level={3}>
            Sentre's Notification System
          </Typography.Title>
          <Image src={SignInImg} preview={false} />
        </Space>
      </Col>
      <Col span={24}>
        <Space size={4} direction="vertical" style={{ width: '100%' }}>
          <Typography.Text type="secondary">Username</Typography.Text>
          <Input
            name="username"
            value={form.username}
            placeholder="Please input username..."
            onChange={onChange}
          />
        </Space>
      </Col>
      <Col span={24}>
        <Space size={4} direction="vertical" style={{ width: '100%' }}>
          <Typography.Text type="secondary">Password</Typography.Text>
          <Input
            name="password"
            value={form.password}
            type="password"
            placeholder="Please input password..."
            onChange={onChange}
          />
        </Space>
      </Col>
      <Col span={24}>
        <Button
          disabled={!form.password || !form.username}
          onClick={onLogin}
          loading={loading}
          size="large"
          type="primary"
          block
        >
          Sign In
        </Button>
      </Col>
    </Row>
  )
}

export default SignIn
