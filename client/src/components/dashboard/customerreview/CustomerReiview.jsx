import React from 'react'
import classNames from 'classnames/bind';
import styles from './customerreview.module.scss';
import Chart from 'react-apexcharts'

const cx = classNames.bind(styles);
const data={
    series: [
        {
            name:'Đánh Giá',
            data:[10,50,30,90,40,120,100]
        },
    ],
    options:{
        chart:{
            type:'area',
            height:'auto'
        },
        fill:{
            colors:['#fff'],
            type:'gradient'
        },
        dataLabels:{
            enabled:false
        },
        stroke:{
            curve:'smooth',
            color:['#ff929f']
        },
        tooltip:{
            x:{
                format:'dd/MM/yy HH:mm'
            }
        },
        grid:{
            show:false
        },
        xaxis:{
            type:'datetime',
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
        yaxis:{
            show:false
        },
        toolbar:{
            show:false
        }
    }
}

const CustomerReiview = () => {
  return (
    <div className={cx('customer-review')}>
        <Chart series={data.series} options={data.options} type='area'/>
    </div>
  )
}

export default CustomerReiview