document.getElementById('presentButton').onclick = () => {

  let urlParamsObj = {
    font: document.querySelector('input[name="font"]:checked').value,
    color: document.querySelector('input[name="color"]:checked').value,
    align: document.querySelector('input[name="align"]:checked').value,
  };

  const search = new URLSearchParams(urlParamsObj);
  chrome.tabs.create({ url: 'Screen message.html?'+search.toString(), active: true });
  
}
