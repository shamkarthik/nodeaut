// authProvider.tsx
import { useState, useEffect } from 'react';
import { MsalProvider, useMsal } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './authConfig';

const msalInstance = new PublicClientApplication(msalConfig);

export const AuthProvider: React.FC = ({ children }) => {
  const { instance, accounts } = useMsal();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const login = async () => {
      if (accounts.length === 0) {
        instance.loginRedirect();
      } else {
        setAuthenticated(true);
      }
    };

    login();
  }, [instance, accounts]);

  return (
    <MsalProvider instance={msalInstance}>
      {authenticated && children}
    </MsalProvider>
  );
};
