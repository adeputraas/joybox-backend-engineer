require("dotenv").config();
const axios = require("axios");
const BookProvider = require("../providers/books.provider");

var dataBook = []; //master data
var user = [];
var librarian = { idUser: 1, name: "Sandy", role: "admin", bookList: dataBook };
// constructor
class Books {
  constructor(book) {
    this.subject = book.subject;
    this.title = book.title;
    this.author = book.author;
    this.edition_number = book.edition_number;
    this.bookProvider = book.provider;
  }

  getAll = async (books) => {
    try {
      const responseParse = JSON.parse(books);

      const isSubjectAlreadyInput = dataBook.length
        ? dataBook.filter((subject) => subject.key === responseParse.key)
            .length > 0
        : false;
      if (!isSubjectAlreadyInput) {
        dataBook.push({
          key: responseParse.key,
          subjectName: responseParse.name,
          bookList: responseParse.works.map((book) => {
            return {
              ...book,
              borrowed: false,
              borrowedBy: null,
              pickup_schedule: null,
            };
          }),
        });
      }
      return dataBook;
    } catch (error) {
      throw error;
    }
  };

  retrieveBookInformationBySubject = async () => {
    try {
      return new Promise((resolve, reject) => {
        let dataBookFilter = dataBook.filter(
          (book) => book.subjectName.toLowerCase() === this.subject
        );

        resolve(dataBookFilter);
      });
    } catch (error) {
      throw error;
    }
  };

  borrowBook = async (name, schedule) => {
    try {
      return new Promise((resolve, reject) => {
        let bookBySubject = dataBook.find(
          (book) =>
            book.subjectName.toLowerCase() === this.subject
        );

        if (bookBySubject) {
          let bookByTitle = bookBySubject.bookList.find((book) => {
            const isAuthorAvailable = book.authors[0].name.toLowerCase() === this.author.toLowerCase();
            const isTitleAvailable =book.title.toLowerCase() === this.title.toLowerCase();
            const isEditionNumberAvailable = book.cover_edition_key.toLowerCase() === this.edition_number.toLowerCase();
            // console.log(isAuthorAvailable, isTitleAvailable, isEditionNumberAvailable, book.title)
            if (isAuthorAvailable && isTitleAvailable && isEditionNumberAvailable) return true;
            return false;
          });

          if (bookByTitle) {
            bookByTitle.borrowed = true;
            bookByTitle.borrowedBy = name;
            bookByTitle.pickup_schedule = schedule;
          } else {
            reject({ message: `Book Not Found. Please Contact Administrator` });
          }
        } else {
          reject({ message: `Subject Not Found. Please Contact Administrator` });
        }

        resolve(bookBySubject);
      });
    } catch (error) {
      throw error;
    }
  };
}

module.exports = Books;
