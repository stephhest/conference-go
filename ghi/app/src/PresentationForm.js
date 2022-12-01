import React from 'react';

class PresentationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            presenter_name: '',
            presenter_email: '',
            company_name: '',
            title: '',
            synopsis: '',
            conference: '',
            conferences: [],
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangePresenterName = this.handleChangePresenterName.bind(this);
        this.handleChangePresenterEmail = this.handleChangePresenterEmail.bind(this);
        this.handleChangeCompanyName = this.handleChangeCompanyName.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeSynopsis = this.handleChangeSynopsis.bind(this);
        this.handleChangeConference = this.handleChangeConference.bind(this);
    }

    async componentDidMount() {
        const url = 'http://localhost:8000/api/conferences/';
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          this.setState({ conferences: data.conferences });
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        data.status = "SUBMITTED";
        delete data.conferences;

        let content = JSON.stringify(data);
        let json = JSON.parse(content);
        const conferenceHref = json.conference;
        console.log(conferenceHref)

        const presentationUrl = `http://localhost:8000${conferenceHref}presentations/`;

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(presentationUrl, fetchConfig);
        if (response.ok) {
            const newPresentation = await response.json();
            console.log(newPresentation);
            this.setState({
                presenter_name: '',
                presenter_email: '',
                company_name: '',
                title: '',
                synopsis: '',
                conference: '',
            });
        }
    }

    handleChangePresenterName(event) {
        this.setState({ presenter_name: event.target.value });
    }

    handleChangePresenterEmail(event) {
        this.setState({ presenter_email: event.target.value });
    }

    handleChangeCompanyName(event) {
        this.setState({ company_name: event.target.value });
    }

    handleChangeTitle(event) {
        this.setState({ title: event.target.value });
    }

    handleChangeSynopsis(event) {
        this.setState({ synopsis: event.target.value });
    }

    handleChangeConference(event) {
        this.setState({ conference: event.target.value });
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new presentation</h1>
                        <form onSubmit={this.handleSubmit} id="create-presentation-form">
                            <div onChange={this.handleChangePresenterName} className="form-floating mb-3">
                                <input placeholder="Presenter name" required type="text" name="presenter_name" id="presenter_name" className="form-control"/>
                                    <label htmlFor="presenter_name">Presenter name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChangePresenterEmail} placeholder="Presenter email" required type="email" name="presenter_email" id="presenter_email" className="form-control"/>
                                    <label htmlFor="presenter_email">Presenter email</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChangeCompanyName} placeholder="Company name" type="text" name="company_name" id="company_name" className="form-control"/>
                                    <label htmlFor="company_name">Company name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChangeTitle} placeholder="Title" required type="text" name="title" id="title" className="form-control"/>
                                    <label htmlFor="title">Title</label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="synopsis">Synopsis</label>
                                <textarea onChange={this.handleChangeSynopsis} className="form-control" id="synopsis" rows="3" name="synopsis"></textarea>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleChangeConference} required name="conference" id="conference" className="form-select">
                                    <option value="">Choose a conference</option>
                                    {this.state.conferences.map(conference => {
                                        return (
                                            <option key={conference.href} value={conference.href}>{conference.name}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default PresentationForm;
