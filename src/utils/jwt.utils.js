import { jwtDecode } from 'jwt-decode';
    
export function isTokenValid(token) {
    try {
        const decodedToken = jwtDecode(token);
        if (!decodedToken.exp) return false;
        return decodedToken.exp * 1000 > Date.now();
    } catch {
        return false;
    }
}