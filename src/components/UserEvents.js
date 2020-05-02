import React from 'react';
import EventList from './EventList'
import participationService from '../services/participation-service'

class UserEvents extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            message: "",
            data: null,
            loading:true
        }
    }

    async componentDidMount() {

        const {data} = await participationService.getWydarzenia();
        if(data.status == 204){
            this.setState({message : "Nie bierzesz udziału w żadnym wydarzeniu !"});
            this.setState({loading:false});
        }else{
            this.setState({data});
            this.setState({loading:false});
        }
    }

    render() {
        return(<div id="eventMenu" className="container bg-light border rounded border-dark">
        <header>
            <h1>Twoje wydarzenia</h1>
            <hr className="my-4" />

        </header>
            {this.state.loading ? (
             <div id="loading" className="text-center">
             <span className="spinner-border spinner-border-lg"></span>
             <br/>
             <h4>Trwa pobieranie danych ...</h4>
             <br />
             </div>   
            ) : (this.state.message ? (<div>{this.state.message}</div>) : <EventList events={this.state.data}/> )}
    </div>)
    }
}

export default UserEvents;