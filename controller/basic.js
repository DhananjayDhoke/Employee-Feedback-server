const db = require("../config/db")

exports.getCategory = async (req, res) => {
   
   const query = 'select cat_id, cat_name from category_mst where status = "Y" order by display_order'
   try {
     db.query(query,(err, result) => {
       if (err) {
         res.status(500).json({
           errorCode: "INTERNAL_SERVER_ERROR",
           errorDetail: err.message,
           responseData: {},
           status: "ERROR",
           details: "An internal server error occurred",
           getMessageInfo: "An internal server error occurred"
         });
       }
       else{
         res.status(200).json({message:'fetch category list successfully',errorCode:1,data:result});
       } 
     });
   } catch (error) {
     res.send(error)
   }
  };
