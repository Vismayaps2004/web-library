export const handleListBooks = (library) => {
  const response = library.listBooks();
  return { response, status: 200 };
};

export const handleListByCategory = (library, body) => {
  const response = library
    .listByCategory(body.category);
  return { response, status: 200 };
};

export const handleAddBorrowRecord = (library, borrowRecord) => {
  const response = library
    .addBorrowRecord(borrowRecord);

  if (response.success) {
    return { response, status: 200 };
  }
  return { response, status: 401 };
};

export const handleToggleStatus = (library, borrowId) => {
  const response = library.toggleStatus(borrowId);

  if (response.success) {
    return { response, status: 200 };
  }
  return { response, status: 401 };
};

export const handleListByUser = (library, userId) => {
  const response = library.listBooksByUser(userId);
  return { response, status: 200 };
};

export const handleAddBook = (library, bookRecord) => {
  const response = library.addBook(bookRecord);

  if (response.success) {
    return { response, status: 200 };
  }
  return { response, status: 201 };
};
