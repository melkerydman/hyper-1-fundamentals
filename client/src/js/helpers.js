export let generateRandomNumber = max => {
    return Math.floor(Math.random() * max);
};

export let cloneElement = el => {
    return el.cloneNode(true);
};