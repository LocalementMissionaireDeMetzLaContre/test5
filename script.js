const pegi18Radios = document.querySelectorAll('input[name="pegi18"]');
const pegi21Options = document.querySelector('.pegi21-options');
const valider = document.getElementById('valider');
const resultat = document.getElementById('resultat');

// Affichage dynamique
pegi18Radios.forEach(radio => {
  radio.addEventListener('change', () => {
    pegi21Options.style.display =
      (radio.value === "majeur" && radio.checked) ? "block" : "none";
  });
});

// Bouton valider
valider.addEventListener('click', () => {
  resultat.innerHTML = "";
  resultat.className = "";

  // Récupération
  const pays = document.querySelector('input[name="mi-pays"]:checked');
  const age = document.querySelector('input[name="pegi18"]:checked');
  const ageExact = document.querySelector('input[name="pegi21"]:checked');
  const maison = document.querySelector('input[name="maison"]:checked');

  // Vérif
  if (!pays || !age || !maison || (age.value === "majeur" && !ageExact)) {
    alert("Veuillez compléter toutes les réponses !");
    return;
  }

  let contenu = "<h3>Tu as besoin de ces documents :</h3><ul>";
  contenu += "<li>Photo de photomaton type identité (E-photo)</li>";

  // Pays
  if (pays.value === "france") {
    contenu += "<li>Pièce d'identité</li>";
    contenu += "<li>JDC (Journée défense et citoyenneté)</li>";
  } else {
    contenu += "<li>Pièce d'identité</li>";
  }

  // Age
  if (age.value === "mineur") {
    contenu += "<li>ASSR2</li>";
  } else {
    if (ageExact && ageExact.value === "18-21") {
      contenu += "<li>ASSR2</li>";
    }
  }

  // Maison
  if (maison.value === "independant") {
    contenu += "<li>Justificatif de domicile à ton nom</li>";
  } else {
    contenu += "<li>Justificatif de domicile de la personne qui t'héberge</li>";
    contenu += "<li>Pièce d'identité de la personne qui t'héberge</li>";
    contenu += "<li>Attestation d'hébergement sur l'honneur</li>";
  }

  contenu += "</ul>";

  resultat.classList.add('resultat-documents');
  resultat.innerHTML = contenu;
});