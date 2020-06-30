import React, {Component, useState} from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation} from '@apollo/react-hooks'
import { getAuthorQuery, addBookMutation, getBooksQuery } from '../queries/queries';



function displayAuthors({loading, error, data}) {
   
    if(loading){
        return( <option disabled>Loading authors</option> );
    } else {
        return data.authors.map(author => {
            return( <option key={ author.id } value={author.id}>{ author.nama }</option> );
        });
    }
}

function Addbook() {

    const  authors = useQuery(getAuthorQuery);
    const [addBook, { data }] = useMutation(addBookMutation);

    const [book, setBook] = useState({})

    console.log(authors)

   const submitForm = (e) =>{
    e.preventDefault()
    // use the addBookMutation
    addBook({
        variables: {
            // judul: book.judul,
            // genre: this.state.genre,
            // authorId: this.state.authorI
            ...book
        },
        refetchQueries: [{ query: getBooksQuery }]
        
    });
    console.log(data)
}


    return (

        <>
              <form id="add-book" onSubmit={submitForm} >
                <div className="field">
                    <label>Book name:</label>
                    <input name="judul" type="text" onChange={ (e) => setBook({...book, judul: e.target.value }) } />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input name="jenis"type="text" onChange={ (e) => setBook({...book, jenis: e.target.value }) } />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select name="authorId" onChange={ (e) => setBook({ ...book, authorid: e.target.value }) } >
                        <option>Select author</option>
                        {displayAuthors(authors) }
                    </select>
                </div>
                <button>+</button>
            </form>

        </>
    )
}

export default Addbook;