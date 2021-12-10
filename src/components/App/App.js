import { Route, Routes } from 'react-router-dom';
import React from 'react';
import config from '../../config';
import Items from '../../pages/Items';
import Categories from '../../pages/Categories';
import './App.css';

function App() {
  const [categories, setCategories] = React.useState([]);
  const [message, setMessage] = React.useState('');
  const [refetch, setRefetch] = React.useState(false);

  React.useEffect(() => {
    fetch(config.apiUrl + '/categories')
    .then(res => res.json())
    .then(res => {
      if (res.success) setCategories(res.data);
      else setMessage(res.data.error.message);
    })
    .catch(e => console.error(e));

    return () => setRefetch(false);
  }, [refetch]);

  return (
    <div className="main-container">
      <Routes>
        <Route path="/" element={<Items categories={categories} />} />
        <Route
          path="/categories"
          element={<Categories categories={categories} refetch={() => setRefetch(true)} />}
        />
      </Routes>
      {message && <div>{message}</div>}
    </div>
  );
}

export default App;
