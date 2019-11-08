import React from 'react';
import { calcTime, convertMoney} from '../../../helper'
import './MovieInfoBar.css'

const MovieInfoBar = (props) => {
    return (
        <div className="rmdb-movieinfobar">
            <div className="rmdb-movieinfobar-content">
                <div className="rmdb-movieinfobar-content-col">
                    <i className="fa fa-time" />
                    <span className="rmdb-movieinfobar-into">Remaining Time {calcTime(props.time)}</span>
                </div>
                <div className="rmdb-movieinfobar-content-col">
                    <i className="fa fa-time" />
                    <span className="rmdb-movieinfobar-into">Remaining Time {calcTime(props.time)}</span>
                </div>
                <div className="rmdb-movieinfobar-content-col">
                    <i className="fa fa-time" />
                    <span className="rmdb-movieinfobar-into">Remaining Time {calcTime(props.time)}</span>
                </div>
            </div>
        </div>
    )
}

export default MovieInfoBar;