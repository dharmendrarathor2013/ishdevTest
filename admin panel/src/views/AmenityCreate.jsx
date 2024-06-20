import React, { useState } from 'react';
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function AmenityCreate() {
    const [errors, setErrors] = useState({});
    const { setNotification } = useStateContext();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (ev) => {
        ev.preventDefault();

        const formErrors = {};
        const formData = new FormData(ev.target);
        const updatedUser = Object.fromEntries(formData.entries());

        if (!updatedUser.amenity_name?.trim()) {
            formErrors.amenity_name = "Amenity Name is required.";
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        } else {
            setErrors({});
            setLoading(true);

            axiosClient.post(`/addupdate-amenities`, updatedUser)
                .then(() => {
                    setNotification('Amenity created successfully');
                    setTimeout(() => {
                        window.location = '/amenities';
                    }, 1000);
                })
                .catch(err => {
                    const response = err.response;
                    setLoading(false);
                    if (response && (response.status === 422 || response.status === 404)) {
                        setErrors({ errors: response?.data?.message });
                    } else {
                        setErrors({ errors: 'An unexpected error occurred.' });
                    }
                });
        }
    };

    return (
        <div className="card animated fadeInDown">
            <h3 className='pb-3'>Create Amenity</h3> 
            {loading && (
                <div className="text-center">
                    Loading...
                </div>
            )}
            {!loading && (
                <form onSubmit={handleSubmit}>
                     {errors.errors && <div className="alert alert-danger">{errors.errors}</div>}
                     {errors.amenity_name && <div className="alert alert-danger">{errors.amenity_name}</div>}
                    
                    <div className="row">
                        <div className="col-lg-3">
                            <label>Amenity Name</label>
                        </div>
                        <div className="col-lg-9">
                            <input type='text' className='package-width input-border' id='amenity_name' name='amenity_name' placeholder='Enter Amenity Name' />
                        </div>
                    </div>
                    <button type="submit" className="btn-custom">Create</button>
                </form>
            )}
        </div>
    );
}
