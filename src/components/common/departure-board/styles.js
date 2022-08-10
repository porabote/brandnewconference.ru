const stylesDesktop = {
  fontSize: '125px',
  halfHeight: '75px',
  lineHeight: '120px',
  prevTop: '75px',
  prevSpanTop: '-75px',
  backTop: '75px',
  backSpanTop: '-75px',
  frontTop: '0px',
  frontSpanTop: '0px',
  nextTop: '0px',
  nextSpanTop: '0px',
  rowTopOffset: 125,
  spaceOffset: 45,
  letterWidth: 94,
  sizesMap: {
    'Ж': {width: 144},
    'Ы': {width: 114},
    'М': {width: 110},
    'Ф': {width: 110},
    'О': {width: 110},
    'Н': {width: 95},
    'Г': {width: 90},
    'З': {width: 89},
    'Е': {width: 82},
    'С': {width: 99},
  }
};

const stylesNote = {
  fontSize: '4.5rem',
  halfHeight: '51px',
  lineHeight: '90px',
  prevTop: '50px',
  prevSpanTop: '-50px',
  backTop: '50px',
  backSpanTop: '-50px',
  frontTop: '0px',
  frontSpanTop: '0px',
  nextTop: '0px',
  nextSpanTop: '0px',
  rowTopOffset: 77,
  letterWidth: 67,
  spaceOffset: 33,
  sizesMap: {
    'Ж': {width: 94},
    'Ы': {width: 77},
    'М': {width: 69},
    'Ф': {width: 69},
    'О': {width: 69},
    'Г': {width: 60},
    'З': {width: 62},
    'Е': {width: 60},
    'Я': {width: 65},
    ' ': {width: 25},
  },
};

const stylesMobile = {
  fontSize: '2.4rem',
  halfHeight: '30px',
  lineHeight: '60px',
  prevTop: '30px',
  prevSpanTop: '-30px',
  backTop: '30px',
  backSpanTop: '-30px',
  frontTop: '0px',
  frontSpanTop: '0px',
  nextTop: '0px',
  nextSpanTop: '0px',
  rowTopOffset: 43,
  // szhWidth: 47,
  // yiWidth: 38,
  spaceOffset: 15,
  letterWidth: 32,
  sizesMap: {
    'Ж': {width: 50},
    'Ы': {width: 40},
    'М': {width: 34},
    'Ф': {width: 34},
    'Д': {width: 34},
    'О': {width: 34},
    'Г': {width: 26},
    'З': {width: 28},
    'Е': {width: 28},
    'Я': {width: 31},
    ' ': {width: 15},
  },
};

let windowWidth = window.screen.width;

let style = stylesMobile;
if (windowWidth > 1280) {
  style = stylesDesktop;
} else if (windowWidth > 768) {
  style = stylesNote;
}
//style = stylesMobile;

export default style;