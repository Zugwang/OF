/* ========================================
   CHARGEMENT DES DONNÉES JSON
   ======================================== */

// Fonction utilitaire pour charger un fichier JSON
async function loadJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erreur de chargement:', error);
        return null;
    }
}

// Chargement des statistiques
async function loadStats() {
    const data = await loadJSON('data/stats.json');
    if (data) {
        displayStats(data);
    }
}

// Affichage des statistiques
function displayStats(data) {
    // Mise à jour du nom d'utilisateur
    const usernameElements = document.querySelectorAll('.username');
    usernameElements.forEach(el => el.textContent = data.username);

    // Mise à jour des statistiques
    if (document.getElementById('totalViews')) {
        document.getElementById('totalViews').textContent = formatNumber(data.stats.totalViews);
    }
    if (document.getElementById('monthlyEarnings')) {
        document.getElementById('monthlyEarnings').textContent = formatCurrency(data.stats.monthlyEarnings);
    }
    if (document.getElementById('subscribers')) {
        document.getElementById('subscribers').textContent = formatNumber(data.stats.subscribers);
    }
    if (document.getElementById('likes')) {
        document.getElementById('likes').textContent = formatNumber(data.stats.likes);
    }
    if (document.getElementById('posts')) {
        document.getElementById('posts').textContent = formatNumber(data.stats.posts);
    }

    // Mise à jour des croissances
    if (document.getElementById('viewsGrowth')) {
        document.getElementById('viewsGrowth').textContent = data.monthlyStats.viewsGrowth;
    }
    if (document.getElementById('earningsGrowth')) {
        document.getElementById('earningsGrowth').textContent = data.monthlyStats.earningsGrowth;
    }
    if (document.getElementById('subscribersGrowth')) {
        document.getElementById('subscribersGrowth').textContent = data.monthlyStats.subscribersGrowth;
    }

    // Génération du graphique d'évolution des revenus
    if (document.getElementById('earningsChart') && data.earningsHistory) {
        drawEarningsChartWrapper(data.earningsHistory);
    }

    // Génération de la heatmap si l'élément existe
    if (document.getElementById('heatmap')) {
        generateHeatmap(data.heatmapData);
    }
}

// Génération de la heatmap
function generateHeatmap(heatmapData) {
    const container = document.getElementById('heatmap');
    const { data, labels } = heatmapData;

    container.innerHTML = '';

    // Créer le wrapper principal
    const wrapper = document.createElement('div');
    wrapper.className = 'heatmap-wrapper';

    // Créer la colonne des labels de jours
    const daysLabelsDiv = document.createElement('div');
    daysLabelsDiv.className = 'heatmap-days-labels';
    labels.days.forEach(day => {
        const dayLabel = document.createElement('div');
        dayLabel.className = 'heatmap-day-label';
        dayLabel.textContent = day;
        daysLabelsDiv.appendChild(dayLabel);
    });

    // Créer la partie principale avec les heures et la grille
    const mainDiv = document.createElement('div');
    mainDiv.className = 'heatmap-main';

    // Créer la ligne des labels d'heures
    const hoursLabelsDiv = document.createElement('div');
    hoursLabelsDiv.className = 'heatmap-hours-labels';
    for (let hour = 0; hour < 24; hour++) {
        const hourLabel = document.createElement('div');
        hourLabel.className = 'heatmap-hour-label';
        // Afficher seulement les heures paires ou importantes pour ne pas surcharger
        hourLabel.textContent = hour % 3 === 0 ? `${hour}h` : '';
        hoursLabelsDiv.appendChild(hourLabel);
    }

    // Créer la grille de cellules
    const gridDiv = document.createElement('div');
    gridDiv.className = 'heatmap-grid';

    // Pour chaque jour de la semaine
    data.forEach((dayData, dayIndex) => {
        const dayRow = document.createElement('div');
        dayRow.className = 'heatmap-row';

        // Pour chaque heure
        dayData.forEach((intensity, hourIndex) => {
            const cell = document.createElement('div');
            cell.className = 'heatmap-cell';
            cell.setAttribute('data-intensity', labels.intensity[intensity]);

            // Tooltip avec informations détaillées
            const activityLevel = ['Très faible', 'Faible', 'Moyenne', 'Élevée', 'Très élevée'][intensity];
            cell.title = `${labels.days[dayIndex]} - ${hourIndex}:00\nActivité: ${activityLevel}`;

            dayRow.appendChild(cell);
        });

        gridDiv.appendChild(dayRow);
    });

    // Assembler tous les éléments
    mainDiv.appendChild(hoursLabelsDiv);
    mainDiv.appendChild(gridDiv);
    wrapper.appendChild(daysLabelsDiv);
    wrapper.appendChild(mainDiv);
    container.appendChild(wrapper);
}

// Chargement des posts
async function loadPosts() {
    const data = await loadJSON('data/posts.json');
    if (data) {
        displayPosts(data.posts);
    }
}

// Affichage des posts
function displayPosts(posts) {
    const container = document.getElementById('posts-container');
    if (!container) return;

    container.innerHTML = '';

    posts.forEach(post => {
        const postElement = createPostElement(post);
        container.appendChild(postElement);
    });
}

