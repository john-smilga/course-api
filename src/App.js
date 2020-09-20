import React from 'react';

function App() {
  const getData = async () => {
    const response = await fetch(
      'http://localhost:8888/api/javascript-store-single-product?id=rec43w3ipXvP28vo'
    );
  };
  React.useEffect(() => {
    getData();
  }, []);
  return <h1>Hello World</h1>;
}

export default App;
