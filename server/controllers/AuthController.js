class AuthController {
    Signin = async (req , res) => {
        res.send(req.body)
    }
}
export default new AuthController();