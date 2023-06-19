
import { User } from "../models/Users.js";
import { generateToken } from "../utils/tokenManager.js";



export const profileInfo = async (req, res) => {
  const {uid} = req
  
    try {
    
    const {_id, name, email} = await User.findById( uid ).lean()//devuelve objeto puro de jS, se hace mas ligero para nuestro sistema
    return res.status(200).json({ _id, name, email })
    
  } catch (error) {
    return res.status(500).json('error de servidor a nivel de token')
    console.log(error)
  }
  
}





export const login = async (req, res) => {
  const { email, password } = req.body;


  try {

  let user = await User.findOne({ email })

  if(!user) throw new Error('usuario no existente')

  const reqPassword = await user.comparePassword(password)//esto es una promesa, retorna true o false, por eso el uso del await

  if(!reqPassword)  return res.status(400).json({error: "contraseña incorrecta"})//bad request
  //else  res.status(400).json('pass no ok')

  const { token, expiresIn } = generateToken(user._id)

   
  return res.cookie("token", token, {sameSite: "none", secure: "true"}).json( user );

  
  } catch (error) {
    return res.status(404).json({error: error.message})
  }
};


//El código HTTP 422 significa «Entidad no procesable




export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ email }); //throw new Error('ya existe este usuario')

    user = new User({ name, email, password });

    await user.save();

    const { token, expiresIn } = generateToken(user._id)

   
  return res.cookie("token", token, {sameSite: "none", secure: "true"}).json( user );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  // res.json({name, email, password})
};


//otros codigos


/*if(reqPassword){


jwt.sign({user.email, user._id}, jwt_secret, {}, (err, token) => {
  if(err) throw err
  res.cookie("token", token).json('pass ok')
})

}else{
  res.status(422).json('pass not ok')
}*/

export const logout = async (req, res) => {
  res.cookie("token", "").json('token elimiinada')
  
 
  }