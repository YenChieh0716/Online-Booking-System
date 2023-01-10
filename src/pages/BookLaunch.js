import React from "react";
import firebase from "../database/firebase";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/auth";
import { Container, Header, Form, Image, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

function BookLaunch() {
  const navigate = useNavigate();
  const [bookName, setBookName] = React.useState("");
  const [bookISBN, setBookISBN] = React.useState("");
  const [bookAuthor, setBookAuthor] = React.useState("");
  const [bookType, setBookType] = React.useState("");
  const [bookCover, setBookCover] = React.useState(null);
  const [categories, setCategories] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

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

  const previewUrl = bookCover
    ? URL.createObjectURL(bookCover)
    : "https://react.semantic-ui.com/images/wireframe/image.png";

  function addBook() {
    const bookCoverUrl = "";
    setIsLoading(true);
    const bookRef = firebase.firestore().collection("books").doc();
    if (bookCover) {
      const coverRef = firebase.storage().ref("post-images/" + bookRef.id);
      const metadata = {
        contentType: bookCover.type,
      };
      coverRef.put(bookCover, metadata).then(() => {
        coverRef.getDownloadURL().then((imageUrl) => {
          bookRef
            .set({
              bookName,
              bookISBN,
              bookAuthor,
              bookType,
              bookCoverUrl: imageUrl,
            })
            .then(() => {
              alert("新增成功");
              setIsLoading(false);
              navigate("/bookManage");
            });
        });
      });
    } else {
      bookRef
        .set({
          bookName,
          bookISBN,
          bookAuthor,
          bookType,
          bookCoverUrl:
            "https://react.semantic-ui.com/images/wireframe/image.png",
        })
        .then(() => {
          alert("新增成功");
          setIsLoading(false);
          navigate("/bookManage");
        });
    }

    bookRef
      .set({
        bookName,
        bookISBN,
        bookAuthor,
        bookType,
        bookCoverUrl: bookCoverUrl
          ? bookCoverUrl
          : "https://react.semantic-ui.com/images/wireframe/image.png",
      })
      .then(() => {
        alert("新增成功");
        setIsLoading(false);
        navigate("/bookManage");
      });
  }

  return (
    <Container>
      <Header
        style={{
          margin: "20px 0px 20px 0px",
        }}
      >
        新增書籍
      </Header>
      <Form onSubmit={addBook}>
        <Image src={previewUrl} size="small" floated="left" />
        <Button basic as="label" htmlFor="post-image">
          上傳書籍圖片
        </Button>
        <Form.Input
          id="post-image"
          type="file"
          style={{ display: "none" }}
          onChange={(e) => {
            setBookCover(e.target.files[0]);
          }}
          required
        ></Form.Input>
        <Form.Input
          label="書名"
          placeholder="輸入書名"
          value={bookName}
          onChange={(e) => {
            setBookName(e.target.value);
          }}
          required
        ></Form.Input>
        <Form.Input
          label="ISBN"
          placeholder="輸入ISBN"
          value={bookISBN}
          onChange={(e) => {
            setBookISBN(e.target.value);
          }}
          required
        ></Form.Input>
        <Form.Input
          label="作者"
          placeholder="輸入作者"
          value={bookAuthor}
          onChange={(e) => {
            setBookAuthor(e.target.value);
          }}
          required
        ></Form.Input>
        <Form.Dropdown
          label="分類"
          placeholder="選擇書籍分類"
          options={options}
          selection
          value={bookType}
          onChange={(e, { value }) => setBookType(value)}
          required
        ></Form.Dropdown>
        <Form.Button loading={isLoading}>新增</Form.Button>
      </Form>
    </Container>
  );
}

export default BookLaunch;
