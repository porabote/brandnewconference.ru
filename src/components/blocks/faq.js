import React from 'react';
import {Accordion, AccordionItem, AccordionItemTab, AccordionItemBody} from "@components/common/accordion";

const Faq = (props) => {

  return (
    <div id="faq" className="main-page__faq" style={{width: '800px', margin: '0 auto'}}>
      <h2 style={{fontSize: '26px'}}>Отвечаем на часто задаваемые вопросы</h2>

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