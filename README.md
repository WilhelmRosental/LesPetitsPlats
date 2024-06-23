# Les-petits-plats

```mermaid
flowchart TD
    id1([Début]) --> A
    A[Création d'un tableau vide] --> B[itération sur chaque recette]
    B --> C[Recherche par titre, ingrédients et description]
    C --> D{Vrai}
    D -->|Oui| D[Création cartes et mise à jour des filtres]
    D ---->|Non| B
    id2([Fin])
```
