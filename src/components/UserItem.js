import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import account from "../account.webp";

function UserItem(user) {
  return (
    <Card
      key={user.id}
      as={Link}
      to={`/userManage/userEdit/${user.id}`}
      style={{ width: "135px", height: "250px" }}
      centered
    >
      <Image
        as="img"
        src={account}
        size="small"
        style={{ width: "135px", height: "150px", objectFit: "cover" }}
      />
      <Card.Content
        style={{
          padding: "10px 5px 10px 5px",
        }}
      >
        <Card.Header
          style={{
            fontSize: "12px",
            overflowWrap: "word-wrap",
            textAlign: "left",
          }}
        >
          name:{user.name}
          <br></br>
          phone:{user.phone}
          <br></br>
          userId:{user.userId}
        </Card.Header>
      </Card.Content>
    </Card>
  );
}

export default UserItem;
