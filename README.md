# Les-petits-plats

```mermaid
graph TD
    id1([Début]) --> id2[/Changement de valeur de la barre de recherche/]
    id2 --> B{nbr valeur < à 3}
    B -->|Oui| C[Retourne la liste complète de recettes]
    C --> D[Créé les cartes et les affiches]
    B -->|Non| E[Création d'un nouveau tableau pour les recettes filtrées]
    E --> F[Initialisation d'un compteur]
    F --> G(( ))
    G --> H{Valeur finale atteinte ?}
    H --> |Oui| I[Retourne le tableau des recettes filtrées]
    I --> D
    H --> |Non| J{contient filtre ?}
    J --> |Oui| K[On ajoute la recette dans le tableau des recettes filtrées]
    K --> L
    J --> |Non| L[On incrément la valeur du compteur]
    L --> G
    D --> id3([Fin])
```
