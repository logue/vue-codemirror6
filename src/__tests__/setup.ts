import { afterEach } from 'rstack/test';

/**
 * Shared test setup, registered through `setupFiles` in `rstack.config.ts`.
 *
 * Clears the DOM after every test so specs do not leak elements into each other.
 */
afterEach(() => {
  document.body.innerHTML = '';
});
