import { Button, Col, Input, Row, Space, Typography, Image } from 'antd'
import { ChangeEvent, useState } from 'react'
import { api } from '../../axios'

import SignInImg from '../../static/images/sign-in.png'
import { notifyError } from '../../utils'

const SignUp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
  })

  const onSignUp = async () => {
    try {
      setLoading(true)
      if (form.confirmPassword !== form.password)
        return setError('Password not match!')
      await api.post('users/sign-up', form)
      window.notify({
        type: 'success',
        description: 'You have successfully registered an account!',
      })
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
          <Typography.Title level={3}>Sentre's Notification</Typography.Title>
          <Image height={100} width={100} src={SignInImg} preview={false} />
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
        <Space size={4} direction="vertical" style={{ width: '100%' }}>
          <Typography.Text type="secondary">Confirm Password</Typography.Text>
          <Input
            name="confirmPassword"
            value={form.confirmPassword}
            type="password"
            placeholder="Please confirm password..."
            onChange={onChange}
          />
        </Space>
      </Col>
      <Col span={24}>
        <Space size={4} direction="vertical" style={{ width: '100%' }}>
          <Typography.Text type="secondary">Email</Typography.Text>
          <Input
            name="email"
            value={form.email}
            placeholder="Please input email..."
            onChange={onChange}
          />
        </Space>
      </Col>
      <Col span={24}>
        <Space size={4} direction="vertical" style={{ width: '100%' }}>
          <Typography.Text type="secondary">Phone</Typography.Text>
          <Input
            name="phone"
            value={form.phone}
            placeholder="Please input phone..."
            onChange={onChange}
          />
        </Space>
      </Col>
      <Col span={24}>
        <Button
          disabled={!form.password || !form.username}
          onClick={onSignUp}
          loading={loading}
          size="large"
          type="primary"
          block
        >
          Sign Up
        </Button>
      </Col>
      {error && <Typography.Text type="danger">{error}</Typography.Text>}
    </Row>
  )
}

export default SignUp
