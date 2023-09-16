const {UserRepository,RoleRepository}=require('../repositories');
const { Auth, Enums} = require('../utils/common');

const AppError=require('../utils/errors/app-error');
const {StatusCodes}=require('http-status-codes');

const userRepo=new UserRepository();
const roleRepo=new RoleRepository();

async function create(data){
    try {
        const user=await userRepo.create(data);
        const role=await roleRepo.getRoleByName(Enums.USER_ROLES_ENUMS.CUSTOMER);
        user.addRole(role);
        return user;
    } catch (error) {
        if(error.name=='SequelizeValidationError' || error.name=='SequelizeUniqueConstraintError'){
            
            let explanation=[];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new user object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function signin(data){
    try {
        const user=await userRepo.getUserByEmail(data.email);
        if(!user){
            throw new AppError('No user found for the given email',StatusCodes.NOT_FOUND);
        }
        const passwordMatch=Auth.checkPassword(data.password,user.password);
        if(!passwordMatch){
            throw new AppError('Invalid password',StatusCodes.BAD_REQUEST);
        }
        const jwt=Auth.createToken({id: user.id,email: user.email});
        return jwt;
    } catch (error) {
        if(error instanceof AppError) throw error;
        console.log(error);
        throw new AppError('Something went wrong',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function isAuthenticated(token){
    try {
        if(!token){
            throw new AppError('Missing JWT Token',StatusCodes.BAD_REQUEST);
        }
        const response=Auth.veryToken(token);   //Eg: response={ id: 7, email: 'halwa@gmail.com', iat: 1688746224, exp: 1688749824 }
        const user= await userRepo.get(response.id);
        if(!user){
            throw new AppError('No user found',StatusCodes.BAD_REQUEST);
        }
        return user.id;
    } catch (error) {
        if(error instanceof AppError) throw error;
        if(error.name=='JsonWebTokenError'){
            throw new AppError('Invalid JWT Token',StatusCodes.BAD_REQUEST);
        }
        if(error.name=='TokenExpiredError'){
            throw new AppError('JWT Token expired',StatusCodes.BAD_REQUEST);
        }
        console.log(error);
        throw error;
    }
}

async function addRoleToUser(data){
    try {
        const user= await userRepo.get(data.id);
        if(!user){
            throw new AppError('No user found for given id',StatusCodes.NOT_FOUND);
        }
        const role=await roleRepo.getRoleByName(data.role);
        if(!role){
            throw new AppError('No user found for given role',StatusCodes.NOT_FOUND);
        }
        user.addRole(role);
        return user;
    } catch (error) {
        if(error instanceof AppError) throw error;
        console.log(error);
        throw new AppError('Something went wrong',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function isAdmin(id){
    try {
        const user= await userRepo.get(id);
        if(!user){
            throw new AppError('No user found for given id',StatusCodes.NOT_FOUND);
        }
        const adminrole=await roleRepo.getRoleByName(Enums.USER_ROLES_ENUMS.ADMIN);
        if(!adminrole){
            throw new AppError('No user found for given role',StatusCodes.NOT_FOUND);
        }
        return user.hasRole(adminrole);
    } catch (error) {
        if(error instanceof AppError) throw error;
        console.log(error);
        throw new AppError('Something went wrong',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    create,
    signin,
    isAuthenticated,
    addRoleToUser,
    isAdmin
}