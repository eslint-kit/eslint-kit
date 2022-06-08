import { external } from 'external-lib';

import { ui } from '@/shared/ui';

import { entityModel } from '@/entities/slice';

import { featureModel } from '@/features/slice';

import { widgetModel } from '@/widgets/slice';

export const foo = { ui, external, widgetModel, entityModel, featureModel };
