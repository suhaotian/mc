import React from 'react'
import { TransitionMotion, spring } from 'react-motion'
import Match from 'react-router/Match'
import Link from 'react-router/Link'
import Redirect from 'react-router/Redirect'


const styles = {}

styles.fill = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  overflowX: 'hidden',
}

styles.content = {
  ...styles.fill,
  top: '40px',
  textAlign: 'center'
}

styles.nav = {
  padding: 0,
  margin: 0,
  position: 'absolute',
  top: 0,
  height: '40px',
  width: '100%',
  display: 'flex',
  background: '#fff',
}

styles.navItem = {
  textAlign: 'center',
  flex: 1,
  listStyleType: 'none',
  padding: '10px'
}

styles.hsl  = {
  ...styles.fill,
  color: 'white',
  paddingTop: '20px',
  fontSize: '30px',
}

let CurrentDicrection = 'forward'
let DirectionCacheIndex = -1
const NavLink = ({index, ...other}) => (
  <li style={styles.navItem} onClick={() => {
    // CurrentDicrection = index
    CurrentDicrection = DirectionCacheIndex > index ? 'back' : 'forward'
    console.log(index, DirectionCacheIndex)
    DirectionCacheIndex = index
    console.log('b:' + CurrentDicrection)
  }}>
    <Link
      {...other}
      style={{ color: 'inherit' }}
      activeStyle={{ color: 'red', textDecoration: 'none' }}
    />
  </li>
)

const HSL = ({ params }) => (
  <div style={{
    ...styles.hsl,
    background: `hsl(${params.h}, ${params.s}%, ${params.l}%)`
  }}>hsl({params.h}, {params.s}%, {params.l}%)</div>
)

const AnimationExample = () => (
  <div style={styles.fill}>
    <ul style={styles.nav}>
      {
        [{to: '/10/50/50', text: 'Red'}, {to: '/50/70/50', text: 'Yellow'}, {to: '/200/50/50', text: 'Blue'}, {to: '/300/50/50', text: 'Dunno'}].map(({to, text}, i) => {
          return (
            <NavLink to={to} key={i} index={i}>{text}</NavLink>
          )
        })
      }
    </ul>

    <div style={styles.content}>
      <MatchWithFade pattern="/:h/:s/:l" component={HSL}/>
    </div>

    <Match exactly pattern="/" render={() => (
      <Redirect to="/10/50/50"/>
    )}/>
  </div>
)

const MatchWithFade = ({ component:Component, ...rest }) => {
  const willLeave = () => ({ opacity: spring(CurrentDicrection == 'back' ? 60 : -60, {stiffness: 210, damping: 20}) })
  const willEnter = () => ({ opacity: CurrentDicrection == 'back' ? -100 : 100 })
  console.log(CurrentDicrection)
  return (
    <Match {...rest} children={({ matched, ...props }) => {
      let key = props.location.pathname + Date.now()
      return <TransitionMotion
        willLeave={willLeave}
        willEnter={willEnter}
        styles={
          matched ?
          [{
            key: key,
            style: { opacity: spring(0, {stiffness: 160, damping: 24}),  },
            data: props
          }] : []
        }
      >
        {interpolatedStyles => (
          <div>
            {interpolatedStyles.map(config => {
              return (
                <div
                  key={config.key}
                  style={{
                    ...styles.fill,
                    WebkitTransform: `translateX(${config.style.opacity}%)`,
                  }}
                >
                  <Component {...config.data}/>
                </div>
              )
            })}
          </div>
        )}
      </TransitionMotion>
    }}/>
  )
}

export default AnimationExample
