import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "./msalConfig";

function UserImage() {
  const { instance, accounts } = useMsal();

  const getUserImage = async () => {
    try {
      const response = await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0] // Assuming you have only one account
      });
      console.log("Access token acquired:", response.accessToken);

      const graphResponse = await fetch(
        "https://graph.microsoft.com/v1.0/me/photo/$value",
        {
          headers: {
            Authorization: `Bearer ${response.accessToken}`
          }
        }
      );
      if (graphResponse.ok) {
        const blob = await graphResponse.blob();
        const imageUrl = URL.createObjectURL(blob);
        console.log("User image URL:", imageUrl);
        // Do something with the image URL
      } else {
        console.error("Failed to fetch user image:", graphResponse.statusText);
      }
    } catch (error) {
      console.error("Failed to acquire token
