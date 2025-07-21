"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    };
};
// const catchAsync = (fn:RequestHandler) => {
//     return async (req:Request,res:Response,next:NextFunction) => {
//         try {
//             fn(req,res,next)
//           } catch (error) {
//             console.log('error - hoice',error)
//             next(error);
//           }
//     }
// }
// export default catchAsync;
exports.default = catchAsync;
