import React from "react";
import firebase from "../database/firebase";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { Container, Grid, Segment, Form, Item } from "semantic-ui-react";
import Category from "../components/Category";

function BookDetail() {
  const { bookId } = React.useParams();
  const [book, setBook] = React.useState({});
  const [editName, setEditName] = React.useState("");
  const [editISBN, setEditISBN] = React.useState("");
  const [editAuthor, setEditAuthor] = React.useState("");
  const [editType, setEditType] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    firebase
      .firestore()
      .collection("books")
      .doc(bookId)
      .get()
      .then((docSnapshot) => {
        const data = docSnapshot.data();
        setBook(data);
      });
  });

  React.useEffect(() => {
    firebase
      .firestore()
      .collection("categories")
      .get()
      .then((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((doc) => {
          return doc.data();
        });
        setCategories(data);
      });
  }, []);

  const options = categories.map((category) => {
    return {
      text: category.name,
      value: category.name,
    };
  });

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
          {/* 書籍明細 */}
          <Grid.Column width={14}>
            <Item.Group>
              <Item>
                <Item.Image
                  src={
                    book.bookCoverUrl ||
                    "https://react.semantic-ui.com/images/wireframe/image.png"
                  }
                  size="medium"
                />
                <Item.Content>
                  <Item.Header>
                    <h1>{book.bookName}</h1>
                  </Item.Header>
                  <Item.Meta>
                    <Segment>
                      <Form>
                        <Form.Input
                          label="書名"
                          placeholder={book.bookName}
                          value={editName}
                          onChange={(e) => {
                            setEditName(e.target.value);
                          }}
                        ></Form.Input>
                        <Form.Input
                          label="ISBN"
                          placeholder={book.bookISBN}
                          value={editISBN}
                          onChange={(e) => {
                            setEditISBN(e.target.value);
                          }}
                        ></Form.Input>
                        <Form.Input
                          label="作者"
                          placeholder={book.bookAuthor}
                          value={editAuthor}
                          onChange={(e) => {
                            setEditAuthor(e.target.value);
                          }}
                        ></Form.Input>
                        <Form.Dropdown
                          label="分類"
                          placeholder={book.bookType}
                          options={options}
                          selection
                          value={editType}
                          onChange={(e, { value }) => setEditType(value)}
                        ></Form.Dropdown>
                      </Form>
                      <Form.Button loading={isLoading}>修改</Form.Button>
                    </Segment>
                  </Item.Meta>
                </Item.Content>
              </Item>
            </Item.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default BookDetail;
