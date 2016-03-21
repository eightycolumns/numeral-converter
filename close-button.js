(function () {

var closeButton = document.querySelector('#closeButton');

var border = c(closeButton).appendChild('rect').unwrap();

c(border).setAttributes({
  x: 0.5,
  y: 0.5,
  width: 31,
  height: 31,
  fill: 'transparent',
  stroke: '#fff',
  'stroke-width': 1
});

closeButton.addEventListener('mouseover', function () {
  border.setAttribute('stroke', '#333');
});

closeButton.addEventListener('mouseout', function () {
  border.setAttribute('stroke', '#fff');
});

c(closeButton).appendChild('path').setAttributes({
  d: 'M  8  8 ' +
       'L 24 24 ' +
       'M 24  8 ' +
       'L  8 24',

  fill: 'transparent',
  stroke: '#333',
  'stroke-width': 2,
  'stroke-linecap': 'round'
});

closeButton.addEventListener('click', function () {
  location = document.referrer;
});

})();
