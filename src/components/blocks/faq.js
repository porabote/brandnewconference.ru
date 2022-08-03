import React from 'react';
import {Accordion, AccordionItem, AccordionItemTab, AccordionItemBody} from "@components/common/accordion";

const Faq = (props) => {

  return (
    <div id="faq" className="main-page__faq">
      <h2 className="main-page__faq__title">Отвечаем на часто задаваемые вопросы</h2>

      <Accordion>

        {props.data.map((faq, index) => {
          return(
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
  );
};

export default Faq;