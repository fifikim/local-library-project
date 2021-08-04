const { partitionBooksByBorrowedStatus, findBookById } = require("./books");

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

// HELPER FUNCTION FOR getMostCommonGenres, getMostPopularBooks, getMostPopularAuthors

function _sortBy(booksArray, property, countBorrows = false) {
  const grouped = booksArray.reduce((acc, book) => {
    let sortKey = book[property];
    let increment;
    countBorrows ? increment = book.borrows.length : increment = 1;
    acc[sortKey] ? acc[sortKey].count += increment : acc[sortKey] = {name: sortKey, count: increment};
    return acc;
  }, {});
  const counts = Object.values(grouped);
  let sortedCount = counts.sort((keyA, keyB) => keyA.count > keyB.count ? -1 : 1);
  return sortedCount.length > 5 ? sortedCount.slice(0, 5) : sortedCount;
}

function getMostCommonGenres(books) {
  return _sortBy(books, 'genre');
}

function getMostPopularBooks(books) {
  return _sortBy(books, 'title', true);
}

function getMostPopularAuthors(books, authors) {
  const popularAuthors = _sortBy(books, 'authorId', true);
  return popularAuthors.map(obj => {
    const { name: {first, last} } = authors.find(author => author.id === obj.name);
    return {name: `${first} ${last}`, count: obj.count};
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
