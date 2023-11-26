import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const useAuthToken = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        setAccessToken(token);
      } catch (error) {
        console.error('Error getting access token', error);
        setAccessToken(null);
      }
    };

    fetchToken();
  }, [getAccessTokenSilently]);

  return accessToken;
};
