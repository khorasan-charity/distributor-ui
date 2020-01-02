import { UserManager, WebStorageStateStore } from 'oidc-client'

class AuthService {
  constructor() {
    this.userManager = new UserManager({
      userStore: new WebStorageStateStore({ store: window.localStorage }),
      authority: "https://id.skyth.ir",
      client_id: "mahak-dist-spa",
      redirect_uri: "http://localhost:8080/#/callback",
      response_type: "code",
      scope: "openid profile mahak.dist",
      post_logout_redirect_uri: "http://localhost:8080/#/",
    })
  }

  login() {
    return this.userManager.signinRedirect()
  }

  logout() {
    return this.userManager.signoutRedirect()
  }

  getUser() {
    return this.userManager.getUser()
  }

  signinRedirectCallback() {
    return this.userManager.signinRedirectCallback()
  }
}

export default AuthService
