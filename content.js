let Interval = 3000;
let disablePopups = sessionStorage.getItem('disablePopups') === 'true';
let escKeyHeldDuration = 0;
let escKeyHeldInterval;

const replacementLinks = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

function displayCompliment() {
    if (disablePopups) return;
    
    const compliments = [
        "Je suis tellement fier(e) de toi et de tout ce que tu accomplis chaque jour.",
        "Tu as un cœur immense et tu apportes tant de joie à ceux qui te connaissent.",
        "N'oublie jamais à quel point tu es précieux(se) et important(e).",
        "Tu mérites tout le bonheur du monde et je te souhaite de le trouver chaque jour.",
        "Merci d'être la personne incroyable que tu es.",
        "Tu as un don pour rendre le monde meilleur rien qu'en étant toi-même.",
        "Ta gentillesse et ta générosité ne passent jamais inaperçues.",
        "Chaque moment passé avec toi est un véritable cadeau.",
        "Tu as un talent incroyable pour voir le bon côté des choses.",
        "Ta positivité est contagieuse et illumine chaque journée.",
        "Tu as toujours les mots justes pour réconforter et encourager.",
        "Crois toujours en toi et en tes capacités.",
        "T'es incroyable !",
    ];
    
    const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
    
    const div = document.createElement('div');
    div.id = 'popup';
    div.style.cssText = `
        position: fixed;
        background-color: #fff;
        padding: 20px;
        border: 2px solid #333;
        font-size: 18px;
        font-family: Arial, sans-serif;
        display: none;
        z-index: 9999; /* Assure que le popup reste au premier plan */
    `;
    
    const complimentText = document.createElement('div');
    complimentText.textContent = randomCompliment;
    div.appendChild(complimentText);

    const closeButton = document.createElement('span');
    closeButton.textContent = '✖';
    closeButton.style.cssText = `
        position: absolute;
        top: 2px;
        right: 2px;
        cursor: pointer;
        font-size: 12px;
        font-weight: lighter;
    `;
    closeButton.onclick = function() {
        div.style.display = 'none';
    };
    div.appendChild(closeButton);

    document.body.appendChild(div);

    function updatePopupPosition(event) {
        const popupWidth = div.offsetWidth;
        const popupHeight = div.offsetHeight;
        const popupX = event.clientX - popupWidth / 2;
        const popupY = event.clientY - popupHeight / 2;
        div.style.left = popupX + 'px';
        div.style.top = popupY + 'px';
    }

    document.addEventListener('mousemove', updatePopupPosition);

    div.style.display = 'block';
}

function createRandomMessage() {
    if (disablePopups) return;

    const messages = [
        "Je suis tellement fier(e) de toi et de tout ce que tu accomplis chaque jour.",
        "Tu as un cœur immense et tu apportes tant de joie à ceux qui te connaissent.",
        "Tu mérites tout le bonheur du monde et je te souhaite de le trouver chaque jour.",
        "Merci d'être la personne incroyable que tu es.",
        "Tu as un don pour rendre le monde meilleur rien qu'en étant toi-même.",
        "Ta gentillesse et ta générosité ne passent jamais inaperçues.",
        "Chaque moment passé avec toi est un véritable cadeau.",
        "Tu as un talent incroyable pour voir le bon côté des choses.",
        "Ta positivité est contagieuse et illumine chaque journée.",
        "Tu as toujours les mots justes pour réconforter et encourager.",
        "Crois toujours en toi et en tes capacités.",
        "T'es incroyable !",
    ];

    const message = document.createElement('div');
    const randomIndex = Math.floor(Math.random() * messages.length);
    message.textContent = messages[randomIndex];
    message.style.cssText = `
        position: fixed;
        background-color: #fff;
        padding: 20px;
        border: 2px solid #333;
        font-size: 18px;
        font-family: Arial, sans-serif;
        z-index: 9999; /* Assure que le message reste au premier plan */
    `;
    message.style.top = Math.random() * window.innerHeight + 'px';
    message.style.left = Math.random() * window.innerWidth + 'px';
    document.body.appendChild(message);

    const moveInterval = setInterval(() => {
        if (disablePopups) {
            clearInterval(moveInterval);
            message.remove();
            return;
        }
        const currentTop = parseFloat(message.style.top);
        const currentLeft = parseFloat(message.style.left);
        const randomStepX = Math.random() * 10 - 5;
        const randomStepY = Math.random() * 10 - 5;
        message.style.top = currentTop + randomStepY + 'px';
        message.style.left = currentLeft + randomStepX + 'px';
    }, 100);

    setTimeout(() => {
        clearInterval(moveInterval);
        message.remove();
    }, 100000);
}

function replaceLinksRandomly() {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        if (Math.random() < 0.5) {
            link.href = replacementLinks;
        }
    });
}

window.addEventListener('load', () => {
    replaceLinksRandomly(); // Replace links every time page is loaded
    if (!disablePopups) {
        displayCompliment();
        setInterval(createRandomMessage, Interval);
        Interval -= 100;
        if (Interval < 1000) {
            Interval = 1000;
        }
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        if (!escKeyHeldInterval) {
            escKeyHeldInterval = setInterval(() => {
                escKeyHeldDuration += 100;
                if (escKeyHeldDuration >= 5000) {
                    disablePopups = true;
                    sessionStorage.setItem('disablePopups', 'true');
                    const popups = document.querySelectorAll('#popup');
                    popups.forEach(popup => popup.style.display = 'none');
                    const messages = document.querySelectorAll('div');
                    messages.forEach(message => message.style.display = 'none');
                    clearInterval(escKeyHeldInterval);
                    escKeyHeldInterval = null;
                    escKeyHeldDuration = 0;
                    location.reload(); // Refresh the page
                }
            }, 100);
        }
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'Escape') {
        clearInterval(escKeyHeldInterval);
        escKeyHeldInterval = null;
        escKeyHeldDuration = 0;
    }
});
