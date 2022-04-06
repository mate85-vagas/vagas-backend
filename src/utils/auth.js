import jwt from 'jsonwebtoken';

//Create token for user request validation
const createToken = (id) => {
  try {
    const token = jwt.sign({ userId: id }, process.env.SECRET, {
      expiresIn: 7200 // expires in 2h
    });
    return token;
  } catch (error) {
    error.message = 'Ocorreu um erro.';
    throw error;
  }
};

//Validates token and token's userId
const checkToken = (id, token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    if (decoded.userId != id) throw new Error();
  } catch (error) {
    error.message = 'Acesso não autorizado';
    throw error;
  }
};

//Validates token and return user id
const checkTokenAndReturnId = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    return decoded.userId;
  } catch (error) {
    error.message = 'Acesso não autorizado';
    throw error;
  }
};

export default { createToken, checkToken, checkTokenAndReturnId };
