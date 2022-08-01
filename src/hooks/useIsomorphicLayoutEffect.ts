import { useEffect, useLayoutEffect } from 'react';

import { isServer } from 'utils/common';

const useIsomorphicLayoutEffect = isServer ? useEffect : useLayoutEffect;

export default useIsomorphicLayoutEffect;
