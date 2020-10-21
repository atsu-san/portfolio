const localeSelect = document.querySelector('select');

localeSelect.addEventListener('change', () => {
    const num = localeSelect.selectedIndex;

    let xhr = new XMLHttpRequest();

    xhr.open('POST', 'translation.php', true);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhr.responseType = 'document';
    xhr.send('locale=' + localeSelect.value + '&mo_filename=' + localeSelect[num].innerText);

    xhr.onload = function () {
        if (xhr.status === 200) {
            let retrieved_translation = xhr.response.querySelector('#output');
            document.querySelector("#translation").innerHTML = retrieved_translation.innerHTML;
        }
    }
});
