export const getSidenavOffsetLeft = (path) => {
  const sidenavPath = path
    .find(path => path.className === 'md-sidenav-content');

  return sidenavPath ? sidenavPath.offsetLeft : -10000;
};
