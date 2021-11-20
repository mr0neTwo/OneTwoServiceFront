import React from 'react'
import { connect } from 'react-redux'

import { changeShedule } from '../../../../Redux/actions'
import Checkbox from '../../../general/Checkbox'

const Schedule = (props) => {
  const weekdays = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскрсение',
  ]

  return (
    <div className="schedule mr-rg-20">
      <div className="lableImput mt15">График работы локации</div>
      {props.branch.schedule.map((day, idx) => {
        return (
          <div className="row mt15" key={idx}>
            <Checkbox
              className="w150"
              onChange={(event) =>
                props.changeShedule(idx, 'work_day', event.target.checked)
              }
              checked={day.work_day}
              label={weekdays[idx]}
              disabled={props.branch.deleted}
            />

            {props.branch.schedule[idx].work_day ? (
              <div className="row">
                <input
                  className="w70"
                  onChange={
                    props.branch.deleted
                      ? null
                      : (event) =>
                          props.changeShedule(
                            idx,
                            'start_time',
                            event.target.value
                          )
                  }
                  value={day.start_time}
                />
                <div className="w30 tac">&#8212;</div>
                <input
                  className="w70"
                  onChange={
                    props.branch.deleted
                      ? null
                      : (event) =>
                          props.changeShedule(
                            idx,
                            'end_time',
                            event.target.value
                          )
                  }
                  value={day.end_time}
                />
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

const mapStateToProps = (state) => ({
  branch: state.branch,
})

const mapDispatchToProps = {
  changeShedule,
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)
