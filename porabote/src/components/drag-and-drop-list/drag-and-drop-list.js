import React, {useState,useCallback, useRef} from 'react';
import DragAndDropItem from "./drag-and-drop-item";

const DragAndDropList = (props) => {

  if (props.children.length == 0) return <div></div>;

  let [selected, setSelected] = useState(null);

  const [items, setItems] = useState([...props.children])

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleSort = (e) => {
    let _items = [...items];
    const draggedItem = _items.splice(dragItem.current, 1)[0];

    const indexDelta = (dragItem.current > dragOverItem.current) ?
      dragOverItem.current - dragItem.current : dragOverItem.current - dragItem.current;

    props.onDragEnd(draggedItem.props.lft, indexDelta);

    _items.splice(dragOverItem.current, 0, draggedItem)[0];
    dragItem.current = null;
    dragOverItem.current = null;

    setItems(_items);

  }

  return (
    <div className="drag-and-drop-list">
      {items.map((item, index) => {
        return <div
          lft={item.props.lft}
          index={index}
          key={index}
          className="drag-and-drop-item"
          draggable="true"
          onDragStart={(e) => dragItem.current=index}
          onDragEnter={(e) => dragOverItem.current=index}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDragEnd={(e) => handleSort(e)}
        >
          {item.props.children}

        </div>
      })}
    </div>
  );
};

export default DragAndDropList;