(function () {

function isArabicNumeral(string) {
  var arabicNumeral = new RegExp(
    '^(?:0|[1-9]\\d*)$'
  );

  return arabicNumeral.test(string);
}

function isRomanNumeral(string) {
  var romanNumeral = new RegExp(
    '^(?=.)' +
    'M{0,3}' +
    '(?:D?C{0,3}|CM|CD)' +
    '(?:L?X{0,3}|XC|XL)' +
    '(?:V?I{0,3}|IX|IV)$', 'i'
  );

  var uniformCase = new RegExp('^(?:[^A-Z]*|[^a-z]*)$');

  return romanNumeral.test(string) && uniformCase.test(string);
}

function isInRange(arabicNumeral) {
  var lowerLimit = 1;
  var upperLimit = 3999;

  return arabicNumeral >= lowerLimit && arabicNumeral <= upperLimit;
}

var numericValues = {
  M: 1000, CM: 900,
  D:  500, CD: 400,
  C:  100, XC:  90,
  L:   50, XL:  40,
  X:   10, IX:   9,
  V:    5, IV:   4,
  I:    1
};

function toArabicNumeral(romanNumeral) {
  var arabicNumeral = 0;

  while (romanNumeral !== '') {
    if (romanNumeral.slice(0, 2).toUpperCase() in numericValues) {
      arabicNumeral += numericValues[romanNumeral.slice(0, 2).toUpperCase()];
      romanNumeral = romanNumeral.slice(2);
    } else {
      arabicNumeral += numericValues[romanNumeral.slice(0, 1).toUpperCase()];
      romanNumeral = romanNumeral.slice(1);
    }
  }

  return arabicNumeral.toString();
}

function toRomanNumeral(arabicNumeral) {
  var romanNumeral = '';

  for (var key in numericValues) {
    while(arabicNumeral >= numericValues[key]) {
      romanNumeral += key;
      arabicNumeral -= numericValues[key];
    }
  }

  return romanNumeral;
}

var input = document.querySelector('input');

input.addEventListener('blur', function () {
  if (input.value.trim() === '') {
    input.style.borderColor = '#ccc';
    input.style.borderWidth = '1px';
    input.style.width = '64px';
  }
});

input.addEventListener('focus', function () {
  input.style.borderColor = '#fff';
  input.style.borderWidth = '1px 0';
  input.style.width = '100%';
});

var output = document.querySelector('#output');

input.addEventListener('input', function () {
  var string = input.value.trim();

  if (string === '') {
    output.innerHTML = '&nbsp;';
  } else if (isArabicNumeral(string)) {
    if (isInRange(string)) {
      output.textContent = toRomanNumeral(string);
    } else {
      output.textContent = 'Out of Range';
    }
  } else if (isRomanNumeral(string)) {
    output.textContent = toArabicNumeral(string);
  } else {
    output.textContent = 'Input Invalid';
  }
});

})();
