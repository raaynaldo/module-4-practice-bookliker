import React, { useState, useEffect } from "react";
import BookDetail from "./BookDetail";
import {
  Container,
  Header,
  Menu,
  Button,
  List,
  Image,
} from "semantic-ui-react";

function App() {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({});

  useEffect(() => {
    const url = "http://localhost:3000/books";
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setBooks(json);
        setBook(json[0]);
      });
  }, []);

  const handleCLick = (book) => {
    setBook(book);
  };

  // const updateUserLike = (bookId, users) => {
  //   const url = `http://localhost:3000/books/${bookId}`;
  //   const reqObj = {
  //     method: "PATCH",
  //     headers: { "Content-Type": "application/json" },
  //     body: json.stringify(users),
  //   };
  //   fetch(url, reqObj)
  //     .then((res) => res.json())
  //     .then((json) => console.log(json))
  //     .catch((err) => console.error(err));
  // };

  const likeHandler = (bookId, userId) => {
    let allBooks = [...books];
    const findBookIndex = allBooks.findIndex((book) => book.id === bookId);

    if (book.users.some((user) => user.id === userId)) {
      const users = allBooks[findBookIndex].users;
      const findUserIndex = users.findIndex((user) => user.id === userId);

      allBooks[findBookIndex].users.splice(findUserIndex, 1);
    } else {
      allBooks[findBookIndex].users.push({ id: 1, username: "pouros" });
    }

    const url = `http://localhost:3000/books/${bookId}`;
    const users = [...allBooks[findBookIndex].users];
    const reqObj = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ users }),
    };
    fetch(url, reqObj)
      .then((res) => res.json())
      .then(() => setBooks(allBooks))
      .catch((err) => console.error(err));
  };

  const renderBooks = () => {
    return books.map((book) => {
      return (
        <Menu.Item as={"a"} key={book.id} onClick={() => handleCLick(book)}>
          {book.title}
        </Menu.Item>
      );
    });
  };

  return (
    <div>
      <Menu inverted>
        <Menu.Item header>Bookliker</Menu.Item>
      </Menu>
      <main>
        <Menu vertical inverted>
          {renderBooks()}
        </Menu>
        <BookDetail book={book} likeHandler={likeHandler} />
      </main>
    </div>
  );
}

export default App;
