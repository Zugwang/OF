/* ========================================
   GESTION DU PROFIL CRÉATEUR
   ======================================== */

// Chargement des données du profil
async function loadProfileData() {
    try {
        const response = await fetch('data/stats.json');
        const data = await response.json();

        // Charger les informations de base
        document.getElementById('usernameInput').value = data.username || 'Sarah&Antoine';
        document.getElementById('usernamePreview').textContent = data.username || 'Sarah&Antoine';

        // Charger l'avatar
        if (data.avatar) {
            document.getElementById('avatarPreview').src = data.avatar;
        }

        // Si d'autres données de profil existent dans le JSON, les charger ici
        console.log('Profil chargé avec succès');
    } catch (error) {
        console.error('Erreur de chargement du profil:', error);
    }
}

// Sauvegarder les informations du profil
function saveProfileInfo() {
    const username = document.getElementById('usernameInput').value;
    const displayName = document.getElementById('displayNameInput').value;
    const bio = document.getElementById('bioInput').value;

    if (!username.trim()) {
        alert('Le nom d\'utilisateur est requis');
        return;
    }

    if (bio.length > 160) {
        alert('La bio ne peut pas dépasser 160 caractères');
        return;
    }

    // Simulation de sauvegarde
    alert(`Profil sauvegardé avec succès !\n\nNom d'utilisateur : ${username}\nNom d'affichage : ${displayName || 'Non défini'}\nBio : ${bio.length} caractères`);

    // Mettre à jour tous les éléments username dans la page
    document.querySelectorAll('.username').forEach(el => {
        el.textContent = username;
    });

    console.log('Profil enregistré:', { username, displayName, bio });
}

// Sauvegarder le prix d'abonnement
function saveSubscriptionPrice() {
    const accountType = document.querySelector('input[name="accountType"]:checked').value;
    const price = document.getElementById('subscriptionPrice').value;

    if (accountType === 'paid') {
        const priceNum = parseFloat(price);
        if (priceNum < 4.99 || priceNum > 49.99) {
            alert('Le prix doit être entre $4.99 et $49.99');
            return;
        }
        alert(`Prix d'abonnement sauvegardé : $${priceNum}/mois`);
    } else {
        alert('Compte configuré en mode gratuit');
    }

    console.log('Prix enregistré:', { accountType, price });
}

// Sauvegarder les bundles promotionnels
function saveBundles() {
    const bundle3 = document.getElementById('bundle3months').checked;
    const discount3 = document.getElementById('discount3').value;
    const bundle6 = document.getElementById('bundle6months').checked;
    const discount6 = document.getElementById('discount6').value;
    const bundle12 = document.getElementById('bundle12months').checked;
    const discount12 = document.getElementById('discount12').value;

    const activeBundles = [];
    if (bundle3) activeBundles.push(`3 mois : ${discount3}% de réduction`);
    if (bundle6) activeBundles.push(`6 mois : ${discount6}% de réduction`);
    if (bundle12) activeBundles.push(`12 mois : ${discount12}% de réduction`);

    if (activeBundles.length > 0) {
        alert(`Bundles promotionnels sauvegardés :\n\n${activeBundles.join('\n')}`);
    } else {
        alert('Aucun bundle promotionnel activé');
    }

    console.log('Bundles enregistrés:', { bundle3, discount3, bundle6, discount6, bundle12, discount12 });
}

// Sauvegarder les paramètres de confidentialité
function savePrivacySettings() {
    const showOnline = document.getElementById('showOnlineStatus').checked;
    const allowComments = document.getElementById('allowComments').checked;
    const watermark = document.getElementById('watermarkContent').checked;
    const blockedCountries = Array.from(document.getElementById('blockedCountries').selectedOptions)
        .map(option => option.text);

    const settings = [
        `Statut en ligne : ${showOnline ? 'Visible' : 'Masqué'}`,
        `Commentaires : ${allowComments ? 'Autorisés' : 'Désactivés'}`,
        `Watermark : ${watermark ? 'Activé' : 'Désactivé'}`,
        blockedCountries.length > 0 ? `Pays bloqués : ${blockedCountries.join(', ')}` : 'Aucun pays bloqué'
    ];

    alert(`Paramètres de confidentialité sauvegardés :\n\n${settings.join('\n')}`);

    console.log('Confidentialité enregistrée:', { showOnline, allowComments, watermark, blockedCountries });
}

// Sauvegarder les informations bancaires
function savePaymentInfo() {
    const paymentMethod = document.getElementById('paymentMethod').value;

    if (!paymentMethod) {
        alert('Veuillez sélectionner une méthode de paiement');
        return;
    }

    if (paymentMethod === 'bank') {
        const accountHolder = document.getElementById('accountHolder').value;
        const iban = document.getElementById('iban').value;
        const bic = document.getElementById('bic').value;

        if (!accountHolder || !iban || !bic) {
            alert('Veuillez remplir toutes les informations bancaires');
            return;
        }

        alert(`Informations bancaires sauvegardées :\n\nTitulaire : ${accountHolder}\nIBAN : ${iban}\nBIC : ${bic}`);
    } else {
        alert(`Méthode de paiement configurée : ${paymentMethod === 'paypal' ? 'PayPal' : 'Paxum'}`);
    }

    console.log('Paiement enregistré:', { paymentMethod });
}

// Export des fonctions
window.loadProfileData = loadProfileData;
window.saveProfileInfo = saveProfileInfo;
window.saveSubscriptionPrice = saveSubscriptionPrice;
window.saveBundles = saveBundles;
window.savePrivacySettings = savePrivacySettings;
window.savePaymentInfo = savePaymentInfo;
