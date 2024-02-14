import DashboardIcon from '../assets/icons/dashboard.svg';
import ShippingIcon from '../assets/icons/shipping.svg';
import ProductIcon from '../assets/icons/product.svg';


const sidebar_menu = [
    {
        id: 1,
        icon: DashboardIcon,
        path: '/',
        title: 'Dashboard',
    },
   
    {
        id: 2,
        icon: ProductIcon,
        path: '/invoices',
        title: 'Invoices',
    },
    {
        id: 3,
        icon: ShippingIcon,
        path: '/products',
        title: 'Products',
    },
   
]

export default sidebar_menu;