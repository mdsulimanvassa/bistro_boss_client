import Cover from '../../Share/Cover/Cover';
import './Order.css';
import orderimg from '../../../images/banner2.jpg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from 'react';
import useMenu from '../../../Hooks/useMenu';
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Order = () => {

    const categoreis = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
    const {category} = useParams();
    const initialIndex = categoreis.indexOf(category);
    const [tebIndex, setTebIndex] = useState(initialIndex);

    const [menu] = useMenu();

    const drinks = menu.filter(items => items.category === "drinks");
    const dessert = menu.filter(items => items.category === "dessert");
    const salad = menu.filter(items => items.category === "salad");
    const soup = menu.filter(items => items.category === "soup");
    const pizza = menu.filter(items => items.category === "pizza");
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Order Food</title>
            </Helmet>
            <Cover img={orderimg} title={'Order Food'}></Cover>
            <Tabs defaultIndex={tebIndex} onSelect={(index) => setTebIndex(index)}>
                <TabList>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Dessert</Tab>
                    <Tab>Drinks</Tab>
                </TabList>
                <TabPanel>
                    <OrderTab item={salad}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab item={pizza}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab item={soup}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab item={dessert}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab item={drinks}></OrderTab>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;