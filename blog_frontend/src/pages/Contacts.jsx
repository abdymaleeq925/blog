import React, { useState, useRef } from 'react'
import { Button } from '../components/ui/Button'
import { FaLinkedin, FaGithub, FaTelegram } from "react-icons/fa";
import exploreIcon from '../assets/exploreIcon.svg';
import getInTouchIcon from '../assets/getInTouchIcon.svg';
import faqIcon from '../assets/faqIcon.svg';

import { Accordion, AccordionDetails, AccordionSummary, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
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

    const [expanded, setExpanded] = useState(null);
    const formRef = useRef(null);

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

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
                    <h1>Get in Touch with Us</h1>
                </div>
                <div className="contacts-block-column-2">
                    <form ref={formRef} className="send-message-form" onSubmit={handleSubmit}>
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
                    <Button onClick={scrollToForm} btnName="Ask Question" btnIcon={exploreIcon} />
                </div>
                <div className="contacts-block-column-2">
                    <Accordion
                        expanded={expanded === 'panel1'}
                        onChange={() => setExpanded(expanded === 'panel1' ? null : 'panel1')}
                        sx={{
                            backgroundColor: 'var(--dark-10)',
                            border: '1px solid var(--dark-15)',
                            borderRadius: '12px',
                            marginBottom: '1rem'
                        }}
                    >
                        <AccordionSummary
                            expandIcon={expanded === 'panel1' ? <RemoveIcon sx={{ color: 'var(--avatar-icon-color)' }}/> : <AddIcon sx={{ color: 'var(--yellow-55)' }}/>}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            sx={{
                                padding: '0',
                                margin: expanded === 'panel1' ? '0.625rem 2.125rem 0 2.125rem' : '1.375rem 2.125rem 1.375rem 2.125rem',
                                borderBottom: expanded === 'panel1' ? '1px solid var(--dark-15)' : 'none'
                            }}
                        >
                            <Typography component="span" sx={{
                                fontFamily: "Inter",
                                fontWeight: "500",
                                fontSize: "1.25rem",
                                color: 'var(--text-color)',
                            }}>What is AI?</Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{
                                padding: '1.5rem 2.125rem 2.125rem 2.125rem',
                                fontFamily: "Inter",
                                fontWeight: "400",
                                fontSize: "1.125rem",
                                color: 'var(--grey-50)'
                            }}
                        >
                            AI stands for Artificial Intelligence, which refers to the simulation of human intelligence in machines. It enables them to perform tasks like problem-solving, learning, and decision-making.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        expanded={expanded === 'panel2'}
                        onChange={() => setExpanded(expanded === 'panel2' ? null : 'panel2')}
                        sx={{
                            backgroundColor: 'var(--dark-10)',
                            border: '1px solid var(--dark-15)',
                            borderRadius: '12px',
                            marginBottom: '1rem'
                        }}
                    >
                        <AccordionSummary
                            expandIcon={expanded === 'panel2' ? <RemoveIcon sx={{ color: 'var(--avatar-icon-color)' }}/> : <AddIcon sx={{ color: 'var(--yellow-55)' }}/>}
                            aria-controls="panel2-content"
                            id="panel2-header"
                            sx={{
                                padding: '0',
                                margin: expanded === 'panel2' ? '0.625rem 2.125rem 0 2.125rem' : '1.375rem 2.125rem 1.375rem 2.125rem',
                                borderBottom: expanded === 'panel2' ? '1px solid var(--dark-15)' : 'none'
                            }}
                        >
                            <Typography component="span" sx={{
                                fontFamily: "Inter",
                                fontWeight: "500",
                                fontSize: "1.25rem",
                                color: 'var(--text-color)',
                            }}>How can I watch your videos?</Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{
                                padding: '1.5rem 2.125rem 2.125rem 2.125rem',
                                fontFamily: "Inter",
                                fontWeight: "400",
                                fontSize: "1.125rem",
                                color: 'var(--grey-50)'
                            }}
                        >
                            Our videos are taken from YouTube, and watching them is very simple: <br/> <br/>

                            Just click on "Watch Video" button — it will instantly open the full video in a new browser tab directly on YouTube.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        expanded={expanded === 'panel3'}
                        onChange={() => setExpanded(expanded === 'panel3' ? null : 'panel3')}
                        sx={{
                            backgroundColor: 'var(--dark-10)',
                            border: '1px solid var(--dark-15)',
                            borderRadius: '12px',
                            marginBottom: '1rem'
                        }}
                    >
                        <AccordionSummary
                            expandIcon={expanded === 'panel3' ? <RemoveIcon sx={{ color: 'var(--avatar-icon-color)' }}/> : <AddIcon sx={{ color: 'var(--yellow-55)' }}/>}
                            aria-controls="panel3-content"
                            id="panel3-header"
                            sx={{
                                padding: '0',
                                margin: expanded === 'panel3' ? '0.625rem 2.125rem 0 2.125rem' : '1.375rem 2.125rem 1.375rem 2.125rem',
                                borderBottom: expanded === 'panel3' ? '1px solid var(--dark-15)' : 'none'
                            }}
                        >
                            <Typography component="span" sx={{
                                fontFamily: "Inter",
                                fontWeight: "500",
                                fontSize: "1.25rem",
                                color: 'var(--text-color)',
                            }}>How can I create a blog post?</Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{
                                padding: '1.5rem 2.125rem 2.125rem 2.125rem',
                                fontFamily: "Inter",
                                fontWeight: "400",
                                fontSize: "1.125rem",
                                color: 'var(--grey-50)'
                            }}
                        >
                            To create a blog post, you need to be registered and logged in. Once logged in, navigate to the "Create Post" section where you can write your article, add a title, description, and upload an image. After publishing, your post will be visible to all users on the platform.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        expanded={expanded === 'panel4'}
                        onChange={() => setExpanded(expanded === 'panel4' ? null : 'panel4')}
                        sx={{
                            backgroundColor: 'var(--dark-10)',
                            border: '1px solid var(--dark-15)',
                            borderRadius: '12px',
                            marginBottom: '1rem'
                        }}
                    >
                        <AccordionSummary
                            expandIcon={expanded === 'panel4' ? <RemoveIcon sx={{ color: 'var(--avatar-icon-color)' }}/> : <AddIcon sx={{ color: 'var(--yellow-55)' }}/>}
                            aria-controls="panel4-content"
                            id="panel4-header"
                            sx={{
                                padding: '0',
                                margin: expanded === 'panel4' ? '0.625rem 2.125rem 0 2.125rem' : '1.375rem 2.125rem 1.375rem 2.125rem',
                                borderBottom: expanded === 'panel4' ? '1px solid var(--dark-15)' : 'none'
                            }}
                        >
                            <Typography component="span" sx={{
                                fontFamily: "Inter",
                                fontWeight: "500",
                                fontSize: "1.25rem",
                                color: 'var(--text-color)',
                            }}>Do I need to register to comment on posts?</Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{
                                padding: '1.5rem 2.125rem 2.125rem 2.125rem',
                                fontFamily: "Inter",
                                fontWeight: "400",
                                fontSize: "1.125rem",
                                color: 'var(--grey-50)'
                            }}
                        >
                            Yes, you need to be registered and logged in to comment on posts. Registration is free and quick. Once registered, you can comment on any post, reply to other users' comments, and engage in discussions with the community.
                        </AccordionDetails>
                    </Accordion>
                
                </div>
            </div>
        </div>
    )
}

export default Contacts