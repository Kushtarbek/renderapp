import React from 'react';
import Data from "../data.json";


function JsonDataRenderer({ data }) {
  const renderJsonData = (jsonData) => {
    return jsonData.map(content => {
      return (
        <div key={content.type}>
          <h4>{content.type}</h4>
          {renderChildren(content.children)}
        </div>
      );
    });
  }

  const renderChildren = (children) => {
    return children.map(child => {
      switch (child.type) {
        case 'container':
          return (
            <div key={child.type} style={child.style.webStyle}>
              {renderChildren(child.children)}
            </div>
          );
        case 'text':
          return (
            <p key={child.type} style={child.style.webStyle}>{child.data.value}</p>
          );
        case 'image':
          return (
            <img key={child.type} src={child.value} style={child.style.webStyle} alt="" />
          );
        case 'textfield':
          return (
            <input
              key={child.type}
              type="text"
              placeholder={child.data.placeholder}
              value={child.data.value}
              style={child.style.webStyle}
            />
          );
        case 'textarea':
          return (
            <textarea
              key={child.type}
              placeholder={child.data.placeholder}
              value={child.data.value}
              style={child.style.webStyle}
            />
          );
        case 'button':
          return (
            <button key={child.type} 
              style={child.style.webStyle} 
              onFocus={child.style.actions.onFocus}
              onMouseOver={child.style.actions.onHover}>
                {child.data.title}</button>
          );
        default:
          return null;
      }
    });
  }

  return (
    <div>
      {renderJsonData(data.views)}
    </div>
  );
}

// Usage
function BuilderWebComponents() {
  const jsonData = {
    "views": [
      // Your JSON data
      
    ]
  };

  return (
    <JsonDataRenderer data={jsonData} />
  );
}
