import { Routes, Route, Navigate, useLocation } from 'react-router-dom'

import { Col, Row } from 'antd'
import Auth from './auth'
import App from './container/app'
import Header from './header'

import Watcher from '../watcher'

import '../static/styles/index.less'

const View = () => {
  const { pathname } = useLocation()
  return (
    <Row>
      {pathname !== '/auth' && (
        <Col span={24}>
          <Header />
        </Col>
      )}
      <Col span={24} style={{ padding: 8 }}>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<App />} />
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
        <Watcher />
      </Col>
    </Row>
  )
}

export default View
