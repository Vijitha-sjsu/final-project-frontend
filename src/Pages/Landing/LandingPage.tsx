import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

export default function LandingPage() {
    const { loginWithRedirect, error, isLoading } = useAuth0();
        return (<div>
            {error && <p>Authentication Error</p>} 
            {!error && isLoading && <p>Loading...</p>}
            {!error && !isLoading && <button onClick={() => {loginWithRedirect();}}>Log In</button>}
        </div>)
}