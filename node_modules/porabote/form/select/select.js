import React, {useState, useEffect} from "react";
import Option from "./option";
import SelectTags from "./select-tags";
import Api from "@services/api-service";
import Datas from "porabote/datas";

const Select = (props) => {

  const [options, setStateOptions] = useState([]);
  const [empty, setEmpty] = useState(props.empty || "Не выбрано");
  const [seekValue, setSeekValue] = useState("");
  const [seekDelay, setSeekDelay] = useState(300);
  const [mode, setMode] = useState(props.mode || "default");
  const [inputValue, setInputValue] = useState("");
  const [searchPhrase, setSearchPhrase] = useState("");
  const [url, setUrl] = useState(props.url || null);
  const [dataStorage, setDataStorage] = useState([]);
  const [isOpened, setIsOpened] = useState(false);
  const [buttons] = useState(props.buttons || []);

  const wrap = React.createRef();
  const toggle = React.createRef();
  const textInput = React.createRef();
  const dropPanel = React.createRef();
  //const toggleDropList = null;// = toggleDropList.bind(this);

  useEffect(() => {
    setDropPanelWidth();
    setElementPositions();

    if (!url) {
      setOptions();
    } else {
      getDataByApi();
    }
  }, [props.children]);

  const getDataByApi = () => {

    Api.get(
      props.url,
      {
        //query: values,
      }
    ).then((data) => {

      let dataStorage = {};

      let options = data.data.map((item, index) => {
        let data = item.attributes;

        dataStorage[data.id] = data;

        return <Option key={index} value={data.id}>{data.name}</Option>;
      });


      setDataStorage(dataStorage);

      setOptions([]);
    })

  }


  /*
  * Set Options
  * */
  const setOptions = (OptionsApi = {}) => {
    let Options = [];

    if (Object.keys(OptionsApi).length === 0) {
      //If only one Option, put to array
      Options = (Array.isArray(props.children)) ? [...props.children] : [props.children]
    } else {
      Options = OptionsApi
    }

    if (empty) setEmptyOption(Options);

    let selectedOption = null;

    let currentValue = Datas.getValueByPath(props.name, props.formContext.values);

    let options = Options.map(child => {
      if (typeof child === "undefined") return

      if (child.props.value == currentValue) {
        selectedOption = child
      }
      return child;
    });

    let inputValue = (selectedOption && mode !== "tags")
      ? selectedOption.props.children : empty

    setStateOptions(options);
    setInputValue(inputValue);
  }

  /*
  * Set Default Option
  * */
  const setEmptyOption = (options) => {
    if (empty) {
      options.unshift(<Option key={Math.random()} value="">{empty}</Option>)
    }
    return options
  }

  const clickByOption = (e) => {

    setIsOpened(false);

    setInputValue(e.target.innerText);
    setSeekValue("");
    // setState({
    //   value: e.target.getAttribute("value"),
    //   inputValue: e.target.innerText,
    //   seekValue: ""
    // })

    if (typeof props.clickByOption != "function") {
      props.formContext.setFieldValue(props.name, e.target.getAttribute("value"));
    } else {
      props.clickByOption(e, props.formContext);
    }

    if (typeof props.afterSelectCallback === "function") props.afterSelectCallback(e, props.formContext)

    e.preventDefault();
  }

  const clickByOptionTagsMode = (e) => {

    if (e.target.getAttribute("value").length === 0) return

    let value = [...props.formContext.values[props.name], e.target.getAttribute("value")]
    props.formContext.setFieldValue(props.name, e.target.getAttribute("value"), "push")

    value = value.filter((value, index, self) => {
      return self.indexOf(value) === index;
    })

    // setState({
    //   value
    // })

    //props.formContext.setFieldValue(props.name, value)

  }

  const setElementPositions = () => {
    dropPanel.current.style.top = "34px";
  }


  const toggleDropList = (el) => {
    if (!isOpened) {
      textInput.current.focus();
      setIsOpened(true);
    } else {
      setIsOpened(false);
    }
  }

  const showDropPanel = () => {
    dropPanel.current.style.zIndex = 1000
    setIsOpened(true);
  }

  const hideDropPanel = () => {
    dropPanel.current.style.zIndex = 10
    setIsOpened(false);
  }

  /* Если селект был инициализирован в display:none, обновляем ширину */
  const setDropPanelWidth = () => {
    if (wrap.offsetWidth !== dropPanel.current.offsetWidth) {
      dropPanel.current.style.width = wrap.offsetWidth + "px";
    }
  }

  const buildOptions = () => {

    return options.map((option, index) => {

      if (typeof option === "undefined" || typeof option.props === "undefined") return

      let isMatch = (
        option.props.children
        && option.props.children.length > 0
        && !option.props.children.toLowerCase().includes(seekValue)
      ) ? false : true;

      if (!isMatch) return;

      let afterSelectCallback = clickByOption;
      if (mode === "tags") afterSelectCallback = clickByOptionTagsMode

      return React.cloneElement(option, {...option.props, afterSelectCallback})
    })

  }


  let dropStyle = {visibility: "hidden"}

  if (isOpened) {
    dropStyle = {visibility: "visible"}
  }

  let reOptions = buildOptions();

  const tags = (mode === "tags") ?
    <SelectTags
      name={props.name}
      formContext={props.formContext}
      tagElement={props.tagElement}
      dataStorage={dataStorage}
    /> : "";

  let disabled = (typeof props.desabled !== "undefined" && props.disabled) ? true : false;
  if (typeof props.disabled == "function" ) {
    disabled = props.disabled(props.formContext);
  }

  return (
    <div className="form-item flex no_padding">
      <label className="form-item__label">{props.label}</label>
      <div className="form-item__select-wrap" ref={wrap}>
          <span className="form-item__select-custom">
              <input
                disabled={disabled}
                ref={textInput}
                className="form-item__select-custom__input"
                type="text"
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setSeekValue(e.target.value.toLowerCase());
                }}
                onClick={(e) => {
                  e.target.select();
                }}
                onFocus={showDropPanel}
                onBlur={e => {
                  hideDropPanel();
                }}
                value={(inputValue) ? inputValue : ""}
              />

              <span
                ref={toggle}
                className="form-item__select-custom__toggle"
                onMouseDown={(e) => {
                  if (disabled) return;
                  e.preventDefault();
                  toggleDropList()
                }}
              >
                  <span className="form-item__select-custom__icon"></span>
              </span>

              <div
                style={dropStyle}
                ref={dropPanel}
                className="form-item__select__drop-blok"
              >
                  <span>
                      {reOptions}
                  </span>

              </div>

            <div className="form-item__select__buttons">
              {buttons.map(item => item)}
            </div>
          </span>
      </div>
      {tags}
    </div>
  );


}

export default Select;