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

    const calcDate = (week: number) => {
        const currentDate = new Date();
        const day = currentDate.getDay();
        const dateDiff = currentDate.getDate() - day + (day == 0 ? -6 : 1);
        const date = new Date(currentDate.setDate(dateDiff - week * 7));
        return `Week of ${date.toLocaleDateString('en-GB')}`;
    };

    const maxValue = Math.max(
        1,
        Math.max(...weeks.map((week) => Math.max(...week))),
    );

    return (
        <GraphsWrapperStyled>
            {weeks.length > 0 && (
                <LineChart
                    colors={COLORS}
                    xAxis={weeks.map((week) => ({
                        data: week.map((_, key) => key),
                        valueFormatter: (value) =>
                            calcDate(week.length - 1 - value),
                    }))}
                    yAxis={[
                        {
                            max: maxValue,
                        },
                    ]}
                    series={weeks.map((week, key) => ({
                        label: selectedRepos[key].full_name,
                        data: week,
                    }))}
                />
            )}
        </GraphsWrapperStyled>
    );
};
