export class RefreshTokenInvalidException extends Error {
    constructor(msg?: string) {
        super(msg || 'Refresh Token invalid');
    }
}