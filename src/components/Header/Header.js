import React from 'react';

import {ICON} from '../../data/icons'

import Icon from '../general/Icon'


const Header = props => {


    return (
        <div className='header'>
            <div className='row g12 ai-c'>
                <h3>{props.title}</h3>
                <div className='row g3 ai-c'>
                    <Icon
                        className='icon icon_20'
                        icon={ICON.MAP_PIN}
                        color='var(--success)'
                    />
                    <h3 className='ml5'>Бабушкина</h3>
                    <Icon
                        className='icon icon_24'
                        icon={ICON.DOWN}
                        color='var(--main)'
                    />
                </div>
            </div>
            {props.search}
        </div>
    )
}

export default Header