import jwt from 'jsonwebtoken';

//Create token for user request validation
const createToken = (id, isAdmin) => {
  try {
    const token = jwt.sign({ userId: id, isAdmin: isAdmin }, process.env.SECRET, {
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
    error.message = 'Acesso não autorizado.';
    error.auth = true;
    throw error;
  }
};

const getTokenProperties = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    return { userId: decoded.userId, isAdmin: decoded.isAdmin };
  } catch (error) {
    error.message = 'Acesso não autorizado.';
    error.auth = true;
    throw error;
  }
};

export default { createToken, checkToken, getTokenProperties };
