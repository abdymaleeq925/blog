import jwt from 'jsonwebtoken'; 

export default (request, response, next) => {
    const token = (request.headers.authorization || '').replace(/Bearer\s?/, '');
    if (token) {
        try {
            const decodedToken = jwt.verify(token, 'secretkey');
            request.userId = decodedToken._id;
            // return response.status(200).json(decodedToken);
            next();
        } catch(error){
            response.status(402).json({
                message: 'No access'
            })
        }
    } else {
        response.status(403).json({
            message: 'No valid access'
        })
    }
    

    
}