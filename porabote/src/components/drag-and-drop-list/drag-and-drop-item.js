import React from 'react';

const DragAndDropItem = (props) => {
  return (
    <div
      index={props.index}
      className="drag-and-drop-item"
      draggable="true"
      onDragStart={(e) => props.dragStart(e,props.index)}
      onDragEnter={(e) => props.dragEnter(e,props.index)}
      onDragEnd={(e) => props.dragEnd(e,props.index)}
      >
      {props.children}

    </div>
  );
};

export default DragAndDropItem;