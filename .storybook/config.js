import { configure } from '@storybook/react';
import 'app.css';

const requireAll = requireContext => requireContext.keys().map(requireContext);

const loadStories = () =>
	requireAll(require.context('js/components', true, /stories\.jsx?$/));

configure(loadStories, module);
