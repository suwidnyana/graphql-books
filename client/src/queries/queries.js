
import { gql } from 'apollo-boost';

const getBooksQuery = gql`

  {
    books {
      id
      judul
      jenis
    }
  }


`

const getAuthorQuery = gql`
{
  authors {
    id
    nama
    umur
  }
}

`
const addBookMutation = gql`
    mutation AddBook($judul: String!, $jenis: String!, $authorid: ID!){
        addBook(judul: $judul, jenis: $jenis, authorid: $authorid){
            judul
            id
        }
    }
`;

const getBookQuery = gql`
    query GetBook($id: ID){
        book(id: $id) {
            id
            judul
            jenis
            author {
                id
                nama
                umur
                books {
                    judul
                    id
                }
            }
        }
    }
`;



export {getBooksQuery, getAuthorQuery, getBookQuery, addBookMutation};