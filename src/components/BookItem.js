import React from "react";
import firebase from "../database/firebase";
import {
  Item,
  Card,
  Icon,
  Image,
  Label,
  Button,
  Container,
} from "semantic-ui-react";

function BookItem(book, user) {
  return (
    <Item>
      <Item.Image
        src={
          book.bookCoverUrl ||
          "https://react.semantic-ui.com/images/wireframe/image.png"
        }
        size="small"
        rounded
        style={{ height: "130px" }}
      ></Item.Image>
      <Item.Content>
        <Item.Header style={{ height: "25px" }}>{book.bookName}</Item.Header>
        <Button secondary size="tiny" floated="right">
          <Button.Content>
            <Icon name="edit outline"></Icon>
            編輯
          </Button.Content>
        </Button>
      </Item.Content>
    </Item>
  );
}

export default BookItem;
