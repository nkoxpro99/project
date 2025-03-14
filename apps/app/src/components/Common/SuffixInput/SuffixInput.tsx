import styled from 'styled-components';

export type SuffixInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  suffix?: string;
};

export function SuffixInput({ suffix, className, ...props }: SuffixInputProps) {
  return (
    <SuffixInputRoot className={className}>
      <Input {...props} />
      {suffix && (
        <Suffix>
          <p>{suffix}</p>
        </Suffix>
      )}
    </SuffixInputRoot>
  );
}

const SuffixInputRoot = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  border-radius: 4px;
  outline: 1px solid gray;
  padding: 15px 0 15px 15px;
  box-sizing: border-box;

  &:focus-within {
    outline: -webkit-focus-ring-color auto 1px;
  }
`;
const Input = styled.input`
  border: 0;
  width: inherit;
  box-sizing: border-box;
  flex-shrink: 5;
  padding: 0;

  &:focus-visible,
  &:focus {
    outline: 0;
  }
`;

const Suffix = styled.div`
  min-width: 50px;
  text-align: center;
  color: rgb(128, 128, 128, 0.65);
  padding: 0 5px;

  ${SuffixInputRoot}:focus-within & {
    color: rgb(128, 128, 128, 1);
  }

  p {
    white-space: nowrap;
    margin: 0;
  }
`;
