# Intégration des Notifications dans FiveM

Ce script permet d'intégrer des notifications personnalisées dans votre serveur FiveM basé sur ESX, en utilisant la ressource `fb_notif` pour les notifications standard et avancées.

## Guide d'Installation

### Étape 1 : Modifier `es_extended/client/functions.lua`

Vous devez modifier le fichier `es_extended` pour utiliser la ressource `fb_notif` afin de gérer les notifications. Suivez les étapes ci-dessous :

1. Ouvrez le fichier `es_extended/client/functions.lua` dans la structure de fichiers de votre serveur.
2. Remplacez les fonctions `ESX.ShowNotification` et `ESX.ShowAdvancedNotification` existantes par le code suivant :

```lua

ESX.ShowNotification = function(msg, flash, saveToBrief, hudColorIndex, title, subject, icon)
    exports['fb_notif']:addNotification(
        nil,
        nil,
        nil,
        nil,
        msg,
        10000
    )
end

ESX.ShowAdvancedNotification = function(title, subject, msg, banner, timeout, icon)
    exports['fb_notif']:addNotification(
        banner,
        nil,
        title,
        subject,
        msg,
        10000
    )
end