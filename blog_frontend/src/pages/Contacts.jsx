import React, { useState } from 'react'
import { Button } from '../components/ui/Button'
import { FaLinkedin, FaGithub, FaTelegram } from "react-icons/fa";
import exploreIcon from '../assets/exploreIcon.svg';
import getInTouchIcon from '../assets/getInTouchIcon.svg';
import faqIcon from '../assets/faqIcon.svg';

import { TextField } from '@mui/material';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import '../styles/contacts.scss';

const Contacts = () => {

    const [messageForm, setMessageForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        message: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
            const response = await fetch('http://localhost:4444/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(messageForm),
            });

            if (response.ok) {
                alert('Сообщение отправлено!');
                setMessageForm({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    message: ''
                });
            } else {
                alert('Ошибка отправки');
            }
        } catch (error) {
            console.error(error);
            alert('Ошибка сервера');
        }
    };

    return (
        <div className='contacts'>
            <div className="upper-blocks">
                <div className="contacts-block-row-1">
                    <p>General Inquiries</p>
                    <div className="contact-cta-btns">
                        <Button onClick={() => {
                            const subject = encodeURIComponent("Inquiries about AI Blog");
                            const body = encodeURIComponent(
                                "Hello!\n\n" +
                                "My name is [your name]\n" +
                                "Your message:\n[enter your message]\n\n" +
                                "Have a nice day!"
                            );

                            window.open(`mailto:abdymalikbatyrkulov@gmail.com?subject=${subject}&body=${body}`, '_blank');
                        }} btnName="contact@ai-podcasts.com" btnIcon={exploreIcon} />
                        <Button onClick={() => {
                            const message = encodeURIComponent(
                                "Hello!\n\n" +
                                "My name is [your name]\n" +
                                "Your message:\n[enter your message]\n\n" +
                                "Have a nice day!"
                            );

                            window.open(`https://wa.me/+905468270923?text=${message}`, '_blank');
                        }} btnName="+90 (546) 827-0923" btnIcon={exploreIcon} />
                    </div>
                </div>
                <div className="contacts-block-row-1">
                    <p>Technical Support</p>
                    <div className="contact-cta-btns">
                        <Button onClick={() => {
                            const subject = encodeURIComponent("Questions about AI Blog");
                            const body = encodeURIComponent(
                                "Hello!\n\n" +
                                "My name is [your name]\n" +
                                "Your message:\n[enter your message]\n\n" +
                                "Have a nice day!"
                            );

                            window.open(`mailto:abdymalikbatyrkulov@gmail.com?subject=${subject}&body=${body}`, '_blank');
                        }} btnName="contact@ai-podcasts.com" btnIcon={exploreIcon} />
                        <Button onClick={() => {
                            const message = encodeURIComponent(
                                "Hello!\n\n" +
                                "My name is [your name]\n" +
                                "Your message:\n[enter your message]\n\n" +
                                "Have a nice day!"
                            );

                            window.open(`https://wa.me/+905468270923?text=${message}`, '_blank');
                        }} btnName="+90 (546) 827-0923" btnIcon={exploreIcon} />
                    </div>
                </div>
                <div className="contacts-block-row-1">
                    <p>Our Office</p>
                    <div className="contact-cta-btns">
                        <span>Address: 123 AI Tech Avenue, Techville, 54321</span>
                        <Button onClick={() => {
                            const address = "Istanbul, Taksim Meydanı";
                            const encodedAddress = encodeURIComponent(address);

                            window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
                        }} btnName="Get Directions" btnIcon={exploreIcon} />
                    </div>
                </div>
                <div className="contacts-block-row-1">
                    <p>Connect with Us</p>
                    <div className="contact-social-btns">
                        <a href="https://linkedin.com/in/abdymalik-batyrkulov" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="social-icon" />
                        </a>

                        <a href="https://github.com/abdymaleeq925" target="_blank" rel="noopener noreferrer">
                            <FaGithub className="social-icon" />
                        </a>

                        <a href="https://t.me/naintufaiv55" target="_blank" rel="noopener noreferrer">
                            <FaTelegram className="social-icon" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="lower-blocks">
                <div className="contacts-block-column-1">
                    <img className="contacts-icon" src={getInTouchIcon} alt="get-in-touch-icon" />
                    <h1>Get in Touch with AI Videos</h1>
                </div>
                <div className="contacts-block-column-2">
                    <form className="send-message-form" onSubmit={handleSubmit}>
                        {/* Строка 1: Имя + Фамилия */}
                        <div className="form-row">
                            <TextField
                                className="field"
                                name="firstName"
                                value={messageForm.firstName}
                                onChange={(e) => setMessageForm({ ...messageForm, firstName: e.target.value })}
                                label="First Name"
                                type="text"
                                placeholder="First Name"
                                required
                                fullWidth
                            />
                            <TextField
                                className="field"
                                label="Last Name"
                                value={messageForm.lastName}
                                onChange={(e) => setMessageForm({ ...messageForm, lastName: e.target.value })}
                                type="text"
                                placeholder="Last Name"
                                required
                                fullWidth
                            />
                        </div>

                        {/* Строка 2: Email + Phone */}
                        <div className="form-row">
                            <TextField
                                className="field"
                                label="Email"
                                type="email"
                                value={messageForm.email}
                                onChange={(e) => setMessageForm({ ...messageForm, email: e.target.value })}
                                placeholder="Email"
                                required
                                fullWidth
                            />
                            <PhoneInput
                                international
                                countryCallingCodeEditable={false}
                                defaultCountry="TR"
                                value={messageForm.phoneNumber}
                                onChange={(value) => setMessageForm({ ...messageForm, phoneNumber: value })}
                                placeholder="Phone Number"
                                className="field"
                            />
                        </div>

                        {/* Строка 3: Textarea */}
                        <div className="form-row full-width">
                            <textarea
                                className="message-box field"
                                placeholder="Your Message"
                                value={messageForm.message}
                                onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                                rows={5}
                                required
                            />
                        </div>

                        {/* Строка 4: Кнопка (не растянута) */}
                        <div className="form-row button-row">
                            <button type="submit" className="action-btn">
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>

                <div className="contacts-block-column-1">
                    <img className="contacts-icon" src={faqIcon} alt="faq-icon" />
                    <div className="faq-text">
                        <h1>Frequently Asked Questions</h1>
                        <p>If the question is not available on our FAQ section, Feel free to contact us personally, we will resolve your respective doubts. </p>
                    </div>
                    <Button btnName="Ask Question" btnIcon={exploreIcon} />
                </div>
                <div className="contacts-block-column-2">Block</div>
            </div>
        </div>
    )
}

export default Contacts