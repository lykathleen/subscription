import express from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import { checkAuth } from '../middleware/checkAuth';

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

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validating whether user exists
  const user = await User.findOne({email});

  if(!user){
    return res.json({
      errors: [
        {
          msg: "User does not exist"
        }
        ],
      data: null
    })
  }

  // Comparing password and db password
  const isMatch = await bcrypt.compare(password, user.password)
  if(!isMatch){
    return res.json({
      errors: [
        {
          msg: "Invalid credentials"
        }
        ],
      data: null
    })
  }

  // If all good, return jwt
  const token = await JWT.sign(
    {email: user.email},
    process.env.JWT_SECRET as string,
    {
      expiresIn: 360000
    }
  );

  return res.json({
    errors: [],
    data: {
      token,
      user: {
        is: user._id,
        email: user.email
      }
    }
  })

})

// Intercepting request to check if authenticated
router.get('/me', checkAuth, async (req, res) => {
  res.send("ME ROUTE")
});

export default router;