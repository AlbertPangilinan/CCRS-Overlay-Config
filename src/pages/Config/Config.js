import { useEffect, useState } from 'react';
import logo from '../../img/CCRS_Circle.png';
import './Config.css';

function Config() {

    const [loaded, setLoaded] = useState(false);
    const [config, setConfig] = useState({});
    const [formErrors, setFormErrors] = useState({})

    useEffect(() => {
        !loaded && window.electron.readConfig().then((data) => {
            console.log(data);
            setConfig(data);
            setLoaded(true)
        });
    })

    function handleChange(event) {
        let value;
        
        if (event.target.type === 'number') {
            value = +event.target.value;
            if (value < event.target.min) {
                value = event.target.min;
            } else if (value > event.target.max) {
                value = event.target.max;
            }
        } else {
            value = event.target.value;
        }

        setConfig({
            ...config,
            [event.target.id]: value
        });
    }

    function saveConfig() {
        const formCheckResults = {};

        if (config.tournamentInfo.length === 0) {
            formCheckResults.tournamentInfo = "Tournament info must not be empty";
            console.log("Error: tournament info must not be empty");
        }
        
        if (Object.keys(formCheckResults).length === 0) {
            setFormErrors({});
            console.log(config);
            window.electron.saveConfig(config);
            console.log("Config saved!");
        } else {
            setFormErrors(formCheckResults);
        }
    }

    function resetSeries() {
        const newConfig = {
            tournamentInfo : config.tournamentInfo,
            seriesLength: config.seriesLength,
            gameNum: 1,
            teamLeftGamesWon: 0,
            teamRightGamesWon: 0
        }
        console.log(newConfig);
        setConfig(newConfig)
        window.electron.saveConfig(newConfig);
        console.log("Series reset!");
    }

    return (
        <div className="config">
            <img className="logo" src={logo} alt="Logo" width={192} height={192} />
            <div className="form">               
                <label htmlFor="tournamentInfo">Tournament Info: </label>
                <input
                    type="text" id="tournamentInfo"
                    className="form__input"
                    value={config.tournamentInfo}
                    onChange={handleChange}
                    maxLength="40"
                />
                {formErrors.tournamentInfo && <div className="form__error" title={formErrors.tournamentInfo}>!</div>}
                <br/><br/>

                <label htmlFor="seriesLength">Series Length: </label>
                <input
                    type="number" id="seriesLength"
                    className="form__input"
                    value={config.seriesLength}
                    onChange={handleChange}
                    min={3} max={7} step={2}
                />
                <br/><br/>

                <label htmlFor="gameNum">Game Number: </label>
                <input
                    type="number" id="gameNum"
                    className="form__input"
                    value={config.gameNum}
                    onChange={handleChange}
                    min={1} max={config.seriesLength}
                />
                <br/><br/>

                <label htmlFor="teamLeftGamesWon">Left Team Series Score: </label>
                <input
                    type="number" id="teamLeftGamesWon"
                    className="form__input"
                    value={config.teamLeftGamesWon}
                    onChange={handleChange}
                    min={0} max={Math.floor(config.seriesLength / 2)}
                />
                <br/><br/>

                <label htmlFor="teamRightGamesWon">Right Team Series Score: </label>
                <input
                    type="number" id="teamRightGamesWon"
                    className="form__input"
                    value={config.teamRightGamesWon}
                    onChange={handleChange}
                    min={0} max={Math.floor(config.seriesLength / 2)}
                />
                <br/><br/>
                <div className="form__button-group">
                    <input className="form__button" type="button" value="Save" onClick={saveConfig} />
                    <input className="form__button" type="button" value="Reset Series" onClick={resetSeries} />
                </div>
            </div>
        </div>
    );
}

export default Config;
