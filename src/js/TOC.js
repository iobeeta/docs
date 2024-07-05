const makeToc = function makeToc(content) {
    let dom = jQuery('<div>' + content + '</div>');
    let res = []
    let minLevel
    let level
    dom.find('h1,h2,h3,h4,h5,h6').each((num, item) => {
        let dom = jQuery(item)
        level = parseInt(item.nodeName.substring(1))
        if (minLevel == null) {
            minLevel = level
        } else if (minLevel > level) {
            minLevel = level
        }
        res.push({ level: level, href: dom.attr('id'), content: dom.text().trim() })
    })
    if (minLevel > 1) {
        let p = minLevel - 1
        res = res.map(item => {
            item.level -= p
            return item
        })
    }
    return res;
}

const storage = {
    toc: []
}

export default ({ initOpts, evaluateOnly = false } = {}) => ({
    name: 'TOC',
    extend(api) {
        api.registerComponent('sidebar:start', Vue.component('TOC', {
            data() {
                return { storage }
            },
            template: `
          <template v-if="storage.toc.length">
            <div class="toc-wrapper">
              <div class="toc">
                <template v-for="(item, index) in storage.toc">
                  <div :class="['toc-level-' + item.level]">
                    <a :href="'#' + $route.path} + '#' + item.href">{{ item.content }}</a>
                  </div>
                </template>
              </div>
            </div>
          </template>
        `
        }))
        api.processHTML(html => {
            storage.toc = makeToc(html)
            return html
        })
    }
})