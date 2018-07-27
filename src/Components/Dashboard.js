import React, { Component } from 'react';
import Header from './reusable/Header';
import SideBar from './reusable/SideBar';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Dashboard extends Component {
  render() {
    console.log(this.props)
    let userLectures = this.props.userLectures.map((e, i) => {
      return (
        <div className='lectureCard' key={i}>
          <Link to={`/lecture/${e.lecture_id}`}>
            <h1 className={e.color}>{e.lecture_name}</h1>
            <p>{e.description}</p>
            <p>{e.date}</p>
          </Link>
        </div>
      )
    })
    return (
      <div>
        <SideBar />
        <Header title='Dashboard' sideBar={true} />
        <section className='dashboardWrapper'>
          {userLectures}
          <div className='lectureCard addCard'>
            <Link to={`/lecture/0`}>
              <i class="material-icons"> add_circle_outline</i>
            </Link>
          </div>
        </section>
      </div>
    )
  }
};
function mapStateToProps(state) {
  return {
    userLectures: state.userLectures
  }
}
export default connect(mapStateToProps, null)(Dashboard)