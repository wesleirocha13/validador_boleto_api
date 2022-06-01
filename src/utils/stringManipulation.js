const removeMask = (code)=> {
    return code.replace(/( |\.|-)/g, '');
}

module.exports = { removeMask };