import React from 'react';

const Partners = (props) => {

  if (!props.loading) return <div></div>;

  return (
    <div className="block-container" style={{paddingTop: 0}}>
      <div className="main-page__partners">
        <p className="main-page__partners__title">Партнёры</p>
        <div className="partners_list">
          {
            props.partners.map((item) => {
              let avatarUri = item.avatar.uri || '';
              return(
                  <div className="partners_list_item">
                    <a key={item.id} href={item.link} target="_blank">
                    <div className="partners_list_item__logo" style={{backgroundImage: `url(/images/${avatarUri})`}}/>
                    <p className="partners_list_item__title" >{item.name}</p>
                    </a>
                  </div>

              );
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Partners;