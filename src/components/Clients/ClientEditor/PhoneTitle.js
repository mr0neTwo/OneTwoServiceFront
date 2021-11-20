import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {
  changeStatusPhoneList,
  setPhoneTitle,
  changeStatusAddTitle,
} from '../../../Redux/actions'

const PhoneTitle = (props) => {
  const clickHandel = (event) => {
    if (
      !event.path.map((el) => el.id).includes(`listOptionsOfPhones${props.idx}`)
    ) {
      if (props.client.statusPhoneList[props.idx]) {
        props.changeStatusPhoneList(props.idx)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('click', clickHandel)
    return () => {
      window.removeEventListener('click', clickHandel)
    }
  })

  return (
    <div id={`listOptionsOfPhones${props.idx}`}>
      <div
        className="lableImput mt15 curP"
        onClick={() => props.changeStatusPhoneList(props.idx)}
      >
        {props.title}
        {props.idx === 0 ? <span className="redStar">*</span> : null}
        <span className="smallIcon">&#6662;</span>
      </div>

      {props.client.statusPhoneList[props.idx] ? (
        <div className="listOptionsPhones">
          {props.client.phone_titles.map((title) => {
            return (
              <div
                key={title}
                className="options"
                onClick={() => {
                  props.setPhoneTitle(props.idx, title)
                }}
              >
                {title}
              </div>
            )
          })}
          <div className="btmsts">
            {props.client.statusAddTitle[props.idx] ? (
              <input
                className="optionFilterInput"
                autoFocus
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    props.setPhoneTitle(props.idx, event.target.value)
                  }
                }}
                placeholder="Введите и нажмиете Enter"
              />
            ) : (
              <div
                className="btnstsTitle"
                onClick={() => props.changeStatusAddTitle(props.idx)}
              >
                Задать поле
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}

const mapStateToProps = (state) => ({
  client: state.client,
})

const mapDispatchToProps = {
  changeStatusPhoneList,
  setPhoneTitle,
  changeStatusAddTitle,
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneTitle)
