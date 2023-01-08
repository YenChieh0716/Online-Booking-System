import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Categories from "../components/Category";
import BookItem from "../components/Category";

function BookManage() {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={3}>
          <Categories />
        </Grid.Column>
        <Grid.Column width={10}>
          <BookItem />
        </Grid.Column>
        <Grid.Column width={3}>
          <Button as={Link} to="/bookLaunch">
            新增書籍
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default BookManage;
