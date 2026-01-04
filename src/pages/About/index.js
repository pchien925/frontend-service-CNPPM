import React from 'react';
import {
  Users,
  Target,
  Award,
  Heart,
  ArrowRight,
  Clock,
  Star,
  ShieldCheck,
} from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Kỹ thuật Layering & Blur */}
      <div className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage:
              "url('https://us.123rf.com/450wm/kaisorn/kaisorn1603/kaisorn160300011/53927744-th%E1%BB%B1c-%C4%91%C6%A1n-th%E1%BB%A9c-%C4%83n-nhanh-tr%C3%AAn-thi%E1%BA%BFt-k%E1%BA%BF-ph%E1%BA%B3ng-n%E1%BB%81n-b%E1%BA%A3ng-%C4%91en.jpg?ver=6')",
            filter: 'brightness(0.4)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-white" />

        <div className="relative z-10 text-center px-4 max-w-5xl">
          <span className="inline-block py-1 px-4 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-sm font-bold tracking-widest uppercase mb-6 animate-fade-in-up">
            Về chúng tôi
          </span>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tight">
            UTE{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              FOOD
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed mb-10">
            "Bấm là có, mở là ngon. UTE FOOD mang đồ ăn nóng hổi tới cửa nhà bạn
            nhanh hơn cách bạn kịp thấy đói!"
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/"
              className="group flex items-center gap-3 bg-orange-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-orange-600/20 hover:bg-orange-700 transition-all duration-300"
            >
              Bắt đầu ngay{' '}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Stats Section - Thêm sự uy tín */}
      <div className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { label: 'Đối tác', value: '1,000+' },
            { label: 'Khách hàng', value: '50k+' },
            { label: 'Đơn hàng', value: '200k+' },
            { label: 'Đánh giá 5 sao', value: '98%' },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 text-center border border-gray-100"
            >
              <div className="text-3xl md:text-4xl font-black text-orange-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-500 font-medium uppercase text-xs tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Story Section - Kể chuyện qua hình ảnh */}
      <div className="container mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 relative">
            <div className="absolute -top-4 -left-4 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
            <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1000"
              alt="Team working"
              className="relative rounded-3xl shadow-2xl z-10"
            />
          </div>
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Khởi nguồn từ niềm đam mê <br />
              <span className="text-orange-600">Phục vụ cộng đồng</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              UTE FOOD ra đời tại khuôn viên trường đại học, với khao khát giải
              quyết bài toán "hôm nay ăn gì?" của sinh viên. Từ một dự án nhỏ,
              chúng tôi đã vươn mình trở thành nền tảng giao đồ ăn tin cậy, nơi
              mỗi shipper là một sứ giả của sự tận tâm.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {[
                {
                  icon: ShieldCheck,
                  text: 'Minh bạch tuyệt đối',
                  color: 'text-blue-500',
                },
                {
                  icon: Clock,
                  text: 'Thời gian là vàng',
                  color: 'text-orange-500',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 font-semibold text-gray-700"
                >
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Values Section - Tối giản & Hiện đại */}
      <div className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">Giá trị cốt lõi</h2>
            <p className="text-gray-500 text-lg">
              Chúng tôi xây dựng UTE FOOD dựa trên những tiêu chuẩn khắt khe
              nhất để đảm bảo sự hài lòng của bạn.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: Users,
                title: 'Tận Tâm',
                desc: 'Chúng tôi không chỉ bán dịch vụ, chúng tôi xây dựng mối quan hệ dựa trên sự chân thành.',
                color: 'orange',
              },
              {
                icon: Award,
                title: 'Chất Lượng',
                desc: 'Mọi đối tác nhà hàng đều được kiểm duyệt vệ sinh và hương vị định kỳ.',
                color: 'red',
              },
              {
                icon: Heart,
                title: 'Cộng Đồng',
                desc: 'Trích một phần lợi nhuận để hỗ trợ các suất ăn cho sinh viên khó khăn.',
                color: 'pink',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-3xl p-10 hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-orange-100"
              >
                <div
                  className={`w-16 h-16 bg-${item.color}-50 rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform`}
                >
                  <item.icon className={`w-8 h-8 text-${item.color}-600`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section - Gradient mạnh mẽ */}
      <div className="container mx-auto px-4 py-20">
        <div className="relative rounded-[40px] overflow-hidden bg-gradient-to-r from-orange-600 to-red-600 px-8 py-16 md:p-20 text-center">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-0 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-10 w-60 h-60 bg-white rounded-full blur-3xl" />
          </div>

          <h2 className="relative z-10 text-4xl md:text-6xl font-bold text-white mb-6">
            Bạn đã sẵn sàng thưởng thức?
          </h2>
          <p className="relative z-10 text-orange-100 text-xl mb-10 max-w-2xl mx-auto">
            Gia nhập cùng 50,000+ người dùng đang tận hưởng những bữa ăn ngon
            lành mỗi ngày.
          </p>
          <button className="relative z-10 bg-white text-orange-600 px-12 py-5 rounded-2xl font-black text-xl hover:shadow-2xl hover:scale-105 transition-all active:scale-95">
            ĐẶT MÓN NGAY
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
