import React, { PureComponent } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Header from 'components/sections/header';
import Footer from 'components/sections/footer';

import Home from './home';
import Services from './services';

const styles = {
    
};

class Landing extends PureComponent {    
    render() {
        const { classes } = this.props;

        return (
            <>
                <Header />
                <Home />
                <Services />
                <Footer />
            </>
        )
    }
}

export default withStyles(styles)(Landing);
