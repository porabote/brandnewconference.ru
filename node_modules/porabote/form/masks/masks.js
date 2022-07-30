class Masks {

  digitalOnly = (value) => {
    return value.replace(/\D/g,'');
  }
  //
  // setPriceFormatOnInput = (input, fractionalPartLenght = 2, props, cursorAfter = 'end') => {
  //
  //   if(typeof input == 'string') input = document.getElementById(input);
  //
  //   input.addEventListener('keyup', function(){
  //
  //     //Set cursor to end
  //     input.setSelectionRange(input.value.length, input.value.length);
  //
  //     let inputValue = input.value.replace(/[^0-9]/gim,'');
  //
  //     // If length smaller than 3, add zero
  //     switch(inputValue.length) {
  //       case 0:
  //         inputValue = '000';
  //         break;
  //       case 1:
  //         inputValue = '00' + inputValue;
  //         break;
  //       case 2:
  //         inputValue = '0' + inputValue;
  //         break;
  //     }
  //
  //     let partAfterDotted  = inputValue.substr(inputValue.length - fractionalPartLenght, inputValue.length);
  //
  //
  //     let endValue = '.' + partAfterDotted;
  //
  //     let partBeforeDotted  = inputValue.substr(0, inputValue.length - fractionalPartLenght);
  //     if(partBeforeDotted.length == 0) partBeforeDotted = 0;
  //     partBeforeDotted = parseInt(partBeforeDotted).toString().split('').reverse();
  //
  //     var l =1;
  //     for(let r = 0; r < partBeforeDotted.length; r++) {
  //       endValue = partBeforeDotted[r] + endValue;
  //       if(l % 3 == 0) endValue = ' ' + endValue;
  //       l++;
  //     }
  //
  //     input.value = endValue;
  //
  //     // Пользовательский колбек (если задан)
  //     if(typeof props != "undefined" && typeof props['callbackAfterKeyup'] != "undefined") {
  //       props['callbackAfterKeyup'](input);
  //     }
  //
  //   });
  //
  //   input.addEventListener('focus', function(){
  //     input.setSelectionRange(input.value.length, input.value.length);
  //   });
  //   input.addEventListener('click', function(){
  //     input.setSelectionRange(input.value.length, input.value.length);
  //   });
  //
  //
  //
  // }
  //
  // number_format(string, decimals, dec_point = '.', thousands_sep)
  // {
  //   string = '' + string;
  //   //удаляем все символы кроме цифр и точки
  //   var formatted_string = string.replace(/[^\.0-9]/gim,'');
  //
  //   if(formatted_string.length != 0) {
  //
  //     formatted_string = this.dottedControl( formatted_string );
  //
  //     var formatted_ar = formatted_string.split( '.' );
  //
  //     var first_remain = formatted_ar[0].length%3;
  //
  //     if( first_remain != 0 ) {
  //
  //       var first_part  = formatted_string.substr( 0, first_remain);
  //       var second_part = formatted_ar[0].replace(first_part, '');
  //
  //       var second_part = second_part.replace(/(\d{3})/g, '$1 ');
  //
  //       formatted_string = first_part+' '+second_part.trim();
  //       formatted_string = formatted_string.trim()+'.'+formatted_ar['1'];
  //     } else {
  //       var second_part = formatted_ar[0].replace(/(\d{3})/g, '$1 ');
  //       formatted_string = second_part.trim() + dec_point + formatted_ar['1'];
  //     }
  //
  //   }
  //
  //   return formatted_string;
  // }
  //
  // dottedControl(string) {
  //
  //   // считаем количество точек в строке
  //   var count_dotted = this.countSymbols( string,'\\.');
  //
  //   if( !count_dotted ) {
  //     string = string+'.00';
  //   } else if( count_dotted > 1 ) {
  //     string = string.replace(/(\.[0-9]*)$|\./g, '$1')
  //   }
  //   return string;
  //
  // }
  //
  // countSymbols(string, symbol) {
  //   return ( string.match( RegExp(symbol,'g') ) || [] ).length;
  // }

}

export default new Masks();