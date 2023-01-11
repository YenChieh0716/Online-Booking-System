import React from "react";
import firebase from "../database/firebase";
import { useLocation } from "react-router-dom";
import {
  Grid,
  Button,
  Container,
  Segment,
  Card,
  Menu,
  Header,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import UserItem from "../components/UserItem";

function UserManage() {
  const [users, setUsers] = React.useState([]);
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const currentType = urlSearchParams.get("type");

  React.useEffect(() => {
    {
      firebase
        .firestore()
        .collection("user")
        .orderBy("name", "asc")
        .get()
        .then((collectionSnapshot) => {
          const data = collectionSnapshot.docs.map((docSnapshot) => {
            const id = docSnapshot.id;
            return { ...docSnapshot.data(), id };
          });
          setUsers(data);
          console.log(data);
        });
    }
  }, [currentType]);

  return (
    <Container fluid>
      <Grid
        style={{
          margin: "10px 20px",
        }}
      >
        <Grid.Row></Grid.Row>
        <Grid.Row stretched>
          <Grid.Column width={14}>
            <Grid.Row></Grid.Row>
            <Grid.Row>
              <Segment>
                <Grid columns={7}>
                  {users.map((user) => (
                    <Grid.Column centered>
                      <Card.Group>
                        <UserItem {...user} key={user.id} />
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

export default UserManage;
