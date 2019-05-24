import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

import classNames from 'classnames';

const styles = {
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
};


function Loader({ classes }) {
    return (
        <div className={classNames(classes.busyWrapper)}>
            <div className={`${classes.loaderContainer}`}>
                <CircularProgress />
            </div>
        </div>
    );
}

export default withStyles(styles)(Loader);
