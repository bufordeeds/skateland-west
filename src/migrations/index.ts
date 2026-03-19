import * as migration_20250903_024759 from './20250903_024759';
import * as migration_20251217_194832 from './20251217_194832';
import * as migration_20260117_222245 from './20260117_222245';
import * as migration_20260318_000000 from './20260318_000000';
import * as migration_20260319_210004 from './20260319_210004';

export const migrations = [
  {
    up: migration_20250903_024759.up,
    down: migration_20250903_024759.down,
    name: '20250903_024759',
  },
  {
    up: migration_20251217_194832.up,
    down: migration_20251217_194832.down,
    name: '20251217_194832',
  },
  {
    up: migration_20260117_222245.up,
    down: migration_20260117_222245.down,
    name: '20260117_222245',
  },
  {
    up: migration_20260318_000000.up,
    down: migration_20260318_000000.down,
    name: '20260318_000000',
  },
  {
    up: migration_20260319_210004.up,
    down: migration_20260319_210004.down,
    name: '20260319_210004'
  },
];
