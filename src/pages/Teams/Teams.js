import { useEffect, useState } from 'react';
import TeamsList from './TeamsList/TeamsList';
import NewTeam from './NewTeam/NewTeam';
import './Teams.css';

const defaultTeam = {
    name: "",
    tag: "",
    primaryColor: "000000",
    secondaryColor: "000000",
}

function Teams() {

    const [loaded, setLoaded] = useState(false);
    const [fileData, setFileData] = useState([])
    const [teams, setTeams] = useState([]);
    const [newTeam, setNewTeam] = useState(defaultTeam);
    const [formErrors, setFormErrors] = useState({})

    useEffect(() => {
        !loaded && window.electron.readTeams().then((data) => {
            console.log(data);
            setFileData(data);
            setTeams(data);
            setLoaded(true)
        });
    })

    function handleChange(event) {
        let value;
        if (event.target.type === 'color') {
            value = event.target.value.slice(1).toUpperCase();
        } else if (event.target.id === 'tag') {
            value = event.target.value.toUpperCase();
        } else {
            value = event.target.value;
        }
        console.log(value);
        setNewTeam({
            ...newTeam,
            [event.target.id]: value
        });
    }

    function deleteTeam(tag) {
        const removed = teams.filter(team => team.tag !== tag)
        setTeams(removed);
        console.log("Team deleted");
    }

    function undoDelete() {
        setTeams(fileData);
        console.log("Changes discarded");
    }

    function saveDelete() {
        setFileData(teams);
        console.log("Changes saved!");
        window.electron.saveTeams(teams);
    }

    function addTeam() {
        const tags = teams.map(team => team.tag);
        const formCheckResults = {};

        if (newTeam.name.length === 0) {
            formCheckResults.name = "Name must not be empty";
            console.log("Error: name must not be empty");
        }
        if (newTeam.tag.length === 0) {
            formCheckResults.tag = "Tag must not be empty";
            console.log("Error: tag must not be empty");
        }
        if (tags.indexOf(newTeam.tag) !== -1) {
            formCheckResults.tag = "Tag already in use";
            console.log("Error: tag already in use");
        }

        if (Object.keys(formCheckResults).length === 0) {
            const added = teams.concat([newTeam]);
            setTeams(added);
            setNewTeam(defaultTeam);
            setFormErrors({});
            console.log("Team added!");
        } else {
            setFormErrors(formCheckResults);
        }
    }

    return (
        <div className="teams">
            <TeamsList teams={teams} deleteTeam={deleteTeam}/>
            {teams !== fileData && <div className="form__button-group">
                <input className="form__button" type="button" value="Save Changes" onClick={saveDelete} />
                <input className="form__button" type="button" value="Reset Changes" onClick={undoDelete} />
            </div>}
            <NewTeam newTeam={newTeam} handleChange={handleChange} addTeam={addTeam} formErrors={formErrors} />
        </div>
    );
}

export default Teams;
