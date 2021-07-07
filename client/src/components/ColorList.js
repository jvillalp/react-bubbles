import React, { useState, useHistory } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, props }) => {
  // console.log(colors);
  // const history = useHistory();
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({initialColor});
  

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
      axiosWithAuth()
              .put(`colors/${colorToEdit.id}`, colorToEdit)
              .then(response => {
                console.log("this is put", response.data);
                updateColors(colors);
                setEditing(false);
            
              })
              .catch(err => {
                console.log('this is an error in the put', err)
              })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
          .delete(`colors/${colorToEdit.id}`)
          .then(response => {
            console.log('will it delete', response.data)
            updateColors(colors.filter(item => item.id !== color.id));
          })
          .catch(err => {
            console.log('this is a delete error', err)
          })
  };

  const addColor = e =>{
    e.preventDefault();
    axiosWithAuth()
          .post('colors', newColor)
          .then(res => {
            console.log('add color', res.data);
            props.newColors.push(initialColor)
            setNewColor(res.data)
            
          })
          .catch(err => console.log("cant add color",err))
    

  };

  const handleChange = e => {
    setNewColor({

      ...newColor,
      [e.target.name] : e.target.value
    })
};

  return (
    <div className="colors-wrap">
      
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      <div>
        {/* stretch - build another form here to add a color */}
      <form>
        <input
          type="text"
          name='color'
          placeholder="Color"
          onChange={handleChange}
          value={newColor.color}
        />

        <input
        type="string"
        name='hex'
        placeholder="Hex"
        // value={newColor.code.hex}
        onChange={e => setNewColor({
          ...newColor,
          code : {hex : e.target.value}
        })
    }
        />
        <button onSubmit={addColor}> Add New Color</button>
      </form>
      </div>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      

    </div>
  );
};

export default ColorList;
