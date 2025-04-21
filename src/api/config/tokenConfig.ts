export const setTokens = (access: string, refresh: string): void => {
    localStorage.setItem('accessToken', access)
    localStorage.setItem('refreshToken', refresh)
}