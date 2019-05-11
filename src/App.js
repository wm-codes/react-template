import React, { Suspense, memo } from 'react';
import AuthProvider from 'auth';
import Main from 'components/sections/main';

function App() {
    return (
        <AuthProvider>
            <Suspense fallback="...loading">
                <Main />
            </Suspense>
        </AuthProvider>
    );
}

export default memo(App);
