import React, { useState, ChangeEvent, FormEvent, useContext } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import Message from '../Models/Message';
import { AuthContext } from '../context/AuthContext';


const BecomeSellerForm: React.FC = () => {
    const auth = useContext(AuthContext);
    const [formData, setFormData] = useState<Message>({
        userName: '',
        userId: '',
        userMessage: '',
    });
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        formData.userId = auth.user?.id!;

        var connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7250/chat")
        .withAutomaticReconnect()
        .build()
        
        try {
            await connection.start();
            await connection.invoke("SendMessageToAdmin", formData);
            setSubmitted(true);
            await connection.stop();
        } catch (error) {
            console.error('Error submitting form', error);
        }
    };

    if (submitted) {
        return (
            <div className="container mt-5">
                <div className="alert alert-success" role="alert">
                    Дякуємо за вашу заявку. Ми скоро з вами зв'яжемося.
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Стань продавцем</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="formName" className="form-label">Ім'я</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formName"
                        name="userName"
                        placeholder="Введіть ваше ім'я"
                        value={formData.userName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="formMessage" className="form-label">Повідомлення</label>
                    <textarea
                        className="form-control"
                        id="formMessage"
                        name="userMessage"
                        rows={3}
                        placeholder="Введіть ваше повідомлення"
                        value={formData.userMessage}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Стань продавцем
                </button>
            </form>
        </div>
    );
};

export default BecomeSellerForm;
