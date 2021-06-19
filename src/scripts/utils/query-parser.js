const getPathVariable = () => {
    const paths = window.location.href.split('/');
    const lastPath = paths[paths.length -1];
    return lastPath
}

const getUrlParams = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params
}

module.exports = {getPathVariable, getUrlParams}