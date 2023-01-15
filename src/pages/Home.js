import React from "react";
import firebase from "../database/firebase";
import { useLocation } from "react-router-dom";
import { Grid, Container, Header, Segment, Card } from "semantic-ui-react";
import Category from "../components/Category";
import BookItem from "../components/BookItem";

function Home() {
  const [books, setBooks] = React.useState([]);
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const currentType = urlSearchParams.get("type");

  React.useEffect(() => {
    if (currentType) {
      firebase
        .firestore()
        .collection("books")
        .where("bookType", "==", currentType)
        .orderBy("bookName", "asc")
        .get()
        .then((collectionSnapshot) => {
          const data = collectionSnapshot.docs.map((docSnapshot) => {
            const id = docSnapshot.id;
            return { ...docSnapshot.data(), id };
          });
          setBooks(data);
        });
    } else {
      firebase
        .firestore()
        .collection("books")
        .orderBy("bookName", "asc")
        .get()
        .then((collectionSnapshot) => {
          const data = collectionSnapshot.docs.map((docSnapshot) => {
            const id = docSnapshot.id;
            return { ...docSnapshot.data(), id };
          });
          setBooks(data);
        });
    }
  }, [currentType]);

  return (
    <Container fluid>
      <Grid
        style={{
          margin: "10px 20px 10px 20px",
        }}
      >
        <Grid.Row>
          <Grid.Column width={2}>
            <Header>書籍分類</Header>
          </Grid.Column>
          <Grid.Column width={14}>
            <Header>書籍列表</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row stretched>
          <Grid.Column width={2}>
            <Segment>
              <Category />
            </Segment>
          </Grid.Column>

          <Grid.Column width={14}>
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

export default Home;
