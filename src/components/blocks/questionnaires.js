import React from 'react';
import {useDispatch} from "react-redux";
import {openModal} from "@components/common/modal";
import QuestionnairesModal from "./questionnaires-modal";

const Questionnaires = (props) => {

  const dispatch = useDispatch();

  const data = props.data || [];

  const openQuestionModal = (question) => {
    dispatch(openModal(<QuestionnairesModal data={question} />, 'Вопрос'));
  }
  
  return (
    <div>
      {data.map(question => {
        return(
          <div key={question.id} className="btn btn-outline-dark" onClick={() => openQuestionModal(question)}>
            <span className="arrow-icon">Кто живет на дне океана?</span>
          </div>
        );
      })}
    </div>
  );
};

export default Questionnaires;