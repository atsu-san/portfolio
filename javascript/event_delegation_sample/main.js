const attachedDiv = document.querySelector('#event_handler_attached');

// attaching the same event handler to several elements (i.e. div + 3 buttons)
attachedDiv.addEventListener('click', function (e) {
    setColor(e);
    logActions(e);
}, false);

function setColor(e) {
    attachedDiv.style.backgroundColor = e.target.getAttribute('data-color');
}

function logActions(e) {
    const info = document.createElement('div');
    document.body.appendChild(info);

    if (e.currentTarget === e.target) {
        info.innerHTML = '<p>Div (<b>top</b> element) is clicked!</p>';
    } else {
        info.innerHTML = '<p>Button (<b>descendant</b> element) is clicked!</p>';
    }
    info.innerHTML += '<ul><li>event.currentTarget = ' + e.currentTarget + '</li><li>event.target = ' + e.target + '</li></ul>';
}