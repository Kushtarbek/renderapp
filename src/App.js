import './App.css';
import Data from "./data.json"


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
            <button style={child.style.webStyle}>{child.data.title}</button>
          );
         case 'dropdown':
          return (
            <div>
              {children && children.map( item => {
                return (
                  <form>
                    {item.title }
                    <select name="quality" id="id">
                      <option value="" selected="selected">{children.item}</option>
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
  return ( 
    <div className='App'>
      {renderJsonData(Data.views)}
    </div>
  );
}

export default App;
