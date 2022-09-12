import React from 'react';

const Partners = (props) => {

  if (!props.loading) return <div></div>;

  return (
    <div className="block-container">
      <div className="main-page__partners">
        <p className="main-page__faq__title">Партнёры</p>
        <div className="partners_list">
          {
            props.partners.map((item) => {
              let avatarUri = item.avatar.uri || '';
              return(
                <a href={item.link} target="_blank">
                  <div className="partners_item" key={item.id}><img width={114} src={`/images/${avatarUri}`}/></div>
                </a>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Partners;