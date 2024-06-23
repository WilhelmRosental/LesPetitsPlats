# Les-petits-plats

```mermaid
flowchart TD
    id1([Début]) --> A
    A[Changement de valeur de l'input de recherche] --> B{valeurs < à 3}
    B -->|Oui| C[Création cartes et mise à jour des filtres]
    B ---->|Non| E[Recherche titre, ingrédients ou description]
    E --> F[Filtre tableau recette]
    F --> G[Retourne tableau filtré]
    G --> C
    C --> id2([Fin])
```
