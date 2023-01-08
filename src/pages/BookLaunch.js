import React from "react";
import { Container, Header, Form, Image, Button } from "semantic-ui-react";
import { firestore, storage } from "../database/firebase";
import { collection, onSnapshot, doc, setDoc, query } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

function BookLaunch() {
  const navigate = useNavigate();
  const [bookName, setBookName] = React.useState("");
  const [bookISBN, setBookISBN] = React.useState("");
  const [bookAuthor, setBookAuthor] = React.useState("");
  const [bookType, setBookType] = React.useState("");
  const [bookCover, setBookCover] = React.useState(null);
  const [bookID, setBookID] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const getCategories = () => {
    const q = query(collection(firestore, "categories"));
    onSnapshot(q, (querySnapshot) => {
      const categories = [];
      querySnapshot.forEach((doc) => {
        categories.push(doc.data());
      });
      setCategories(categories);
    });
  };

  getCategories();

  const options = categories.map((category) => {
    return {
      text: category.name,
      value: category.name,
    };
  });

  const previewUrl = bookCover
    ? URL.createObjectURL(bookCover)
    : "https://react.semantic-ui.com/images/wireframe/image.png";

  const addImage = async () => {
    const storageRef = ref(storage, `post-images/${bookID}`);
    await uploadBytes(storageRef, bookCover);
  };

  const addBook = async () => {
    if (bookCover == null) {
      alert("請上傳圖片");
      return;
    } else {
      addImage();
    }

    setIsLoading(true);

    if (
      bookName !== "" &&
      bookISBN != "" &&
      bookAuthor !== "" &&
      bookType !== ""
    ) {
      await setDoc(doc(firestore, "books", bookName), {
        bookID,
        bookName,
        bookISBN,
        bookAuthor,
        bookType,
      });
      setBookName("");
      setBookISBN("");
      setBookAuthor("");
      setBookType("");
      alert("新增成功");
      setIsLoading(false);
      navigate("/bookManage");
    } else alert("所有欄位必填");
  };

  return (
    <Container>
      <Header>新增書籍</Header>
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
            setBookID(v4());
          }}
        ></Form.Input>
        <Form.Input
          label="書名"
          placeholder="輸入書名"
          value={bookName}
          onChange={(e) => {
            setBookName(e.target.value);
          }}
        ></Form.Input>
        <Form.Input
          label="ISBN"
          placeholder="輸入ISBN"
          value={bookISBN}
          onChange={(e) => {
            setBookISBN(e.target.value);
          }}
        ></Form.Input>
        <Form.Input
          label="作者"
          placeholder="輸入作者"
          value={bookAuthor}
          onChange={(e) => {
            setBookAuthor(e.target.value);
          }}
        ></Form.Input>
        <Form.Dropdown
          label="分類"
          placeholder="選擇書籍分類"
          options={options}
          selection
          value={bookType}
          onChange={(e, { value }) => setBookType(value)}
        ></Form.Dropdown>
        <Form.Button loading={isLoading}>新增</Form.Button>
      </Form>
    </Container>
  );
}

export default BookLaunch;
