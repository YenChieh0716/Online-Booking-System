import React from "react";
import { List } from "semantic-ui-react";
import { collection, onSnapshot, doc, setDoc, query } from "firebase/firestore";
import { firestore } from "../database/firebase";

function Category() {
  const [categories, setCategories] = React.useState([]);

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
        return <List.Item key={category.name}>{category.name}</List.Item>;
      })}
    </List>
  );
}

export default Category;
