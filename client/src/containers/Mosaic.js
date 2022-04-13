import React from 'react';
import { Link } from 'react-router-dom'
import * as constants from '../constants';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import getlevelsdata from '../utils/getlevelsdata';
import moment from 'moment'

class Mosaic extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        lang: localStorage.getItem('lang')
      }
    }
  
    render() {

      // Array for tiles in the Mosaic
      var [levelData,] = getlevelsdata(this.props);

      return (
        <section className="game">
            {levelData.map((level) => {
                return (
                    <Link key={level.name} to={`${constants.PATH_LEVEL_ROOT}${level.deployedAddress}`}>
                        <div className="content_img">
                            <img alt="" src={level.src}/> 
                            <div>
                                { moment.duration(moment().diff(moment(level.creationDate))).asDays() < 14 &&
                                  <img style={{width: '20px', height: '20px'}} src='../../imgs/new.png' alt='new'/>
                                }
                                {`${level.completed ? ' ✔' : ''} `}
                                {level.name}
                                <br /> {level.difficulty}
                            </div>
                        </div>
                    </Link>
                )
            })}
        </section>
      );
    }
  }
  
  function mapStateToProps(state) {
    return {
      levels: state.gamedata.levels,
      player: state.player,
      activeLevel: state.gamedata.activeLevel
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Mosaic);
  