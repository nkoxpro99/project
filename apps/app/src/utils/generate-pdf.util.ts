import { convertDateToLocaleDateFormat } from './datetime-format.util';
import { formatPrice } from './format-price.util';
import { resolveAddress } from './warehouse-address.util';

type User = {
  name: string;
  phoneNumber: string;
  ioc: string;
};

export type PdfOptions = {
  code: string;
  renter: User;
  owner: User;
  warehouse: {
    name: string;
    address: string;
    price: number;
    floors: number;
    doors: number;
    area: number;
  };
  duration: number;
  startDate: Date | string;
  endDate: Date | string;
};

export function generatePdf(options: PdfOptions): void {
  const docDefinition = generatePdfContent(options);
  (window as any).pdfMake.createPdf(docDefinition).print();
}

export function generatePdfContent(options: PdfOptions) {
  const { renter, owner, warehouse, duration, endDate, startDate, code } = options;

  return {
    watermark: { text: 'iRent', color: 'blue', opacity: 0.05, bold: false, italics: true, fontSize: 128 },
    content: [
      {
        text: 'CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM',
        style: 'countryTitle',
        alignment: 'center',
      },
      {
        text: 'Độc lập - Tự do - Hạnh phúc',
        style: 'countrySubTitle',
        alignment: 'center',
      },
      {
        text: 'HỢP ĐỒNG CHO THUÊ KHO BÃI',
        style: 'header',
        alignment: 'center',
      },
      {
        text: `Mã hợp đồng: ${code}`,
        style: 'code',
        alignment: 'center',
      },
      {
        text: 'Hai bên chúng tôi gồm:',
        style: 'normalText',
      },
      {
        text: 'BÊN CHO THUÊ KHO BÃI (sau đây gọi tắt là bên A):',
        style: 'boldMediumText',
      },
      {
        text: `- Ông (bà): ${owner.name}`,
        style: 'normalText',
      },
      {
        text: `- Số CMND/CCCD: ${owner.ioc}`,
        style: 'normalText',
      },
      {
        text: `- Điện thoại: ${owner.phoneNumber}`,
        style: 'normalText',
      },
      {
        text: 'BÊN THUÊ KHO BÃI (sau đây gọi tắt là bên B):',
        style: 'boldMediumText',
      },
      {
        text: `- Ông (bà): ${renter.name}`,
        style: 'normalText',
      },
      {
        text: `- Số CMND/CCCD: ${renter.ioc}`,
        style: 'normalText',
      },
      {
        text: `- Điện thoại: ${renter.phoneNumber}`,
        style: 'normalText',
      },
      {
        text: 'Hai bên thống nhất cho thuê kho bãi dùng cho mục đích lưu trữ và vận chuyển với các nội dung sau đây:',
        style: 'normalText',
      },
      {
        text: 'Điều 1: Đặc điểm chính của kho bãi:',
        style: 'boldText',
      },
      {
        text: '1. Tên kho bãi: Kho bãi',
        style: 'normalText',
      },
      {
        text: `2. Địa chỉ: ${resolveAddress(warehouse.address)}`,
        style: 'normalText',
      },
      {
        text: `3. Tổng diện tích là ${warehouse.area} m2`,
        style: 'normalText',
      },
      {
        text: `4. Tổng số tầng là ${warehouse.floors ?? 0} tầng`,
        style: 'normalText',
      },
      {
        text: `5. Tổng số cửa là ${warehouse.doors ?? 0} cửa`,
        style: 'normalText',
      },
      {
        text: 'Điều 2: Giá cho thuê và phương thức thanh toán tiền thuê:',
        style: 'boldText',
      },
      {
        text: `1. Giá cho thuê là ${formatPrice(warehouse.price)} VNĐ / 01 tháng`,
        style: 'normalText',
      },
      {
        text: `2. Thời hạn thuê là ${duration} tháng. Bắt đầu từ ${convertDateToLocaleDateFormat(
          startDate,
        )} đến ${convertDateToLocaleDateFormat(endDate)}`,
        style: 'normalText',
      },
      {
        text: '3. Phương thức thanh toán: Bên B thanh toán cho bên A 100% giá trị đơn hàng',
        style: 'normalText',
      },
      {
        text: '4. Đối với tiền cọc: Bên B sẽ thanh toán cọc cho bên A bằng 50% số tiền thuê tháng đầu tiên và phần còn lại sẽ được trả trước ngày bắt đầu thuê. Nếu không hoàn thành việc thanh toán trước ngày ngày bắt đầu thuê, bên B sẽ mất hoàn toàn tiền cọc',
        style: 'normalText',
      },
      {
        text: '5. Thời hạn thanh toán: Đối với tiền thuê, tối thiểu là 5 ngày và tối đa là 15 ngày kể từ ngày ký hợp đồng',
        style: 'normalText',
      },
      {
        text: 'Điều 3: Quyền và nghĩa vụ bên A:',
        style: 'boldText',
      },
      {
        text: '1. Quyền của bên A: ',
        style: 'normalText',
      },
      {
        text: 'a) Yêu cầu bên B sử dụng kho bãi đúng mục đích và thực hiện đúng quy định về quản lý và sử dụng kho bãi;',
        style: 'normalText',
      },
      {
        text: 'b) Yêu cầu bên B có trách nhiệm sữa chữa phần hư hỏng và bồi thường thiệt hại do bên B gây ra;',
        style: 'normalText',
      },
      {
        text: 'c) Đơn phương chấm dứt hợp đồng trong trường hợp bên B sử dụng kho bãi sai mục đích hoặc không thực hiện đầy đủ nghĩa vụ sau khi đã được bên A thông báo bằng văn bản;',
        style: 'normalText',
      },
      {
        text: '2. Nghĩa vụ của bên A: ',
        style: 'normalText',
      },
      {
        text: 'a) Giao kho bãi cho bên B theo đúng thời gian quy định;',
        style: 'normalText',
      },
      {
        text: 'b) Thông báo bên B các quy định về quản lý sử dụng nhà ở;',
        style: 'normalText',
      },
      {
        text: 'c) Bảo đảm quyền sử dụng kho bãi bên B',
        style: 'normalText',
      },
      {
        text: 'Điều 4: Quyền và nghĩa vụ bên B:',
        style: 'boldText',
      },
      {
        text: '1. Quyền của bên B: ',
        style: 'normalText',
      },
      {
        text: 'a) Nhận nhà ở theo đúng thời gian quy định; được sử dụng kho bãi để lưu trữ;',
        style: 'normalText',
      },
      {
        text: 'b) Yêu cầu bên A sửa chữa kịp thời những hư hỏng của kho bãi;',
        style: 'normalText',
      },
      {
        text: '2. Nghĩa vụ của bên B: ',
        style: 'normalText',
      },
      {
        text: 'a) Sử dụng kho bãi đúng mục đích; có trách nhiệm sữa chữa phần hư hỏng và bồi thường thiệt hại do mình gây ra;',
        style: 'normalText',
      },
      {
        text: 'b) Chấp hành đầy đủ những quy định về quản lý và sử dụng kho bãi;',
        style: 'normalText',
      },
      {
        text: 'c) Không được chuyển đổi hoặc cho người khác thuê lại kho bãi dưới bất cứ hình thức nào;',
        style: 'normalText',
      },
      {
        text: 'Điều 5: Điều khoản và thi hành',
        style: 'boldText',
      },
      {
        text: '1. Các bên cùng cam kết thực hiện đúng các nội dung thoả thuận trong hợp đồng. Trường hợp có tranh chấp hoặc vi phạm hợp đồng thì các bên thương lượng giải quyết, nếu không thương lượng được thì đề nghị Toà án nhân dân giải quyết.',
        style: 'normalText',
      },
      {
        text: '2. Hợp đồng có thể bị chấm dứt theo thỏa thuận của các bên.',
        style: 'normalText',
      },
      {
        text: 'Điều 6: Phạt hợp đồng và bồi thường',
        style: 'boldText',
      },
      {
        text: '1. Đối với bên A: Nếu kho bãi không và dịch vụ không giống như mô tả hoặc cho người khác thuê sẽ bồi thường 100% tiền hợp đồng đã ký.',
        style: 'normalText',
      },
      {
        text: '2. Đối với bên B: Nếu không thanh toán tiền cọc cũng như tiền thuê kho bãi hàng tháng như hợp đồng sẽ bồi thường 100% tiền hợp đồng đã ký.',
        style: 'normalText',
      },
      {
        text: 'Điều 7: Điều khoản và thi hành',
        style: 'boldText',
      },
      {
        text: '1. Các bên cam kết cùng nhau thực hiện hợp đồng. Nếu trong quá trình thực hiện có phát sinh vướng mắc các bên sẽ trao đổi trên tinh thần hỗ trợ lẫn nhau. Nếu không thể giải quyết hai bên sẽ đưa ra toà án hoặc cơ quan có thẩm quyền giải quyết.',
        style: 'normalText',
      },
      {
        text: '2. Hợp đồng này có hiệu lực kể từ ngày ký.',
        style: 'normalText',
      },
      {
        text: '',
        style: 'bigSpacing',
      },
      {
        layout: 'noBorders', // optional
        table: {
          headerRows: 1,
          widths: ['*', '*'],

          body: [
            [
              { text: 'BÊN CHO THUÊ', bold: true, fontSize: 16, alignment: 'center' },
              { text: 'BÊN THUÊ', bold: true, fontSize: 16, alignment: 'center' },
            ],
            [
              { text: '(Họ và tên)', italics: true, fontSize: 16, alignment: 'center' },
              { text: '(Họ và tên)', italics: true, fontSize: 16, alignment: 'center' },
            ],
            [
              { text: owner.name, bold: true, fontSize: 24, alignment: 'center' },
              { text: renter.name, bold: true, fontSize: 24, alignment: 'center' },
            ],
          ],
        },
      },
    ],
    styles: {
      countryTitle: {
        fontSize: 16,
        bold: true,
      },
      countrySubTitle: {
        fontSize: 16,
        bold: true,
        marginBottom: 32,
      },
      header: {
        fontSize: 20,
        marginBottom: 5,
        bold: true,
        alignment: 'justify',
      },
      code: {
        fontSize: 14,
        marginBottom: 15,
        alignment: 'justify',
      },
      spacing: {
        marginBottom: 16,
      },
      bigSpacing: {
        marginBottom: 48,
      },
      boldMediumText: {
        fontSize: 20,
        bold: true,
        lineHeight: 1.25,
      },
      normalText: {
        fontSize: 16,
        lineHeight: 1.25,
      },
      boldText: {
        fontSize: 16,
        bold: true,
        lineHeight: 1.25,
      },
    },
  };
}
