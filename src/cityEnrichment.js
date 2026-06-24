// Contenu unique par commune — pages /aide-informatique-<slug>
// (highlights, FAQ locale, texte d'intro distinct pour le SEO).

const CITY_ENRICHMENT = {
  "olonne-sur-mer": {
    seoDescription:
      "Dépannage et assistance numérique à domicile à Olonne-sur-Mer : La Pironnière, centre-bourg, Wi-Fi, box, smartphone et ordinateur. ~5 min des Sables, crédit d’impôt 50 %.",
    heroIntro:
      "De La Pironnière au centre-bourg, Loko intervient à Olonne-sur-Mer pour le Wi-Fi capricieux, l’ordinateur lent, le smartphone ou la TV — sans vous faire rejoindre une boutique aux Sables.",
    highlights: [
      "Wi-Fi faible entre le bourg ancien et les lotissements en lisière de forêt",
      "Accompagnement patient pour les seniors du secteur résidentiel",
      "Remise en route de box et TV après déménagement ou changement d’opérateur",
    ],
    faq: [
      {
        q: "Intervenez-vous à La Pironnière et dans tous les quartiers d’Olonne-sur-Mer ?",
        a: "Oui, Loko se déplace dans l’ensemble de la commune : centre-bourg, La Pironnière, lotissements et secteurs pavillonnaires.",
      },
      {
        q: "Combien de temps faut-il pour venir à Olonne-sur-Mer depuis Les Sables ?",
        a: "Comptez environ 5 minutes. Loko planifie les interventions pour limiter l’attente et intervenir à domicile rapidement.",
      },
    ],
  },
  "chateau-d-olonne": {
    seoDescription:
      "Assistance informatique à domicile au Château-d’Olonne : Tanchet, Pierre Levée, Wi-Fi, ordinateur, TV et smartphone. Intervention locale, crédit d’impôt 50 %.",
    heroIntro:
      "Du littoral de Tanchet aux quartiers de la Pierre Levée, Loko dépanne et accompagne au Château-d’Olonne sur Internet, ordinateur, smartphone et télévision.",
    highlights: [
      "Box mal placée entre étages dans les maisons en hauteur",
      "Streaming et replay qui rament en bord de mer le soir",
      "Aide aux seniors pour smartphone, mails et visioconférence",
    ],
    faq: [
      {
        q: "Couvrez-vous tout le Château-d’Olonne, y compris le littoral ?",
        a: "Oui, du centre-bourg aux secteurs côtiers comme Tanchet. Loko intervient à domicile sur toute la commune.",
      },
      {
        q: "Pouvez-vous améliorer le Wi-Fi dans une maison sur plusieurs niveaux ?",
        a: "Oui : placement de la box, répéteur ou réseau maillé selon votre logement. On teste et on explique simplement.",
      },
    ],
  },
  "l-ile-d-olonne": {
    seoDescription:
      "Aide informatique à domicile à L’Île-d’Olonne : hameaux, marais, Wi-Fi, ordinateur et smartphone. Intervention patiente, ~10 min des Sables.",
    heroIntro:
      "Même dans les hameaux un peu isolés de L’Île-d’Olonne, Loko vient à domicile régler Internet, Wi-Fi, ordinateur, smartphone et écrans — sans jargon.",
    highlights: [
      "Couverture Wi-Fi inégale dans les maisons étendues ou anciennes",
      "Accompagnement adapté aux secteurs ruraux et résidentiels",
      "Sauvegarde de photos et contacts avant changement de téléphone",
    ],
    faq: [
      {
        q: "Venez-vous dans les hameaux éloignés de L’Île-d’Olonne ?",
        a: "Oui, Loko se déplace dans toute la commune, y compris les secteurs les plus ruraux autour des marais salants.",
      },
      {
        q: "Mon Wi-Fi ne couvre pas toute la maison : pouvez-vous aider ?",
        a: "C’est fréquent sur les grandes surfaces. On identifie les zones faibles et on propose une solution adaptée à votre logement.",
      },
    ],
  },
  vaire: {
    seoDescription:
      "Dépannage informatique à domicile à Vairé : Wi-Fi, box, ordinateur et smartphone sans vous déplacer aux Sables. ~15 min, crédit d’impôt 50 %.",
    heroIntro:
      "À Vairé, pas besoin de rouler jusqu’aux Sables : Loko se déplace chez vous pour Internet, Wi-Fi, ordinateur, smartphone et TV, à votre rythme.",
    highlights: [
      "Éviter le trajet en boutique pour un problème « simple »",
      "Installation de box après déménagement dans le village",
      "Transfert de données entre ancien et nouveau téléphone",
    ],
    faq: [
      {
        q: "Est-ce vraiment plus pratique qu’un magasin aux Sables d’Olonne ?",
        a: "Pour la plupart des blocages du quotidien, une intervention à domicile à Vairé est plus simple : on voit votre installation réelle et on règle sur place.",
      },
      {
        q: "Intervenez-vous aussi pour les résidents à l’année ?",
        a: "Oui, habitants permanents comme propriétaires de passage. Loko s’adapte à votre situation et à vos appareils.",
      },
    ],
  },
  "sainte-foy": {
    seoDescription:
      "Assistance numérique à Sainte-Foy : dépannage Wi-Fi, ordinateur, TV et smartphone à domicile. Commune résidentielle, ~12 min des Sables.",
    heroIntro:
      "À Sainte-Foy, Loko installe, dépanne et explique vos appareils à domicile : box, Wi-Fi, ordinateur, smartphone et télévision, sans stress.",
    highlights: [
      "Pavillons récents avec réseau Wi-Fi mal configuré",
      "Imprimante et ordinateur familial à remettre en route",
      "Accompagnement numérique pour seniors à domicile",
    ],
    faq: [
      {
        q: "Aidez-vous les seniors de Sainte-Foy à utiliser leur smartphone ?",
        a: "Oui, c’est une demande fréquente : réglages, photos, messagerie et applications essentielles, expliqués pas à pas.",
      },
      {
        q: "Pouvez-vous reconnecter une imprimante Wi-Fi ?",
        a: "Oui, Loko s’occupe de la liaison entre l’imprimante, le Wi-Fi et l’ordinateur, et on vérifie que tout imprime correctement.",
      },
    ],
  },
  "brem-sur-mer": {
    seoDescription:
      "Dépannage informatique à Brem-sur-Mer : résidences principales et secondaires, Wi-Fi, TV, smartphone. Plages et vignobles, ~18 min des Sables.",
    heroIntro:
      "À Brem-sur-Mer, Loko aide les résidents à l’année comme les propriétaires de passage : Wi-Fi, TV, smartphone et ordinateur, directement à domicile.",
    highlights: [
      "Résidences secondaires à reconnecter après une absence",
      "Wi-Fi et TV pour les séjours en famille près des plages",
      "Aide au changement de téléphone ou de box entre deux saisons",
    ],
    faq: [
      {
        q: "Intervenez-vous pour une résidence secondaire à Brem-sur-Mer ?",
        a: "Oui, Loko peut remettre en route box, Wi-Fi et TV avant votre arrivée ou pendant votre séjour, selon vos disponibilités.",
      },
      {
        q: "Mon débit rame en été : est-ce normal à Brem-sur-Mer ?",
        a: "La saturation du réseau et du Wi-Fi est fréquente en saison. On vérifie votre installation avant de conclure à un problème d’opérateur.",
      },
    ],
  },
  "saint-mathurin": {
    seoDescription:
      "Aide informatique à Saint-Mathurin : bourg et lotissements, Wi-Fi, ordinateur lent, TV et smartphone à domicile. ~12 min des Sables.",
    heroIntro:
      "À Saint-Mathurin, le long de l’Auzance, Loko règle au quotidien Wi-Fi, ordinateur, smartphone et télévision — calmement, chez vous.",
    highlights: [
      "Ordinateur qui rame après des années d’usage",
      "Box installée dans un bureau exigu, signal Wi-Fi faible",
      "Aide TV et streaming pour toute la famille",
    ],
    faq: [
      {
        q: "Mon ordinateur est très lent : vaut-il mieux le remplacer ?",
        a: "Pas toujours. Loko commence par nettoyer, optimiser et vérifier la connexion. On vous dit clairement si un remplacement est vraiment utile.",
      },
      {
        q: "Couvrez-vous le bourg et les secteurs pavillonnaires ?",
        a: "Oui, interventions sur l’ensemble de Saint-Mathurin, bourg et environs.",
      },
    ],
  },
  "talmont-saint-hilaire": {
    seoDescription:
      "Assistance numérique à Talmont-Saint-Hilaire : bourg, Bourgenay, Veillon. Wi-Fi, ordinateur, TV à domicile. Commune étendue, ~18 min des Sables.",
    heroIntro:
      "À Talmont-Saint-Hilaire, du bourg au Veillon en passant par Bourgenay, Loko intervient à domicile pour Internet, Wi-Fi, ordinateur, TV et smartphone.",
    highlights: [
      "Grandes distances dans la maison : Wi-Fi qui n’atteint pas toutes les pièces",
      "Propriétaires entre le port et le centre-bourg",
      "TV, box et applications de streaming à remettre en marche",
    ],
    faq: [
      {
        q: "Intervenez-vous côté Bourgenay et sur la plage du Veillon ?",
        a: "Oui, Loko couvre l’ensemble de la commune, y compris les secteurs côtiers et le port de Bourgenay.",
      },
      {
        q: "Le Wi-Fi ne va pas jusqu’à la chambre du fond : que faire ?",
        a: "On mesure la couverture chez vous et on propose un répéteur, un maillage ou un meilleur emplacement de box selon votre logement.",
      },
    ],
  },
  "les-achards": {
    seoDescription:
      "Dépannage informatique aux Achards : bourg, gare, télétravail, Wi-Fi et ordinateur à domicile. ~20 min des Sables, crédit d’impôt 50 %.",
    heroIntro:
      "Aux Achards, Loko dépanne et accompagne à domicile sur tous vos appareils : idéal si vous télétravaillez depuis le bourg ou si vous voulez reprendre confiance avec le numérique.",
    highlights: [
      "Télétravail : Wi-Fi instable ou visioconférence qui coupe",
      "Changement d’opérateur et reconfiguration de la box",
      "Formation seniors autour de La Mothe-Achard et La Chapelle-Achard",
    ],
    faq: [
      {
        q: "Pouvez-vous stabiliser le Wi-Fi pour le télétravail aux Achards ?",
        a: "Oui, on vérifie la box, le placement, les interférences et les appareils connectés pour retrouver une connexion fiable.",
      },
      {
        q: "Proposez-vous un accompagnement pour apprendre l’ordinateur ?",
        a: "Oui, à votre rythme à domicile : navigation, mails, fichiers et usages du quotidien, sans jargon.",
      },
    ],
  },
  "nieul-le-dolent": {
    seoDescription:
      "Aide informatique à Nieul-le-Dolent : commune calme et résidentielle, Wi-Fi, ordinateur et smartphone à domicile. ~20 min des Sables.",
    heroIntro:
      "À Nieul-le-Dolent, Loko vient à domicile pour le Wi-Fi capricieux, l’ordinateur qui rame ou le smartphone difficile à utiliser — sans magasin informatique à proximité.",
    highlights: [
      "Pas de boutique spécialisée : l’intervention vient à vous",
      "Peur de perdre photos et contacts : sauvegarde et transfert",
      "Ordinateur familial à nettoyer et accélérer",
    ],
    faq: [
      {
        q: "Pouvez-vous sauvegarder mes photos avant un changement de téléphone ?",
        a: "Oui, Loko sauvegarde et transfère photos, contacts et données importantes vers votre nouvel appareil.",
      },
      {
        q: "Intervenez-vous dans tout Nieul-le-Dolent ?",
        a: "Oui, sur l’ensemble de la commune et ses hameaux résidentiels.",
      },
    ],
  },
  "jard-sur-mer": {
    seoDescription:
      "Assistance numérique à Jard-sur-Mer : port, plages, résidences secondaires. Wi-Fi, TV, smartphone à domicile. ~25 min des Sables, crédit d’impôt 50 %.",
    heroIntro:
      "À Jard-sur-Mer, Loko installe et dépanne à domicile pour les résidents à l’année comme les estivants : Wi-Fi, TV, smartphone et ordinateur près du port et des plages.",
    highlights: [
      "Résidences de vacances à remettre en service chaque été",
      "Wi-Fi saturé quand toute la famille est connectée",
      "Prise en main smartphone pour profiter du séjour sans stress",
    ],
    faq: [
      {
        q: "Pouvez-vous préparer le Wi-Fi et la TV avant notre arrivée à Jard-sur-Mer ?",
        a: "Oui, sur rendez-vous Loko peut vérifier box, Wi-Fi et télévision pour que tout fonctionne à votre arrivée.",
      },
      {
        q: "Est-ce éligible au crédit d’impôt à Jard-sur-Mer ?",
        a: "Pour les prestations d’assistance éligibles au service à la personne, vous pouvez bénéficier de 50 % de crédit d’impôt.",
      },
    ],
  },
};

export function getCityEnrichment(slug) {
  return CITY_ENRICHMENT[slug] || null;
}
