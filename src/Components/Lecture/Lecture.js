import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideBar from '../reusable/SideBar';
import Header from '../reusable/Header';

class Lecture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            theme: 'default',
            colors: ['default', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
        }
    }
    ChangeColor = (str) => {
        const { theme, colors } = this.state
        let idx = colors.indexOf(theme)
        if (str === 'inc') { 
            console.log(idx)
            idx === colors.length-1? idx=0 : ''
            idx++ 
        }
        if (str === 'dec') {
            idx === 0? idx=colors.length : ''
            idx--
         }
        this.setState({
            theme: colors[idx]
        })
    }
    handleInput = (e) => {
        console.log('bugok')
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        const params = +this.props.match.params;
        const { theme, description, title } = this.state;
        return (
            <div>
                <SideBar />
                <Header title='New Lecture' sideBar={true} />
                <section className='editLectureWrapper '>
                    <header className={theme}>
                        <i onClick={() => this.ChangeColor('dec')} class="material-icons">chevron_left</i>
                        <input onChange={this.handleInput} name='title' value={title} />
                        <i onClick={() => this.ChangeColor('inc')} class="material-icons">chevron_right</i>
                    </header>
                    <textarea onChange={this.handleInput} name='description' value={description} />
                </section>
            </div>
        )
    }
};
function mapStateToProps(state) {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, null)(Lecture)
