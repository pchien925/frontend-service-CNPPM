import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Home, Phone, Building2, Loader } from 'lucide-react';
import branchService from '../../services/branchService';
import addressService from '../../services/addressService';
import orderService from '../../services/orderService';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import styles from './Checkout.module.css';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { totalPrice, clearCart } = useCart();

  // States
  const [step, setStep] = useState(1); // 1=type, 2=branch, 3=address, 4=review, 5=success
  const [orderType, setOrderType] = useState(1); // 1=pickup, 2=delivery
  const [branches, setBranches] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successOrder, setSuccessOrder] = useState(null);

  // Fetch branches
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setLoading(true);
        const res = await branchService.getBranchList({ page: 0, limit: 20 });
        if (res.result && res.data?.content) {
          setBranches(res.data.content);
          if (res.data.content.length > 0) {
            setSelectedBranch(res.data.content[0].id);
          }
        }
      } catch (err) {
        setError('Không thể tải danh sách chi nhánh');
        console.error('Fetch branches error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBranches();
  }, []);

  // Fetch addresses when delivery type is selected
  useEffect(() => {
    if (orderType === 2 && user) {
      const fetchAddresses = async () => {
        try {
          setLoading(true);
          const res = await addressService.getAddressList({
            accountId: user?.data.id,
            page: 0,
            limit: 20,
          });
          if (res.result && res.data?.content) {
            setAddresses(res.data.content);
            const defaultAddr = res.data.content.find((a) => a.isDefault);
            setSelectedAddress(defaultAddr?.id || null);
          }
        } catch (err) {
          setError('Không thể tải danh sách địa chỉ');
          console.error('Fetch addresses error:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchAddresses();
    }
  }, [orderType, user]);

  // Handle checkout
const handleCheckout = async () => {
    // 1. Validation (Giữ nguyên các bước kiểm tra)
    if (orderType === 2 && !selectedAddress) {
      setError('Vui lòng chọn địa chỉ giao hàng');
      return;
    }
    if (!selectedBranch) {
      setError('Vui lòng chọn chi nhánh');
      return;
    }
    if (!totalPrice || totalPrice === 0) {
      setError('Giỏ hàng trống');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderData = {
        type: orderType,
        branchId: selectedBranch,
      };

      if (note) {
        orderData.note = note;
      }

      if (orderType === 2) {
        orderData.deliveryAddressId = selectedAddress;
      }

      // 2. Gọi API tạo đơn hàng
      const res = await orderService.createOrder(orderData);

      if (res.result && res.data) {
        // KIỂM TRA: Nếu res.data là một URL (chứa vnpayment)
        if (typeof res.data === 'string' && res.data.startsWith('http')) {
          // Xóa giỏ hàng trước khi chuyển đi (tùy logic của bạn)
          clearCart(); 
          
          // Chuyển hướng người dùng sang trang thanh toán VNPAY
          window.location.href = res.data;
        } else {
          // Trường hợp trả về Object đơn hàng bình thường (COD)
          setSuccessOrder(res.data);
          clearCart();
          setStep(5);
        }
      } else {
        setError(res.message || 'Đặt hàng thất bại');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Đặt hàng thất bại');
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };
  const totalAmount = totalPrice || 0;
  const shippingFee = orderType === 2 ? 15000 : 0;

  if (!totalPrice && step !== 5) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyCart}>
          <h2>Giỏ hàng trống</h2>
          <p>Vui lòng thêm sản phẩm trước khi thanh toán</p>
          <button
            onClick={() => navigate('/products')}
            className={styles.primaryButton}
          >
            Quay lại sản phẩm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Step Indicators */}
      <div className={styles.steps}>
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`${styles.step} ${step >= s ? styles.active : ''}`}
          >
            <span className={styles.stepNumber}>{s}</span>
          </div>
        ))}
      </div>

      {/* Error Message */}
      {error && <div className={styles.errorMessage}>{error}</div>}

      {/* Step 1: Order Type Selection */}
      {step === 1 && (
        <div className={styles.section}>
          <h2>Chọn loại đơn hàng</h2>
          <div className={styles.optionGroup}>
            <label className={styles.radioOption}>
              <input
                type="radio"
                name="orderType"
                value={1}
                checked={orderType === 1}
                onChange={(e) => setOrderType(Number(e.target.value))}
              />
              <div className={styles.optionContent}>
                <Home size={24} />
                <div>
                  <h3>Ăn tại quán</h3>
                  <p>Thưởng thức tại quán của chúng tôi</p>
                </div>
              </div>
            </label>

            <label className={styles.radioOption}>
              <input
                type="radio"
                name="orderType"
                value={2}
                checked={orderType === 2}
                onChange={(e) => setOrderType(Number(e.target.value))}
              />
              <div className={styles.optionContent}>
                <MapPin size={24} />
                <div>
                  <h3>Giao hàng</h3>
                  <p>Chúng tôi sẽ giao hàng tới bạn</p>
                </div>
              </div>
            </label>
          </div>

          <button
            onClick={() => setStep(2)}
            className={styles.primaryButton}
          >
            Tiếp tục
          </button>
        </div>
      )}

      {/* Step 2: Branch Selection */}
      {step === 2 && (
        <div className={styles.section}>
          <h2>Chọn chi nhánh</h2>
          {loading ? (
            <div className={styles.loading}>
              <Loader size={24} />
              Đang tải danh sách chi nhánh...
            </div>
          ) : branches.length === 0 ? (
            <p>Không có chi nhánh nào khả dụng</p>
          ) : (
            <div className={styles.branchList}>
              {branches.map((branch) => (
                <label key={branch.id} className={styles.branchCard}>
                  <input
                    type="radio"
                    name="branch"
                    value={branch.id}
                    checked={selectedBranch === branch.id}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                  />
                  <div className={styles.branchContent}>
                    <div className={styles.branchHeader}>
                      <Building2 size={20} />
                      <h3>{branch.name}</h3>
                    </div>
                    <p className={styles.branchLocation}>{branch.location}</p>
                    <p className={styles.branchPhone}>{branch.phone}</p>
                  </div>
                </label>
              ))}
            </div>
          )}

          <div className={styles.buttonGroup}>
            <button
              onClick={() => setStep(1)}
              className={styles.secondaryButton}
            >
              Quay lại
            </button>
            <button
              onClick={() => setStep(orderType === 2 ? 3 : 4)}
              className={styles.primaryButton}
            >
              Tiếp tục
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Address Selection (for delivery) */}
      {step === 3 && orderType === 2 && (
        <div className={styles.section}>
          <h2>Chọn địa chỉ giao hàng</h2>
          {loading ? (
            <div className={styles.loading}>
              <Loader size={24} />
              Đang tải danh sách địa chỉ...
            </div>
          ) : addresses.length === 0 ? (
            <div className={styles.noAddresses}>
              <p>Bạn chưa có địa chỉ nào</p>
              <button
                onClick={() => navigate('/addresses')}
                className={styles.primaryButton}
              >
                Thêm địa chỉ
              </button>
            </div>
          ) : (
            <div className={styles.addressList}>
              {addresses.map((addr) => (
                <label key={addr.id} className={styles.addressCard}>
                  <input
                    type="radio"
                    name="address"
                    value={addr.id}
                    checked={selectedAddress === addr.id}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                  />
                  <div className={styles.addressContent}>
                    <div className={styles.addressHeader}>
                      <h3>{addr.recipientName}</h3>
                      {addr.isDefault && (
                        <span className={styles.badge}>Mặc định</span>
                      )}
                    </div>
                    <p className={styles.addressPhone}>
                      <Phone size={16} /> {addr.phone}
                    </p>
                    <p className={styles.addressLine}>{addr.addressLine}</p>
                    <p className={styles.addressArea}>
                      {addr.ward?.name}, {addr.district?.name}, {addr.province?.name}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          )}

          <div className={styles.buttonGroup}>
            <button
              onClick={() => setStep(2)}
              className={styles.secondaryButton}
            >
              Quay lại
            </button>
            <button
              onClick={() => setStep(4)}
              className={styles.primaryButton}
              disabled={!selectedAddress}
            >
              Tiếp tục
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Review & Confirm */}
      {step === 4 && (
        <div className={styles.section}>
          <h2>Xác nhận đơn hàng</h2>

          {/* Order Summary */}
          <div className={styles.summary}>
            <div className={styles.summaryItem}>
              <span>Loại đơn hàng:</span>
              <span>
                {orderType === 1 ? 'Ăn tại quán' : 'Giao hàng'}
              </span>
            </div>
            <div className={styles.summaryItem}>
              <span>Chi nhánh:</span>
              <span>
                {branches.find((b) => b.id === selectedBranch)?.name}
              </span>
            </div>
            {orderType === 2 && (
              <div className={styles.summaryItem}>
                <span>Địa chỉ giao:</span>
                <span>
                  {addresses.find((a) => a.id === selectedAddress)?.addressLine}
                </span>
              </div>
            )}
            <div className={styles.divider}></div>
            <div className={styles.summaryItem}>
              <span>Tiền hàng:</span>
              <span>{totalAmount.toLocaleString('vi-VN')}đ</span>
            </div>
            {orderType === 2 && (
              <div className={styles.summaryItem}>
                <span>Phí giao hàng:</span>
                <span>{shippingFee.toLocaleString('vi-VN')}đ</span>
              </div>
            )}
            <div className={styles.summaryTotal}>
              <span>Tổng cộng:</span>
              <span>
                {(totalAmount + shippingFee).toLocaleString('vi-VN')}đ
              </span>
            </div>
          </div>

          {/* Note */}
          <div className={styles.noteSection}>
            <label>Ghi chú cho người giao</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Nhập ghi chú (không bắt buộc)"
              rows="3"
              className={styles.textarea}
            />
          </div>

          <div className={styles.buttonGroup}>
            <button
              onClick={() => setStep(orderType === 2 ? 3 : 2)}
              className={styles.secondaryButton}
            >
              Quay lại
            </button>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className={styles.primaryButton}
            >
              {loading ? 'Đang xử lý...' : 'Đặt hàng'}
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Success */}
      {step === 5 && successOrder && (
        <div className={styles.successSection}>
          <div className={styles.successContent}>
            <div className={styles.successIcon}>✓</div>
            <h2>Đặt hàng thành công!</h2>
            <p className={styles.successMessage}>
              Cảm ơn bạn đã đặt hàng
            </p>

            <div className={styles.successDetails}>
              <div className={styles.detailItem}>
                <span>Mã đơn:</span>
                <strong>{successOrder.code}</strong>
              </div>
              <div className={styles.detailItem}>
                <span>Tổng tiền:</span>
                <strong>
                  {(
                    Number(successOrder.subAmount) +
                    Number(successOrder.shippingFee)
                  ).toLocaleString('vi-VN')}đ
                </strong>
              </div>
            </div>

            <div className={styles.successButtons}>
              <button
                onClick={() => navigate(`/order/${successOrder.id}`)}
                className={styles.primaryButton}
              >
                Xem chi tiết đơn hàng
              </button>
              <button
                onClick={() => navigate('/products')}
                className={styles.secondaryButton}
              >
                Tiếp tục mua sắm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
