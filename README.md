# Les-petits-plats

```mermaid
flowchart TD
    id1([Début]) --> id2[/Changement de valeur de la barre de recherche/]
    id2 --> B{valeurs < à 3}
    B -->|Oui| C[Retourne la liste complète de recettes]
    C --> D[Créé les cartes et les affiches]
    B ---->|Non| E[Recherche titre, ingrédients ou description]
    E --> F[Filtre tableau recette]
    F --> G[Retourne tableau filtré]
    G --> D
    D --> id3([Fin])
```
