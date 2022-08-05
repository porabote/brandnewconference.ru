import React, {useState} from "react";
import {Helmet} from "react-helmet";
import {useDispatch} from "react-redux";
import Api from "@services";
import {
  Form,
  Button,
  Field,
  Input,
  InputDate,
  InputHidden,
  Option,
  Select,
  Checkbox,
  Radio,
  RadioInput,
  SubmitButton
} from "@components/common/form";
import {openModal} from "@components/common/modal";
import RegistrationNotices from "./registration-notices";
import Telegram from './svg/telegram.svg';
import Calendar from './svg/calendar.svg';
import ButtonArrowIcon from './svg/reg-file-button-arrow.svg';

let OnlineMsg = () => {
  return (
    <div>
      <p>Спасибо за регистрацию онлайн</p>
      <p>Спасибо за интерес к нашей конференции! Вы успешно зарегистрировались на онлайн-трансляцию.
        На почту придёт письмо с подтверждением. Если его нет, свяжитесь с нами <a
          href="mailto:support@brandnewconference.ru">support@brandnewconference.ru</a></p>
      <p>Пока есть время задать вопросы спикерам и пригласить на конференцию коллег🙂</p>
      <p>
        <a style={{display: "flex", alignItems: "center"}} target="_blank"
           href="/images/upload/contacts/conference_dentsu_online.ics">
          <img src={Calendar} style={{width: "22px", marginRight: "10px"}}/> Конференция dentsu Online
        </a>
      </p>
    </div>
  );
}

const OfflineMsg = () => {
  return (
    <div>
      <p>Спасибо за регистрацию офлайн</p>
      <p>Спасибо за интерес к нашей конференции! Вашу заявка на офлайн-участие рассмотрим в течение недели.
        Модерация нужна, чтобы мы поместились на площадке и гостям было комфортно. Скоро пришлëм письмо с
        результатом модерации на почту. Если его не будет, свяжитесь с нами <a
          href="mailto:support@brandnewconference.ru">support@brandnewconference.ru</a></p>
      <p>Пока есть время задать вопросы спикерам и пригласить на конференцию коллег🙂</p>
      {/*<p><a style={{display: "flex", alignItems: "center"}} target="_blank"*/}
      {/*      href="/images/upload/contacts/conference_dentsu.ics">*/}
      {/*  <img src={Calendar} style={{width: "22px", marginRight: "10px"}}/>*/}
      {/*  Конференция dentsu </a></p>*/}
    </div>
  );
}


const Registration = (props) => {

  const dispatch = useDispatch();

  const valuesEmpty = {
    name: '',
    last_name: '',
    patronymic: '',
    post_name: '',
    company_name: '',
    email: '',
    phone: '',
    part_type: '',
  };

  const [values, setValues] = useState({...valuesEmpty});

  const changeAccept = (e, formContext) => {
    console.log(formContext.values.part_type);
  }

  const submitData = (values, formContext) => {

    Api.post(`/api/landing/method/registration/`, {
      body: values,
    })
      .then((resp) => {
        if (typeof resp.error != "undefined" && resp.error.length > 0) {
          dispatch(openModal(<RegistrationNotices>{resp.error}</RegistrationNotices>, 'Регистрация'));
        } else if (typeof resp.data.consumer != "undefined") {
          showSuccessMsg(resp.data.consumer);

          Object.keys(valuesEmpty).map((fieldName) => {
            formContext.setFieldValue(fieldName, '');
          });
        } else {
          dispatch(openModal(<RegistrationNotices msg="Ошибка регистрации"/>, 'Регистрация'));
        }
      });
  }

  const showSuccessMsg = (consumer) => {

    const byLinkMsg = '<p>Спасибо за регистрацию офлайн</p>' +
      '<p>Спасибо за интерес к нашей конференции! Вы успешно зарегистрировались на офлайн-участие. На почту придёт ' +
      'письмо с подтверждением. Если его нет, свяжитесь с нами support@brandnewconference.ru</p>' +
      ' <p>Пока есть время задать вопросы спикерам и пригласить на конференцию коллег🙂</p>';


    if (consumer.part_type == 'online') {
      dispatch(openModal(<RegistrationNotices><OnlineMsg/></RegistrationNotices>, 'Регистрация'));
    } else {
      dispatch(openModal(<RegistrationNotices><OfflineMsg/></RegistrationNotices>, 'Регистрация'));
    }


  }

  let shareText = encodeURIComponent('Brand new conference — конференция про бизнес и маркетинг новой волны.' +
    ' Покажем новую версию dentsu и дадим пользу для сборки стратегии 2023');
  let shareUrl = encodeURIComponent('https://brandnewconference.ru');

  const [accept, setAccept] = useState(`Согласие на <a href='/test/'>обработку своих персональных данных</a>`);

  return (
    <div id="registration" className="main-page__registration">
      <div className="main-page__registration_container">

        <Form
          values={{...values}}
          submitForm={submitData}
        >

          <h2 className="main-page__registration__title">
            ЗАЯВКА НА УЧАСТИЕ В КОНФЕРЕНЦИИ
          </h2>

          <div style={{marginBottom: '10px', display: 'grid', gridTemplateColumns: '600px 600px'}}>


            <div className="main-page__registration__form__main-set">
              <Field>
                <Input
                  label="Имя *"
                  name="name"
                />
              </Field>
              <Field>
                <Input
                  label="Фамилия *"
                  name="last_name"
                />
              </Field>
              <Field>
                <Input
                  label="Компания *"
                  name="company_name"
                />
              </Field>
              <Field>
                <Input
                  label="Должность *"
                  name="post_name"
                />
              </Field>

              <Field>
                <Input
                  label="Телефон"
                  name="phone"

                />
              </Field>

            </div>

            <div className="main-page__registration__descr">
              <p>
                Онлайн-трансляция доступна для всех желающих. В офлайне количество мест ограничено. Все заявки
                проходят
                модерацию в течение недели, ответ придет вам на почту. Регистрацию на офлайн закрываем 12 сентября в
                10:00.
              </p>
            </div>


          </div>


          <div className="field-button">
            <Field>
              <Input
                classExtra="pink"
                label="Email *"
                name="email"
              />
            </Field>
            <SubmitButton>
              <Button
                text=""
                className="registration-submit"
                type="button"
              >
                <img className="registration-submit__arrow" src={ButtonArrowIcon}></img>
              </Button>
            </SubmitButton>
          </div>


          <div>
            <Field>
              <Radio onChange={changeAccept} label="Формат участия" name="part_type">
                <RadioInput value="online" label="Online"/>
                <RadioInput value="offline" label="Offline"/>
              </Radio>
            </Field>
            <div style={{margin: '5px 0 0 18px'}}>
              <Field>
                <Checkbox name="accept" label={accept}/>
              </Field>
            </div>
          </div>
          {/*Согласие на обработку своих персональных данных и использование фото и видео изображений*/}

          <a className="reg-share-link" target="_blank"
             href={`https://t.me/share/url?url=${shareUrl}&text=${shareText}`}>
            <img style={{width: '24px', marginRight: '10px'}} src={Telegram}/>
            Поделиться
          </a>


        </Form>

      </div>
    </div>

  );
}

export default Registration;