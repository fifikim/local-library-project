const { getBooksBorrowedCount } = require("./home");

function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) => a.name.last < b.name.last ? -1 : 1);
}

// HELPER FUNCTION FOR getTotalNumberOfBorrows AND getBooksPossessedByAccount
function _getBorrowsByAccount(account, books) {
  return books.filter(book => {
    return book.borrows.find(borrow => borrow.id === account.id);
  });
}

function getTotalNumberOfBorrows(account, books) {
  const borrowed = _getBorrowsByAccount(account, books);
  return borrowed.length;
}

function getBooksPossessedByAccount(account, books, authors) {
  const borrowed = _getBorrowsByAccount(account, books);
  const possessed = borrowed.filter(book => book.borrows[0].id === account.id && book.borrows[0].returned === false);
  return possessed.map(book => {
    const author = authors.find(author => author.id === book.authorId);
    return {...book, author};
  });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
