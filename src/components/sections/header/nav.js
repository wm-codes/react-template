import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
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

class Nav extends PureComponent {

    handleClick = e => {
        document.getElementById('services').scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: 'start'
        });
    }

    render() {
        const { classes, isLoggedIn } = this.props;

        return (
            <nav className={`${classes.nav} flex horizontal`}>
                <ul className="flex horizontal jCenter aCenter">
                    <li>
                        <Link to="#services" onClick={this.handleClick}>Services</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default withStyles(styles)(Nav);
