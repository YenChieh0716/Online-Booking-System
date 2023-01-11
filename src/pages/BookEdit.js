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
import { useNavigate } from "react-router-dom";

function BookEdit() {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [book, setBook] = React.useState({});
  const [editName, setEditName] = React.useState("");
  const [editISBN, setEditISBN] = React.useState("");
  const [editAuthor, setEditAuthor] = React.useState("");
  const [editType, setEditType] = React.useState("");
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
        if (!book.bookName) {
          setBook(data);
          setEditName(data.bookName);
          setEditISBN(data.bookISBN);
          setEditAuthor(data.bookAuthor);
          setEditType(data.bookType);
          document.getElementById("bookName").value = data.bookName;
          document.getElementById("bookISBN").value = data.bookISBN;
          document.getElementById("bookAuthor").value = data.bookAuthor;
          document.getElementById("bookType").value = data.bookType;
        }
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
    const bookRef = firebase.firestore().collection("books").doc(bookId);
    bookRef
      .set({
        bookName: editName,
        bookISBN: editISBN,
        bookAuthor: editAuthor,
        bookType: editType,
        bookCoverUrl: book.bookCoverUrl
          ? book.bookCoverUrl
          : "https://react.semantic-ui.com/images/wireframe/image.png",
      })
      .then(() => {
        alert("修改成功");
        setIsEditing(false);
        navigate("/bookManage");
      });
  }
  function deleteBook() {
    setIsDeleting(true);
    firebase
      .firestore()
      .collection("books")
      .doc(bookId)
      .delete()
      .then(() => {
        alert("刪除成功");
        setIsDeleting(false);
        navigate("/bookManage");
      });
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
                          id="bookName"
                          label="書名"
                          placeholder="輸入書名"
                          onChange={(e) => {
                            setEditName(e.target.value);
                          }}
                        ></Form.Input>

                        <Form.Input
                          id="bookISBN"
                          label="ISBN"
                          placeholder="輸入ISBN"
                          onChange={(e) => {
                            setEditISBN(e.target.value);
                          }}
                        ></Form.Input>
                        <Form.Input
                          id="bookAuthor"
                          label="作者"
                          placeholder="輸入作者"
                          onChange={(e) => {
                            setEditAuthor(e.target.value);
                          }}
                        ></Form.Input>
                        <Form.Dropdown
                          id="bookType"
                          label="分類"
                          value={book.bookType}
                          placeholder="選擇書籍分類"
                          options={options}
                          selection
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
