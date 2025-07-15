import jsonwebtoken from 'jsonwebtoken'

    export function middwAuth(request, response, next){

        const compare = userAuth(request)
        if(!compare.auth){
            return response.status(401).json({ message: "Usuario no logueado" })
        }
        request.auth = compare;
        next();
    }

    function userAuth(request){

        const jwt_token_aux = request.headers["authorization"];
        // cookies.jwt_token;
        if(!jwt_token_aux){
            return {auth: false, user: null}
        }
        const jwt_token = jwt_token_aux.split(' ')[1];
        const decodificada = jsonwebtoken.verify(jwt_token,process.env.JWT_SECRET);
        console.log(decodificada);
        return {auth: true, user: decodificada.user}

    }