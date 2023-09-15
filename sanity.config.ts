import { visionTool } from '@sanity/vision';
import { StudioNavbar } from './src/components/StudioNavbar';
import { Config } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './schemas';
import { msTheme } from './src/theme';

export const config: Config = {
  name: 'default',
  title: 'Foreverglow',
  basePath: '/studio',

  projectId: 'm63z69b6',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  theme: msTheme,

  studio: {
    components: {
      navbar: StudioNavbar,
    },
  },
};
