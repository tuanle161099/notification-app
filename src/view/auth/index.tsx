import { Card, Col, Row, Tabs, TabsProps } from 'antd'
import SignIn from './signIn'
import SignUp from './signUp'

const items: TabsProps['items'] = [
  {
    key: 'sign-in',
    label: `Sign In`,
    children: <SignIn />,
  },
  {
    key: 'sign-up',
    label: `Sign Up`,
    children: <SignUp />,
  },
]

const Auth = () => {
  return (
    <Row justify="center">
      <Col sm={24} xs={20} md={10}>
        <Card bordered={false}>
          <Tabs items={items} />
        </Card>
      </Col>
    </Row>
  )
}

export default Auth
