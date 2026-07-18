# Une Soirée Site

Site d'invitation privée avec formulaire et page admin pour consulter la réponse.

## Deployment

Ce site peut être déployé sur une plateforme d'hébergement Python/Flask comme Heroku, PythonAnywhere, Render, Railway, ou un VPS.

### Fichiers principaux

- `index.html` : page d'invitation mobile
- `admin.html` : page admin pour voir la dernière réponse
- `styles.css` : styles partagés
- `script.js` : logique du formulaire
- `admin.js` : logique d'affichage admin
- `app.py` : serveur Flask public
- `data.json` : stockage local de la dernière réponse
- `requirements.txt` : dépendances Python

### Lancer localement

1. Installer Flask :

```bash
python -m pip install -r requirements.txt
```

2. Lancer le serveur :

```bash
python app.py
```

3. Ouvrir :

- `http://localhost:8000/`
- `http://localhost:8000/admin.html`

### Déploiement public

#### Option Render

1. Crée un dépôt Git pour le dossier `une-soiree-site`.
2. Pousse le dépôt sur GitHub ou un autre service Git.
3. Crée un service Web sur Render.
4. Choisis le dépôt Git et la branche à déployer.
5. Dans les paramètres du service Render :
   - `Environment` : Python
   - `Build Command` : `pip install -r requirements.txt`
   - `Start Command` : `gunicorn app:app --bind 0.0.0.0:$PORT`
   - `Python Version` : 3.14
6. Déploie le service.
7. Partage le lien Render public avec ta copine.

#### Option Railway / Heroku

1. Pousse le dossier sur un dépôt Git.
2. Connecte le dépôt au service choisi.
3. Utilise le `Procfile` pour démarrer le site.
4. Le service doit exécuter `gunicorn app:app --bind 0.0.0.0:$PORT`.

### Créer le dépôt Git localement

Si tu n’as pas encore de dépôt Git :

```bash
cd /path/to/une-soiree-site
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TON_COMPTE/TON_REPO.git
git push -u origin main
```

Remplace `TON_COMPTE` et `TON_REPO` par tes informations GitHub.

### Fichiers de déploiement ajoutés

- `Procfile` : commande de démarrage pour Heroku / Render / Railway
- `runtime.txt` : version Python utilisée par l’environnement
- `Dockerfile` : option alternative pour conteneuriser le site
- `render.yaml` : configuration Render prête à l’emploi

---

## Utilisation

- Ta copine remplit le formulaire sur la page principale.
- Sa réponse est sauvegardée dans `data.json` sur le serveur.
- Tu peux la consulter sur `https://<ton-site>/admin.html`.
