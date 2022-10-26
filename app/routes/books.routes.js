module.exports = app => {
    const book = require("../controllers/books.controller.js");
  
    var router = require("express").Router();
  
    // Create a new activity's
    router.post("/user-borrow-book", book.userBorrowBook);
  
    // Retrieve all activity's
    router.get("/books/:subject", book.findAll);
  
    // Retrieve One activity's with id
    router.get("/book-information/:subject", book.retrieveBookInformationByAdmin);
  
    // // Update a activity's with id
    // router.patch("/activity-groups/:id", activity.update);
  
    // // Delete a activity's with id
    // router.delete("/activity-groups/:id", activity.deleteOne);
  
    app.use('/', router);
  };
  