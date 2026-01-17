import * as migration_20250903_024759 from './20250903_024759';
import * as migration_20251217_194832 from './20251217_194832';

export const migrations = [
  {
    up: migration_20250903_024759.up,
    down: migration_20250903_024759.down,
    name: '20250903_024759',
  },
  {
    up: migration_20251217_194832.up,
    down: migration_20251217_194832.down,
    name: '20251217_194832'
  },
];
