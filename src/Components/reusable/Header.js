import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, getUserLectures } from '../../ducks/reducer'
import axios from 'axios';
import {Link} from 'react-router-dom'


class Header extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        this.props.user.username ? null : this.props.getUser()
        this.props.getUserLectures()
    }
    logout = () =>{
        axios.get('/auth/logout').then(res=>console.log('success'))
    }
    render() {
        console.log('hey', this.props)
        return (
            <div className='contactWrapper'>
                {this.props.sideBar? <div className='sidebarPlaceholder'></div>: null}
                <section className='contactBar'>
                    <div className='headerSection'>
                        <span class="glyphicon glyphicon-earphone" />
                        Welcome | {this.props.user.username}
                    </div>
                    <div className='headerSection'>
                        <h1>{this.props.title}</h1>
                    </div>
                    <div className='headerSection'>
                        <Link to='/' ><button className='infoButton' onClick={()=>this.logout()}>
                        <i class="material-icons">arrow_left</i>
                            Log Out</button></Link>
                    </div>
                </section>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.user,
        lecture: state.lecture
    }
}
export default connect(mapStateToProps, { getUser, getUserLectures })(Header)


