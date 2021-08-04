function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) => a.name.last < b.name.last ? -1 : 1);
}

function getTotalNumberOfBorrows(account, books) {
  const borrowed = books.filter(book => {
    return book.borrows.find(borrow => borrow.id === account.id);
  })
  return borrowed.length;
}

function getBooksPossessedByAccount(account, books, authors) {
  return books.reduce((acc, book) => {
    for (let borrow of book.borrows) {
      if (borrow.id === account.id && borrow.returned === false) {
        const author = authors.find(author => (author.id === book.authorId));
        acc.push({...book, author});
      }
    }
    return acc;
  }, [])
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
