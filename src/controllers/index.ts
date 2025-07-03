import AuthService from '@/services'

class AuthController {
  static async signup() {
    await AuthService.signup()
  }

  static async signin() {
    await AuthService.signin()
  }

  static async refresh() {
    await AuthService.refresh()
  }

  static async signout() {
    await AuthService.signout()
  }
}

export default AuthController
