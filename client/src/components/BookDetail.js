import React, { useState, useEffect} from 'react';
import { getBookQuery } from '../queries/queries';
import { useQuery } from '@apollo/react-hooks';

const BookDetails = ({bookId}) => {
  const { loading, error, data } = useQuery(getBookQuery, { variables: { id : bookId },});

  if(loading) {
    return (<><p>loading</p></>);
  }

  console.log(data.book)
  
  return (
    <div>
      {
        data.book == null || data.book == undefined ? (
          <p>Data tidak ditemukan</p>
        ) : (
          <div>
            <p>
              <strong>Jenis: {data.book == null ? "-" : data.book.jenis} </strong>
            </p>
          </div>
        )
      }
    </div>
  )
};

export default BookDetails;