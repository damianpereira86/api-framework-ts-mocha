export class SessionManager {
  private static authTokenCache: { [key: string]: string | null } = {};

  static getCachedToken(username: string, password: string): string | null {
    const cacheKey = `${username}:${password}`;
    return SessionManager.authTokenCache[cacheKey] || null;
  }

  static storeToken(username: string, password: string, token: string): void {
    const cacheKey = `${username}:${password}`;
    SessionManager.authTokenCache[cacheKey] = token;
  }
}
