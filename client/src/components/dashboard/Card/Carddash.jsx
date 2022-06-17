import React, { useState } from 'react';
import styles from './card.module.scss';
import classNames from 'classnames/bind';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaTimes } from 'react-icons/fa';
import Chart from 'react-apexcharts';
import { motion } from 'framer-motion';

const cx = classNames.bind(styles);

const Carddash = ({ ...props }) => {
    const [expand, setExpanded] = useState(false);
    return (
        <>
            {expand ? (
                <Expanded param={props} setExpanded={() => setExpanded(false)} />
            ) : (
                <CompactCard param={props} setExpanded={() => setExpanded(true)} />
            )}
        </>
    );
};

function CompactCard({ param, setExpanded }) {
    const Png = param.png;

    return (
        <div
            className={cx('compact-card')}
            style={{
                background: param.color.backGround,
                boxShadow: param.color.boxShadow,
            }}
            onClick={setExpanded}
        >
            <div className={cx('radial-bar')}>
                <CircularProgressbar className={cx('icon')} value={param.barValue} text={`${param.barValue}%`} />
                <span>{param.title}</span>
            </div>
            <div className={cx('detail')}>
                <Png />
                <span>${param.value}</span>
                <span>Last 24 hours</span>
            </div>
        </div>
    );
}

function Expanded({ param, setExpanded }) {
    const data = {
        chart: {
            type: 'area',
            height: 'auto',
        },
        dropShadow: {
            enabled: false,
            enabledOnSeries: undefined,
            top: 0,
            left: 0,
            blur: 3,
            color: '#000',
            opacity: 0.35,
        },
        fill: {
            colors: ['#fff'],
            type: 'gradient',
        },
        stroke: {
            curve: 'smooth',
            colors: ['white'],
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm',
            },
        },
        grid: {
            show: true,
        },
        xaxis: {
            type: 'datetime',
            categories: [
                '2018-09-19T00:00:00.000Z',
                '2018-09-19T01:30:00.000Z',
                '2018-09-19T02:30:00.000Z',
                '2018-09-19T03:30:00.000Z',
                '2018-09-19T04:30:00.000Z',
                '2018-09-19T05:30:00.000Z',
                '2018-09-19T06:30:00.000Z',
            ],
        },
    };

    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{scale: 1}}
            exit={{ scale: 0 }}
            className={cx('expanded-card')}
            style={{
                background: param.color.backGround,
                boxShadow: param.color.boxShadow,
                transformOrigin: 'center',
                originX: 'center',
                originY: 'top',
            }}
        >
            <FaTimes
                onClick={setExpanded}
                style={{ alignSelf: 'flex-end', cursor: 'pointer', color: '#fff', fontSize: '2rem' }}
            />
            <span>{param.title}</span>
            <div className={cx('chart-container')}>
                <Chart series={param.series} type="area" options={data} />
            </div>
            <span>Last 24 hours</span>
        </motion.div>
    );
}

export default Carddash;
