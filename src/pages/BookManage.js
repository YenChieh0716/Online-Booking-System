import React from "react";
import firebase from "../database/firebase";
import {
  Grid,
  Button,
  Container,
  Segment,
  Card,
  Menu,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import Searchbar from "../components/Searchbar";
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
          <Grid.Column width={2}>
            <Segment>
              <Category />
            </Segment>
          </Grid.Column>

          <Grid.Column width={14}>
            <Grid.Row>
              <Segment>
                <Menu secondary>
                  <Menu.Menu>
                    <Searchbar />
                  </Menu.Menu>
                  <Menu.Menu position="right">
                    <Button as={Link} to="/bookManage/bookLaunch" primary>
                      新增書籍
                    </Button>
                  </Menu.Menu>
                </Menu>
              </Segment>
            </Grid.Row>
            <Grid.Row>
              <Segment>
                <Grid columns={7}>
                  {books.map((book) => (
                    <Grid.Column centered>
                      <Card.Group>
                        <BookItem {...book} key={book.id} />
                      </Card.Group>
                    </Grid.Column>
                  ))}
                </Grid>
              </Segment>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default BookManage;
