import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTodo, destroyTodo } from './store';
import { Link, useParams } from 'react-router-dom';
import Categories from './Categories';

const Todos = ()=> {
  const { categories, todos } = useSelector(state => state);
  const { term } = useParams();
  const dispatch = useDispatch();
  const filtered = todos.filter(todo => !term || todo.name.includes(term));

  return (
    <div className="todosContainer">
      {
        filtered.length !== todos.length ? (
          <h2>You are filtering { filtered.length } out of { todos.length }</h2>
        ): null
      }
      <div>
        {
          filtered.map( todo => {
            const category = categories.find(category => category.id === todo.categoryId);
            return (
              <div className="singleTodoContainer" key={ todo.id }>
                <Link className="todoLinks" to={`/${todo.id}`}>
                  { todo.name }
                  <br />
                </Link>
                Category:
                { category ? category.name : 'none'}
                <button
                className="deleteButton"
                  onClick= {
                    ()=> {
                      dispatch(destroyTodo(todo));
                    }
                  }
                >
                x
                </button>
                <select className="dropDownMenu"
                  value={ todo.categoryId }
                  onChange = {
                    ev => {
                      const updatedTodo = {...todo, categoryId: ev.target.value * 1};
                      dispatch(updateTodo(updatedTodo));
                    }
                  }
                >

                  {
                    categories.map( category => {
                      return (
                        <option value={ category.id } key={ category.id }>{ category.name }</option>
                      );
                    })
                  }
                </select>
              </div>
            );
          })
        }
      </div>
      <Categories />
    </div>
  )
};

export default Todos;

