import React, { useState, useEffect } from 'react';


export default function Form({ onSubmit }) {

    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                setLatitude(latitude);
                setLongitude(longitude);
            },
            (err) => {
                console.log(err);
            }, {
            timeout: 30000,
        }
        );

    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        await onSubmit({
            latitude,
            longitude,
        });


    }

    return (
        <form onSubmit={handleSubmit}>

            <div className="input-group">

                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input
                        type="number"
                        name="latitude"
                        id="latitude"
                        required
                        value={latitude}
                        onChange={e => setLatitude(e.target.value)} />
                </div>


                <div className="input-block">
                    <label htmlFor="longitude">Longitude</label>
                    <input
                        type="number"
                        name="longitude"
                        id="longitude"
                        required
                        value={longitude}
                        onChange={e => setLongitude(e.target.value)}
                    />
                </div>

            </div>


            <button type="submit">Buscar</button>
        </form>
    );
}
