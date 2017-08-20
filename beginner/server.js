(require('connect'))().use((require('serve-static'))(__dirname)).listen(3000, () => { console.log('Listening at 3000'); });
