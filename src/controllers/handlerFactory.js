
exports.createOne = Model => async (obj) => {
    try{
        console.log(obj)
        const doc = await Model.create(obj);
    } catch (err) {
        console.log(err)
    }
};

exports.getOne = (Model) => async (id) => {
    let product;
    try {
        product = await Model.findById(id);
    } catch (err) {
        console.log(err)
    }
    return product;
}

// exports.deleteOne = Model => catchAsync(async (req, res, next) => {
//     const doc = await Model.findByIdAndDelete(req.params.id);
//     if (!doc) {
//         return next(new AppError('No document found at that ID', 404));
//     }
//     await res.status(204).json({
//         status: 'success',
//         data: null
//     });
// });
// exports.updateOne = Model => catchAsync(async (req, res, next) => {
//     const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true
//     });
//     if (!doc) {
//         return next(new AppError('No document found at that ID', 404));
//     }
//     await res.status(200).json({
//         status: 'success',
//         data: {
//             data: doc
//         }
//     });
// });
//
// exports.getAll = (Model ) => catchAsync(async (req, res, next) => {
//     // To allow for nested Get reviews on tour
//     let filter = {};
//     if (req.params.tourId) filter = { tour: req.params.tourId };
//
//     const features = new APIFeatures(Model.find(filter), req.query)
//         .filter()
//         .sort()
//         .limitFields()
//         .paginate();
//     const doc = await features.query;
//     await res.status(200).json({
//         status: 'success',
//         requestedAt: req.requestTime,
//         results: doc.length,
//         data: {
//             data: doc
//         }
//     });
// });