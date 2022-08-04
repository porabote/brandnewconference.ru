import React from 'react';
import {Accordion, AccordionItem, AccordionItemTab, AccordionItemBody} from "@components/common/accordion";

const Faq = (props) => {

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
    </div>
  );
};

export default Faq;