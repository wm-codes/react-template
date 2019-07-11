import React, { memo } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import classNames from 'classnames';

const styles = makeStyles({
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
    const classes = styles();

    return (
        <div className={classNames(classes.busyWrapper)}>
            <div className={`${classes.loaderContainer}`}>
                <CircularProgress />
            </div>
        </div>
    );
}

export default memo(Loader);
