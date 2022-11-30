function createCard(name, description, pictureUrl, location, starts, ends) {
    return `
        <div class="col">
          <div class="card">
            <img src="${pictureUrl}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
                <p class="card-text">${description}</p>
                <div class="card-footer text-muted">
                  <small>${starts}-${ends}</small>
                </div>
            </div>
          </div>
        </div>
    `;
  }


function triggerAlert() {
    return `
    <div class="alert alert-danger" role="alert">
    Error Fetching Data
    </div>
  `;
}


window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
      const response = await fetch(url);

      if (!response.ok) {
            const html = triggerAlert();
            const column = document.querySelector('.row');
            column.innerHTML += html;
      } else {
        const data = await response.json();

        for (let conference of data.conferences) {
          const detailUrl = `http://localhost:8000${conference.href}`;
          const detailResponse = await fetch(detailUrl);
          if (detailResponse.ok) {
            const details = await detailResponse.json();

            const title = details.conference.name;
            const description = details.conference.description;
            const pictureUrl = details.conference.location.picture_url;
            const location = details.conference.location.name;

            // let startDate = new Date(details.conference.starts);
            // let endDate = new Date(details.conference.ends);
            // let starts = startDate.getMonth() + "/" + startDate.getDate() + "/" + startDate.getFullYear();
            // let ends = endDate.getMonth() + "/" + endDate.getDate() + "/" + endDate.getFullYear();

            const starts = new Date(details.conference.starts).toLocaleString().split(",")[0];
            const ends = new Date(details.conference.ends).toLocaleString().split(",")[0];

            const html = createCard(title, description, pictureUrl, location, starts, ends);
            // console.log(html)

            const column = document.querySelector('.row');
            column.innerHTML += html;
          }
        }
      }
    } catch (e) {
        const html = triggerAlert();
        const column = document.querySelector('.row');
        column.innerHTML += html;
    }

  });
