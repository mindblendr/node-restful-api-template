const list = {
    db: './database'
}

module.exports = {
    init: () => {
        Object.keys(list).forEach(key => {
            require(list[key]);
        });
    }
}