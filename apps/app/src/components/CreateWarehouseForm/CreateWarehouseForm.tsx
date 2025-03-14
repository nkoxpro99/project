import 'react-quill/dist/quill.snow.css';
import './style.css';

import { Field, Form, useFormikContext } from 'formik';
import { useEffect } from 'react';
import styled, { css } from 'styled-components';

import { UploadImageButton } from '@/containers/UploadImageButton/UploadImageButton';
import { getWardFromMapWard } from '@/utils/get-ward-from-map.util';

import { FieldError } from '../Common/Form';
import { RichTextEditor } from '../Common/RichTextEditor';
import { SuffixInput } from '../Common/SuffixInput';
import { WardSelect } from '../Common/WardSelect';
import { MapContainer, MapSearchBoxInput, useMapWithSearchBox } from '../Map';
import { CreateWarehouseFormValuesType } from './CreateWarehouseProvider';

export const CreateWarehouseForm = () => {
  const { handleSubmit, handleChange, handleBlur, values, setFieldValue } =
    useFormikContext<CreateWarehouseFormValuesType>();
  const { currentSearchPayload } = useMapWithSearchBox();

  useEffect(() => {
    if (currentSearchPayload) {
      setFieldValue('address', JSON.stringify(currentSearchPayload));
      setFieldValue('mapSearch', currentSearchPayload?.address);
      if (currentSearchPayload.ward) setFieldValue('ward', getWardFromMapWard(currentSearchPayload.ward));
    }
  }, [currentSearchPayload]);

  return (
    <Container>
      <Title>Thông tin kho bãi</Title>
      <Form onSubmit={handleSubmit}>
        <Body>
          <ImageInfo>
            <Text>Ảnh</Text>
            <ImageInputContainer>
              <UploadImageButton onImageUploaded={(images) => setFieldValue('images', images)} />
            </ImageInputContainer>
            <FieldError errorFor={'images'} />
          </ImageInfo>
          <TextInfo>
            <LeftSide>
              <FormField>
                <Label>Tên kho bãi</Label>
                <Input defaultValue={values.name} name="name" onBlur={handleBlur} onChange={handleChange} />
                <FieldError errorFor={'name'} />
              </FormField>
              <FormField>
                <Label>Địa chỉ</Label>
                <CreateWarehouseMapSearchBoxInput
                  defaultValue={values.mapSearch}
                  name="mapSearch"
                  placeholder=""
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <FieldError errorFor={'address'} />
              </FormField>
              <FormField>
                <Label>Quận</Label>
                <WardSelect
                  allSelect
                  name="ward"
                  triggerStyles={{
                    height: 50,
                  }}
                  value={values.ward?.toString()}
                  onSelect={(value) => setFieldValue('ward', Number(value))}
                />
                <FieldError errorFor={'ward'} />
              </FormField>
              <FormField>
                <Label>Diện tích</Label>
                <StyledSuffixInput
                  defaultValue={values.area}
                  name="area"
                  suffix={'m2'}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <FieldError errorFor="area" />
              </FormField>
              <FormField>
                <Label>Số cửa</Label>
                <Input defaultValue={values.doors} name="doors" onBlur={handleBlur} onChange={handleChange} />
                <FieldError errorFor={'doors'} />
              </FormField>
              <FormField>
                <Label>Số tầng</Label>
                <Input defaultValue={values.floors} name="floors" onBlur={handleBlur} onChange={handleChange} />
                <FieldError errorFor={'floors'} />
              </FormField>
            </LeftSide>
            <RightSide>
              <FormField>
                <Label>Giá</Label>
                <StyledSuffixInput
                  defaultValue={values.price}
                  name="price"
                  suffix=".000 VND"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <FieldError errorFor={'price'} />
              </FormField>
              <CreateFormMapContainer />
            </RightSide>
          </TextInfo>
          <FormField>
            <Label>Mô tả</Label>
            <Field component={RichTextEditor} name="description" />
            <FieldError errorFor={'description'} />
          </FormField>
        </Body>
      </Form>
    </Container>
  );
};

const Container = styled.div``;

const Body = styled.div``;

const TextInfo = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 15px;
`;

const ImageInfo = styled.div`
  margin-bottom: 8px;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h2``;

const FormField = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 8px;
  }
`;

const Label = styled.label``;

const inputStyles = css`
  height: 50px;
  padding: 16px;
  border-radius: 4px;
  border: 1px solid gray;
  box-sizing: border-box;
`;

const Input = styled.input`
  ${inputStyles}
`;

const StyledSuffixInput = styled(SuffixInput)``;

const CreateWarehouseMapSearchBoxInput = styled(MapSearchBoxInput)`
  ${inputStyles}
  width: inherit;
`;

const ImageInputContainer = styled.div``;

const Text = styled.span``;

const CreateFormMapContainer = styled(MapContainer)`
  height: 300px;
  width: 100%;
`;
