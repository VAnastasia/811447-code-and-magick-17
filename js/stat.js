'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_X = CLOUD_X + 10;
var SHADOW_Y = CLOUD_Y + 10;
var COLUMN_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;
var CONGRATULATION = 'Ура вы победили!\nСписок результатов:';
var CONGRATULATION_X = CLOUD_X + 20;
var CONGRATULATION_Y = CLOUD_Y + 15;
var LINE_HEIGHT = 20;
var TIME_Y = CLOUD_Y + 60;
var NAME_Y = CLOUD_Y + 240;
var COLUMN_X = CLOUD_X + 40;
var COLUMN_Y = CLOUD_Y + 80;

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

var renderText = function (ctx, text, lineheight, x, y) {
  var strings = text.split('\n');

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = '#000';

  for (var i = 0; i < strings.length; i++) {
    ctx.fillText(strings[i], x, y + lineheight * i);
  }
};

var renderColumn = function (ctx, name, time, maxTime, x) {
  var columnHeight = COLUMN_HEIGHT / maxTime * time;
  var randomColor = Math.round(Math.random() * 205 + 50);
  ctx.fillStyle = '#000';
  ctx.fillText(Math.round(time), x, TIME_Y + (COLUMN_HEIGHT - columnHeight));
  ctx.fillText(name, x, NAME_Y);

  ctx.fillStyle = name === 'Вы' ? 'rgb(255, 0, 0)' : 'rgb(0, 0, ' + randomColor + ')';
  ctx.fillRect(x, COLUMN_Y + (COLUMN_HEIGHT - columnHeight), COLUMN_WIDTH, columnHeight);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, SHADOW_X, SHADOW_Y, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  renderText(ctx, CONGRATULATION, LINE_HEIGHT, CONGRATULATION_X, CONGRATULATION_Y);

  var maxTime = getMaxElement(times);
  for (var i = 0; i < names.length; i++) {
    renderColumn(ctx, names[i], times[i], maxTime, COLUMN_X + (COLUMN_GAP + COLUMN_WIDTH) * i);
  }
};
