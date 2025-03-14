import * as yup from 'yup';

export const rePhoneNumber = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

yup.setLocale({
  mixed: {
    required: 'Bắt buộc',
    notType: ({ path, type }) => {
      return `${path} phải là một ${type === 'number' ? 'số' : type}`;
    },
  },
  string: {
    min: '${path} cần nhiều hơn ${min} ký tự',
    max: '${path} cần ít hơn ${max} ký tự',
    length: '${path} cần phải chính xác ${length} chữ số',
  },
  number: {
    moreThan: '${path} cần lớn hơn ${more}',
    min: '${path} cần phải lớn hơn hoặc bằng ${min}',
    max: '${path} cần phải lớn bé hoặc bằng ${min}',
  },
});

yup.addMethod(yup.string, 'phone', function (message = 'Không đúng định dạng số điện thoại') {
  return this.test('phone', message, (value) => value !== undefined && rePhoneNumber.test(value));
});

yup.addMethod(yup.string, 'integer', function (message = 'Trường này phải là số') {
  return this.matches(/^\d+$/, message);
});

yup.addMethod(yup.string, 'lengths', function (lengths: number[], message) {
  message = `\${path} phải có chính xác ${lengths.join(', ')} ký tự`;
  return this.test({
    message,
    name: 'length',
    exclusive: true,
    params: {
      lengths,
    },
    skipAbsent: true,
    test(value) {
      const resolveLengths = this.resolve(lengths);
      return resolveLengths.reduce((prev, curr) => prev || curr === value?.length, false);
    },
  });
});

export * from 'yup';
