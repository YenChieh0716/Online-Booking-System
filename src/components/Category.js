import React from "react";
import { firestore } from "../database/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { List } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";

function Category() {
  const [categories, setCategories] = React.useState([]);
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const currentType = urlSearchParams.get("type");

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

  React.useEffect(() => {
    getCategories();
  }, []);
  return (
    <List animated selection>
      {categories.map((category) => {
        return (
          <List.Item
            key={category.name}
            as={Link}
            to={`${location.pathname}?type=${category.name}`}
            active={currentType === category.name}
          >
            {category.name}
          </List.Item>
        );
      })}
    </List>
  );
}

export default Category;
