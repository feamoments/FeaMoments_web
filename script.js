document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MOBILE MENU TOGGLE
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    const dropdowns = document.querySelectorAll('.dropdown');

    if (toggle && links) {
        toggle.addEventListener('click', () => {
            links.classList.toggle('open');
        });
    }

    // 2. GESTIONE DROPDOWN SU MOBILE
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('a'); 
        if (trigger) {
            trigger.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault(); 
                    e.stopPropagation(); 
                    dropdown.classList.toggle('active'); 
                }
            });
        }
    });

    // 3. CHIUSURA MENU AL CLICK SUI LINK
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (!link.parentElement.classList.contains('dropdown')) {
                if (links) links.classList.remove('open');
                dropdowns.forEach(d => d.classList.remove('active'));
            }
        });
    });

    // 4. SMOOTH SCROLL UNIVERSALE (Funziona anche con index.html#id)
    document.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.includes('#')) {
                const urlParts = href.split('#');
                const targetId = '#' + urlParts[1];
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    e.preventDefault();
                    const navbarHeight = 80;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 5. GESTIONE INVIO FORM PREVENTIVO
    const preventivoForm = document.getElementById('preventivoForm');
    if (preventivoForm) {
        preventivoForm.addEventListener('submit', function(e) {
            const serviziSelezionati = this.querySelectorAll('input[name="servizio"]:checked');
            
            if (serviziSelezionati.length === 0) {
                e.preventDefault(); 
                e.stopPropagation();
                alert("⚠️ Errore: Devi selezionare almeno un tipo di servizio per procedere!");
                document.querySelector('.checkbox-group').scrollIntoView({ behavior: 'smooth' });
                return false;
            }

            const dataEv = document.getElementById('data_input').value;
            const tel = document.getElementById('telefono_input').value;
            const subjectField = document.getElementById('email_subject');
            if (subjectField) {
                subjectField.value = `Richiesta Preventivo - ${dataEv} - ${tel}`;
            }
        });
    }

    // 6. GESTIONE FORM PARTNER
    const partnerForm = document.getElementById('partnerForm');
    if (partnerForm) {
        partnerForm.addEventListener('submit', function(e) {
            // Usiamo i selettori name o controlliamo che l'ID esista prima di leggere .value
            const nomeAttivitaEl = document.getElementById('partner_business');
            const telefonoPartnerEl = document.getElementById('partner_tel');
            const subjectField = document.getElementById('partner_subject');

            const nomeAttivita = nomeAttivitaEl ? nomeAttivitaEl.value : "N/A";
            const telefonoPartner = telefonoPartnerEl ? telefonoPartnerEl.value : "N/A";

            if (subjectField) {
                subjectField.value = `Nuova Collaborazione - ${nomeAttivita} - ${telefonoPartner}`;
            }
            
            // OPZIONALE: Se vuoi essere sicuro che parta, non aggiungere e.preventDefault()
            // Lascia che il form faccia il suo corso verso Formspree.
        });
    }

    // 7. ANIMAZIONE ALL'ENTRATA (Scroll Reveal)
    const observerOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); // Usiamo la classe CSS .active
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Applichiamo la classe reveal agli elementi da animare allo scroll
    document.querySelectorAll('.servizio-card, .section-title, .section-subtitle, .centered, #preventivo, #contatti').forEach(el => {
        el.classList.add('reveal'); 
        observer.observe(el);
    });

}); // <--- CHIUSURA CORRETTA DEL DOMContentLoaded

/* ─── 5. GALLERIA CAROUSEL & LIGHTBOX (DISATTIVATO - SOSTITUITO DA BEHOLD) ───
   Abbiamo commentato questo blocco perché ora la galleria è gestita dal widget esterno.
   Se deciderai di tornare alla versione manuale, ti basterà rimuovere i simboli di commento.

/*
const wrapper = document.getElementById('galleryWrapper');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
// ... tutto il resto del vecchio codice ...
*/


// ─── GOOGLE TRANSLATE LOGIC (Deve stare fuori dal DOMContentLoaded) ───

// 1. Inizializzazione Google Translate
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'it',
        includedLanguages: 'en,it',
        autoDisplay: false
    }, 'google_translate_element');
}

// 2. Funzione per cambiare lingua e aggiornare l'interfaccia
function changeLanguage(langCode, langText, flagUrl) {
    const googleSelect = document.querySelector('.goog-te-combo');
    if (googleSelect) {
        googleSelect.value = langCode;
        googleSelect.dispatchEvent(new Event('change'));
    }

    // Aggiorna la voce principale della tendina
    const nameEl = document.getElementById('langName');
    const flagEl = document.getElementById('langFlag');
    if (nameEl) nameEl.innerText = langText;
    if (flagEl) flagEl.src = flagUrl;
}

// 3. Monitoraggio e rimozione banner Google
function removeGoogleBanner() {
    const banner = document.querySelector(".goog-te-banner-frame");
    if (banner) {
        banner.remove();
        document.body.style.top = "0px";
    }
}
setInterval(removeGoogleBanner, 1000);

// 4. Caricamento dinamico Script Google
(function() {
    var gt = document.createElement('script');
    gt.type = 'text/javascript';
    gt.async = true;
    gt.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gt, s);
})();
