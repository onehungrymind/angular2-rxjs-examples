export const getOffsetLeft = event => {
  const offsetParent = event.target.offsetParent || event.target.parentElement.offsetParent;

  return offsetParent.offsetLeft;
};

export const getOffsetTop = event => {
  return event.srcElement.offsetTop || event.offsetY - event.layerY;
};

export const getSourceElement = () => {
  return document.getElementsByClassName('app-content')[0];
};
