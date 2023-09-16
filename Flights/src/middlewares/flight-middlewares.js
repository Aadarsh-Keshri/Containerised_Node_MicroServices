const {StatusCodes}=require('http-status-codes');
const {ErrorResponse}=require('../utils/common');
const AppError=require('../utils/errors/app-error')

function validateCreateRequest(req,res,next){
    if(!req.body.flightNumber){
        ErrorResponse.message='Something went wrong while creating flight';
        ErrorResponse.error=new AppError(['Flight number not found in the oncoming request in correct form'],StatusCodes.BAD_REQUEST);
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse);
    }
    if(!req.body.airplaneId){
        ErrorResponse.message='Something went wrong while creating flight';
        ErrorResponse.error=new AppError(['Airplane Id not found in the oncoming request in correct form'],StatusCodes.BAD_REQUEST);
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse);
    }
    if(!req.body.departureAirportId){
        ErrorResponse.message='Something went wrong while creating flight';
        ErrorResponse.error=new AppError(['Departure Airport Id not found in the oncoming request in correct form'],StatusCodes.BAD_REQUEST);
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse);
    }
    if(!req.body.arrivalAirportId){
        ErrorResponse.message='Something went wrong while creating flight';
        ErrorResponse.error=new AppError(['Arrival Airport Id not found in the oncoming request in correct form'],StatusCodes.BAD_REQUEST);
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse);
    }
    if(!req.body.arrivalTime){
        ErrorResponse.message='Something went wrong while creating flight';
        ErrorResponse.error=new AppError(['Arrival Time not found in the oncoming request in correct form'],StatusCodes.BAD_REQUEST);
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse);
    }
    if(!req.body.departureTime){
        ErrorResponse.message='Something went wrong while creating flight';
        ErrorResponse.error=new AppError(['Departure Time not found in the oncoming request in correct form'],StatusCodes.BAD_REQUEST);
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse);
    }
    if(!req.body.price){
        ErrorResponse.message='Something went wrong while creating flight';
        ErrorResponse.error=new AppError(['Price not found in the oncoming request in correct form'],StatusCodes.BAD_REQUEST);
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse);
    }
    if(!req.body.totalSeats){
        ErrorResponse.message='Something went wrong while creating flight';
        ErrorResponse.error=new AppError(['Total Seats not found in the oncoming request in correct form'],StatusCodes.BAD_REQUEST);
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse);
    }
    next();
}

function validateUpdateSeatsRequest(req,res,next){
    if(!req.body.seats){
        ErrorResponse.message='Something went wrong while updating flight';
        ErrorResponse.error=new AppError(['seats not found in the oncoming request in correct form'],StatusCodes.BAD_REQUEST);
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse);
    }
    next();
}

module.exports={
    validateCreateRequest,
    validateUpdateSeatsRequest
}