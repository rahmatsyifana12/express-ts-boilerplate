import { DateTime } from 'luxon';
import type { ColumnOptions, ValueTransformer } from 'typeorm';
import { Column } from 'typeorm';

export const dateTransformer: ValueTransformer = {
    from: (value: Date | null) => value && DateTime.fromJSDate(value),
    to: (value: DateTime | null) => value?.toJSDate()
};

export function DateColumn(options: ColumnOptions) {
    return Column({
        type: 'timestamp',
        transformer: dateTransformer,
        ...options
    });
}