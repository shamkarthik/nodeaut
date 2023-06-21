import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { PublicClientApplication, EventType } from '@azure/msal-browser';
import { msalConfig } from './msalConfig';

const MsalWrapper: React.FC = ({ children }) => {
  const { instance, accounts, inProgress } = useMsal();
  const account = accounts[0] || null;

  useEffect(() => {
    if (!account && !inProgress && !instance.getActiveAccount()) {
      instance.loginRedirect();
    }
  }, [account, inProgress, instance]);

  useEffect(() => {
    if (account && !inProgress) {
      instance.setActiveAccount(account);
    }
  }, [account, inProgress, instance]);

  return (
    <MsalProvider instance={instance}>
      <AuthenticatedTemplate>{children}</AuthenticatedTemplate>
      <UnauthenticatedTemplate>Loading...</UnauthenticatedTemplate>
    </MsalProvider>
  );
};

const pca = new PublicClientApplication(msalConfig);

export const MsalWrapperWithAuth = () => {
  return (
    <MsalWrapper>
      <App />
    </MsalWrapper>
  );
};
