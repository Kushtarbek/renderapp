import './App.css';
import Data from "./data.json"
import { useEffect, useState } from 'react';
import axios from 'axios';


function renderJsonData(data) {
  return data.map( content => {
    return (
      <div>
        <h4>{content.type}</h4>
        {renderChildren(content.children)}
      </div>
    )
  })
}

function renderChildren( children ) {
  return children.map(child => {
    switch (child.type) {
      case 'container':
        return (
          <div style={child.style.webStyle}>
            {renderChildren(child.children)}
          </div>
        );
        case 'text':
          return (
            <p style={child.style.webStyle}>{child.data.value}</p>
            );
        case 'image':
          return (
            <img src={child.value} style={child.style.webStyle} alt="" />
          );
        case 'textfield':
          return (
            <input
            type='text'
            placeholder={child.data.placeholder}
            value={child.data.value}
            style={child.style.webStyle}
            //onFocus={child.style.actions.onFocus}
            // onMouseOver={child.style.actions.onHover}
            />
          );
        case 'textarea':
          return (
            <textarea
            placeholder={child.data.placeholder}
            value={child.data.value}
            style={child.style.webStyle}
            />
          );
        case 'button':
          return (
            <button style={child.style.webStyle}
            // onFocus={child.style.actions.onFocus}
            // onMouseOver={child.style.actions.onHover}
            >{child.data.title}</button>
          );
         case 'dropdown':
          return (
            <div>
              {children && children.map( item => {
                return (
                  <form>
                    {item.title}
                    <select name="quality" key={item.id}>
                      {item.options.map( option => {
                        return (
                          <option> {option.name}</option>
                        )
                      })}
                      <option value="" selected="selected">{children.options}</option>
                    </select>
                  </form>
                
                )
            })}
            </div>
          );
        default: 
        return null;
    }
  })
};

const App = () => {   
  const [posts, setPosts ] = useState([]);

    useEffect(() => {
    //   fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
    //   .then( response => response.json())
    //   .then(json => setData(json))
    //   .catch(err => console.error(err));
    // }, [])

      axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(err => {
        console.log(err);
      })
    }, []);


  return ( 
    <div className='App'>
      {/* {renderJsonData(Data.views)} */}
      <ul>
      {posts.map(post => {
        <li key={post.id}>{post.title}</li>
      })}
      </ul>
   </div>

     
  );
}

export default App;
