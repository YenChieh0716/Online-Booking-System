import React from "react";
import { Container } from "semantic-ui-react";
import Searchbar from "../components/Searchbar";
import firebase from "../database/firebase";
import BookItem from "../components/BookItem";

function SearchPage() {
    return (
        <Container>
            <Searchbar/>
        </Container>
    );
};

function search(){

}

export default SearchPage;