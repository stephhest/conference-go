window.addEventListener('DOMContentLoaded', async () => {
    const selectTag = document.getElementById('conference');

    const url = 'http://localhost:8000/api/conferences/';
    const response = await fetch(url);

    // Conference Drop-Down
    if (response.ok) {
      const data = await response.json();

      for (let conference of data.conferences) {
        const option = document.createElement('option');
        option.value = conference.href;
        // console.log(option.value);
        option.innerHTML = conference.name;
        selectTag.appendChild(option);
      }

        // Here, add the 'd-none' class to the loading icon
        const selectLoading = document.getElementById('loading-conference-spinner');
        selectLoading.classList.add("d-none");

        // Here, remove the 'd-none' class from the select tag
        selectTag.classList.remove("d-none");
    }

    const attendeeFormTag = document.getElementById("create-attendee-form");

    attendeeFormTag.addEventListener('submit', submitForm);

    async function submitForm(event) {
        event.preventDefault();
        const attendeeFormData = new FormData(attendeeFormTag);
        const json = JSON.stringify(Object.fromEntries(attendeeFormData));

        const attendeeUrl = 'http://localhost:8001/api/attendees/';

        const fetchConfig = {
            method: "post",
            body: json,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const response = await fetch(attendeeUrl, fetchConfig);

        if (response.ok) {

            attendeeFormTag.classList.add("d-none");

            const selectSuccess = document.getElementById('success-message');
            selectSuccess.classList.remove("d-none");

            attendeeFormTag.reset();
            const newAttendee = await response.json();
            console.log("New Attendee: ", newAttendee);
        }
    }

  });
