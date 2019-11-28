

export class UserSession {
    public static userSession = {
        token: '',
        userInfo: null
    };
    public static createUserSession(jwt: string) {
        this.userSession.token = jwt;
        this.userSession.userInfo = JSON.parse(window.atob(jwt.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))) || {};
        
    }
    public static getUserSession() {
        return this.userSession;
    }
}