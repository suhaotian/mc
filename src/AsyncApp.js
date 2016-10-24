// https://gist.github.com/acdlite/a68433004f9d6b4cbc83b5cc3990c194
// 
// getComponent is a function that returns a promise for a component
// It will not be called until the first mount

import React from 'react'
import Match from 'react-router/Match'
import Link from 'react-router/Link'

function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = { Component: null };
    }

    componentWillMount() {
      if (!this.state.Component) {
        getComponent(Component => {
          this.setState({ Component: Component.default })
        })
      }
    }

    render() {
      const Component = this.state.Component
      if (Component) {
        return <Component {...this.props} />
      }
      return null
    }
  }
}

const Foo = asyncComponent((cb) => {
  require.ensure([], (require) => {
    cb(require('./Foo'))
  })
})
const Bar = asyncComponent((cb) => {
  require.ensure([], (require) => {
    cb(require('./Bar'))
  })
})

const AsyncApp = () => (
  <div>
    <Link to="/foo">Foo</Link>
    <Link to="/bar">Bar</Link>

    <Match pattern="/foo" component={Foo} />
    <Match pattern="/bar" component={Bar} />
  </div>
)

export default AsyncApp