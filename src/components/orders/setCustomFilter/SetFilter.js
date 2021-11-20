import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {
  addClients,
  appFilter,
  resetFilter,
  changeStatusCreateNewFilter,
  saveCustomFilter,
  removeFilter,
} from '../../../Redux/actions'

import SetBrand from './SetBrand'
import SetClient from './SetClient'
import SetDataCreate from './SetDataCreate'
import SetEngeneer from './SetEngeneer'
import SetGroup from './SetGroup'
import SetManager from './SetManager'
import SetSubtype from './SetSubtype'
import SetStatus from './SetStatus'
import SetTypeOrders from './SetTypeOrders'
import CreateNewFilter from '../CreateNewFilter'

import { icon_trush } from '../../../data/icons'

const SetFilter = (props) => {
  useEffect(() => {
    props.addClients()
  }, [props.clientFilter])

  return (
    <div className="setCustomFilter">
      <div className="filterOptions">
        <div className="setCustomFilterRow">
          <div className="setCustomFilterCell">
            {' '}
            <SetStatus />{' '}
          </div>
          <div className="setCustomFilterCell">
            {' '}
            <SetGroup />{' '}
          </div>
          <div className="setCustomFilterCell">
            {' '}
            <SetClient />
          </div>
        </div>
        <div className="setCustomFilterRow">
          <div className="setCustomFilterCell">
            {' '}
            <SetTypeOrders />{' '}
          </div>
          <div className="setCustomFilterCell">
            {' '}
            <SetBrand />{' '}
          </div>
          <div className="setCustomFilterCell">
            {' '}
            <SetManager />{' '}
          </div>
        </div>
        <div className="setCustomFilterRow">
          <div className="setCustomFilterCell">
            {' '}
            <SetDataCreate />{' '}
          </div>
          <div className="setCustomFilterCell">
            {' '}
            <SetSubtype />{' '}
          </div>
          <div className="setCustomFilterCell">
            {props.user.role.orders_visibility ? (
              <SetEngeneer />
            ) : (
              <>
                <div className="optionsFilterTitle">Инженер</div>
                <div className="optionsFilterButton curNone">
                  <span>{`${props.user.last_name} ${props.user.first_name}`}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="buttons fs14 mt15">
        <div className="blueButton" onClick={() => props.appFilter()}>
          Применить
        </div>
        {props.customFilters.map((filter) => filter.active).includes(true) ? (
          <>
            <div
              className="whiteButton"
              onClick={() => props.saveCustomFilter()}
            >
              Сохранить фильтр
            </div>
            <div
              className="whiteButton simbolBotton"
              onClick={() => props.removeFilter()}
            >
              <svg className="icon-table-red-basket" viewBox="0 0 32 32">
                <path d={icon_trush} />
              </svg>
            </div>
          </>
        ) : (
          <div
            className="whiteButton"
            onClick={() => props.changeStatusCreateNewFilter()}
          >
            Создать фильтр
          </div>
        )}
        <div className="whiteButton" onClick={() => props.resetFilter()}>
          <span className="blackCross">✖</span>Сбросить параметы
        </div>
      </div>
      {props.statusCreateNewFilter ? <CreateNewFilter /> : null}
    </div>
  )
}

const mapStateToProps = (state) => ({
  clientFilter: state.filter.clientFilter,
  statusCreateNewFilter: state.view.statusCreateNewFilter,
  customFilters: state.filter.customFilters,
  user: state.data.user,
})

const mapDispatchToProps = {
  addClients,
  appFilter,
  resetFilter,
  changeStatusCreateNewFilter,
  saveCustomFilter,
  removeFilter,
}

export default connect(mapStateToProps, mapDispatchToProps)(SetFilter)
