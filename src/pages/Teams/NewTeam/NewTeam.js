function NewTeam({ newTeam, handleChange, addTeam, formErrors }) {

    return (
        <div className="form">  
            <label htmlFor="name">Name: </label>
            <input
                type="text" id="name"
                className="form__input"
                value={newTeam.name ? newTeam.name : ""}
                onChange={handleChange}
                maxLength="16"
            />
            {formErrors.name && <div className="form__error" title={formErrors.name}>!</div>}
            <br/><br/>

            <label htmlFor="tag">Tag: </label>
            <input
                className="form__input"
                type="text" id="tag"
                value={newTeam.tag ? newTeam.tag : ""}
                onChange={handleChange}
                maxLength="5"
            />
            {formErrors.tag && <div className="form__error" title={formErrors.tag}>!</div>}
            <br/><br/>

            <label htmlFor="primaryColor">Primary Colour: </label>
            <input
                className="form__input"
                type="color" id="primaryColor"
                value={newTeam.primaryColor ? '#' + newTeam.primaryColor : "#000000"}
                onChange={handleChange}
            />
            <br/><br/>

            <label htmlFor="secondaryColor">Secondary Colour: </label>
            <input
                className="form__input"
                type="color" id="secondaryColor"
                value={newTeam.secondaryColor ? '#' + newTeam.secondaryColor : "#000000"}
                onChange={handleChange}
            />
            <br/><br/>

            <input className="form__button" type="button" value="Add" onClick={addTeam} />
        </div>
    );
}

export default NewTeam;
