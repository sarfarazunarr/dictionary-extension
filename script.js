function searchWord() {
    let result = document.getElementById('result');
    let intro = document.getElementsByClassName('empty')[0];
    let wordvalue = document.getElementById('wordvalue').value;
    let word = wordvalue.trim();
    console.log('I am running')
    if (!navigator.onLine) {
        intro.innerHTML = 'Please connect with Internet'
        setTimeout(() => {
            intro.innerHTML = 'Data will be here!';
        }, 2000);
    }
    intro.innerHTML = 'Loading...';
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((response) => response.json())
        .then((data) => {
            intro.style.display = 'none'
            result.classList.remove('hidden');
            let definitionsHTML = '';

            // Iterate through meanings array
            data[0].meanings.forEach((meaning) => {
                meaning.definitions.forEach((definition, index) => {
                    definitionsHTML += `<details>
                    <summary>Definition ${index + 1}</summary>
                    <p class="data">${definition.definition}</p>
                </details>`;
                });
                document.getElementsByClassName('definition')[0].innerHTML = definitionsHTML;
            });

        }).catch((error) => {
            if (error.name === 'TypeError') {
                result.classList.add('hidden');
                intro.style.display = 'block';
                intro.innerHTML = 'Network Error!'
                setTimeout(() => {
                    intro.innerHTML = 'Data will be here';
                }, 4000);
            }
            console.log(error)
        })

};

document.getElementById('search').addEventListener('click', searchWord)