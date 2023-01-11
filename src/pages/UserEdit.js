import React from "react";
import firebase from "../database/firebase";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/auth";
import { useParams } from "react-router-dom";
import account from "../account.webp";
import { firestore } from "../database/firebase";
import { useState, useEffect } from "react";

import {
  Container,
  Header,
  Grid,
  Segment,
  Form,
  Item,
  Button,
} from "semantic-ui-react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function UserEdit() {
  const { userId } = useParams();
  const [user, setUser] = React.useState({});
  const [editName, setEditName] = React.useState("");
  const [editPhone, setEditPhone] = React.useState("");
  const [editUserId, setEditUserId] = React.useState("");
  const [isEditing, setIsEditing] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(firestore, "users");

  React.useEffect(() => {
    firebase
      .firestore()
      .collection("user")
      .doc(userId)
      .get()
      .then((docSnapshot) => {
        const data = docSnapshot.data();
        if (!user.naeme) {
          setUser(data);
          // setEditName(data.name);
          // setEditPhone(data.phone);
          // setEditUserId(data.id);
          console.log(data);
          document.getElementById("name").value = data.name;
          document.getElementById("phone").value = data.phone;
          document.getElementById("id").value = data.id;
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
      });
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  const deleteUser = async (id) => {
    const userDoc = doc(firestore, "users", id);
    await deleteDoc(userDoc);
  };

  const updateUser = async (id) => {
    const userDoc = doc(firestore, "users", id);
    // const newFieldName = { name: editName };
    const newFieldPhone = { phone: editPhone };
    const newFieldUserId = { userId: editUserId };
    // await updateDoc(userDoc, newFieldName);
    await updateDoc(userDoc, newFieldPhone);
    await updateDoc(userDoc, newFieldUserId);
  };

  return (
    <Container>
      <Header
        style={{
          margin: "20px 20px 20px 0px",
        }}
      ></Header>
      <Grid>
        <Grid.Row stretched>
          {/* 書籍明細 */}
          <Grid.Column>
            <Item.Group>
              <Item>
                <Item.Image src={account} size="medium" />
                <Item.Content>
                  <Item.Meta>
                    <Segment>
                      <Form>
                        <Form.Input
                          id="name"
                          label="姓名"
                          // placeholder={user.name}
                          // value={editName}
                          onChange={(e) => {
                            // setEditName(e.target.value);
                          }}
                        ></Form.Input>

                        <Form.Input
                          id="phone"
                          label="電話"
                          // placeholder={user.phone}
                          value={editPhone}
                          onChange={(e) => {
                            setEditPhone(e.target.value);
                          }}
                        ></Form.Input>
                        <Form.Input
                          id="id"
                          label="userId"
                          // placeholder={user.userId}
                          value={editUserId}
                          onChange={(e) => {
                            setEditUserId(e.target.value);
                          }}
                        ></Form.Input>

                        <div>
                          <Button
                            positive
                            onClick={() => {
                              updateUser(user[0].id);
                            }}
                          >
                            修改
                          </Button>
                          <Button
                            negative
                            onClick={() => {
                              deleteUser(users[0].id);
                            }}
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

export default UserEdit;
