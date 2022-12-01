import React from "react";

class ConferenceForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            starts: '',
            ends: '',
            description: '',
            maxPresentations: '',
            maxAttendees: '',
            locations: [],
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleMaxAttendChange = this.handleMaxAttendChange.bind(this);
        this.handleMaxPresChange = this.handleMaxPresChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.max_presentations = data.maxPresentations;
        data.max_attendees = data.maxAttendees;
        delete data.maxPresentations;
        delete data.maxAttendees;
        delete data.locations;
        console.log("Form Data: ", data);

        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(conferenceUrl, fetchConfig);

        if (response.ok) {
            const newConference = await response.json();
            console.log("New Conference API", newConference);

            const cleared = {
                name: '',
                starts: '',
                ends: '',
                description: '',
                maxPresentations: '',
                maxAttendees: '',
                location: '',
            }
            this.setState(cleared);
        };

    }

    handleNameChange(event) {
        this.setState({name: event.target.value})
    }

    handleStartChange(event) {
        this.setState({starts: event.target.value})
    }

    handleEndChange(event) {
        this.setState({ends: event.target.value})
    }

    handleDescriptionChange(event) {
        this.setState({description: event.target.value})
    }

    handleMaxPresChange(event) {
        this.setState({maxPresentations: event.target.value})
    }

    handleMaxAttendChange(event) {
        this.setState({maxAttendees: event.target.value})
    }

    handleLocationChange(event) {
        this.setState({location: event.target.value})
    }

    async componentDidMount() {
        const url = "http://localhost:8000/api/locations/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({locations: data.locations});
        }
    }

    render () {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new conference</h1>
                        <form onSubmit={this.handleSubmit} id="create-conference-form">
                            {/* name  */}
                            <div className="form-floating mb-3">
                                <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                                <label htmlFor="name">Name</label>
                            </div>
                            {/* <!-- starts  --> */}
                            <div className="form-floating mb-3">
                                <input onChange={this.handleStartChange} value={this.state.starts} placeholder="mm/dd/yyyy" required type="date" name="starts" id="starts" className="form-control"/>
                                <label htmlFor="starts">Starts</label>
                            </div>
                            {/* <!-- ends --> */}
                            <div className="form-floating mb-3">
                                <input onChange={this.handleEndChange} value={this.state.ends} placeholder="mm/dd/yyyy" required type="date" name="ends" id="ends" className="form-control"/>
                                <label htmlFor="ends">Ends</label>
                            </div>
                            {/* <!-- description --> */}
                            <div className="form-floating mb-3">
                                <input onChange={this.handleDescriptionChange} value={this.state.description} placeholder="Description" required type="textarea" name="description" id="description" className="form-control"/>
                                <label htmlFor="description">Description</label>
                            </div>
                            {/* <!-- maximum presentations --> */}
                            <div className="form-floating mb-3">
                                <input onChange={this.handleMaxPresChange} value={this.state.maxPresentations} placeholder="Maximum presentations" required type="number" name="max_presentations" id="max_presentations" className="form-control"/>
                                <label htmlFor="max_presentations">Maximum Presentations</label>
                            </div>
                            {/* <!-- maximum attendees --> */}
                            <div className="form-floating mb-3">
                                <input onChange={this.handleMaxAttendChange} value={this.state.maxAttendees} placeholder="Maximum attendees" required type="number" name="max_attendees" id="max_attendees" className="form-control"/>
                                <label htmlFor="max_attendees">Maximum Attendees</label>
                            </div>
                            {/* <!-- location field --> */}
                            <div className="mb-3">
                                <select required name="location" id="location" className="form-select" onChange={this.handleLocationChange} value={this.state.location} >
                                <option value="">Choose a location</option>
                                {this.state.locations.map(location => {
                                    return (
                                        <option key={location.id} value={location.id}>
                                            {location.name}
                                        </option>
                                    )
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

export default ConferenceForm;
