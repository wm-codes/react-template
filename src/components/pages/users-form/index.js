import React, { memo } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    form: {
        maxWidth: '700px',
        margin: '0 auto',
    },
    formActions: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: 40,
        '& .cancel': {
            marginRight: 15,
        },
    },
}));

function UsersForm() {
    const classes = useStyles();

    return (
        <form
            className={classes.form}
            // onSubmit={handleSubmit}
        >
            <FormControl
                margin="normal"
                required
                fullWidth
                // error={hasEmailError}
            >
                <InputLabel
                    htmlFor="email"
                >
                    Email Address
                </InputLabel>
                <Input
                    id="name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    // onChange={handleEmailChange}
                />
            </FormControl>
            <FormControl
                margin="normal"
                required
                fullWidth
                // error={hasPasswordError}
            >
                <InputLabel
                    htmlFor="password"
                >
                    Password
                </InputLabel>
                <Input
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    // onChange={handlePasswordChange}
                />
            </FormControl>
            <div className={classes.formActions}>
                <Button
                    variant="contained"
                    className="cancel"
                    type="reset"
                    // onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    className="save"
                    type="submit"
                    // onClick={handleSubmit}
                >
                    Save
                </Button>
            </div>
        </form>
    )
};

export default withStyles(styles)(memo(UsersForm));
