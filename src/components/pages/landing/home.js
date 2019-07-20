import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    home: {
        width: '100%',
        height: 'calc(100vh - 70px)',
        display: 'flex',
        backgroundImage: 'linear-gradient(120deg, #2193b0 0%, #6dd5ed 100%)',
        '& > div': {
            display: 'flex',
            justifyContent: 'center',
            color: '#fff',
        },
    },
    mainTitle:{
        minWidth: 200,
        padding: 25,
        display: 'flex',
        flexDirection: 'column',
        '& h1': {
            fontSize: '3rem',
        },
        '& h2': {
            fontSize: '1.5rem',
        },
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginTop: 20,
        '& button': {
            marginRight: 10,
            padding: '10px 16px',
            backgroundColor: '#46bc8a',
            color: '#fff',
            '&:hover': {
                backgroundColor: '#46bc8a',
                boxShadow: '0px 5px 5px 0px rgba(0,0,0,0.2)',
            },
        },
    },
});

const Home = () => {

    const classes = useStyles();

    const handleGetStarted = () => {
        //some code
    }

    return (
        <section className={classes.home}>
            <div className={classes.mainTitle}>
                <h1>Here can be your slogan</h1>
                <h2>The open source Headless CMS for Front-End Developers</h2>
                <div className={classes.actions}>
                    <Button
                        color="default"
                        variant="contained"
                        onClick={handleGetStarted}
                    >
                        Get Started
                    </Button>
                </div>
            </div>
            <div>
                <video>Video</video>
            </div>
        </section>
    );
}

export default memo(Home);
