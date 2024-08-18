import { useContext } from 'react';
import './AdminHome.css';
import { AuthContext } from './../../../Provider/AuthProvider';
import { FaCaravan, FaUsers } from 'react-icons/fa';
import useAxiosSecoure from './../../../Hooks/useAxiosSecoure';
import { useQuery } from '@tanstack/react-query';
import { FaBook, FaSackDollar } from 'react-icons/fa6';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Legend} from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


const AdminHome = () => {
    const { user } = useContext(AuthContext);
    const axiosSecoure = useAxiosSecoure();
    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecoure.get('/admin-stats');
            return res.data;
        }
    });

    const { data: chartData = [] } = useQuery({
        queryKey: ['chart-stats'],
        queryFn: async () => {
            const res = await axiosSecoure.get('/order-stats');
            return res.data;
        }
    });

    //bar chart

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };
    //pie chart 
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const pieChartData = chartData.map(data => {
        return { name: data.category, value: data.revenue }
    })
    return (
        <div className='home_admin'>
            <div className="">
                <h2>
                    <span>Hi, Welcome </span>
                    {
                        user?.name ? user.name : 'Back!'
                    }
                    <div className="admin-home-container">
                        <div className="admin-home-contaner">
                            <div className="admin-home-background background">
                                <div className="admin-flex-container">
                                    <div className="">
                                        <FaSackDollar className='admin-home-icon' />
                                    </div>
                                    <div className="text-white">
                                        <h1 className='stat-value'>{stats.revenue}</h1>
                                        <h2 className="">Revenue</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="admin-home-background background1">
                                <div className="admin-flex-container">
                                    <div className="">
                                        <FaUsers className='admin-home-icon' />
                                    </div>
                                    <div className="text-white">
                                        <h1 className='stat-value'>{stats.users}</h1>
                                        <h2 className="">Customers</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="admin-home-background background2">
                                <div className="admin-flex-container">
                                    <div className="">
                                        <FaBook className='admin-home-icon' />
                                    </div>
                                    <div className="text-white">
                                        <h1 className='stat-value'>{stats.menuItems}</h1>
                                        <h2 className="">Products</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="admin-home-background background3">
                                <div className="admin-flex-container">
                                    <div className="">
                                        <FaCaravan className='admin-home-icon' />
                                    </div>
                                    <div className="text-white">
                                        <h1 className='stat-value'>{stats.orders}</h1>
                                        <h2 className="">Orders</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </h2>
            </div>
            <div className="display_grid">
                <div className="">
                    <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar
                            dataKey="quantity"
                            fill="#8884d8"
                            shape={<TriangleBar />}
                            label={{ position: "top" }}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
                <div className="">
                    <PieChart width={300} height={300}>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend></Legend>
                    </PieChart>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;