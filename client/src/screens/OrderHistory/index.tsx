import EyeOutlined from '@ant-design/icons/lib/icons/EyeOutlined';
import HomeOutlined from '@ant-design/icons/lib/icons/HomeOutlined';
import { useQuery } from '@apollo/client';
import { Button, Table, Modal } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';
import {GET_ORDER_HISTORY} from '../../queries/order.queries';
import OrderDetailsPage from './viewOrderDetails';

const OrderHistoryPage: React.FC = () => {
	const history = useHistory();
	const { data: orders } = useQuery(GET_ORDER_HISTORY, {variables: {
            "groupByOrderDetailBy": "orderId"
        }});
	const [isModalVisible, setIsModalVisible] = React.useState(false);
	const [orderId, setOrderId] = React.useState(null);
    
    const columns = [
        {
            key: 'orderId',
            title: 'Order ID',
            dataIndex: 'orderId',
        },
        {
            key: '_count',
            title: '# of items',
            dataIndex: '_count',
            render: (value: any, row: any, i : any) => {
                return <span>{value.productId}</span>            
            }
        },
        {
            key: '_sum',
            title: 'Total Price',
            dataIndex: '_sum',
            render: (value: any, row: any, i: any) => {
                return <span>{value.totalPrice}</span>
            }
        },
        {
            key: 'id',
            title: ' ',
            render: React.useCallback((value: any, row: any, index: any) => {
                return (
                    <Button
                        type="primary"
                        onClick={() => showModal(value)}
                        icon={<EyeOutlined />}
                        size="large"
                    >
                        View
                    </Button>
                );
            }, [])
        }
    ];
   
    const showModal = (order: any) => {        
        setOrderId(order.orderId);
        setIsModalVisible(true);
    }
    
    const handleOk = () => {
        setIsModalVisible(false);
    }

	return (        
		<div>
            <div
				style={{
					textAlign: 'right',
					marginBottom: 50,
				}}>
				<Button
					type="primary"
					onClick={() => history.push('/')}
					icon={<HomeOutlined />}
					size="large">
					Back to Store
				</Button>
			</div>
            <div>
            {(orders) && (
                <div>
                    <Table
                        columns={columns}
                        dataSource={orders.groupByOrderDetail}
                        />
                </div>)}
            </div>
            
            <Modal 
                title="Order Details" 
                visible={isModalVisible}
                width={1000}
                footer={[
                    <Button key="ok" onClick={handleOk}>OK</Button>
                ]}
                onCancel={handleOk}
            >
                <OrderDetailsPage orderId={orderId} />
            </Modal>
               
		</div>
	);
};

export default OrderHistoryPage;