import React, {memo} from "react";

import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    }
}));

const Dashboard = () => {
    const classes = styles();

    return (
        <div className={classes.root}>Dashboard</div>
    )

}

export default memo(Dashboard);