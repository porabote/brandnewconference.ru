import React from 'react';
import {useDispatch} from "react-redux";
import {Accordion, AccordionItem, AccordionItemTab, AccordionItemBody} from "@components/common/accordion";
import FeedbackForm from "./feedback-form";
import {openModal} from "@components/common/modal";

const Faq = (props) => {

  const dispatch = useDispatch();
  
  return (
    <div id="faq" className="main-page__faq">
      <div className="main-page__faq__container">
        <h2 className="main-page__faq__title">FAQ</h2>

        <Accordion>

          {props.data.map((faq, index) => {
            return (
              <AccordionItem key={index}>
                <AccordionItemTab>
                  {faq.question}
                </AccordionItemTab>
                <AccordionItemBody>
                  {faq.answer}
                </AccordionItemBody>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      <div style={{padding: '30px 0'}}>

        <p>
          Задавайте вопросы спикерам конференции. На часть из них, вероятнее всего, сразу ответим в докладах и
          дискуссиях. Остальные вопросы будем постепенно освещать в нашем телеграм-канале dentsu insights
          после конференции.
        </p>

        <div style={{width: '300px'}}>
          <div className="btn btn-outline-dark">
            <a
              className="arrow-icon"
              onClick={() => {
                dispatch(openModal(<FeedbackForm/>, 'Задать вопрос спикеру'));
              }}
            >Задать вопрос спикеру</a>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Faq;