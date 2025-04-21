import { API_URL } from "../api"
import { setTokens } from "../api/config/tokenConfig"

export const login = async (username: string, password: string) => {
    const response = await fetch(`${API_URL}/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })

    if (!response.ok) {
        throw new Error("Login xatosi!")
    }

    const data = await response.json()

    setTokens(data.access, data.refresh)


}
export const register = async (
    username: string,
    password: string,
    email: string,
    first_name: string,
    last_name: string

) => {
    const response = await fetch(`${API_URL}/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email, first_name, last_name })
    })

    if (!response.ok) {
        throw new Error("Login xatosi!")
    }

    window.location.href = '/login'
}