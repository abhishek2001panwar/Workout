import express from 'express'
const router = express.Router()
import { registerUser, loginUser, logoutUser} from '../controllers/user.controller.js'
//register route
router.post('/signup', registerUser )

//login route

router.post('/login', loginUser )
router.get('logout', logoutUser)
export { router}