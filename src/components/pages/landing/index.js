import React, { memo } from 'react';

import Header from 'components/sections/header';
import Footer from 'components/sections/footer';

import Home from './home';
import Services from './services';

const Landing = () => {
    return (
        <>
            <Header />
            <Home />
            <Services />
            <Footer />
        </>
    )
}

export default memo(Landing);
