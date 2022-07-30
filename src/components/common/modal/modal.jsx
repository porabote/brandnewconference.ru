import React, {Component} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {closeModal} from "./store/modal-actions";
import './modal.less';

const Modal = (props) => {

    const dispatch = useDispatch();

  const {isOpen, content, title} = useSelector(state => state.modal);

  return (
    <div
      className={isOpen ? "modal active" : "modal"}
      onClick={() => {
          dispatch(closeModal());
      }}
    >
      <div
        className={isOpen ? "modal-box-wrap active" : "modal-box-wrap"}
        onClick={e => {
          e.stopPropagation()
        }}
      >
        <div
          className="modal-tabs-item__close modal-close"
          onClick={() => {
            dispatch(closeModal());
          }}
        ></div>
        {content}
      </div>
    </div>
  );
}

export default Modal;