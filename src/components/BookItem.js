import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

function BookItem(book, user) {
  return (
    <Card
      key={book.id}
      as={Link}
      to={`/bookManage/bookEdit/${book.id}`}
      style={{ width: "135px", height: "250px" }}
      centered
    >
      <Image
        as="img"
        src={
          book.bookCoverUrl ||
          "https://react.semantic-ui.com/images/wireframe/image.png"
        }
        size="small"
        style={{ width: "135px", height: "200px", objectFit: "cover" }}
      />
      <Card.Content
        style={{
          padding: "10px 5px 10px 5px",
        }}
      >
        <Card.Header
          style={{
            fontSize: "12px",
            overflowWrap: "word-wrap",
            textAlign: "left",
          }}
        >
          {book.bookName}
        </Card.Header>
      </Card.Content>
    </Card>
  );
}

export default BookItem;
