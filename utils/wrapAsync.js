module.exports = (fn) => {
    return (req,res,next) => {
        fn(req,res,next) 
            .catch(err => {console.log("through wrapAsync");next(err);});
    };
};