import React, { Component, ErrorInfo, ReactNode } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import reportWebVitals from './reportWebVitals'
import { store } from 'store'

interface ErrorBoundaryProps {
  children: ReactNode
}

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Connect sentry for errors handling here
    console.log(error, errorInfo)
  }

  render() {
    const { children } = this.props
    return children
  }
}

render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
