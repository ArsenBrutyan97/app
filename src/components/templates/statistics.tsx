import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { countDatesByWeeks } from 'utils/helpers';
import { CategoryScale } from 'chart.js';
import { DateSelector } from '@/store/selectors';
import { GraphsWrapperStyled } from './styled';

Chart.register(CategoryScale);

export const Statistics = () => {
    const dates = useSelector(DateSelector);

    const weeks = useMemo(
        () => countDatesByWeeks(dates.map((date) => new Date(date))),
        [dates],
    );

    console.log(weeks, '/////');

    return (
        <GraphsWrapperStyled>
            <Line
                data={{
                    labels: dates.length ? weeks : [],
                    datasets: [
                        {
                            label: 'Commits',
                            data: dates.length ? weeks : [],
                            borderColor: '#4CCA8D',
                            tension: 0.4,
                        },
                    ],
                }}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: 'Y: Commits, X: Weeks',
                        },
                        legend: {
                            display: false,
                        },
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false,
                            },
                        },
                        y: {
                            grid: {
                                display: false,
                            },
                        },
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: {
                        padding: {
                            top: 5,
                            left: 15,
                            right: 15,
                            bottom: 15,
                        },
                    },
                }}
            />
        </GraphsWrapperStyled>
    );
};
