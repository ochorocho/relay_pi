module.exports = {
    base: '/relay_pi/',
    title: `Rel(a)y Pi`,
    description: "Documentation of Rel(a)y Pi",
    plugins: [
        'vuepress-plugin-mermaidjs'
    ],
    themeConfig: {
        logo: '/logo.svg',
        sidebar: [
            ["/groups", "Groups"],
            ["/devices", "Devices"],
            ["/pins", "Pins"]
        ],
        nav: [],
        lastUpdated: true,
        displayAllHeaders: true,
        // Assumes GitHub. Can also be a full GitLab url.
        repo: 'ochorocho/relay_pi/',
        repoLabel: 'Code',
        docsDir: 'docs',
        docsBranch: 'master',
        editLinks: true,
        editLinkText: 'Edit'
    }
};