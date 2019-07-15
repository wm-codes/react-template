import React, { memo } from "react";
import classNames from 'classnames';

import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';

const styles = makeStyles(theme => ({
    snackbar: {
        '& div': {
            flexWrap: 'nowrap',
        },
    },
    close: {
        padding: theme.spacing(2)
    },
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));

const defaultSnackbarPosition = {
    vertical: "top",
    horizontal: "right"
};

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const SimpleSnackbar = (props) => {
    const classes = styles();

    const Icon = variantIcon[props.variant] || InfoIcon;

    return (
        <Snackbar
            anchorOrigin={defaultSnackbarPosition}
            open={props.open}
            autoHideDuration={5000}
            onClose={props.onClose}
            className={classes.snackbar}
        >
            <SnackbarContent
                className={classNames(classes[props.variant], props.className)}
                message={
                    <span id="client-snackbar" className={classes.message}>
                        <Icon className={classNames(classes.icon, classes.iconVariant)}/>
                        {props.message}
                    </span>
                }
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={props.onClose}
                    >
                        <CloseIcon className={classes.icon}/>
                    </IconButton>,
                ]}
            />
        </Snackbar>
    );
}

export default memo(SimpleSnackbar);
