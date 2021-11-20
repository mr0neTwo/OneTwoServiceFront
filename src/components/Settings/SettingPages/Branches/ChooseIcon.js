import React from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag, changeBranchForm } from '../../../../Redux/actions'
import Icon from '../../../general/Icon'
import {
  icon_location,
  icon_map_location,
  icon_wrench,
  icon_hammer,
  icon_radio,
  icon_git,
  icon_svg,
} from '../../../../data/icons'

const ChooseIcon = (props) => {
  const colors = [
    '#cccccc',
    '#d70000',
    '#f6c000',
    '#2ab676',
    '#0099e8',
    '#3d4fb8',
    '#9a33b4',
    '#616161',
    '#7784cd',
    '#f8622b',
    '#e87d6f',
    '#038140',
  ]

  const icons = [
    icon_location,
    icon_map_location,
    icon_wrench,
    icon_hammer,
    icon_radio,
    icon_git,
    icon_svg,
  ]

  return (
    <div className="mt15">
      {props.statusChooseIcon ? (
        <div>
          {icons.map((icon, idx) => {
            return (
              <div className="row" key={idx}>
                {colors.map((color, idx) => {
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        props.changeBranchForm('color', color)
                        props.changeBranchForm('icon', icon)
                        props.setVisibleFlag('statusChooseIcon', false)
                      }}
                    >
                      <Icon icon={icon} color={color} />
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      ) : (
        <>
          <div className="lableImput mt15">Цвет и иконка локации</div>
          <div
            onClick={
              props.branch.deleted
                ? null
                : () => props.setVisibleFlag('statusChooseIcon', 'change')
            }
          >
            <Icon icon={props.branch.icon} color={props.branch.color} />
          </div>
        </>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  branch: state.branch,
  statusChooseIcon: state.view.statusChooseIcon,
})

const mapDispatchToProps = {
  setVisibleFlag,
  changeBranchForm,
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseIcon)
