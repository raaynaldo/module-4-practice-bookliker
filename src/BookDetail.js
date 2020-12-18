import React from "react";
import {
  Container,
  Header,
  Menu,
  Button,
  List,
  Image,
} from "semantic-ui-react";

function BookDetail({ book, likeHandler }) {
  const renderUsers = (book) => {
    return book.users
      ? book.users.map((user) => {
          return (
            <List.Item icon="user" key={user.id} content={user.username} />
          );
        })
      : null;
  };

  return (
    <Container text>
      <Header>{book.title}</Header>
      <Image src={book.img_url} size="small" />
      <p>{book.description}</p>
      <Button
        color="red"
        content="Like"
        icon="heart"
        label={{
          basic: true,
          color: "red",
          pointing: "left",
          content: book.users ? book.users.length : 0,
        }}
        onClick= {() => likeHandler(book.id, 1)}
      />
      <Header>Liked by</Header>
      <List>{renderUsers(book)}</List>
    </Container>
  );
}

export default BookDetail;
