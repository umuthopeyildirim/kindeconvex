"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React from "react";

import { ReactNode, useCallback, useMemo } from "react";
import { ConvexProviderWithAuth } from "convex/react";
/**
 * An async function returning the JWT-encoded OpenID Connect Identity Token
 * if available.
 *
 * `forceRefreshToken` is `true` if the server rejected a previously
 * returned token, and the client should try to fetch a new one.
 *
 * See {@link ConvexReactClient.setAuth}.
 *
 * @public
 */
export type AuthTokenFetcher = (args: {
  forceRefreshToken: boolean;
}) => Promise<string | null | undefined>;

// Until we can import from our own entry points (requires TypeScript 4.7),
// just describe the interface enough to help users pass the right type.
type IConvexReactClient = {
  setAuth(fetchToken: AuthTokenFetcher): void;
  clearAuth(): void;
};

/**
 * A wrapper React component which provides a {@link react.ConvexReactClient}
 * authenticated with Auth0.
 *
 * It must be wrapped by a configured `Auth0Provider` from `@auth0/auth0-react`.
 *
 * See [Convex Auth0](https://docs.convex.dev/auth/auth0) on how to set up
 * Convex with Auth0.
 *
 * @public
 */
export function ConvexProviderWithKinde({
  children,
  client,
}: {
  children: ReactNode;
  client: IConvexReactClient;
}) {
  return (
    <ConvexProviderWithAuth client={client} useAuth={useAuthFromKinde}>
      {children}
    </ConvexProviderWithAuth>
  );
}

export function useAuthFromKinde() {
  const { isLoading, isAuthenticated, getToken } = useKindeBrowserClient();
  const fetchAccessToken = useCallback(
    async ({ forceRefreshToken }: { forceRefreshToken: boolean }) => {
      // Here you can do whatever transformation to get the ID Token
      // or null
      // Make sure to fetch a new token when `forceRefreshToken` is true
      return await getToken({ ignoreCache: forceRefreshToken });
    },
    // If `getToken` isn't correctly memoized
    // remove it from this dependency array
    [getToken]
  );
  return useMemo(
    () => ({
      // Whether the auth provider is in a loading state
      isLoading: isLoading,
      // Whether the auth provider has the user signed in
      isAuthenticated: isAuthenticated ?? false,
      // The async function to fetch the ID token
      fetchAccessToken,
    }),
    [isLoading, isAuthenticated, fetchAccessToken]
  );
}
