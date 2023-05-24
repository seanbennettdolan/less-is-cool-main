import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { destroyCategory } from './store';

const Categories = ()=> {
  const { categories, todos } = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <div className="categoriesContainer">
      {
        categories.map( category => {
          const filtered = todos.filter(todo => todo.categoryId === category.id);
          return (
            <div singleCategoryContainer key={ category.id }>
              { category.name }
              ({ filtered.length })
              <button
                disabled={ filtered.length }
                onClick={
                  ()=> dispatch(destroyCategory(category)) 
                }
              >
                x
              </button>
            </div>
          );
        })
      }
    </div>
  );
};

export default Categories;
