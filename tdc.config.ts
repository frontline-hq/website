import { Manipulation, type LibraryConfig } from '@frontline-hq/tdc';
import { default as config, buttonButtonWrapper } from '@frontline-hq/uui/tdc';

export default {
	...config,
	manipulations: [
		new Manipulation(buttonButtonWrapper, {
			styles: (s) => {
				return { coloring: '[&&]:rounded-full' };
			}
		})
	]
} as LibraryConfig;
