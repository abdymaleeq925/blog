import jwt from 'jsonwebtoken';

/**
 * Authentication middleware — verifies JWT token from Authorization header.
 * Attaches `userId` to the request object on success.
 */
export default (request, response, next) => {
  const token = (request.headers.authorization || '').replace(/Bearer\s?/, '');

  if (!token) {
    return response.status(401).json({ message: 'Authorization token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.userId = decoded._id;
    next();
  } catch (error) {
    return response.status(401).json({ message: 'Invalid or expired token' });
  }
};