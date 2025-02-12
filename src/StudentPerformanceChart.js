import React, { useState } from 'react';
import { ResponsiveScatterPlot } from '@nivo/scatterplot'; // 根据需要导入其他类型
import { generateData } from './generateData'; // 假设您将该函数保存在此文件中
import DBData from './DB.json'; // 假设您将该函数保存在此文件中

const StudentPerformanceChart = () => {
    const [isRemote, setIsRemote] = useState(false);
    const [switchState, setSwitchState] = useState('Timestamp');
    const [chartData, setChartData] = useState(generateData());
    const getLocalRandomData = () => {
        setChartData(generateData([], switchState));
        setIsRemote(false);
    };
    const getRemoteData = () => {
        setChartData(generateData(DBData, switchState));
        setIsRemote(true);
    };
    const getSwitchQuestionState = () => {
        if (switchState !== 'Question') {
            setSwitchState('Question');
            setChartData(generateData(isRemote ? DBData : [], 'Question'));
        }
    };
    const getSwitchTimestampState = () => {
        if (switchState !== 'Timestamp') {
            setSwitchState('Timestamp');
            setChartData(generateData(isRemote ? DBData : [], 'Timestamp'));
        }
    };
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ backgroundColor: '#00a1ff14', borderRadius: '0.6rem 0 0 0.6rem' }}>
                    <button
                        style={{
                            margin: 10,
                            padding: '5px 15px',
                            fontSize: 12,
                            backgroundColor: '#a5a5a5',
                            color: 'white',
                            border: 'none',
                            borderRadius: 5,
                            cursor: 'pointer',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            transition: 'background-color 0.3s',
                        }}
                        className={!isRemote ? 'my-RemoteClass' : 'my-RemoteClass-opacity'}
                        onClick={getLocalRandomData}
                    >
                        Local Random Data
                    </button>
                    <button
                        style={{
                            margin: 10,
                            padding: '5px 15px',
                            fontSize: 12,
                            backgroundColor: '#4c8aaf',
                            color: 'white',
                            border: 'none',
                            borderRadius: 5,
                            cursor: 'pointer',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            transition: 'background-color 0.3s',
                        }}
                        className={isRemote ? 'my-RemoteClass' : 'my-RemoteClass-opacity'}
                        onClick={getRemoteData}
                    >
                        Remote Data
                    </button>
                </div>
                <div style={{ backgroundColor: '#00fff514', borderRadius: '0 0.6rem 0.6rem 0' }}>
                    <button
                        style={{
                            margin: 10,
                            padding: '5px 15px',
                            fontSize: 12,
                            backgroundColor: '#4cafaf',
                            color: 'white',
                            border: 'none',
                            borderRadius: 5,
                            cursor: 'pointer',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            transition: 'background-color 0.3s',
                        }}
                        className={switchState === 'Question' ? 'my-RemoteClass' : 'my-RemoteClass-opacity'}
                        onClick={getSwitchQuestionState}
                    >
                        Question
                    </button>
                    <button
                        style={{
                            margin: 10,
                            padding: '5px 15px',
                            fontSize: 12,
                            backgroundColor: '#4caf6f',
                            color: 'white',
                            border: 'none',
                            borderRadius: 5,
                            cursor: 'pointer',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            transition: 'background-color 0.3s',
                        }}
                        className={switchState === 'Timestamp' ? 'my-RemoteClass' : 'my-RemoteClass-opacity'}
                        onClick={getSwitchTimestampState}
                    >
                        Timestamp
                    </button>
                </div>
            </div>

            <div style={{ height: 800 }}>
                <ResponsiveScatterPlot
                    data={chartData.chartData}
                    colors={{ scheme: 'paired' }}
                    margin={{ top: 60, right: 150, bottom: 70, left: 280 }}
                    xScale={switchState === 'Timestamp' ? { type: 'time' } : { type: 'point' }}
                    yScale={{ type: 'point' }}
                    blendMode="multiply"
                    nodeSize={15}
                    axisTop={null}
                    axisRight={null}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Student Name',
                        legendPosition: 'middle',
                        legendOffset: -240,
                        truncateTickAt: 0,
                    }}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: switchState === 'Timestamp' ? 'Event_Timestamp' : 'Question',
                        legendPosition: 'middle',
                        legendOffset: 46,
                        truncateTickAt: 0,
                        format: switchState === 'Timestamp' ? '%m/%d %H:%M' : undefined,
                    }}
                    tooltip={(e) => {
                        let n = e.node;
                        return (
                            <div
                                style={{
                                    backgroundColor: n.color,
                                    color: 'white',
                                    padding: '0 1rem',
                                    borderRadius: '0.5rem',
                                    lineHeight: '1.8rem',
                                }}
                            >
                                {n.yValue}：
                                {switchState === 'Timestamp' ? new Date(n.xValue).toLocaleString() : n.xValue}
                            </div>
                        );
                    }}
                    legends={[
                        {
                            anchor: 'top-right',
                            direction: 'column',
                            justify: false,
                            translateX: 130,
                            translateY: 0,
                            itemWidth: 100,
                            itemHeight: 12,
                            itemsSpacing: 5,
                            itemDirection: 'left-to-right',
                            symbolSize: 12,
                            symbolShape: 'circle',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]}
                />
                <div style={{ position: 'absolute', top: 75, right: 70, fontSize: 10 }}>
                    <p style={{ fontWeight: 900 }}>Type</p>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <table
                    style={{ border: '1px solid #dddddd', borderCollapse: 'collapse', width: '80%', marginBottom: 20 }}
                >
                    <thead>
                        <tr style={{ backgroundColor: '#dddddd99' }}>
                            <th>#</th>
                            <th>Student Name</th>
                            <th>Question Id</th>
                            <th>Event Timestamp</th>
                            <th>Test</th>
                            <th>Correct</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chartData.tableData.map((m, n) => (
                            <tr key={n} style={{ backgroundColor: n % 2 === 0 ? '#ffffff99' : '#f7f7f799' }}>
                                <td>{n + 1}</td>
                                <td>{m.Student_Name}</td>
                                <td>{m.Question_Id}</td>
                                <td>{m.Event_Timestamp}</td>
                                <td>{m.Test}</td>
                                <td>{m.Correct}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentPerformanceChart;
