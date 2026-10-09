'use strict';
const calcDialog=document.querySelector('#calc-dialog');
const calcForm=document.querySelector('#calc-form');
const calcStatus=document.querySelector('#calc-status');
document.querySelectorAll('[data-calc]').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();calcStatus.textContent='';const showroom=button.dataset.intent==='showroom';document.querySelector('#calc-title').textContent=showroom?'Запишитесь на консультацию в шоуруме':'Получите расчёт вентиляции бесплатно';document.querySelector('#calc-object').required=!showroom;document.querySelector('#calc-object').value=button.dataset.object||'';document.querySelector('#calc-intro').textContent=showroom?'Оставьте контакт — согласуем время визита. Тип помещения и площадь можно указать по желанию.':'Укажите тип помещения и контакт — обсудим планировку, задачи и предварительную стоимость.';calcDialog.showModal();}));
document.querySelector('#close-calc').addEventListener('click',()=>calcDialog.close());
calcForm.addEventListener('submit',event=>{event.preventDefault();if(!calcForm.reportValidity())return;calcStatus.textContent='Это демонстрация: заявка не отправлена. В рабочей версии здесь будет подтверждение получения обращения.';calcForm.reset();});
document.querySelectorAll('[data-demo-contact]').forEach(button=>button.addEventListener('click',()=>{const channel=button.dataset.demoContact;document.querySelector('#contact-status').textContent=channel==='Почта'?'zakaz@example.ru — демонстрационный адрес. Отправка писем в прототипе отключена.':'Кнопка '+channel+' в макете. Ссылка на аккаунт компании будет подключена перед запуском.';}));
for(const dialog of [calcDialog])dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});

const headerContactFeedback=document.querySelector('.header-contact-feedback');
document.querySelectorAll('[data-header-contact]').forEach(button=>button.addEventListener('click',()=>{
    const channel=button.dataset.headerContact;
    document.querySelector('#header-contact-message').textContent=channel==='Почта'?'zakaz@example.ru — почта для примера. Отправка писем в прототипе отключена.':channel+' — контакт для примера. Рабочую ссылку на аккаунт подключим перед запуском.';
    headerContactFeedback.hidden=false;
}));
document.querySelector('#close-header-message').addEventListener('click',()=>{headerContactFeedback.hidden=true;});

const estimateForm=document.querySelector('#estimate-form');
estimateForm.addEventListener('submit',event=>{event.preventDefault();if(!estimateForm.reportValidity())return;document.querySelector('#estimate-status').textContent='Это демонстрация: заявка не отправлена. В рабочей версии здесь будет подтверждение обращения.';estimateForm.reset();});

const portfolioCards=[...document.querySelectorAll('[data-portfolio-category]')];
const portfolioFilters=[...document.querySelectorAll('[data-portfolio-filter]')];
const portfolioMore=document.querySelector('#portfolio-more');
let portfolioCategory='all';
let portfolioLimit=3;
function updatePortfolio(){const matching=portfolioCards.filter(card=>portfolioCategory==='all'||card.dataset.portfolioCategory===portfolioCategory);portfolioCards.forEach(card=>{card.hidden=!matching.includes(card)||matching.indexOf(card)>=portfolioLimit;});const shown=Math.min(portfolioLimit,matching.length);document.querySelector('#portfolio-count').textContent='Показано '+shown+' из '+matching.length;portfolioMore.hidden=shown>=matching.length;portfolioFilters.forEach(button=>{const active=button.dataset.portfolioFilter===portfolioCategory;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});}
portfolioFilters.forEach(button=>button.addEventListener('click',()=>{portfolioCategory=button.dataset.portfolioFilter;portfolioLimit=3;updatePortfolio();}));
portfolioMore.addEventListener('click',()=>{portfolioLimit+=3;updatePortfolio();});
updatePortfolio();
