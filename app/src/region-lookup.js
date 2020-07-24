var regions  = {
  "Latin America": ["Argentina", "Belize", "Bolivia", "Brazil", "Chile", "Colombia", "Costa Rica", "Ecuador", "El Salvador", "Guyana", "Guatemala", "Honduras", "Nicaragua", "Panama", "Paraguay", "Peru", "Suriname", "Uruguay", "Venezuela"],
  "Caribbean": ["Antigua and Barbuda", "Bahamas", "Barbados", "Cuba", "Dominica", "Dominican Republic", "Grenada", "Guadeloupe", "Haiti", "Jamaica", "Martinique", "Puerto Rico", "Saint Barthélemy", "Saint Christopher and Nevis", "Saint Lucia", "Saint Martin", "Saint Vincent and the Grenadines", "Trinidad and Tobago"],
  "Eastern Europe and Central Asia": ["Albania", "Armenia", "Azerbaijan", "Belarus", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Estonia", "Georgia", "Kazakhstan", "Kosovo", "Kyrgyzstan", "Latvia", "Lithuania", "Macedonia", "Moldova", "Montenegro", "Romania", "Russia", "Serbia", "Tajikistan", "Turkmenistan", "Ukraine", "Uzbekistan"],
  "Asia and the Pacific": ["Afghanistan", "American Samoa", "Australia", "Bangladesh", "Bhutan", "Brunei Darussalam", "Cambodia", "China", "Christmas Island", "Cocos (Keeling) Islands", "Cook Islands", "Federated States of Micronesia", "Fiji", "French Polynesia", "Guam", "India", "Indonesia", "Japan", "Kiribati", "Laos", "Macau", "Malaysia", "Maldives", "Marshal Islands", "Mongolia", "Myanmar", "Nauru", "Nepal", "New Caledonia", "New Zealand", "Niue", "Norfolk Island", "North Korea", "Nortern Mariana Islands", "Pakistan", "Palau", "Papua New Guinea", "Philippines", "Pitcairn Islands", "Samoa", "Singapore", "Solomon Islands", "South Korea", "Sri Lanka", "Taiwan", "Thailand", "Timor-Leste", "Tokelau", "Tonga", "Tuvalu", "Vanuatu", "Vietnam", "Wallis and Futuna"],
  "Middle East and North Africa": ["Algeria", "Egypt", "Libya", "Morocco", "Mauritania", "Sudan", "Tunisia", "Bahrain", "Djibouti", "Iraq", "Israel", "Jordan", "Kuwait", "Lebanon", "Oman", "Palestine", "Qatar", "Saudi Arabia", "Syria", "Turkey", "United Arab Emirates", "Yemen"],
  "Western and central Africa": ["Benin", "Burkina Faso", "Ivory Coast", "Cape Verde", "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Liberia", "Mali", "Mauritania", "Niger", "Nigeria", "Senegal", "Sierra Leone and Togo", "Angola", "Cameroon", "Central African Republic", "Chad", "Democratic Republic of the Congo", "Equatorial Guinea", "Gabon", "Republic of the Congo", "São Tomé and Príncipe"],
  "Eastern and southern Africa": ["Burundi", "Tanzania", "Kenya", "Uganda", "Rwanda", "Eritrea", "Ethiopia", "Somalia", "Mozambique", "Madagascar", "Malawi", "Zambia", "Zimbabwe", "Comoros", "Mauritius", "Seychelles", "Reunion", "Mayotte", "South Sudan", "Botswana", "Eswatini", "Lesotho", "Namibia", "South Africa"],
  "Western and central Europe and North America": ["Austria", "Belgium", "Cyprus", "Czech Republic", "Denmark", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Luxembourg", "Malta", "The Netherlands", "Norway", "Poland", "Portugal", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "United Kingdom", "USA", "Canada", "Mexico"]
}

let regionLU = {}
let regionNames = []

function buildLookup() {

  Object.keys(regions).forEach(k => {
    let countries = regions[k]

    countries.forEach(c => {
      regionLU[c] = k
    });
  });
}

function buildRegionNames() {
    regionNames = Object.keys(regions)
    regionNames.sort()
}

buildLookup()
buildRegionNames()

export { regionLU, regionNames }
