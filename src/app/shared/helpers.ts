export const getOffsetLeft = (event, removeFromPath) => {
  const totalOffsetLeft = event.path
    .filter(path => {
      return !removeFromPath
        || (path.className !== removeFromPath && path.tagName !== removeFromPath.toLowerCase());
    })
    .filter(path => {
      return !path.attributes || !Object.keys(path.attributes).filter(key => {
        return path.attributes[key].nodeName.includes('nghost')
      }).length;
    })
    .reduce((acc, curr) => {
      return acc + (curr.offsetLeft || 0);
    }, 0);

  // console.log('TARGET: ', event.target.className);
  // console.log('CLIENT-X: ', event.clientX);
  // console.log('RECT-LEFT: ', event.target.getBoundingClientRect().left);
  // console.log('EVENT OFFSET: ', event.offsetX);
  // console.log('TOTAL OFFSET: ', totalOffsetLeft);
  // console.log('===================== ');

  return totalOffsetLeft;
};

export const getOffsetTop = (event, removeFromPath) => {
  const totalOffsetTop = event.path
    .filter(path => {
      return !removeFromPath
        || (path.className !== removeFromPath && path.tagName !== removeFromPath.toLowerCase());
    })
    .filter(path => {
      return (!path.attributes || !Object.keys(path.attributes).filter(key => {
          return path.attributes[key].nodeName.includes('nghost')
        }).length);
    })
    .reduce((acc, curr) => {
      return acc + (curr.offsetTop || 0);
    }, 0);

  console.log('TARGET: ', event.target.className);
  console.log('PAGE-Y: ', event.pageY);
  console.log('RECT-TOP: ', event.target.getBoundingClientRect().top);
  console.log('EVENT OFFSET: ', event.offsetY);
  console.log('TOTAL OFFSET: ', totalOffsetTop);
  console.log('===================== ');

  return totalOffsetTop;
};

export const getSourceElement = () => {
  return document.getElementsByClassName('app-content')[0];
};
