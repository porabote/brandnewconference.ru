import Datas from "porabote/datas";

class DateTime {
  constructor() {
    this.monthsList = [
      ["янв", "январь", "января", "01"],
      ["фев", "февраль", "февраля", "02"],
      ["мар", "март", "марта", "03"],
      ["апр", "апрель", "апреля", "04"],
      ["май", "май", "мая", "05"],
      ["июн", "июнь", "июня", "06"],
      ["июл", "июль", "июля", "07"],
      ["авг", "август", "августа", "08"],
      ["сен", "сентябрь", "сентября", "09"],
      ["окт", "октябрь", "октября", "10"],
      ["ноя", "ноябрь", "ноября", "11"],
      ["дек", "декабрь", "декабря", "12"]
    ];
    this.weekdays_less_list = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    this.weekdays_list = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  }

  getCurrntWeek() {
    var date = new Date();

    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
      - 3 + (week1.getDay() + 6) % 7) / 7);
  }

  getWeeksList() {
    let i = 0;
    var weeks = [];
    var weekNumber = 1;
    var monday = this.getFirstMondayOfYear();

    while (i < 365) {

      weeks[weekNumber] = weekNumber + '  (' + monday.getDate() + ' ' + this.monthsList[monday.getMonth()][0];
      monday.setDate(monday.getDate() + 6);
      weeks[weekNumber] += ' - ' + monday.getDate() + ' ' + this.monthsList[monday.getMonth()][0] + ')';
      monday.setDate(monday.getDate() + 1);
      i = i + 7;
      weekNumber++;
    }
    //if(typeof weeks[53] != "undefined") delete weeks[53];

    return weeks;
  }

  getFirstMondayOfYear() {
    // Thurstay it always first week 4 is always in week 1.
    var date4Jan = new Date(new Date().getFullYear(), 0, 4);
    var date4JanDayOfWeek = date4Jan.getDay();
    var delta = date4Jan.getDate() - date4JanDayOfWeek + (date4JanDayOfWeek == 0 ? -6 : 1);// adjust when day is sunday

    return new Date(date4Jan.setDate(delta));
  }

  setFormat(Date) {
    return ((Date.getDate() < 10) ? '0' + Date.getDate() : Date.getDate()) + ' ' +
      this.monthsList[Date.getMonth()][0] +
      ' ' + Date.getFullYear();
  }


  buildList() {
    var taskBody = document.getElementById('tasksBody');
    taskBody.innerHTML = '';

    var tasks = this;
    for (var i = 0; i < tasks.data.length; i++) {

      var target = document.getElementById('targetItem').cloneNode(true);
      target.id = 'item' + i;
      target.innerHTML = onApp.replacer.set(target.innerHTML, tasks.data[i]);

      taskBody.appendChild(target);


      let dateParams = {
        datetime: "2019-06-04 16:30:00",
        "mask": "hh:mm, DD MMMM YYYY",
        "declension": true
      };
      console.log(this.setDateMask(dateParams));

    }
  }


  /*
   * Наложение масок дат на содержимое тега TIME
   */
  timeDeclension(dom) {


    $(dom + ' time').each(function () {

      var params_default = {
        'mask': 'hh:mm, DD MMMM YYYY',
        'declension': true
      }

      var params = $(this).core('stringToJson');
      if (Object.keys(params).length > 0) {

        var params = Object.assign(params_default, params);

        $(this).text($.fn.core('setDateMask', params));
      }
    });
  }

  setDateMask(params) {
    var date = params['datetime'].split(' ');
    date[0] = date[0].split('-');
    date[1] = date[1].split(':');

    var date = new Date(date[0][0], --date[0][1], date[0][2], date[1][0], date[1][1], date[1][2]);

    return params['mask'].replace(/YYYY/g, date.getFullYear()).replace(/YY/g, (date.getFullYear().toString().replace(/^.{2}/, ''))).replace(/MMMM/g, this.monthsList[date.getMonth()][(params['declension']) ? 2 : 1]).replace(/MMM/g, this.monthsList[date.getMonth()][0]).replace(/MM/g, (date.getMonth() < 10) ? '0' + date.getMonth() : date.getMonth()).replace(/M/g, date.getMonth()).replace(/DD/g, (date.getDate() < 10) ? '0' + date.getDate() : date.getDate()).replace(/D/g, date.getDate()).replace(/hh/g, (date.getHours() < 10) ? '0' + date.getHours() : date.getHours()).replace(/h/g, date.getHours()).replace(/mm/g, (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes()).replace(/m/g, date.getMinutes());

  }

  stringToDate(dateString) {
      let dateSplited = dateString.split('-');
      return new Date(dateSplited[0], dateSplited[1] - 1, dateSplited[2], 0, 0, 0);
  }

}

export default new DateTime()