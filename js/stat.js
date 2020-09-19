'use strict';

const Cloud = {
  X: 100,
  Y: 10,
  HEIGHT: 270,
  WIDTH: 420,
  FILL: `#fff`
};
const CLOUD_SHADOW_OFFSET = 10;
const CLOUD_SHADOW_FILL = `rgba(0, 0, 0, 0.7)`;

const LARGE_GAP = 20;
const GAP = 10;

const Title = {
  FIRST_ROW: `Ура вы победили`,
  SECOND_ROW: `Список результатов`
};

const Font = {
  STYLE: `PT Mono 16px`,
  COLOR: `#000`
};

const Column = {
  MAX_HEIGHT: 150,
  WIDTH: 40,
  PADDING_TOP: LARGE_GAP * 4,
  GAP: 50
};

const CurrentUser = {
  NAME: `Вы`,
  FILL: `rgba(255, 0, 0, 1)`
};

const MAX_SATURATION_IN_PERCENT = 70;

const getRandomColumnFill = () => {
  const saturation = Math.random() * MAX_SATURATION_IN_PERCENT;
  return `hsl(255, ${saturation}%, 50%)`;
};

const renderRect = (ctx, x, y, w, h, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
};

const renderClouds = (ctx) => {
  renderCloud(ctx, Cloud.X + CLOUD_SHADOW_OFFSET, Cloud.Y + CLOUD_SHADOW_OFFSET, CLOUD_SHADOW_FILL);
  renderCloud(ctx, Cloud.X, Cloud.Y, Cloud.FILL);
};

const renderCloud = (ctx, x, y, color) => {
  renderRect(ctx, x, y, Cloud.WIDTH, Cloud.HEIGHT, color);
};

const getProportionHeight = (time, max) => Math.round(Column.MAX_HEIGHT * time / max);

const renderColumns = (ctx, names, times) => {
  const maxTime = Math.max(...times);

  names.forEach((name, i) => {
    const time = Math.round(times[i]);
    const proportionHeight = getProportionHeight(time, maxTime);
    const heightDelta = Column.MAX_HEIGHT - proportionHeight;
    const resultColumnHeight = Column.MAX_HEIGHT - GAP - heightDelta;

    const columnX = Cloud.X + Column.WIDTH + (Column.GAP + Column.WIDTH) * i;
    const baseY = Cloud.Y + Column.PADDING_TOP;

    renderText(ctx, columnX, baseY + Column.MAX_HEIGHT + LARGE_GAP, name);
    renderColumn(ctx, columnX, baseY + heightDelta + GAP, resultColumnHeight, isUserColumn(name));
    renderText(ctx, columnX, baseY + heightDelta, time.toString());
  });
};

const renderColumn = (ctx, x, y, h, isUserColumn) => {
  const color = isUserColumn ? CurrentUser.FILL : getRandomColumnFill();
  renderRect(ctx, x, y, Column.WIDTH, h, color);
};

const renderTitle = (ctx) => {
  renderText(ctx, Cloud.X + LARGE_GAP, Cloud.Y + LARGE_GAP * 2, Title.FIRST_ROW);
  renderText(ctx, Cloud.X + LARGE_GAP, Cloud.Y + LARGE_GAP * 3, Title.SECOND_ROW);
};

const renderText = (ctx, x, y, text) => {
  ctx.fontStyle = Font.STYLE;
  ctx.fillStyle = Font.COLOR;
  ctx.fillText(text, x, y);
};

const isUserColumn = (name) => name === CurrentUser.NAME;

window.renderStatistics = (ctx, names, times) => {
  renderClouds(ctx);
  renderTitle(ctx);
  renderColumns(ctx, names, times);
};
