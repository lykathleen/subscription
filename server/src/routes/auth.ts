import express from 'express';
import { body, validationResult } from 'express-validator';
import User from '../../models/user';

const router = express.Router();

router.post('/signup', 
  body('email').isEmail().withMessage("The emaail is invalid"),
  body('password').isLength({ min: 5 }).withMessage("The password must be five characters long"),
  
  async (req: express.Request , res: express.Response) => {

  const validationErrors = validationResult(req);
  if(!validationErrors.isEmpty()){
    const errors = validationErrors.array().map(error => {
      return {
        msg: error.msg
      }
    });
    return res.json({errors, data: null})
  }

  const { email, password } = req.body;

  const user = await User.findOne({email})
  if(user){
    return res.json({
      errors: [
        {
          msg: "Email already exists"
        }
      ],
      data: null
    });
  }
  res.send(user)
})

export default router;