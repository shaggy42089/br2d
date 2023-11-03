const constTab = {
    width :1000,
    height :1000,
    borderOffset :50,
    speed :5, // px/s
    playerHealth :100,
    playerLimit: 4,
    playerSlots: 3,
    itemThreshold: [50, 100],
    tickRate: 32,
}

const isJson = (text) => {
    if (typeof text !== "string") {
        return false;
    }
    try {
        JSON.parse(text);
        return true;
    } catch (error) {
        return false;
    }
};

const hasProps = (proplist, obj) => {
    return proplist.every(p => obj.hasOwnProperty(p));
};

module.exports = {
    hasProps: hasProps,
    isJson: isJson,
    constTab: constTab
}