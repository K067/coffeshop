import React, { useState } from 'react';

import './Contact.css';
import location from '../../img/icon/location-icon.png';
import phone from '../../img/icon/phone.png';
import timing from '../../img/icon/timing.png';
import { sanitizeInput } from '../Functions/utils/validUtils';
import { dataPost } from '../Functions/utils/dataPost';
import { useMessageHandler } from '../Functions/Hooks/useMessageHandler';


export const Contact = () => {
    const [userName, setUserName] = useState('');
    const [message, setMessage] = useState('');
    const { successMessage, errorMessage, setSuccess, setError } = useMessageHandler();

    const handleNameChange = (setter) => (e) => {
        let value = e.target.value;
        value = value.replace(/[^a-zA-Z]/g, '');
        if (value.length > 12) {
            value = value.slice(0, 12);
        }
        setter(value);
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const sanitizedMessage = sanitizeInput(message);

        const formData = {
            userName,
            message: sanitizedMessage,
        };

        const result = await dataPost('https://jsonplaceholder.typicode.com/posts', formData);

        if (result.success) {
            setUserName('');
            setMessage('');
            setSuccess('Submitted!');
        } else {
            setError('Error occurred, try later.');
        }
    };

    return (
        <section className="join-page contact-page">
            <div className="container container-plus">
                <div className="join-section">
                    <div className="contact-right">
                        <iframe
                            title="Location Map"
                            src="https://www.openstreetmap.org/export/embed.html?bbox=-74.25909%2C40.477399%2C-73.700272%2C40.917577&layer=mapnik"
                            style={{ border: 0, width: '100%', height: '100%' }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                    <div className="contact-left contactus-left">
                        <h2 className="contact-heading">If you want to Contact, don’t hesitate!</h2>
                        <ul>
                            <li>
                                <div className="contactus-img">
                                    <img src={location} className='alignnone align-img' alt="location" width="27" height="27" />
                                </div>
                                <p><a href="https://maps.app.goo.gl/bhbcukAx2oar6TQa8">Peter I Island</a></p>
                            </li>
                            <li>
                                <div className="contactus-img">
                                    <img src={phone} className='alignnone align-img' alt="phone" width="16" height="27" />
                                </div>
                                <p><b>Contact</b><br />
                                    <a href="tel:00000000000">+00000000000</a></p>
                            </li>
                            <li>
                                <div className="contactus-img">
                                    <img src={timing} className='alignnone align-img' alt="timing" width="27" height="27" />
                                    <p><b>Opening Hours</b><br />
                                        7 AM - 7 AM</p>
                                </div>
                            </li>
                        </ul>
                        <div className='feedback'>
                            <h2 className="contact-heading">Leave us a feedback!</h2>
                            <form className="feedback-form" onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={userName}
                                    onChange={handleNameChange(setUserName)}
                                    required
                                    minLength={2}
                                />
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    maxLength="300"
                                    value={message}
                                    onChange={handleMessageChange}
                                    required
                                ></textarea>
                                <div className='submit-group'>
                                    <button type="submit" className="submit-button">Submit</button>
                                    {successMessage && (
                                        <p className="success-message" style={{ color: 'green', marginTop: '10px' }}>
                                            {successMessage}
                                        </p>
                                    )}
                                    {errorMessage && (
                                        <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>
                                            {errorMessage}
                                        </p>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};