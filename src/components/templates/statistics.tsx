import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'chart.js/auto';
import { countDatesByWeeks } from 'utils/helpers';
import { CategoryScale } from 'chart.js';
import { SelectedRepositoriesSelector, DateSelector } from '@/store/selectors';
import { GraphsWrapperStyled } from './styled';
import { LineChart } from '@mui/x-charts/LineChart';
import { COLORS } from 'utils/constants';

Chart.register(CategoryScale);

export const Statistics = () => {
    const selectedRepos = useSelector(SelectedRepositoriesSelector);
    const dates = useSelector(DateSelector);

    const weeks = useMemo(
        () =>
            dates.map((date) =>
                countDatesByWeeks(date.map((d) => new Date(d))),
            ),
        [dates],
    );

    return (
        <GraphsWrapperStyled>
            {weeks.length > 0 && (
                <LineChart
                    colors={COLORS}
                    xAxis={weeks.map((week) => ({
                        data: week.map((_, key) => key),
                    }))}
                    series={weeks.map((week, key) => ({
                        label: selectedRepos[key].full_name,
                        data: week,
                    }))}
                />
            )}
        </GraphsWrapperStyled>
    );
};
