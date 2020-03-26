const calculateOpacity = (percentage) => {
    let maxColorValue = 255;
    let opacity = percentage * maxColorValue / 100.0;
    let value = (parseInt(opacity)).toString(16)
    return value;
}

export {calculateOpacity}