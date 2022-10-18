import express from 'express';
import { body, validationResult } from 'express-validator';

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
    return res.json({errors})
  }

  const { email, password } = req.body;

  res.json({
    email,
    password,
  });
  
  res.send("SIGNUP ROUTE")
})

export default router;