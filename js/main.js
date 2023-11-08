const codeArea = document.getElementById('code-area');
const copyButton = document.getElementById('copy-btn');

fetch('res/data/ENT_WTF_2.js')
    .then(response => {
        if (!response.ok) {
            throw new Error('Échec de la récupération du fichier.');
        }
        return response.text();
    })
    .then(data => {
        codeArea.value = data;
    })
    .catch(error => {
        console.error(error);
    });

copyButton.addEventListener('click', function () {
    codeArea.select();
    document.execCommand('copy');
    codeArea.blur();
});