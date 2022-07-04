import { entityModel } from '@/entities/slice';

import { featureModel } from '@/features/slice';

import { widgetModel } from '@/widgets/slice';

import { appLib } from '@/app/slice';

export const foo = { appLib, widgetModel, entityModel, featureModel };
