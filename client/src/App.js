import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

//Component
import BookList from './components/BookList';
import AddBook from './components/AddBook';

const client = new ApolloClient({
  uri:`http://localhost:9000/graphql`
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Ninja's Reading List</h1>
        <BookList/>
        <AddBook/>
      </div>
    </ApolloProvider>

  );
}

export default App;
