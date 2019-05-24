import React, { Suspense, memo } from 'react';

import AuthProvider from 'auth';
import Main from 'components/sections/main';
import Loader from 'components/common/loader';

function App() {
    return (
        <AuthProvider>
            <Suspense fallback={<Loader />}>
                <Main />
            </Suspense>
        </AuthProvider>
    );
}

export default memo(App);
