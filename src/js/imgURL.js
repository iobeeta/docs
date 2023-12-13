export default {
    // Plugin name
    name: 'imgURL',
    // Extend core features
    extend(api) {
        api.processMarkdown(text => {
            let prodName = api.router.app.$route.path.split(/\//)
            prodName = prodName.filter(item => item !== '')
            let path = encodeURI('/prod/' + decodeURI(prodName[prodName.length - 1]) + '/')
            // text = text.replaceAll(/\!\[([^\]]*)\]\(([^\)]*)\)/g, '\![' + path + '$1](' + path + '$2)');
            return text.replaceAll(/\!\[([^\]]*)\]\(([^\)]*)\)/g, (src, title, url) => `![${title}](${path}${url})`);
        })
    }
}