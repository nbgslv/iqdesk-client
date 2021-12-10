import React from 'react';
import CategoriesList from '../components/Categories/CategoriesList/CategoriesList';
import AddCategory from '../components/Categories/AddCategory/AddCategory';
import config from '../config';

const Categories = ({ categories, refetch }) => {
  const [message, setMessage] = React.useState('');
  const [categoryEdit, setCategoryEdit] = React.useState('');

  const handleAddCategory = ({ name }) => {
    fetch(config.apiUrl + '/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setMessage('Added category');
          refetch();
        }
        else setMessage(res.data.error.message);
      })
      .catch(e => console.error(e));
  }

  const handleRemoveCategory = () => {
    fetch(config.apiUrl + '/categories', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: categoryEdit.id,
      })
    })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        setMessage('Category removed');
        refetch();
      }
      else setMessage(res.data.error.message);
    })
    .catch(e => console.log(e));
  }

  const handleSaveCategory = ({ name }) => {
    fetch(config.apiUrl + '/categories', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: categoryEdit.id,
        name,
      })
    })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        setMessage('Category saved');
        refetch();
      }
      else setMessage(res.data.error.message);
      setCategoryEdit('');
    })
    .catch(e => console.log(e));
  }

  const handleSetEdit = id =>
    setCategoryEdit(categories.find(category => category.id === id) || '');

  return (
    <div>
      {
        categories.length ?
          <CategoriesList
            categories={categories}
            setEdit={id => handleSetEdit(id)}
          />
          : 'No categories found'}
      <hr className="divider" />
      <AddCategory
        message={message}
        addCategory={data => handleAddCategory(data)}
        categoryEdit={categoryEdit}
        saveCategory={category => handleSaveCategory(category)}
        removeCategory={() => handleRemoveCategory()}
      />
    </div>
  );
};

export default Categories;
