console.log("New Conference Firing");


// SUBMIT FORM
window.addEventListener('DOMContentLoaded', async () => {
    const url = "http://localhost:8000/api/locations/";

    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();
        // find element id in HTML
        const selectTag = document.getElementById("location");
        for (let location of data.locations) {
            const option = document.createElement("option");
            option.value = location.id;
            option.innerHTML = location.name;
            selectTag.appendChild(option);
        }
    }

    const formTag = document.getElementById('create-conference-form');

    formTag.addEventListener('submit', submitForm);

    async function submitForm(event) {
        event.preventDefault();
        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));
        console.log("Json object", json);

        const conferenceUrl = 'http://localhost:8000/api/conferences/';

        const fetchConfig = {
            method: "post",
            body: json,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(conferenceUrl, fetchConfig);

        if (response.ok) {
            formTag.reset();
            const newConferece = await response.json();
            console.log("New Conference", newConferece);
        };
    };

});
