import URLToolkit from "url-toolkit"

export default {
    // Plugin name
    name: 'imgURL',
    // Extend core features
    extend(api) {
        // text = text.replaceAll(/\!\[([^\]]*)\]\(([^\)]*)\)/g, '\![' + p + '$1](' + path + '$2)');
        api.processMarkdown(text => text.replaceAll(/\!\[([^\]]*)\]\(([^\)]*)\)/g, (src, title, url) => {
                let parsed = URLToolkit.parseURL(url)
                return url[0] == '/' || parsed.scheme == 'http:' || parsed.scheme == 'https:' ?
                    `![${title}](${url})` :
                    `![${title}](${URLToolkit.normalizePath(document.location.origin + encodeURI('/docs/' + decodeURI(api.router.app.$route.path.split(/\//).filter(item => item !== '').slice(-1).toString() + '/') + url))})`
            })
        )
    }
}