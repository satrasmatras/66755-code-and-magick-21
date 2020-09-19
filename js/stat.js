'use strict';

const CLOUD_X = 100;
const CLOUD_Y = 10;
const CLOUD_HEIGHT = 270;
const CLOUD_WIDTH = 420;
const CLOUD_FILL = `#fff`;

const LARGE_GAP = 20;
const GAP = 10;

const CLOUD_SHADOW_OFFSET = 10;
const CLOUD_SHADOW_FILL = `rgba(0, 0, 0, 0.7)`;

const FIRST_TITLE_ROW = `Ура вы победили`;
const SECOND_TITLE_ROW = `Список результатов`;

const FONT = `PT Mono 16px`;
const FONT_COLOR = `#000`;

const COLUMN_PADDING_TOP = LARGE_GAP * 4;
const MAX_COLUMN_HEIGHT = 150;
const COLUMN_WIDTH = 40;
const COLUMN_GAP = 50;

const USER_COLUMN_FILL = `rgba(255, 0, 0, 1)`;
const MAX_SATURATION_IN_PERCENT = 70;

const getRandomColumnFill = () => {
  const saturation = Math.random() * MAX_SATURATION_IN_PERCENT;
  return `hsl(255, ${saturation}%, 50%)`;
};

const renderRect = (ctx, x, y, w, h, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
};

const renderCloud = (ctx, x, y, color) => {
  renderRect(ctx, x, y, CLOUD_WIDTH, CLOUD_HEIGHT, color);
};

const getProportionHeight = (time, max) => Math.round(MAX_COLUMN_HEIGHT * time / max);

const renderColumns = (ctx, names, times) => {
  const maxTime = Math.max(...times);

  names.forEach((name, i) => {
    const time = Math.round(times[i]);
    const proportionHeight = getProportionHeight(time, maxTime);
    const heightDelta = MAX_COLUMN_HEIGHT - proportionHeight;
    const resultColumnHeight = MAX_COLUMN_HEIGHT - GAP - heightDelta;

    const columnX = CLOUD_X + COLUMN_WIDTH + (COLUMN_GAP + COLUMN_WIDTH) * i;
    const baseY = CLOUD_Y + COLUMN_PADDING_TOP;

    renderText(ctx, columnX, baseY + MAX_COLUMN_HEIGHT + LARGE_GAP, name);
    renderColumn(ctx, columnX, baseY + heightDelta + GAP, resultColumnHeight, isUserColumn(name));
    renderText(ctx, columnX, baseY + heightDelta, time);
  });
};

const renderColumn = (ctx, x, y, height, isUserColumn) => {
  const color = isUserColumn ? USER_COLUMN_FILL : getRandomColumnFill();
  renderRect(ctx, x, y, COLUMN_WIDTH, height, color);
};

const renderText = (ctx, x, y, text) => {
  ctx.fontStyle = FONT;
  ctx.fillStyle = FONT_COLOR;
  ctx.fillText(text, x, y);
};

const isUserColumn = (name) => name === `Вы`;

window.renderStatistics = (ctx, names, times) => {
  renderCloud(ctx, CLOUD_X + CLOUD_SHADOW_OFFSET, CLOUD_Y + CLOUD_SHADOW_OFFSET, CLOUD_SHADOW_FILL);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_FILL);

  renderText(ctx, CLOUD_X + LARGE_GAP, CLOUD_Y + LARGE_GAP * 2, FIRST_TITLE_ROW);
  renderText(ctx, CLOUD_X + LARGE_GAP, CLOUD_Y + LARGE_GAP * 3, SECOND_TITLE_ROW);

  renderColumns(ctx, names, times);
};
