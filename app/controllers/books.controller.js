const BookProvider = require("../providers/books.provider");
const UseCaseBooks = require("../use-cases/books.use-case");

const provider = new BookProvider(process.env.API_LIBRARY);
const UseCase = new UseCaseBooks(provider);

exports.findAll = async (req, res) => {
  try {
    const response = await UseCase.findAll(req.params);
    res.status(200).send({
      status: "Success",
      message: "Success",
      data: response,
    });
  } catch (error) {
    res.status(400).send({ status: "Bad Request", message: error.message });
  }
};

exports.retrieveBookInformationByAdmin = async (req, res) => {
  try {
    const response = await UseCase.retrieveBookInformationByAdmin(req.params);

    res.status(200).send({
      status: "Success",
      message: "Success",
      data: response,
    });
  } catch (error) {
    res.status(400).send({ status: "Bad Request", message: error.message });
  }
};

exports.userBorrowBook = async (req, res) => {
  try {
    const response = await UseCase.userBorrowBook(req.body);

    res.status(200).send({
      status: "Success",
      message: "Success",
      data: response,
    });
  } catch (error) {
    res.status(404).send({ status: "Not Found", message: error.message });
  }
};
