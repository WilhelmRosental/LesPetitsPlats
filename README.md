# Les-petits-plats

```mermaid
flowchart TD
    A[Changement de valeur de l'input de recherche] --> B{valeurs < à 3}
    B -->|Oui| C[Création cartes et mise à jour des filtres]
    B ---->|No| E[Recherche titre, ingrédients ou description]
    E --> F[Filtre tableau recette]
    F --> G[Retourne tableau filtré]
    G --> C

```
