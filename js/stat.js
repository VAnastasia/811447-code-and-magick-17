'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var COLUMN_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);

};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', CLOUD_X + 20, CLOUD_Y + 15);
  ctx.fillText('Список результатов:', CLOUD_X + 20, CLOUD_Y + 35);

  var maxTime = getMaxElement(times);
  for (var i = 0; i < names.length; i++) {
    var randomColor = Math.round(Math.random() * 205 + 50);
    var columnHeight = COLUMN_HEIGHT / maxTime * times[i];

    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + 50 + (COLUMN_GAP + COLUMN_WIDTH) * i, CLOUD_Y + 60 + (COLUMN_HEIGHT - columnHeight));
    ctx.fillText(names[i], CLOUD_X + 50 + (COLUMN_GAP + COLUMN_WIDTH) * i, CLOUD_Y + 240);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, ' + randomColor + ', 1)';
    }

    ctx.fillRect(CLOUD_X + 50 + (COLUMN_GAP + COLUMN_WIDTH) * i, CLOUD_Y + 80 + (COLUMN_HEIGHT - columnHeight), COLUMN_WIDTH, columnHeight);
  }
};
