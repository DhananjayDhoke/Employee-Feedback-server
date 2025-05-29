const express = require("express");
const { getAllFeedback, addFeedback, deleteFeedback, reviewedFeedback, getAllFeedbackWithCatId } = require("../controller/feedback");

const router = express.Router();

router.get('/',getAllFeedback);
router.post('/',addFeedback);
router.post('/delete',deleteFeedback);
router.patch('/:id/reviewed',reviewedFeedback);
router.post('/catId',getAllFeedbackWithCatId);



module.exports= router;