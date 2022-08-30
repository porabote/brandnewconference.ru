import React, {useState, useEffect} from "react";
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
            <p>Спасибо за интерес к&nbsp;нашей конференции! Вы успешно зарегистрировались на&nbsp;онлайн-трансляцию.
                На&nbsp;почту придёт письмо с&nbsp;подтверждением. Если его нет, свяжитесь с&nbsp;нами <a
                    href="mailto:support@brandnewconference.ru">support@brandnewconference.ru</a></p>
            <p>Пока есть время задать вопросы спикерам и&nbsp;пригласить на конференцию коллег🙂</p>
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
            <p>Спасибо за интерес к&nbsp;нашей конференции! Вашу заявку на&nbsp;офлайн-участие рассмотрим в&nbsp;течение недели.
                Модерация нужна, чтобы мы&nbsp;поместились на площадке и&nbsp;гостям было комфортно. Ещё один фактор,
                который мы учитываем — эпидемиологическая обстановка. За&nbsp;неделю до&nbsp;события или раньше пришлëм письмо
                с&nbsp;результатом модерации на&nbsp;почту. Если его не&nbsp;будет, свяжитесь с&nbsp;нами <a
                    href="mailto:support@brandnewconference.ru">support@brandnewconference.ru</a></p>
            <p>Пока есть время задать вопросы спикерам и пригласить на конференцию коллег🙂</p>
        </div>
    );
}
const OfflineMsgByLink = () => {
    return (
        <div>
            <p>Спасибо за регистрацию офлайн</p>
            <p>Спасибо за интерес к нашей конференции! Вы успешно зарегистрировались на&nbsp;офлайн-участие. На&nbsp;почту придёт
                письмо с подтверждением. Если его нет, свяжитесь с&nbsp;нами <a
                    href="mailto:support@brandnewconference.ru">support@brandnewconference.ru</a></p>
            <p>Пока есть время задать вопросы спикерам и&nbsp;пригласить&nbsp;наконференцию коллег🙂</p>
            <p>
                <a style={{display: "flex", alignItems: "center"}} target="_blank"
                   href="/images/upload/contacts/conference_dentsu.ics">
                    <img src={Calendar} style={{width: "22px", marginRight: "10px"}}/> Конференция dentsu
                </a>
            </p>
        </div>
    );
}


const Registration = (props) => {

    if (!props.loading) {
        return <p>Data loading</p>
    }

    let values = {
        name: '',
        last_name: '',
        patronymic: '',
        post_name: '',
        company_name: '',
        email: '',
        phone: '',
        user_id: (props.hash) ? props.hash : '',
        part_type: (props.partFormat) ? props.partFormat : '',
        accept: '',
    };


    useEffect(() => {
        // setValues(values);

    }, [props]);

    const dispatch = useDispatch();

    //const [values, setValues] = useState({});
    const [partFormat, setPartFormat] = useState(props.partFormat);


    const submitData = (values, formContext) => {

        Api.post(`/api/landing/method/registration/`, {
            body: values,
        })
            .then((resp) => {
                if (typeof resp.error != "undefined" && resp.error.length > 0) {
                    dispatch(openModal(<RegistrationNotices>{resp.error}</RegistrationNotices>, 'Регистрация'));
                } else if (typeof resp.data.consumer != "undefined") {
                    showSuccessMsg(resp.data.consumer);

                    Object.keys(values).map((fieldName) => {
                        formContext.setFieldValue(fieldName, '');
                    });
                } else {
                    dispatch(openModal(<RegistrationNotices msg="Ошибка регистрации"/>, 'Регистрация'));
                }
            });
    }

    const showSuccessMsg = (consumer) => {


        if (consumer.part_type == 'offline' && props.hash && props.partFormat == "offline") {
            dispatch(openModal(<RegistrationNotices><OfflineMsgByLink/></RegistrationNotices>, 'Регистрация'));
        } else if (consumer.part_type == 'online') {
            dispatch(openModal(<RegistrationNotices><OnlineMsg/></RegistrationNotices>, 'Регистрация'));
        } else {
            dispatch(openModal(<RegistrationNotices><OfflineMsg/></RegistrationNotices>, 'Регистрация'));
        }

    }

    let shareText = encodeURIComponent('Brand new conference — конференция про бизнес и маркетинг новой волны.' +
        ' Покажем новую версию dentsu и дадим пользу для сборки стратегии 2023');
    let shareUrl = encodeURIComponent('https://brandnewconference.ru');

    let docOnline = `Согласие на <b><a href='/images/doc_accept_opd.pdf'>обработку персональных данных</a></b>`;
    let docOffline = `Согласие на <b><a target="_blank" href='/images/doc_accept_opd.pdf'>обработку персональных данных</a></b> и <b><a target="_blank" href='/images/doc_accept_opd_with_media.pdf'>использование фото и видео изображений</a></b>`;

    const [accept, setAccept] = useState((props.partFormat && props.partFormat == 'offline') ? docOffline : docOnline);

    const changeAccept = (e, formContext) => {
        if (formContext.values.part_type == 'offline') {
            setAccept(docOffline);
        } else {
            setAccept(docOnline);
        }
    }


    return (
        <Form
            values={values}
            submitForm={submitData}
        >
            <div id="registration" className="main-page__registration">


                <h2 className="main-page__registration__title">
                    РЕГИСТРАЦИЯ
                </h2>

                <div className="main-page__registration__grid-container">


                    <div
                      className="main-page__registration__descr"
                      dangerouslySetInnerHTML={{__html: props.textBoxes[1].box_text}}>
                    </div>


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


                <div style={{paddingTop: '0px'}}>
                    {/*{props.partFormat && props.partFormat } -*/}
                    {/*{props.hash && props.hash }*/}
                    <Field>
                        <Radio onChange={changeAccept} label="Формат участия" name="part_type">
                            <RadioInput value="online" label="Online"/>
                            <RadioInput value="offline" label="Offline"/>
                        </Radio>
                    </Field>
                    <div style={{margin: '5px 0 5px 18px'}}>
                        <Field>
                            <Checkbox value="1" name="accept" label={accept}/>
                        </Field>
                    </div>
                </div>

                <a className="reg-share-link" target="_blank"
                   href={`https://t.me/share/url?url=${shareUrl}&text=${shareText}`}>
                    <img style={{width: '24px', marginRight: '10px'}} src={Telegram}/>
                    Поделиться
                </a>


            </div>
        </Form>
    );
}

export default Registration;