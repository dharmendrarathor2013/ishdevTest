import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function AmenityCreate() {
    let { amenity_id } = useParams();
    const [errors, setErrors] = useState({});
    const { setNotification } = useStateContext();
    const [amenity, setAmenity] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (amenity_id) {
            getAmenity();
        }
    }, [amenity_id]);

    const getAmenity = () => {
        setLoading(true);
        axiosClient.get(`/get-amenity/${amenity_id}`)
            .then(({ data }) => {
                setLoading(false);
                setAmenity(data.data);
            })
            .catch(err => {
                const response = err.response;
                setLoading(false);
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const formErrors = {};
        const formData = new FormData(ev.target);
        const updatedAmenity = Object.fromEntries(formData.entries());

        if (!updatedAmenity.amenity_name?.trim()) {
            formErrors.amenity_name = "Amenity name is required.";
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        } else {
            setErrors({});
            setLoading(true);

            axiosClient.post(`/addupdate-amenities`, updatedAmenity)
                .then(() => {
                    setNotification('Amenity successfully updated');
                    setTimeout(() => {
                        window.location = '/amenities';
                    }, 1000);
                    setLoading(false);
                })
                .catch(err => {
                    const response = err.response;
                    setLoading(false);
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <div className="card animated fadeInDown">
            {loading && (
                <div className="text-center">
                    Loading...
                </div>
            )}
            {!loading && (
                <form onSubmit={handleSubmit}>
                    {errors.amenity_name && <div className="alert alert-danger">{errors.amenity_name}</div>}
                    <div className="row">
                        <input type='hidden' value={amenity.id || ''} name='id' />
                        <div className="col-lg-3">
                            <label htmlFor='amenity_name'>Amenity Name</label>
                        </div>
                        <div className="col-lg-9">
                            <input
                                type='text'
                                className='package-width input-border'
                                id='amenity_name'
                                name='amenity_name'
                                value={amenity.amenity_name || ''}
                                onChange={(e) => setAmenity({ ...amenity, amenity_name: e.target.value })}
                                placeholder='Enter Amenity Name'
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn-custom">Update</button>
                </form>
            )}
        </div>
    );
}
