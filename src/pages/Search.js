import React from "react";
import { Grid, Container, Header, Segment, Card } from "semantic-ui-react";
import Searchbar from "../components/Searchbar";
import { ReactDOM } from "react";
import firebase from "../database/firebase";
import { getDatabase } from "firebase/database";
import BookItem from "../components/BookItem";
import { doc, query, Query, querySnapshot } from "firebase/firestore";

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      book: BookItem,
      books: [],
    }
  }

  setBooks(data){
    data.forEach(element => {
      this.state.books.push(element);
    });
  }

  handleQuery(q) {
    console.log("query: ", q);
    this.getBooks(q);
    this.setState({'query': q})
    // this.render();
  }

  getBooks(b) {
    this.state.bookIDs = [];
    this.state.bookDatas = [];
    this.state.books = [];
    var db = firebase.firestore();
    var ref = db.collection("books")
    ref
      .where('bookName', ">=", b)
      .where('bookName', "<=", b + '~')
      .orderBy("bookName")
      .get()
      .then((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        // console.log(data[0]);
        this.setBooks(data);
        // console.log(this.state.books);
      });
  }

  render() {
    // console.log("render");
    return (
      <Container>
        <div className="search">
          <div className="search-Bar">
            <Searchbar onQuery={this.handleQuery.bind(this)} />
            <p>" {this.state.query} " search result : </p>
          </div>
          <div className="results">
            <Grid.Row>
              <Segment>
                <Grid columns={7}>
                  {this.state.books.map((book) => (
                    <Grid.Column centered>
                      <Card.Group>
                        <BookItem {...book[0]} key={book[0].id} />
                      </Card.Group>
                    </Grid.Column>
                  ))}
                </Grid>
              </Segment>
            </Grid.Row>
          </div>
        </div>
      </Container>
    )
  }
}

export default Search;