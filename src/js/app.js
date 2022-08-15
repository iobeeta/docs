import "../css/common.css"
import "../css/TOC.css"
import imgURL from "./imgURL"
import TOC from "./TOC"

new Docute({
    target: '#main',
    imageZoom: true,
    darkThemeToggler: true,
    overrides: {
        '/': {
            language: 'English' // Used by the language dropdown menu in the sidebar
        },
        '/zh/': {
            language: '中文'
            // // Override the default sidebar
            // sidebar: [
            //   {
            //     children: [
            //       { title: '指南', link: '/zh/guide' }
            //     ]
            //   }
            // ]
        }
    },
    plugins: [
        imgURL,
        TOC()
    ]
})