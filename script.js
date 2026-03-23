const pegi18Radios = document.querySelectorAll('input[name="pegi18"]');
const pegi21Options = document.querySelector('.pegi21-options');
const valider = document.getElementById('valider');
const resultat = document.getElementById('resultat');

// Affichage dynamique du bloc pegi21 si "Majeur"
pegi18Radios.forEach(radio => {
  radio.addEventListener('change', () => {
    pegi21Options.style.display = (radio.id === "majeur" && radio.checked) ? "block" : "none";
  });
});

// Fonction pour gérer le clic sur Valider
valider.addEventListener('click', () => {
  resultat.innerHTML = ""; // reset

  // Récupérer les réponses
  const pays = document.querySelector('input[name="mi-pays"]:checked');
  const age = document.querySelector('input[name="pegi18"]:checked');
  const ageExact = document.querySelector('input[name="pegi21"]:checked');
  const maison = document.querySelector('input[name="MAISON"]:checked');

  // Vérification
  if (!pays || !age || !maison || (age.value === "Majeur" && !ageExact)) {
    alert("Veuillez compléter toutes les réponses !");
    return;
  }

  // Construire le contenu
  let contenu = "<h3>Tu as besoin de ces documents :</h3><ul> <li>photo de pthotomaton type identité (E-photo)</li>";
  // Pays
  if (pays.id === "France") {
    contenu += "<li>Pièce d'identité</li>";
    contenu += "<li>JDC (Journée défense et citoyenneté)</li>";
  } else {
    contenu += "<li>Pièce d'identité</li>";
  }

  // Age
  if (age.value === "Mineur") {
    contenu += "<li>ASSR2</li>";
  } else {
    if (ageExact.id === "majeur-21down") {
      contenu += "<li>ASSR2</li>";
    }
    // majeur 21up n'a pas besoin d'ajouter de document supplémentaire
  }

  // Maison
  if (maison.id === "indépendant") {
    contenu += "<li>Justificatif de domicile à ton nom</li>";
  } else {
    contenu += "<li>Justificatif de domicile de la personne qui t'héberge</li>";
    contenu += "<li>Pièce d'identité de la personne t'héberge</li>";
    contenu += "<li>attestation d'hébergement sur l'honneur</li>";
  }

  contenu += "</ul>";

  // Afficher le résultat
  resultat.innerHTML = contenu;
});