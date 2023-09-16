const {StatusCodes}=require('http-status-codes');
const {ErrorResponse}=require('../utils/common');
const AppError=require('../utils/errors/app-error')

function validateCreateRequest(req,res,next){
    if(!req.body.name){
        ErrorResponse.message='Something went wrong while creating city';
        ErrorResponse.error=new AppError(['City name not found in the incoming request in correct form'],StatusCodes.BAD_REQUEST);
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse);
    }
    next();
}

function validateUpdateRequest(req,res,next){
    if(!req.body.name){
        ErrorResponse.message='Something went wrong while updating city';
        ErrorResponse.error=new AppError(['City name not found in the oncoming request in correct form'],StatusCodes.BAD_REQUEST);
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse);
    }
    next();
}

module.exports={
    validateCreateRequest,
    validateUpdateRequest
}