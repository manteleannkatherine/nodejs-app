import React from 'react';
import useAppStore from '../../store';
import { Button, InputNumber, Table } from 'antd';
import { HomeOutlined, ArrowRightOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_ORDER, GET_ORDER_HISTORY } from '../../queries/order.queries';
import { map } from 'lodash';
import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined';

const Swal = require('sweetalert2');

const TotalLabel = styled.label`
	font-weight: 800;
	display: block;
	font-size: 13px;
	margin-top: 50px;
	text-transform: uppercase;
`;

const TotalAmountLabel = styled.label`
	font-weight: 800;
	font-size: 25px;
	display: block;
	text-transform: uppercase;
`;

const OrderPage: React.FC = () => {
	const history = useHistory();
	const cart = useAppStore((state) => state.cart);
	const deleteFromCart = useAppStore((state) => state.deleteFromCart);
	const updateCart = useAppStore((state) => state.updateCart);
	const totalAmount = useAppStore((state) => state.totalAmount);
	const clearCart = useAppStore((state) => state.clearCart);
	const [createOrder] = useMutation(CREATE_ORDER);

	const { refetch: varRefetch } = useQuery(GET_ORDER_HISTORY, {variables: {
		"groupByOrderDetailBy": "orderId"
	}});

	const handleOrderCheckout = (orderDetails: any, totalAmount: number) => {
		const createOrderData = {
			customer: {
				connect: { id: 1 },
			},
			orderDetails: {
				create: map(orderDetails, (v) => ({
					product: {
						connect: {
							id: v.productId,
						},
					},
					totalPrice: v.totalPrice,
					quantity: v.quantity,
				})),
			},
		};

		createOrder({
			variables: { createOrderData },
		});
		Swal.fire({
			title: 'Order Successful',
			text: "Your order has been placed.",
			type: 'success',
		}).then((result: any) => {

			varRefetch();
			clearCart();
			history.push('/');
	
		});
	};
	
	const columns = [
		{
			title: 'Item Name',
			dataIndex: 'product',
			render: (e: any) => <>{e.name}</>,
		},
		{
			title: 'Unit Price',
			dataIndex: 'product',
			render: (e: any) => <>{e.price.toLocaleString()}</>,
		},
		{
			title: 'Quantity',
			dataIndex: 'quantity',
			render: React.useCallback(
				(value: any, row: any, index: any) => {
					return (
						<InputNumber
							min={1}
							defaultValue={value}
							onChange={(e) => updateCart(row.product, e)}
						/>
					);
				},
				[updateCart]
			),
		},
		{
			key: 'totalPrice',
			title: 'Item Total',
			dataIndex: 'totalPrice',
			render: (value: any, row: any, index: any) => (
				<>{value.toLocaleString()}</>
			),
		},
		{
			key: 'id',
			title: ' ',
			dataIndex: 'id',
			render: React.useCallback(
				(value: any, row: any, index: any) => {
					return (
						<Button
							type="primary"
							onClick={() => deleteFromCart(row.product)}
							icon={<DeleteOutlined />}
							size="large" />
					);
				},
				[deleteFromCart]
			),

		},
	];

	return (
		<>
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

			<Table
				columns={columns}
				dataSource={cart}
				size="small"
				pagination={false}
			/>

			<div
				style={{
					textAlign: 'right',
					marginBottom: 50,
				}}>
				<TotalLabel>Total:</TotalLabel>
				<TotalAmountLabel>{totalAmount.toLocaleString()}</TotalAmountLabel>
			</div>

			<div>
				<Button
					disabled={cart.length < 1}
					type="primary"
					onClick={() => handleOrderCheckout(cart, totalAmount)}
					size="large">
					Continue Checkout <ArrowRightOutlined />
				</Button>
			</div>
		</>
	);
};

export default OrderPage;
