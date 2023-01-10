import React from "react";
import firebase from "../database/firebase";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/auth";
import { useParams } from "react-router-dom";
import {
  Container,
  Header,
  Grid,
  Segment,
  Form,
  Item,
  Button,
} from "semantic-ui-react";

function BookEdit() {
  const { bookId } = useParams();
  const [book, setBook] = React.useState({});
  const [editName, setEditName] = React.useState(book.bookName);
  const [editISBN, setEditISBN] = React.useState(book.bookISBN);
  const [editAuthor, setEditAuthor] = React.useState(book.bookAuthor);
  const [editType, setEditType] = React.useState(book.bookType);
  const [categories, setCategories] = React.useState([]);
  const [isEditing, setIsEditing] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

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

  function editBook() {
    setIsEditing(true);
  }
  function deleteBook() {
    setIsDeleting(true);
  }

  return (
    <Container>
      <Header
        style={{
          margin: "20px 20px 20px 0px",
        }}
      >
        新增書籍
      </Header>
      <Grid>
        <Grid.Row stretched>
          {/* 書籍明細 */}
          <Grid.Column>
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
                  <Item.Meta>
                    <Segment>
                      <Form>
                        <Form.Input
                          label="書名"
                          placeholder="輸入書名"
                          value={editName}
                          onChange={(e) => {
                            setEditName(e.target.value);
                          }}
                        ></Form.Input>

                        <Form.Input
                          label="ISBN"
                          placeholder="輸入ISBN"
                          value={editISBN}
                          onChange={(e) => {
                            setEditISBN(e.target.value);
                          }}
                        ></Form.Input>
                        <Form.Input
                          label="作者"
                          placeholder="輸入作者"
                          value={editAuthor}
                          onChange={(e) => {
                            setEditAuthor(e.target.value);
                          }}
                        ></Form.Input>
                        <Form.Dropdown
                          label="分類"
                          placeholder="選擇書籍分類"
                          options={options}
                          selection
                          value={editType}
                          onChange={(e, { value }) => setEditType(value)}
                        ></Form.Dropdown>
                        <div>
                          <Button
                            positive
                            loading={isEditing}
                            onClick={editBook}
                          >
                            修改
                          </Button>
                          <Button
                            negative
                            loading={isDeleting}
                            onClick={deleteBook}
                          >
                            刪除
                          </Button>
                        </div>
                      </Form>
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

export default BookEdit;
