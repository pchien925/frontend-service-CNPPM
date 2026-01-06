import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader, MapPin, Clock, DollarSign, Phone, Package, X } from 'lucide-react';
import orderService from '../../services/orderService';
import styles from './OrderDetail.module.css';

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        setLoading(true);
        const res = await orderService.getOrderById(orderId);
        if (res.result && res.data) {
          setOrder(res.data);
        } else {
          setError('Không tìm thấy đơn hàng');
        }
      } catch (err) {
        setError('Không thể tải chi tiết đơn hàng');
        console.error('Fetch order detail error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetail();
  }, [orderId]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <Loader size={32} />
          <p>Đang tải chi tiết đơn hàng...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>{error || 'Đơn hàng không tồn tại'}</h2>
          <button
            onClick={() => navigate('/order-history')}
            className={styles.primaryButton}
          >
            Quay lại lịch sử
          </button>
        </div>
      </div>
    );
  }

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
      1: { text: 'Chưa thanh toán', class: 'unpaid' },
      2: { text: 'Đã thanh toán', class: 'paid' },
      3: { text: 'Đã hoàn tiền', class: 'refunded' },
    };
    return labels[status] || { text: 'Không xác định', class: 'unknown' };
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
    try {
      setCancelLoading(true);
      const res = await orderService.cancelOrder(orderId, cancelReason);
      if (res.result && res.data) {
        setOrder(res.data);
        setShowCancelModal(false);
        setCancelReason('');
      }
    } catch (err) {
      setError('Không thể hủy đơn hàng. Vui lòng thử lại.');
      console.error('Cancel order error:', err);
    } finally {
      setCancelLoading(false);
    }
  };

  const orderStatus = getStatusLabel(order.orderStatus);
  const paymentStatus = getPaymentStatusLabel(order.paymentStatus);
  const totalAmount = Number(order.subAmount) + Number(order.shippingFee);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          <ArrowLeft size={20} /> Quay lại
        </button>
        <h1>Chi tiết đơn hàng</h1>
      </div>

      {/* Order Status Card */}
      <div className={styles.statusCard}>
        <div className={styles.statusContent}>
          <div>
            <h2>{order.code}</h2>
            <p>{formatDate(order.createdDate)}</p>
          </div>
          <div className={styles.statusBadges}>
            <span className={`${styles.badge} ${styles[orderStatus.class]}`}>
              {orderStatus.text}
            </span>
            <span
              className={`${styles.badge} ${styles[paymentStatus.class]}`}
            >
              {paymentStatus.text}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          {/* Order Info */}
          <div className={styles.section}>
            <h3>Thông tin đơn hàng</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.label}>Loại đơn hàng</span>
                <span className={styles.value}>{getTypeLabel(order.type)}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Chi nhánh</span>
                <span className={styles.value}>{order.branch?.name}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Địa điểm</span>
                <span className={styles.value}>
                  {order.branch?.location}
                </span>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          {order.type === 2 && order.deliveryAddress && (
            <div className={styles.section}>
              <h3>
                <MapPin size={18} /> Địa chỉ giao hàng
              </h3>
              <div className={styles.addressCard}>
                <p className={styles.recipientName}>
                  {order.deliveryAddress.recipientName}
                </p>
                <p className={styles.phone}>
                  <Phone size={14} />
                  {order.deliveryAddress.phone}
                </p>
                <p className={styles.address}>
                  {order.deliveryAddress.addressLine}
                </p>
                <p className={styles.area}>
                  {order.deliveryAddress.ward?.name},
                  {order.deliveryAddress.district?.name},
                  {order.deliveryAddress.province?.name}
                </p>
              </div>
            </div>
          )}

          {/* Order Items */}
          <div className={styles.section}>
            <h3>
              <Package size={18} /> Danh sách mặt hàng
            </h3>
            <div className={styles.itemsList}>
              {order.items && order.items.length > 0 ? (
                order.items.map((item, index) => (
                  <div key={item.id || index} className={styles.itemCard}>
                    <div className={styles.itemHeader}>
                      <h4>
                        {item.itemKind === 1 ? 'Món ăn' : 'Combo'} #{index + 1}
                      </h4>
                      <span className={styles.quantity}>
                        Số lượng: {item.quantity}
                      </span>
                    </div>

                    <div className={styles.itemDetails}>
                      <p>
                        <span>Giá cơ bản:</span>
                        <strong>
                          {Number(item.basePrice).toLocaleString('vi-VN')}đ
                        </strong>
                      </p>
                    </div>

                    {/* Options */}
                    {item.options && item.options.length > 0 && (
                      <div className={styles.optionsSection}>
                        <p className={styles.sectionLabel}>
                          Tùy chọn bổ sung:
                        </p>
                        <div className={styles.optionsList}>
                          {item.options.map((option) => (
                            <div
                              key={option.id}
                              className={styles.optionItem}
                            >
                              <span>
                                {option.optionValue?.name || 'Option'}
                              </span>
                              {Number(option.extraPrice) > 0 && (
                                <span className={styles.price}>
                                  +
                                  {Number(
                                    option.extraPrice
                                  ).toLocaleString('vi-VN')}
                                  đ
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Combo Selections */}
                    {item.comboSelections &&
                      item.comboSelections.length > 0 && (
                        <div className={styles.comboSection}>
                          <p className={styles.sectionLabel}>
                            Mục được chọn từ combo:
                          </p>
                          <div className={styles.selectionsList}>
                            {item.comboSelections.map((selection) => (
                              <div
                                key={selection.id}
                                className={styles.selectionItem}
                              >
                                <span>
                                  {selection.selectedFood?.name || 'Item'}
                                </span>
                                {Number(selection.extraPrice) > 0 && (
                                  <span className={styles.price}>
                                    +
                                    {Number(
                                      selection.extraPrice
                                    ).toLocaleString('vi-VN')}
                                    đ
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    {item.note && (
                      <div className={styles.noteSection}>
                        <p className={styles.sectionLabel}>Ghi chú:</p>
                        <p className={styles.noteValue}>{item.note}</p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>Không có mục nào trong đơn hàng</p>
              )}
            </div>
          </div>

          {/* Note */}
          {order.note && (
            <div className={styles.section}>
              <h3>Ghi chú đơn hàng</h3>
              <p className={styles.noteValue}>{order.note}</p>
            </div>
          )}
        </div>

        {/* Right Column - Summary */}
        <div className={styles.rightColumn}>
          <div className={styles.summaryCard}>
            <h3>Tóm tắt đơn hàng</h3>

            <div className={styles.summaryItems}>
              <div className={styles.summaryItem}>
                <span>Tiền hàng:</span>
                <span>
                  {Number(order.subAmount).toLocaleString('vi-VN')}đ
                </span>
              </div>
              {order.shippingFee > 0 && (
                <div className={styles.summaryItem}>
                  <span>Phí giao hàng:</span>
                  <span>
                    {Number(order.shippingFee).toLocaleString('vi-VN')}đ
                  </span>
                </div>
              )}
            </div>

            <div className={styles.summaryDivider}></div>

            <div className={styles.totalAmount}>
              <span>Tổng cộng:</span>
              <strong>{totalAmount.toLocaleString('vi-VN')}đ</strong>
            </div>

            <div className={styles.statusSection}>
              <div className={styles.statusInfo}>
                <p className={styles.label}>Trạng thái đơn hàng</p>
                <p className={`${styles.status} ${styles[orderStatus.class]}`}>
                  {orderStatus.text}
                </p>
              </div>
              <div className={styles.statusInfo}>
                <p className={styles.label}>Trạng thái thanh toán</p>
                <p className={`${styles.status} ${styles[paymentStatus.class]}`}>
                  {paymentStatus.text}
                </p>
              </div>
            </div>

            {order.orderStatus === 1 && (
              <button
                onClick={() => setShowCancelModal(true)}
                className={styles.cancelButton}
              >
                Huỷ đơn hàng
              </button>
            )}

            <button
              onClick={() => navigate('/order-history')}
              className={styles.historyButton}
            >
              Quay lại lịch sử
            </button>
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Hủy đơn hàng</h2>
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setCancelReason('');
                }}
                className={styles.closeButton}
              >
                <X size={24} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <p>Bạn có chắc chắn muốn hủy đơn hàng {order.code} không?</p>
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
                  setShowCancelModal(false);
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
