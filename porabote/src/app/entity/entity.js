import Api from "@services";

export default class Entity {

  primaryKey = 'id';

  save = (values, callback) => {

    let apiMethod = (typeof this.primaryKey != "undefined" && values[this.primaryKey]) ? 'edit' : 'create';
//${this.constructor.name}
    Api.post(`/api/TimingsTopics/method/${apiMethod}/`, {
      body: values
    }).then((resp) => {
      if (typeof callback == "function") callback(resp);
    });
  }
  
}