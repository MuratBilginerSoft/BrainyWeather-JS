// #region Display Functions

export const displayNone = (elements) => {
    
    console.log(elements);
    elements.forEach(element => {
        element.style.display = "none";
    });
}

export const displayBlock = (elements) => {

    elements.forEach(element => {
        element.style.display = "block";
    });
}

// #endregion

// #region UpperCase To Turkish Characters
export const turkishToUpper = (text) => {
    const letters = { 'i': 'İ', 'ş': 'Ş', 'ğ': 'Ğ', 'ü': 'Ü', 'ö': 'Ö', 'ç': 'Ç', 'ı': 'I' };
    text = text.replace(/(([iışğüçö]))/g, letter => letters[letter]);
    return text.toUpperCase();
}

// #endregion

// #region Date Builder

export const dateBuilder = (d) => {

    let aylar = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    let gunler = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
  
    let day = gunler[d.getDay()];
    let date = d.getDate();
    let month = aylar[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
}

// #endregion