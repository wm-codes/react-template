import React, { memo } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    busyWrapper: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    loaderContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const Loader = () => {
    const classes = useStyles();

    return (
        <div className={classes.busyWrapper}>
            <div className={classes.loaderContainer}>
                <CircularProgress />
            </div>
        </div>
    );
};

export default memo(Loader);
