const Books = require("../models/books.model.js");
const validateRequest = require("../validator/books.validator");

class UseCaseBooks {
  constructor(booksProvider) {
    this.booksProvider = booksProvider;
  }

  findAll = async (dto) => {
    try {
      const retrieveValidRequest = await validateRequest.readBySubject(dto);

      const response = await this.booksProvider.retrieveBySubject(retrieveValidRequest);
      const book = new Books(retrieveValidRequest);
      const books = await book.getAll(response);
      return books;
    } catch (error) {
      throw error;
    }
  };

  retrieveBookInformationByAdmin = async (dto) => {
    try {
      const retrieveValidRequest = await validateRequest.readBySubject(dto);

      const book = new Books(retrieveValidRequest);

      const response = await book.retrieveBookInformationBySubject();
      return response;
    } catch (error) {
      throw error;
    }
  };

  userBorrowBook = async (dto) => {
    try {
      const retrieveValidRequest = await validateRequest.borrowBook(dto);

      const book = new Books(retrieveValidRequest);

      const response = await book.borrowBook(
        retrieveValidRequest.name,
        retrieveValidRequest.pickup_schedule
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = UseCaseBooks;
