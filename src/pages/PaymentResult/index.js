import { CheckCircle2, Home, Loader2, ShoppingBag, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import styles from './PaymentResult.module.css';

const PaymentResultPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('Đang xác thực giao dịch...');

useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Chuyển searchParams thành object để gửi lên server
        const params = Object.fromEntries([...searchParams]);

        // Sử dụng apiClient.get thay vì axios.get
        const response = await apiClient.get('/api/order/vnpay-verify', {
          params: params
        });
        console.log('res', response)
        if (response.success === true && response.code === "00") {
          setStatus('success');
          setMessage('Thanh toán thành công! Đơn hàng của bạn đang được xử lý.');
        } else {
          setStatus('error');
          setMessage(response.message || 'Giao dịch không thành công hoặc mã xác thực không hợp lệ.');
        }
      } catch (error) {
        console.error('Verify error:', error);
        setStatus('error');
        setMessage('Có lỗi kết nối khi xác thực thanh toán. Vui lòng kiểm tra lại lịch sử đơn hàng.');
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {status === 'loading' && (
          <div className={styles.statusContent}>
            <Loader2 className={`${styles.icon} ${styles.spin}`} size={64} color="#3b82f6" />
            <h1>Đang kiểm tra...</h1>
            <p>{message}</p>
          </div>
        )}

        {status === 'success' && (
          <div className={styles.statusContent}>
            <CheckCircle2 className={styles.icon} size={64} color="#22c55e" />
            <h1 className={styles.successTitle}>Thành công!</h1>
            <p>{message}</p>
            <div className={styles.details}>
              <p>Mã đơn hàng: <strong>{searchParams.get('vnp_TxnRef')}</strong></p>
              <p>Số tiền: <strong>{(Number(searchParams.get('vnp_Amount')) / 100).toLocaleString('vi-VN')}đ</strong></p>
            </div>
            <div className={styles.actions}>
              <button onClick={() => navigate('/products')} className={styles.btnPrimary}>
                <ShoppingBag size={18} /> Tiếp tục mua sắm
              </button>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className={styles.statusContent}>
            <XCircle className={styles.icon} size={64} color="#ef4444" />
            <h1 className={styles.errorTitle}>Thất bại</h1>
            <p>{message}</p>
            <div className={styles.actions}>
              <button onClick={() => navigate('/checkout')} className={styles.btnSecondary}>
                Thử lại
              </button>
              <button onClick={() => navigate('/')} className={styles.btnGhost}>
                <Home size={18} /> Về trang chủ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentResultPage;