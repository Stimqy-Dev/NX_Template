# NX_DEV Template - Template FiveM ESX

## 📋 Description

Template FiveM complète basée sur ESX avec de nombreuses fonctionnalités pré-configurées et optimisées pour le développement de serveurs roleplay.

## ✨ Fonctionnalités incluses

### 🔧 Core ESX
- **ESX Legacy 1.12.4** - Dernière version stable d'ESX
- **Double jobs** - Système de jobs et crew intégré
- **Système ID unique** - Identification unique des joueurs
- **Ressources de base ESX** :
  - esx_addonaccount
  - esx_society
  - esx_crew
  - esx_status

### 🎒 Inventaire
- **ox_inventory** - Système d'inventaire moderne avec design personnalisé
- **pedscreen** - Écran de sélection de personnage
- **illenium-appearance** - Système d'apparence avancé
- **inv_clothes** & **itemclothes** - Gestion des vêtements

### 🎮 Interface utilisateur
- **Menu F5** avec outils de développeur :
  - Freecam
  - Copie de coordonnées
  - Téléportation au marker
  - Portefeuille
  - Gestion véhicule
  - Préférences
- **RageUI FlashFA** avec police custom incluse
- **Chat rework** par Flashback
- **HUD Flashback** - Interface utilisateur moderne

### 🛠 Scripts utilitaires
- **Script input** - Système d'input avancé
- **Notifications Flashback** - Système de notifications
- **Progressbar Flashback** - Barres de progression
- **Boussole FB** - Boussole intégrée
- **Créateur FB** - Outils de création
- **Script de location de véhicules** - Système de location

### 📁 Organisation
- **NX_Core** - Core optimisé pour ranger vos scripts
- **Dossier stream organisé** - Structure pour mappings et assets
- **Structure modulaire** - Organisation claire des ressources


## 📂 Structure des dossiers

```
NX_DEV Template/
├── [CFX]/                    # Binaires FiveM
├── resources/
│   ├── NX_Core/             # Core principal
│   ├── [UI]/                # Interfaces utilisateur
│   ├── [core]/              # Ressources ESX core
│   ├── [depends]/           # Dépendances
│   ├── [inv_depends]/       # Dépendances inventaire
│   ├── [stream]/            # Assets stream
│   └── [system]/            # Ressources système
├── cache/                   # Cache serveur
├── server.cfg              # Configuration serveur
├── nxbase.sql             # Base de données
└── README.md              # Ce fichier
```

## ⚙️ Configuration

### Menu F5
Le menu F5 est accessible via la touche F5 et inclut :
- **Portefeuille** - Gestion de l'argent et des comptes
- **Gestion véhicule** - Actions sur les véhicules
- **Préférences** - Paramètres utilisateur
- **Guide** - Aide et raccourcis
- **Menu Développeur** - Outils de développement

### Outils de développement
- **Freecam** - Caméra libre pour le mapping
- **Copie de coordonnées** - Récupération des positions
- **Téléportation** - TP rapide aux markers

## 🔧 Personnalisation

### Ajout de scripts
1. Placez vos scripts dans le dossier `NX_Core/src/modules/`
3. Redémarrez la ressource

## 🐛 Dépannage

### Erreurs communes
- **Erreur de base de données** : Vérifiez la configuration oxmysql
- **Ressources manquantes** : Assurez-vous que toutes les dépendances sont présentes
- **Erreurs de script** : Consultez les logs serveur pour plus de détails

### Support
- Vérifiez les logs dans `[CFX]/crashes/` en cas de crash
- Consultez la console serveur pour les erreurs de script

## 📝 Notes importantes

- Cette template est optimisée pour les serveurs de développement
- Certaines fonctionnalités nécessitent une configuration supplémentaire
- Le menu développeur n'a pas de système de permissions (à configurer selon vos besoins)

## 🤝 Crédits

- **ESX Legacy** - Framework de base
- **ox_inventory** - Système d'inventaire

---

**Version** : 1.0  
**Compatibilité** : FiveM Latest, ESX 1.12.4  