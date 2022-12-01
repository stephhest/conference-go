console.log("New Presentation Firing");

// CODE FROM LEARN
window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();

      const selectTag = document.getElementById('conference');
      for (let conference of data.conferences) {
        const option = document.createElement('option');
        option.value = conference.id;
        option.innerHTML = conference.name;
        selectTag.appendChild(option);
      }
    }

    const formTag = document.getElementById('create-presentation-form');
    const selectTag = document.getElementById('conference');

    formTag.addEventListener('submit', async event => {
      event.preventDefault();
      const formData = new FormData(formTag);
      const json = JSON.stringify(Object.fromEntries(formData));

      const conferenceId = selectTag.options[selectTag.selectedIndex].value;
      const presentationUrl = `http://localhost:8000/api/conferences/${conferenceId}/presentations/`;
      const fetchConfig = {
        method: "post",
        body: json,
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(presentationUrl, fetchConfig);
      if (response.ok) {
        formTag.reset();
        const newPresentation = await response.json();
        console.log(newPresentation);
      }
    });
  });

// MY ORIGINAL CODE
// window.addEventListener('DOMContentLoaded', async () => {
//     const url = "http://localhost:8000/api/conferences/";

//     const response = await fetch(url);

//     if (response.ok) {
//         const data = await response.json();
//         // find element id in HTML
//         const selectTag = document.getElementById("conference");
//         for (let conference of data.conferences) {
//             const option = document.createElement("option");
//             option.value = conference.href;
//             option.innerHTML = conference.name;
//             selectTag.appendChild(option);
//         }
//     }



//     const formTag = document.getElementById('create-presentation-form');
//     formTag.addEventListener('submit', submitForm);

//     async function submitForm(event) {
//         event.preventDefault();
//         const formData = new FormData(formTag);
//         console.log("formData: ", formData);

//         const content = JSON.stringify(Object.fromEntries(formData));

//         let json = JSON.parse(content);

//         const conferenceHref = json.conference;

//         const split = conferenceHref.split("/api/conferences/")[1];

//         const presentationUrl = "http://localhost:8000/api/conferences/" + split + "presentations/";

//         const fetchConfig = {
//             method: "post",
//             body: content,
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         };

//         const response = await fetch(presentationUrl, fetchConfig);
//         console.log("Response: ", response);

//         if (response.ok) {
//             formTag.reset();
//             const newPresentation = await response.json();
//             console.log("New presentation", newPresentation);
//         };
//     };

// });
