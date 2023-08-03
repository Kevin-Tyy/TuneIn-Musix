class AuthController {
    loginfail = (req, res) => {
        res.status(400).json({ msg : 'Something went wrong'})
    }
    loginSuccess = (req, res) => {
        res.status(200).json({ msg : 'Login successfull' })
    }
    callback = (req, res) => {
        res.json({ msg : 'you reached callback' })
    }
}
export default new AuthController();