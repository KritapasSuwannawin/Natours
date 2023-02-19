const Review = require('./../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) {
    filter = { tour: req.params.tourId };
  }

  const features = new APIFeatures(Review.find(filter), req.query).filter().sort().limitFields().paginate();
  // const doc = await features.query.explain();
  const reviews = await features.dbQuery;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      data: reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  if (!req.body.tour) {
    req.body.tour = req.params.tourId;
  }

  if (!req.body.user) {
    req.body.user = req.user.id;
  }

  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: newReview,
    },
  });
});
