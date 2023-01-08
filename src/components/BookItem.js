import React from "react";
import { List } from "semantic-ui-react";
import { firestore } from "../database/firebase";
import { collection, onSnapshot, doc, setDoc, query } from "firebase/firestore";

// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// import CardMedia from "@mui/material/CardMedia";
// import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";

function BookItem(props) {
  const [bookName, setBookName] = React.useState([]);
  const [bookAuthor, setBookAuthor] = React.useState([]);

  const getBookContents = () => {
    const q = query(collection(firestore, "books"));
    onSnapshot(q, (querySnapshot) => {
      const books = [];
      querySnapshot.forEach((doc) => {
        books.push(doc.data());
      });
      setBookName(books);
    });
  };

  React.useEffect(() => {
    getBookContents();
  }, []);
  return (
    <List animated selection>
      {bookName.map((book) => {
        return <List.Item key={book.name}>{book.name}</List.Item>;
      })}
    </List>
  );
  //   return (
  //     <Grid item xs={12} sm={6} md={4}>
  //       <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
  //         <CardMedia
  //           component="img"
  //           img="https://source.unsplash.com/random"
  //           alt="random"
  //         />
  //         <CardContent sx={{ flexGrow: 1 }}>
  //           <Typography gutterBottom variant="h5" component="h2">
  //             {props.post}
  //           </Typography>
  //         </CardContent>
  //       </Card>
  //     </Grid>
  //   );
}

export default BookItem;
