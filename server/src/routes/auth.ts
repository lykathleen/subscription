import express from 'express';
import { body, validationResult } from 'express-validator';
import User from '../../models/user';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

const router = express.Router();

router.post('/signup', 
  body('email').isEmail().withMessage("The emaail is invalid"),
  body('password').isLength({ min: 5 }).withMessage("The password must be five characters long"),
  
  async (req: express.Request , res: express.Response) => {

  // Checking validation
  const validationErrors = validationResult(req);
  // Throw error if the email and password is not validated
  if(!validationErrors.isEmpty()){
    const errors = validationErrors.array().map(error => {
      return {
        msg: error.msg
      }
    });
    return res.json({errors, data: null})
  }

  const { email, password } = req.body;

  // Check to see if there is the same email in db
  const user = await User.findOne({email})
  // Throw error if there is
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

  // Hashing the pw
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create the new user and add to db with hashed pw
  const newUser = await User.create({
    email,
    password: hashedPassword
  });

  // Create token
  const token = await JWT.sign(
    {email: newUser.email},
    process.env.JWT_SECRET as string,
    {
      expiresIn: 360000
    }
  );

  res.json({
    errors: [],
    data: {
      token,
      user: {
        id: newUser._id,
        email: newUser.email
      }
    }
  })

  // Send back the response with user object
  res.send(user)
})

export default router;