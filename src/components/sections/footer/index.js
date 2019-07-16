import React, {memo} from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    footer: {
        backgroundColor: '#11131b',
        color: '#fff',
        paddingTop: 45,
        fontWeight: 500,
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    title: {
        display: 'block',
        marginBottom: 30,
        lineHeight: 1.5,
        fontSize: 18,
    },
    nav: {
        '& ul': {
            padding: 0,
            margin: 0,
            listStyleType: 'none',
            '& li': {
                marginBottom: 10,
                '& a': {
                    textDecoration: 'none',
                    color: 'inherit',
                },
            },
        },
    },
    allRights: {
        color: '#8f8f91',
        padding: 5,
    },
});

const Footer = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <div className={classes.container}>
                <div className="footer-logo">
                    <a href="/">
                        <img
                            alt="Cloudinary Logo - White"
                            src="https://cloudinary-res.cloudinary.com/image/upload/c_scale,w_200/v1538584137/cloudinary_logo_for_black_bg.svg"
                            style={{ width: '200px' }}
                        />
                    </a>
                </div>
                <nav className={classes.nav}>
                    <strong className={classes.title}>Developers</strong>
                    <div className="textwidget">
                        <ul>
                            <li>
                                <a href="/getting-started">Gettings started</a>
                            </li>
                            <li>
                                <a href="/documentation">Documentation</a>
                            </li>
                            <li>
                                <a href="https://github.com/wm-codes/reactin">Github repository</a>
                            </li>
                            <li>
                                <a href="https://github.com/wm-codes/reactin/blob/master/LICENSE">License</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <nav className={classes.nav}>
                    <strong className={classes.title}>About</strong>
                    <div className="textwidget">
                        <ul>
                            <li>
                                <a href="/coompany">Company</a>
                            </li>
                            <li>
                                <a href="/terms">Terms</a>
                            </li>
                            <li>
                                <a href="/privacy">Privacy</a>
                            </li>
                            <li>
                                <a href="/contuct-us">Contuct us</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <nav className={classes.nav}>
                    <strong className={classes.title}>Follow us</strong>{' '}
                    <div className="textwidget">
                        <ul>
                            <li>
                                <a href="https://github.com/wm-codes/reactin">Github</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div className={classes.allRights}>
                <p>© 2019 Reactin. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default memo(Footer);
