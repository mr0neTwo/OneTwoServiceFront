import React, { useState } from 'react'
import { connect } from 'react-redux'

import { changeBookForm } from '../../../../Redux/actions/bookActions'

const ChooseIcon = (props) => {
  
  const [icons, setIcons] = useState(false)

  const list_icons = [
    'nothing.svg',
    'airconditioner.svg',
    'chip1.svg',
    'chip2.svg',
    'cleaner.svg',
    'cleaner2.svg',
    'coffee-machine.svg',
    'coffee-maker.svg',
    'computer_chip.svg',
    'cooler.svg',
    'desktop.svg',
    'dish-dishwash.svg',
    'fan.svg',
    'fridge.svg',
    'fridge2.svg',
    'graphic_card2.svg',
    'hairdrier.svg',
    'jar.svg',
    'laundry_press.svg',
    'microwave.svg',
    'mixer.svg',
    'refrigerator.svg',
    'stove.svg',
    'toaster.svg',
    'washer-washing.svg',
    'washing_machine1.svg',
    'washing_machine.svg',
  ]

  return (
    <div className="mt15">
      <div className="lableImput">Выберете иконку</div>
      {icons ? (
        <div className="w250">
          {list_icons.map((icon, idx) => (
            <img
              key={idx}
              className="icon_equipment"
              src={`${process.env.PUBLIC_URL}/icon_equipments/${icon}`}
              onClick={() => {
                props.changeBookForm(icon === 'nothing.svg' ? null : `icon_equipments/${icon}`, 'icon')
                setIcons(false)
              }}
            />
          ))}
        </div>
      ) : (
        <img
          className="icon_equipment"
          src={props.icon ? `${process.env.PUBLIC_URL}/${props.icon}` : `${process.env.PUBLIC_URL}icon_equipments/nothing.svg`}
          onClick={props.disabled ? null : () => setIcons(true)}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  icon: state.book.icon,
})

const mapDispatchToProps = {
  changeBookForm,
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseIcon)
