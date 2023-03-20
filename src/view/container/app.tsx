import { Col, Row } from 'antd'
import NotificationPage from './notification'
import Admin from '../admin'
import Topics from './topics'

import './index.css'

function App() {
  return (
    <Row gutter={[24, 24]} style={{ padding: 24, margin: 0 }} align="top">
      <Col span={10}>
        <Row gutter={[0, 24]}>
          <Col span={24}>
            <Topics />
          </Col>
          <Col span={24}>
            <NotificationPage />
          </Col>
        </Row>
      </Col>
      <Col span={14}>
        <Admin />
      </Col>
      <Col span={24} />
    </Row>
  )
}

export default App
