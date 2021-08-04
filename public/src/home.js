const { partitionBooksByBorrowedStatus, findBookById } = require("./books");

// HELPER FUNCTIONS:

function _sortBy(booksArr, property) {
  return booksArr.reduce((acc, book) => {
    let sortKey = book[property];
    if (acc[sortKey]) {
      acc[sortKey].count += 1;
    } else {
      acc[sortKey] = {
        name: sortKey, 
        count: 1
      };
    }
    return acc;
  }, {});
}

function _countBorrows(booksArr, property) {
  return booksArr.reduce((acc, book) => {
    let sortKey = book[property];
    if (acc[sortKey]) {
      acc[sortKey].count += book.borrows.length;
    } else {
      acc[sortKey] = {
        name: sortKey, 
        count: book.borrows.length
      };
    }
    return acc;
  }, {});
}

function _getMostPopular(obj) {
  const counts = Object.values(obj);
  let sortedCount = counts.sort((keyA, keyB) => keyA.count > keyB.count ? -1 : 1);
  return (sortedCount.length > 5) ? sortedCount.slice(0, 5) : sortedCount;
}

function _getFullName(authors, id) {
  const { name: {first, last} } = authors.find(author => author.id === id);
  return `${first} ${last}`;
}

// FUNCTIONS:
function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let booksOut = books.filter(book => book.borrows[0].returned === false);
  return booksOut.length;
}

function getMostCommonGenres(books) {
  const sortByGenre = _sortBy(books, 'genre');
  return _getMostPopular(sortByGenre);
}

function getMostPopularBooks(books) {
  const sortByBorrows = _countBorrows(books, 'title');
  return _getMostPopular(sortByBorrows);
}

function getMostPopularAuthors(books, authors) {
  const sortByBorrows = _countBorrows(books, 'authorId');
  const mostPopularIds = _getMostPopular(sortByBorrows);
  return mostPopularIds.map(obj => {
    return {
      name: _getFullName(authors, obj.name), 
      count: obj.count
    };
  });
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
