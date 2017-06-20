var globalHelper = require('../helper/globalHelper');
var db = require('../helper/dbconfig');

exports.getcustomer= function(req,res){
    var collection = db.get().collection('customer');
    collection.find().toArray(function(err, customer) {
        if (err || !customer || customer.length <= 0) {
            globalHelper.globalErrorMsg(res, 'NOT_FOUND', 'response are not found');
        } else {
            res.json(customer);
        }
    })
};

exports.getcustomerDetails = function(req,res){
    var collection = db.get().collection('customer');
    collection.findOne({"_id": db.findId(req.params.id)}, function(err, customer) {
        if (err || !customer || customer.length <= 0) {
            globalHelper.globalErrorMsg(res, 'NOT_FOUND', 'category are not found');
        } else {
            res.json(customer);
        }
    });
};

exports.savecustomer = function(req,res){
    var collection = db.get().collection('customer');
    collection.findOne({
      name: req.body.name
    },function(err, customer) {
        if (err) throw err;
        if (!customer) {
           globalHelper.globalErrorMsg(res, 'EXISTS', req.body.name+' data all ready exists');
        } else {
          var	newstuff = {};
        	newstuff.name=req.body.name;
        	newstuff.Mobile=req.body.Mobile;
          newstuff.Email=req.body.Email;
          newstuff.noofpeople=req.body.noofpeople;
	        newstuff.createdDate=req.body.Date;
          newstuff.createdTime=req.body.Time;

        	collection.insertOne(newstuff, function(err, result){
			globalHelper.globalSuccessMsg(res, 'INSERTED','Booking sucessfull');
    });
  }
  	});
}

exports.updatecustomer = function(req,res){
    var collection = db.get().collection('customer');
    collection.update(
        { '_id' : db.findId(req.params.id) },
        { $set: req.body },
        function (err, results) {
            if (err) throw err;
            if ( results.result.nModified === 1 ) {
                globalHelper.globalSuccessMsg(res, 'UPDATED', 'response updated successfully!');
            } else {
                globalHelper.globalErrorMsg(res, 'NOT_FOUND', 'response not found');
            }
        }
    );
};

exports.deletecustomer = function(req,res){
    var db = req.db;
  	db.collection('customer').removeById(req.params.id,function(err, result) {
      if (err) throw err;
      if ( result === 1 ) {
        globalHelper.globalSuccessMsg(res, 'DELETED', 'customer deleted successfully!');
       } else {
	    globalHelper.globalErrorMsg(res, 'NOT_FOUND', 'customer not found');
      }
  	});

}
