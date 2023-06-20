// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Biometrio.earth docs',
  tagline: 'Documentation of Biometrio.earth tools, apps and platforms',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'http://ec2-3-249-8-94.eu-west-1.compute.amazonaws.com/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/be-docs',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'biometrioearth', // Usually your GitHub org/user name.
  projectName: 'biometrio-earth-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      navbar: {
        title: 'Biometrio.earth docs',
        logo: {
          alt: 'Biometrio.earth logo',
          src: 'img/be-logo.svg',
          srcDark: 'img/be-logo-dark.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'balamSidebar',
            position: 'left',
            label: 'Balam',
          },
          {
            type: 'docSidebar',
            sidebarId: 'pufferfishSidebar',
            position: 'left',
            label: 'Pufferfish',
          },
          {
            href: 'https://github.com/biometrioearth',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Balam Docs',
            items: [
              {
                label: 'Intro',
                to: '/docs/balam/intro',
              },
              {
                label: 'API',
                to: '/docs/category/balam---api',
              },
              {
                label: 'Apps and Models',
                to: '/docs/category/balam---apps-and-models',
              },
            ],
          },
          {
            title: 'Pufferfish Docs',
            items: [
              {
                label: 'Intro',
                to: '/docs/pufferfish/intro',
              },
              {
                label: 'Beadmex',
                to: '/docs/category/beadmex',
              },
              {
                label: 'Tochtli',
                to: '/docs/category/tochtli',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Biometrio.earth',
                href: 'https://www.biometrio.earth/',
              },
              {
                label: 'About us',
                to: 'https://www.biometrio.earth/uber-uns',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Biometrio.earth docs. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['graphql'],
      },
    }),
};

module.exports = config;
