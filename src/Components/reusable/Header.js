import React, { Component } from 'react';

export default function Header(props) {
console.log('hey',props.location)
    return (
        <div className='contactBar'>
            <section className='contactSection'>
                <span class="glyphicon glyphicon-earphone" />
                801-900-7421 |
                    <span class="glyphicon glyphicon-envelope" />
                Contact Me
                </section>
            <section>
                <h1>{props.title}</h1>
            </section>
            <section className='loginSection'>
                <span class="glyphicon glyphicon-log-in" />
                <button className='infoButton'>Login</button>
            </section>
        </div>
    )
}


