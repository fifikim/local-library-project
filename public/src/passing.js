// BOOKS

function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let booksOut = books.filter(book => book.borrows[0].returned === false);
  let booksReturned = books.filter(book => book.borrows[0].returned === true); 
  return [booksOut, booksReturned];
}

function getBorrowersForBook(book, accounts) {
  let borrowArr = [];
  for (let borrow of book.borrows) {
    let {picture, age, name, company, email, registered} = accounts.find(account => account.id === borrow.id);
    let accountObj = {
      id: borrow.id,
      returned: borrow.returned,
      picture,
      age,
      name,
      company,
      email,
      registered
    }
    if (borrowArr.length < 10) {
      borrowArr.push(accountObj);
    }
  }
  return borrowArr;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

// ACCOUNTS

function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) => a.name.last < b.name.last ? -1 : 1);
}

function getTotalNumberOfBorrows(account, books) {
  let acc = 0;
  for (let book of books) {
    for (let borrow of book.borrows) {
      if (borrow.id == account.id) {
        acc += 1;
      }
    }
  }
  return acc;
}

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((acc, book) => {
    for (let borrow of book.borrows) {
      if (borrow.id === account.id) {
        acc++;
      }
    }
    return acc;
  }, 0);
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

// HOME

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
/*
function getMostCommonGenres(books) {
  let sortByGenre = books.reduce((acc, book) => {
    let genre = book.genre;
    if (acc[genre]) {
      acc[genre].count += 1;
    } else {
      acc[genre] = {
        name: genre,
        count: 1
      };
    }
    return acc;
  }, {});

  let genreObjects = Object.values(sortByGenre);

  let sortedCount = genreObjects.sort((genreA, genreB) => {
    return genreA.count > genreB.count ? -1 : 1;
  });

  if (sortedCount.length > 1) {
    sortedCount = sortedCount.slice(0, 5);
  }

  return sortedCount;
}

function getMostPopularBooks(books) {
  let sortByBorrows = books.reduce((acc, book) => {
    let title = book.title;
    let borrows = book.borrows.length;
    acc[title] = {
      name: book.title,
      count: borrows
    };
    return acc;
  }, {});

  let borrowObjects = Object.values(sortByBorrows);

  let sortedCount = borrowObjects.sort((bookA, bookB) => {
    return bookA.count > bookB.count ? -1 : 1;
  });

  if (sortedCount.length > 1) {
    sortedCount = sortedCount.slice(0, 5);
  }

  return sortedCount;
}

function getMostPopularAuthors(books, authors) {
  let sortByBorrows = books.reduce((acc, book) => {
    let borrows = book.borrows.length;
    let authorId = book.authorId;
    if (acc[authorId]) {
      acc[authorId].borrows += borrows;
    } else {
      let currAuthor = authors.find(author => author.id === authorId);
      let { name } = currAuthor;
      let { first, last } = name;
      acc[authorId] = {
        name: `${first} ${last}`,
        count: borrows
      }
    }
    return acc;
  }, {});

  let borrowObjects = Object.values(sortByBorrows);

  let sortedCount = borrowObjects.sort((bookA, bookB) => {
    return bookA.count > bookB.count ? -1 : 1;
  });

  if (sortedCount.length > 1) {
    sortedCount = sortedCount.slice(0, 5);
  }

  return sortedCount;
}


function getMostCommonGenres(books) {
  const sortByGenre = books.reduce((acc, book) => {
    const genre = book.genre;
    if (acc[genre]) {
      acc[genre].count += 1;
    } else {
      acc[genre] = {
        name: genre,
        count: 1
      };
    }
    return acc;
  }, {});

  const genreCounts = Object.values(sortByGenre);
  let sortedCount = genreCounts.sort((genreA, genreB) => genreA.count > genreB.count ? -1 : 1);

  if (sortedCount.length > 5) {
    sortedCount = sortedCount.slice(0, 5);
  };
  return sortedCount;
}

function getMostPopularBooks(books) {
  const sortByBorrows = books.reduce((acc, book) => {
    const title = book.title;
    const borrows = book.borrows.length;
    acc[title] = {
      name: book.title,
      count: borrows
    };
    return acc;
  }, {});

  const borrowCounts = Object.values(sortByBorrows);
  let sortedCount = borrowCounts.sort((bookA, bookB) => bookA.count > bookB.count ? -1 : 1);

  if (sortedCount.length > 5) {
    sortedCount = sortedCount.slice(0, 5);
  };
  return sortedCount;
}

function getMostPopularAuthors(books, authors) {
  const sortByBorrows = books.reduce((acc, book) => {
    const borrows = book.borrows.length;
    const authorId = book.authorId;
    if (acc[authorId]) {
      acc[authorId].borrows += borrows;
    } else {
      const currAuthor = authors.find(author => author.id === authorId);
      const { name } = currAuthor;
      acc[authorId] = {
        name: `${name.first} ${name.last}`,
        count: borrows
      };
    };
    return acc;
  }, {});

  const borrowCounts = Object.values(sortByBorrows);
  let sortedCount = borrowCounts.sort((bookA, bookB) => bookA.count > bookB.count ? -1 : 1);

  if (sortedCount.length > 5) {
    sortedCount = sortedCount.slice(0, 5);
  };
  return sortedCount;
}
*/
function getMostPopular(obj) {
  const countsArr = Object.values(obj);
  let sortedCount = countsArr.sort((elem1, elem2) => elem1.count > elem2.count ? -1 : 1);
  if (sortedCount.length > 5) {
    sortedCount = sortedCount.slice(0, 5);
  };
  return sortedCount;
}

function sortAndCount(array, key) {
  return array.reduce((acc, obj) => {
    let sortKey = obj[key];
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

function getMostCommonGenres(books) {
  const sortByGenre = sortAndCount(books, 'genre');
  return getMostPopular(sortByGenre);
}

function getMostPopularBooks(books) {
  const sortByBorrows = books.reduce((acc, book) => {
    const title = book.title;
    const borrows = book.borrows.length;
    acc[title] = {
      name: book.title,
      count: borrows
    };
    return acc;
  }, {});

  return getMostPopular(sortByBorrows);
}

function getMostPopularAuthors(books, authors) {
  const sortByBorrows = books.reduce((acc, book) => {
    const borrows = book.borrows.length;
    const authorId = book.authorId;
    if (acc[authorId]) {
      acc[authorId].borrows += borrows;
    } else {
      const currAuthor = authors.find(author => author.id === authorId);
      const { name } = currAuthor;
      acc[authorId] = {
        name: `${name.first} ${name.last}`,
        count: borrows
      };
    };
    return acc;
  }, {});

  return getMostPopular(sortByBorrows);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
