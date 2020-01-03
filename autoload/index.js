const list = {
    db: './database'
}

module.exports = {
    init: function() {
        Object.keys(list).forEach(function (key) {
            require(list[key]);
        });
    }
}