// Création d'un élément post
function createPostElement(post) {
    const article = document.createElement('article');
    article.className = 'post-card';

    let mediaHTML = '';
    if (post.content.media) {
        if (post.content.media.type === 'video') {
            const posterAttr = post.content.media.thumbnail ? `poster="${post.content.media.thumbnail}"` : '';
            mediaHTML = `
                <video controls ${posterAttr}>
                    <source src="${post.content.media.url}" type="video/mp4">
                    Votre navigateur ne supporte pas la balise vidéo.
                </video>
            `;
        } else if (post.content.media.type === 'image') {
            mediaHTML = `<img src="${post.content.media.url}" alt="Post image">`;
        }
    }

    article.innerHTML = `
        <div class="post-header">
            <img src="${post.avatar}" alt="${post.author}" class="post-avatar">
            <div>
                <div class="post-author">${post.author}</div>
                <div style="font-size: 14px; color: var(--text-secondary);">${post.timestamp}</div>
            </div>
        </div>
        <div class="post-content">
            ${post.content.text ? `<p style="padding: 0 16px 16px;">${post.content.text}</p>` : ''}
            ${mediaHTML}
        </div>
        <div class="post-actions">
            <div class="post-action">
                <span>❤️</span>
                <span>${post.stats.likes}</span>
            </div>
            <div class="post-action">
                <span>💬</span>
                <span>${post.stats.comments}</span>
            </div>
            <div class="post-action">
                <span>💰</span>
                <span>${post.stats.tips}</span>
            </div>
        </div>
    `;

    return article;
}

// Dessin du graphique d'évolution des revenus
function drawEarningsChart(earningsHistory) {
    const canvas = document.getElementById('earningsChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { months, earnings } = earningsHistory;

    // Configuration du canvas avec DPI élevé pour netteté
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    const padding = { top: 30, right: 30, bottom: 70, left: 80 };
    const width = rect.width - padding.left - padding.right;
    const height = rect.height - padding.top - padding.bottom;

    // Trouver les valeurs min et max
    const maxEarning = Math.max(...earnings);
    const minEarning = Math.min(...earnings);
    const range = maxEarning - minEarning;
    const yMin = Math.floor((minEarning - range * 0.1) / 100) * 100;
    const yMax = Math.ceil((maxEarning + range * 0.1) / 100) * 100;

    // Fonction pour convertir les valeurs en coordonnées
    const xScale = (index) => padding.left + (index / (months.length - 1)) * width;
    const yScale = (value) => padding.top + height - ((value - yMin) / (yMax - yMin)) * height;

    // Couleurs
    const primaryColor = '#F08080';
    const gridColor = '#E5E7EB';
    const textColor = '#8A96A3';

    // Grille horizontale
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    const gridLines = 5;
    for (let i = 0; i <= gridLines; i++) {
        const y = padding.top + (height / gridLines) * i;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(padding.left + width, y);
        ctx.stroke();

        // Labels de l'axe Y
        const value = yMax - ((yMax - yMin) / gridLines) * i;
        ctx.fillStyle = textColor;
        ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
        ctx.textAlign = 'right';
        ctx.fillText(formatCurrency(value), padding.left - 10, y + 4);
    }

    // Labels de l'axe X (mois)
    ctx.fillStyle = textColor;
    ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
    ctx.textAlign = 'center';
    months.forEach((month, index) => {
        const x = xScale(index);
        ctx.fillText(month, x, padding.top + height + 30);
    });

    // Dessiner la ligne
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    earnings.forEach((earning, index) => {
        const x = xScale(index);
        const y = yScale(earning);
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();

    // Dessiner les points
    ctx.fillStyle = primaryColor;
    earnings.forEach((earning, index) => {
        const x = xScale(index);
        const y = yScale(earning);
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();

        // Cercle blanc intérieur
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = primaryColor;
    });

    // Zone sous la courbe (gradient)
    const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + height);
    gradient.addColorStop(0, 'rgba(0, 175, 240, 0.2)');
    gradient.addColorStop(1, 'rgba(0, 175, 240, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(xScale(0), yScale(earnings[0]));
    earnings.forEach((earning, index) => {
        ctx.lineTo(xScale(index), yScale(earning));
    });
    ctx.lineTo(xScale(earnings.length - 1), padding.top + height);
    ctx.lineTo(xScale(0), padding.top + height);
    ctx.closePath();
    ctx.fill();
}

// Fonctions utilitaires de formatage
function formatNumber(num) {
    return num.toLocaleString('fr-FR');
}

function formatCurrency(amount) {
    return amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
}

// Redessiner le graphique lors du redimensionnement
let earningsData = null;
window.addEventListener('resize', () => {
    if (earningsData && document.getElementById('earningsChart')) {
        drawEarningsChart(earningsData);
    }
});

// Fonction modifiée pour stocker les données
function drawEarningsChartWrapper(data) {
    earningsData = data;
    drawEarningsChart(data);
}

// Export des fonctions
window.loadStats = loadStats;
window.loadPosts = loadPosts;
window.drawEarningsChart = drawEarningsChartWrapper;
