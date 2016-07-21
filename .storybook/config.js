import { configure } from '@kadira/storybook';

function requireAll(context) {
    return context.keys().map(context)
}

function loadStories() {
  requireAll(require.context('../src', true, /.+\/stories\/.+\.js/))
}

configure(loadStories, module);
