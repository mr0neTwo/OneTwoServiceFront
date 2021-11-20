import React from 'react'
import { connect } from 'react-redux'

import { setClietnCheckbox } from '../../../Redux/actions'

const TopCheckboxes = (props) => {
  return (
    <div className="buttons mt15">
      <div className="checkButton">
        <div
          className={
            props.client.juridical ? 'checkButtonOne' : 'checkButtonTwo'
          }
          onClick={() => props.setClietnCheckbox('juridical', false)}
        >
          Физ. лицо
        </div>
        <div
          className={
            props.client.juridical ? 'checkButtonTwo' : 'checkButtonOne'
          }
          name="juridical"
          onClick={(event) => props.setClietnCheckbox('juridical', true)}
        >
          Компания
        </div>
      </div>

      <div className="subCheckbox">
        <input
          type="checkbox"
          name="supplier"
          onChange={(event) =>
            props.setClietnCheckbox(event.target.name, 'change')
          }
          checked={props.client.supplier}
        />
        <label>
          <svg className="icon-black" viewBox="0 0 32 32">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M32 18l-4-8h-6v-4c0-1.1-0.9-2-2-2h-18c-1.1 0-2 0.9-2 2v16l2 2h2.536c-0.341 0.588-0.536 1.271-0.536 2 0 2.209 1.791 4 4 4s4-1.791 4-4c0-0.729-0.196-1.412-0.536-2h11.073c-0.341 0.588-0.537 1.271-0.537 2 0 2.209 1.791 4 4 4s4-1.791 4-4c0-0.729-0.196-1.412-0.537-2h2.537v-6zM22 18v-6h4.146l3 6h-7.146z"
            ></path>
          </svg>
          <span>Поставщик</span>
        </label>
      </div>

      <div className="subCheckbox">
        <input
          type="checkbox"
          name="conflicted"
          onChange={(event) =>
            props.setClietnCheckbox(event.target.name, 'change')
          }
          checked={props.client.conflicted}
        />
        <label>
          <svg className="icon-red" viewBox="0 0 32 32">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM22 8c1.105 0 2 0.895 2 2s-0.895 2-2 2-2-0.895-2-2 0.895-2 2-2zM10 8c1.105 0 2 0.895 2 2s-0.895 2-2 2-2-0.895-2-2 0.895-2 2-2zM22.003 24.398c-1.224-2.036-3.454-3.398-6.003-3.398s-4.779 1.362-6.003 3.398l-2.573-1.544c1.749-2.908 4.935-4.855 8.576-4.855s6.827 1.946 8.576 4.855l-2.573 1.544z"
            ></path>
          </svg>
          <span>Конфликтный</span>
        </label>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  client: state.client,
})

const mapDispatchToProps = {
  setClietnCheckbox,
}

export default connect(mapStateToProps, mapDispatchToProps)(TopCheckboxes)
