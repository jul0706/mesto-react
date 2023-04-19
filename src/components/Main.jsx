import React, { useState, useEffect } from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main ({onEditProfile,
                onAddPlace,
                onEditAvatar,
                onCardClick,
            }) {

    const [userName, setUserName] = useState(''); 
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]); 

    function displayError (err) { //показ ошибки от сервера
        alert(err)
    };

    useEffect(()=>{
    Promise.all([ //ждем, когда придут данные пользователя и данные карточек
        api.getDataServer('users/me'),
        api.getDataServer('cards')
    ])
    .then((values)=>{
        setUserName(values[0].name);//обновили состояние переменных
        setUserDescription(values[0].about);
        setUserAvatar(values[0].avatar);
        setCards(values[1])
    },[])
    .catch(err => displayError(err));
        },[]
    )
    return (
        <main className="main"> 
            {/*Блок profile*/}
            <section className="profile">
                <button className="profile__avatar-button" onClick={onEditAvatar}>
                    <img src={`${userAvatar}`} alt="аватар пользователя" className="profile__avatar" />  {/*Аватар */}
                </button>
                {/*Контейнер для заголовка, подзаголовка  на 1024*/}
                <div className="profile__title-and-subtitle-form"> 
                    <div className="profile__title-form"> {/*Контейнер для заголовка с кнопкой*/}
                        <h1 className="profile__title">{userName}</h1>
                        <button type="button" className="profile__edit-button" aria-label="кнопка редактирования" onClick={onEditProfile}></button> {/*Кнопка "редактировать*/}
                    </div> 
                    <p className="profile__subtitle">{userDescription}</p>
                </div> 
                <button type="button" className="add-button" aria-label="кнопка добавления карточки" onClick={onAddPlace}></button>{/*Кнопка "добавить"*/}
            </section>
                {/*Блок Places*/}
            <section className="places">
                {/*Заготовка для карточки*/}
                {cards.map((card) => ( // каждую карточку из массива добавляем на страницу
                    <div key = {card._id}>
                    <Card 
                        cardData = {card} 
                        onCardClick = {onCardClick}
                    />
                    </div>
                ))}
            </section>
        </main>
    )
}

export default Main;