function TeamsList({ teams, deleteTeam }) {

    function renderTeams() {
        const defaultTeams = ["CCRS", "BLUE", "ORANGE"];
        let teamRows = teams.map(team => 
            <tr key={team.tag} className="team">
                <td className="team__field">
                    <div className="team__name">{team.name}</div>
                </td>
                <td className="team__field">
                    <div className="team__tag">{`[${team.tag}]`}</div>
                </td>
                <td className="team__field">
                    <div className="team__primary-color">
                        <div className="team__color-preview" style={{ backgroundColor: "#" + team.primaryColor }} />
                        <div className="team__color-hex">{team.primaryColor}</div>
                    </div>
                </td>
                <td className="team__field">
                    <div className="team__secondary-color">
                        <div className="team__color-preview" style={{ backgroundColor: "#" + team.secondaryColor }} />
                        <div className="team__color-hex">{team.secondaryColor}</div>
                    </div>
                </td>
                <td className="team__field">
                    {(defaultTeams.indexOf(team.tag) === -1) && <div className="team__delete" onClick={() => deleteTeam(team.tag)}>Delete</div>}
                </td>
            </tr>
        );
        return teamRows
    }

    return (
        <div className="teams-list">
            <table>
            <thead>
                <tr className="team__header-row">
                    <th className="team__header">Name</th>
                    <th className="team__header">Tag</th>
                    <th className="team__header">Primary Colour</th>
                    <th className="team__header">Secondary Colour</th>
                    <th className="team__header" />
                </tr>
            </thead>
            <tbody>
                {renderTeams()}
            </tbody>
        </table>

        </div>
    );
}

export default TeamsList;
