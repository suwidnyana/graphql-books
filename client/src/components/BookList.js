import React,{ useState, useEffect} from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';



//component
import BookDetail from './BookDetail'



const getBooksQuery = gql`

  {
    books {
      id
      judul
      jenis
    }
  }


`

function BookList() {
  
  const { loading, error, data } = useQuery(getBooksQuery);

  const [selected, setSelected] = useState(null)
  
  useEffect(() => {
        console.log('I will run after every render');
      }, []);
     
  const displayBooks = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
     
    return (
      data.books.map(({ id, judul }) => (
        <div key={id}>
          <ul id="book-list">
            <li key={ id } onClick={() => setSelected(id)}>{judul}</li>
          </ul>
        </div>
      ))
    )
    
  }
  
 

  
   
return <div>
    {displayBooks()}
   { selected == null ? "": <BookDetail bookId={selected}/> }

</div>;



}

export default BookList;
