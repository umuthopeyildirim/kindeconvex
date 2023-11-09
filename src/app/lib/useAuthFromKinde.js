import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useCallback, useMemo } from "react";

export function useAuthFromKinde() {
  const { isLoading, isAuthenticated, getToken } = useKindeBrowserClient();
  const fetchAccessToken = useCallback(
    async ({ forceRefreshToken }) => {
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
