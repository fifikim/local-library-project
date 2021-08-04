function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const booksOut = books.filter(book => book.borrows[0].returned === false);
  const booksReturned = books.filter(book => book.borrows[0].returned === true); 
  return [booksOut, booksReturned];
}

function getBorrowersForBook(book, accounts) {
  let borrowers = book.borrows.map((borrowEntry) => {
    const acct = accounts.find(account => account.id === borrowEntry.id);
    return {...borrowEntry, ...acct};
  });
  return (borrowers.length > 10) ? borrowers.slice(0, 10) : borrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
