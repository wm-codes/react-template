import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles({
    nav: {
        marginLeft: 100,
        height: '100%',
        '& > ul': {
            listStyleType: 'none',
            margin: 0,
            '& > li': {
                height: 30,
                padding: 20,
                fontSize: 18,
                boxSizing: 'content-box',
                '&:hover': {
                    borderBottom: '1px solid red',
                },
                '& > a': { 
                    position: 'relative',
                    textDecoration: 'none',
                    color: '#1a1c27',
                    letterSpacing: .6,
                    padding: 0,
                    textTransform: 'uppercase',
                },
            },
        },
    },
});

const Nav = () => {

    const classes = styles();

    const handleClick = e => {
        document.getElementById('services').scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: 'start'
        });
    }

    return (
        <nav className={`${classes.nav} flex horizontal`}>
            <ul className="flex horizontal jCenter aCenter">
                <li>
                    <Link to="#services" onClick={handleClick}>Services</Link>
                </li>
            </ul>
        </nav>
    );
}

export default memo(Nav);
