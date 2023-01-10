import React from "react";
import { Container, Grid, Segment, Form } from "semantic-ui-react";
import Category from "../components/Category";
import Searchbar from "../components/Searchbar";

function BookDetail() {
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
            <Form></Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default BookDetail;
