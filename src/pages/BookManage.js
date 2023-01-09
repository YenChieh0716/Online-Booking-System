import React from "react";
import firebase from "../database/firebase";
import {
  Grid,
  Item,
  Button,
  Container,
  Segment,
  Image,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import Category from "../components/Category";
import BookItem from "../components/BookItem";

function BookManage() {
  const [books, setBooks] = React.useState([]);

  React.useEffect(() => {
    firebase
      .firestore()
      .collection("books")
      .get()
      .then((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        setBooks(data);
      });
  }, []);

  return (
    <Container fluid>
      <Grid>
        <Grid.Row width={1} />
        <Grid.Row stretched>
          <Grid.Column width={1} />
          <Grid.Column width={2}>
            <Segment>
              <Category />
            </Segment>
          </Grid.Column>
          <Grid.Column width={12}>
            <Grid.Row>
              <Segment>
                <Button as={Link} to="/bookManage/bookLaunch" primary>
                  新增書籍
                </Button>
              </Segment>
            </Grid.Row>
            <Grid.Row>
              <Segment>
                <Grid columns={6}>
                  {books.map((book) => (
                    <Grid.Column>
                      <BookItem {...book} key={book.id} />
                    </Grid.Column>
                  ))}
                </Grid>
              </Segment>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={1}></Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default BookManage;
