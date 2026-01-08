import { google } from "googleapis";

export function getOAuth2Client(clientId: string, clientSecret: string, redirectUri: string) {
  return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
}
