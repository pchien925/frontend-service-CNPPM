import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, DollarSign, Package, Loader, ChevronRight, X } from 'lucide-react';
import orderService from '../../services/orderService';
import styles from './OrderHistory.module.css';

export default function OrderHistoryPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, pending, success, failed
  const [cancellingOrderId, setCancellingOrderId] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await orderService.getMyOrders({ page: 0, limit: 10 });
        if (res.result && Array.isArray(res.data)) {
          setOrders(res.data);
        } else if (res.data?.content) {
          setOrders(res.data.content);
        }
      } catch (err) {
        setError('Không thể tải lịch sử đơn hàng');
        console.error('Fetch orders error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusLabel = (status) => {
    const labels = {
      1: { text: 'Chờ xác nhận', class: 'pending' },
      2: { text: 'Hoàn thành', class: 'success' },
      3: { text: 'Thất bại', class: 'failed' },
      4: { text: 'Hoàn lại tiền', class: 'refunded' },
    };
    return labels[status] || { text: 'Không xác định', class: 'unknown' };
  };

  const getPaymentStatusLabel = (status) => {
    const labels = {
      1: 'Chưa thanh toán',
      2: 'Đã thanh toán',
      3: 'Đã hoàn tiền',
    };
    return labels[status] || 'Không xác định';
  };

  const getTypeLabel = (type) => {
    return type === 1 ? 'Ăn tại quán' : 'Giao hàng';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleCancelOrder = async () => {
    if (!cancellingOrderId) return;
    try {
      setCancelLoading(true);
      const res = await orderService.cancelOrder(cancellingOrderId, cancelReason);
      if (res.result) {
        // Update order in list
        setOrders(orders.map(order =>
          order.id === cancellingOrderId
            ? { ...order, orderStatus: 3, cancelAt: new Date().toISOString(), cancelReason }
            : order
        ));
        setCancellingOrderId(null);
        setCancelReason('');
      }
    } catch (err) {
      setError('Không thể hủy đơn hàng. Vui lòng thử lại.');
      console.error('Cancel order error:', err);
    } finally {
      setCancelLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === 'all') return true;
    if (filter === 'pending') return order.orderStatus === 1;
    if (filter === 'success') return order.orderStatus === 2;
    if (filter === 'failed') return order.orderStatus === 3 || order.orderStatus === 4;
    return true;
  });

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <Loader size={32} />
          <p>Đang tải lịch sử đơn hàng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Lịch sử đơn hàng</h1>
        <p>Quản lý và theo dõi các đơn hàng của bạn</p>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      {/* Filter Tabs */}
      <div className={styles.filterTabs}>
        <button
          className={`${styles.filterTab} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => setFilter('all')}
        >
          Tất cả ({orders.length})
        </button>
        <button
          className={`${styles.filterTab} ${filter === 'pending' ? styles.active : ''}`}
          onClick={() => setFilter('pending')}
        >
          Chờ xác nhận (
          {orders.filter((o) => o.orderStatus === 1).length})
        </button>
        <button
          className={`${styles.filterTab} ${filter === 'success' ? styles.active : ''}`}
          onClick={() => setFilter('success')}
        >
          Hoàn thành ({orders.filter((o) => o.orderStatus === 2).length})
        </button>
        <button
          className={`${styles.filterTab} ${filter === 'failed' ? styles.active : ''}`}
          onClick={() => setFilter('failed')}
        >
          Không thành công (
          {orders.filter((o) => o.orderStatus === 3 || o.orderStatus === 4).length})
        </button>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className={styles.emptyState}>
          <Package size={48} />
          <h2>Chưa có đơn hàng</h2>
          <p>
            {filter === 'all'
              ? 'Bạn chưa đặt đơn hàng nào'
              : 'Không có đơn hàng nào ở trạng thái này'}
          </p>
          <button
            onClick={() => navigate('/products')}
            className={styles.primaryButton}
          >
            Bắt đầu mua sắm
          </button>
        </div>
      ) : (
        <div className={styles.ordersList}>
          {filteredOrders.map((order) => {
            const status = getStatusLabel(order.orderStatus);
            return (
              <div key={order.id} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <div className={styles.orderInfo}>
                    <h3>{order.code}</h3>
                    <p className={styles.orderDate}>
                      {formatDate(order.createdDate)}
                    </p>
                  </div>
                  <div className={styles.orderStatus}>
                    <span className={`${styles.badge} ${styles[status.class]}`}>
                      {status.text}
                    </span>
                  </div>
                </div>

                <div className={styles.orderBody}>
                  <div className={styles.orderDetail}>
                    <div className={styles.detailRow}>
                      <div className={styles.detailItem}>
                        <Package size={18} />
                        <div>
                          <span className={styles.label}>Loại đơn hàng</span>
                          <span className={styles.value}>
                            {getTypeLabel(order.type)}
                          </span>
                        </div>
                      </div>

                      <div className={styles.detailItem}>
                        <DollarSign size={18} />
                        <div>
                          <span className={styles.label}>Thành tiền</span>
                          <span className={styles.value}>
                            {(
                              Number(order.subAmount) +
                              Number(order.shippingFee)
                            ).toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                      </div>
                    </div>

                    {order.branch && (
                      <div className={styles.detailRow}>
                        <div className={styles.detailItem}>
                          <MapPin size={18} />
                          <div>
                            <span className={styles.label}>Chi nhánh</span>
                            <span className={styles.value}>
                              {order.branch.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {order.deliveryAddress && (
                      <div className={styles.deliveryAddress}>
                        <p className={styles.label}>
                          <MapPin size={16} /> Địa chỉ giao hàng
                        </p>
                        <p className={styles.addressValue}>
                          {order.deliveryAddress.recipientName} -
                          {order.deliveryAddress.phone}
                        </p>
                        <p className={styles.addressValue}>
                          {order.deliveryAddress.addressLine}
                        </p>
                      </div>
                    )}

                    {order.note && (
                      <div className={styles.noteSection}>
                        <p className={styles.label}>Ghi chú</p>
                        <p className={styles.noteValue}>{order.note}</p>
                      </div>
                    )}
                  </div>

                  <div className={styles.orderMeta}>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Thanh toán</span>
                      <span className={styles.metaValue}>
                        {getPaymentStatusLabel(order.paymentStatus)}
                      </span>
                    </div>
                    {order.orderStatus === 1 && (
                      <div className={styles.metaItem}>
                        <Clock size={16} />
                        <span>Chờ xác nhận từ cửa hàng</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.orderFooter}>
                  <button
                    onClick={() => navigate(`/order/${order.id}`)}
                    className={styles.detailButton}
                  >
                    Xem chi tiết <ChevronRight size={16} />
                  </button>
                  {order.orderStatus === 1 && (
                    <button
                      onClick={() => setCancellingOrderId(order.id)}
                      className={styles.cancelButton}
                    >
                      Huỷ đơn
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Cancel Order Modal */}
      {cancellingOrderId && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Hủy đơn hàng</h2>
              <button
                onClick={() => {
                  setCancellingOrderId(null);
                  setCancelReason('');
                }}
                className={styles.closeButton}
              >
                <X size={24} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <p>Bạn có chắc chắn muốn hủy đơn hàng này không?</p>
              <textarea
                placeholder="Lý do hủy (tùy chọn)..."
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className={styles.cancelReasonInput}
                rows="4"
              />
            </div>
            <div className={styles.modalFooter}>
              <button
                onClick={() => {
                  setCancellingOrderId(null);
                  setCancelReason('');
                }}
                className={styles.cancelModalButton}
              >
                Không, quay lại
              </button>
              <button
                onClick={handleCancelOrder}
                disabled={cancelLoading}
                className={styles.confirmCancelButton}
              >
                {cancelLoading ? 'Đang xử lý...' : 'Xác nhận hủy'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
