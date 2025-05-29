const db = require("../config/db");
const moment = require('moment');

exports.addFeedback = async (req, res) => {
  const { feedback, catId } = req.body;
  const query = "Insert into feedback_mst (feedback,cat_id) values (?,?)";
  try {
    db.query(query, [feedback, catId], (err, result) => {
      if (err) {
        res.status(500).json({
          errorCode: "INTERNAL_SERVER_ERROR",
          errorDetail: err.message,
          responseData: {},
          status: "ERROR",
          details: "An internal server error occurred",
          getMessageInfo: "An internal server error occurred",
        });
      } else {
        res
          .status(200)
          .json({ message: "feedback added successfully", errorCode: 1 });
      }
    });
  } catch (error) {
    res.send(error);
  }
};

exports.getAllFeedback = async (req, res) => {
  const query = `SELECT 
  feedback_mst.id, 
  feedback_mst.feedback, 
  feedback_mst.cat_id,
  feedback_mst.isReviewed,
  feedback_mst.created_date,
  category_mst.cat_name 
FROM 
  feedback_mst
INNER JOIN 
  category_mst ON category_mst.cat_id = feedback_mst.cat_id
  WHERE feedback_mst.status = 'Y'`;
  try {
    db.query(query, (err, result) => {
      if (err) {
        res.status(500).json({
          errorCode: "INTERNAL_SERVER_ERROR",
          errorDetail: err.message,
          responseData: {},
          status: "ERROR",
          details: "An internal server error occurred",
          getMessageInfo: "An internal server error occurred",
        });
      } else {
        const formattedResult = result.map(item => ({
          ...item,
          created_date: moment(item.created_date).format('D MMM YYYY, hh:mm A')
        }));
        res.status(200).json({
          message: "feedback list get successfully",
          errorCode: 1,
          data: formattedResult,
        });
      }
    });
  } catch (error) {
    res.send(error);
  }
};

exports.getAllFeedbackWithCatId = async (req, res) => {
  const {catId} = req.body;
  const query = `SELECT 
  feedback_mst.id, 
  feedback_mst.feedback, 
  feedback_mst.cat_id,
  feedback_mst.isReviewed,
  feedback_mst.created_date,
  category_mst.cat_name 
FROM 
  feedback_mst
INNER JOIN 
  category_mst ON category_mst.cat_id = feedback_mst.cat_id
  Where feedback_mst.cat_id = ? and feedback_mst.status = 'Y'`;
  try {
    db.query(query, [catId], (err, result) => {
      if (err) {
        res.status(500).json({
          errorCode: "INTERNAL_SERVER_ERROR",
          errorDetail: err.message,
          responseData: {},
          status: "ERROR",
          details: "An internal server error occurred",
          getMessageInfo: "An internal server error occurred",
        });
      } else {
        const formattedResult = result.map(item => ({
          ...item,
          created_date: moment(item.created_date).format('D MMM YYYY, hh:mm A')
        }));
        res.status(200).json({
          message: "feedback list get successfully",
          errorCode: 1,
          data: formattedResult,
        });
      }
    });
  } catch (error) {
    res.send(error);
  }
};


exports.reviewedFeedback = async (req, res) => {
  const { id } = req.params;
  const query = "update feedback_mst set isReviewed = 'Y' where id = ?";
  try {
    db.query(query, [id], (err, result) => {
      if (err) {
        res.status(500).json({
          errorCode: "INTERNAL_SERVER_ERROR",
          errorDetail: err.message,
          responseData: {},
          status: "ERROR",
          details: "An internal server error occurred",
          getMessageInfo: "An internal server error occurred",
        });
      } else {
        res
          .status(200)
          .json({ message: "feedback reviewed successfully", errorCode: 1 });
      }
    });
  } catch (error) {
    res.send(error);
  }
};


exports.deleteFeedback = async (req, res) => {
  const { feedbackId } = req.body;
  const query = "update feedback_mst set status = 'N' where id = ?";
  try {
    db.query(query, [feedbackId], (err, result) => {
      if (err) {
        res.status(500).json({
          errorCode: "INTERNAL_SERVER_ERROR",
          errorDetail: err.message,
          responseData: {},
          status: "ERROR",
          details: "An internal server error occurred",
          getMessageInfo: "An internal server error occurred",
        });
      } else {
        res
          .status(200)
          .json({ message: "feedback deleted successfully", errorCode: 1 });
      }
    });
  } catch (error) {
    res.send(error);
  }
};