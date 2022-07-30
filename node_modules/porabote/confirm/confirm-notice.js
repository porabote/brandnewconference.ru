import React from "react";
import { Button } from "porabote/form";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ConfirmNotice = (props) => {

  return(
    <div
      className={props.isOpen ? "confirm notice active" : "confirm notice"}
      style={{
        top: `${props.posTop}px`,
        left: `${props.posLeft}px`,
      }}
    >
      <p className="confirm__title">
        <ErrorOutlineIcon style={{
          position: 'relative',
          top: '6px',
          marginRight: '8px',
          color: '#444444'
        }} />
      </p>
      <p className="confirm__body" dangerouslySetInnerHTML={{__html: props.msg}}>
      </p>
      <div className="confirm__button-panel">
        <Button
          style={{width: "120px"}}
          onClick={props.closeConfirm}
        >
          Закрыть
        </Button>
      </div>
    </div>
  );
}

export default ConfirmNotice;