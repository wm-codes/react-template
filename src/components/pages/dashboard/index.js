import React, {memo} from "react";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
}));

const Dashboard = () => (
    <div className={useStyles().root}>Dashboard</div>
);

export default memo(Dashboard);
