document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('responseForm');
  const status = document.getElementById('formStatus');
  const placeSelect = document.getElementById('place');
  const timeSelect = document.getElementById('time');
  const placeCards = document.querySelectorAll('.card[data-place]');
  const hourButtons = document.querySelectorAll('.hour[data-time]');

  function selectPlace(place) {
    placeCards.forEach(card => {
      card.classList.toggle('selected', card.dataset.place === place);
    });
    placeSelect.value = place;
  }

  function selectTime(time) {
    hourButtons.forEach(hour => {
      hour.classList.toggle('selected', hour.dataset.time === time);
    });
    timeSelect.value = time;
  }

  placeCards.forEach(card => {
    card.addEventListener('click', () => selectPlace(card.dataset.place));
  });

  hourButtons.forEach(hour => {
    hour.addEventListener('click', () => selectTime(hour.dataset.time));
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = {
      name: formData.get('name').trim(),
      place: formData.get('place'),
      time: formData.get('time'),
      message: formData.get('message').trim(),
    };

    if (!payload.name || !payload.place || !payload.time) {
      status.textContent = 'Merci de remplir ton prénom, le lieu et l’heure avant d’envoyer.';
      status.classList.add('status-error');
      return;
    }

    status.textContent = 'Envoi en cours…';
    status.classList.remove('status-error');
    status.classList.remove('status-success');

    try {
      const response = await fetch('/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!result.ok) {
        throw new Error(result.error || 'Erreur serveur');
      }

      status.textContent = 'Merci ! Ta réponse est bien envoyée. Je pourrai la voir dans la page admin.';
      status.classList.add('status-success');

      const summary = document.getElementById('summary');
      summary.innerHTML = `
        <h3>Ta réponse enregistrée</h3>
        <p><strong>Prénom :</strong> ${escapeHtml(payload.name)}</p>
        <p><strong>Lieu choisi :</strong> ${escapeHtml(payload.place)}</p>
        <p><strong>Heure préférée :</strong> ${escapeHtml(payload.time)}</p>
        <p><strong>Message :</strong> ${escapeHtml(payload.message || '—')}</p>
      `;
      summary.scrollIntoView({ behavior: 'smooth' });
      form.reset();
      placeCards.forEach(card => card.classList.remove('selected'));
      hourButtons.forEach(hour => hour.classList.remove('selected'));
    } catch (error) {
      status.textContent = 'Impossible d’envoyer ta réponse. Vérifie ta connexion et réessaie.';
      status.classList.add('status-error');
    }
  });

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
});
